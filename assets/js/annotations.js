/**
 * Table annotation tooltips
 * ---------------------------------------------------------------
 * Any element with class "annot" and a "data-tip" attribute gets a
 * popup showing the tip text:
 *   - mouse/pen: shown on hover, hidden when the pointer leaves it
 *   - touch: tapping toggles it; a tap anywhere else closes it
 *
 * The popup is a single element appended to <body> and positioned
 * with fixed coordinates computed from the target's on-screen
 * position, so it is never clipped by a table's, or any wrapping
 * container's, overflow setting.
 */
(function () {
  'use strict';

  var GAP = 8;               // px between the target and the tooltip
  var VIEWPORT_PADDING = 8;  // px minimum distance from the viewport edge

  var tooltip = null;
  var activeTarget = null;

  function createTooltip() {
    var el = document.createElement('div');
    el.className = 'annot-tooltip';
    el.setAttribute('role', 'tooltip');
    el.id = 'annot-tooltip';
    document.body.appendChild(el);
    return el;
  }

  function positionTooltip(target) {
    var rect = target.getBoundingClientRect();
    // The tooltip has real layout even while visibility: hidden, so it
    // can be measured here before it is actually shown.
    var ttRect = tooltip.getBoundingClientRect();

    var placement = 'top';
    var top = rect.top - ttRect.height - GAP;
    if (top < VIEWPORT_PADDING) {
      placement = 'bottom';
      top = rect.bottom + GAP;
    }

    var left = rect.left + rect.width / 2 - ttRect.width / 2;
    var maxLeft = window.innerWidth - ttRect.width - VIEWPORT_PADDING;
    left = Math.max(VIEWPORT_PADDING, Math.min(left, maxLeft));

    var arrowLeft = rect.left + rect.width / 2 - left;
    arrowLeft = Math.max(10, Math.min(arrowLeft, ttRect.width - 10));

    tooltip.style.top = top + 'px';
    tooltip.style.left = left + 'px';
    tooltip.style.setProperty('--annot-arrow-left', arrowLeft + 'px');
    tooltip.setAttribute('data-placement', placement);
  }

  function showTooltip(target) {
    var text = target.getAttribute('data-tip');
    if (!text) return;

    activeTarget = target;
    tooltip.textContent = text;
    target.setAttribute('aria-describedby', tooltip.id);

    positionTooltip(target);
    tooltip.classList.add('is-visible');
  }

  function hideTooltip() {
    if (!activeTarget) return;
    activeTarget.removeAttribute('aria-describedby');
    activeTarget = null;
    tooltip.classList.remove('is-visible');
  }

  function onPointerEnter(e) {
    if (e.pointerType !== 'mouse') return; // hover behavior is mouse-only
    showTooltip(e.currentTarget);
  }

  function onPointerLeave(e) {
    if (e.pointerType !== 'mouse') return;
    if (e.currentTarget === activeTarget) hideTooltip();
  }

  function onPointerUp(e) {
    if (e.pointerType === 'mouse') return; // mouse is handled by enter/leave
    e.preventDefault();
    var target = e.currentTarget;
    if (activeTarget === target) {
      hideTooltip();
    } else {
      showTooltip(target);
    }
  }

  function onFocus(e) {
    showTooltip(e.currentTarget);
  }

  function onBlur(e) {
    if (e.currentTarget === activeTarget) hideTooltip();
  }

  function onDocumentPointerDown(e) {
    if (!activeTarget) return;
    if (e.target === activeTarget || activeTarget.contains(e.target)) return;
    if (e.target === tooltip || tooltip.contains(e.target)) return;
    hideTooltip();
  }

  function onKeydown(e) {
    if (e.key === 'Escape') hideTooltip();
  }

  function init() {
    tooltip = createTooltip();

    var targets = document.querySelectorAll('.annot[data-tip]');
    targets.forEach(function (target) {
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '0');
      target.addEventListener('pointerenter', onPointerEnter);
      target.addEventListener('pointerleave', onPointerLeave);
      target.addEventListener('pointerup', onPointerUp);
      target.addEventListener('focus', onFocus);
      target.addEventListener('blur', onBlur);
    });

    document.addEventListener('pointerdown', onDocumentPointerDown);
    document.addEventListener('keydown', onKeydown);
    // Capture phase so this also fires for scrolling inside any
    // scrollable wrapper the table might be in, not just the window.
    window.addEventListener('scroll', hideTooltip, true);
    window.addEventListener('resize', hideTooltip);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();