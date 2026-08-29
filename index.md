---
layout: default
title: Buddhafield Solar Power 2026 Energy Analysis and Inventory
---

# Site Installations

Select an installation below to view its inventory, photos, etc.

<ul>
  {% for item in site.installations %}
    <li>
      <a href="{{ item.url | relative_url }}">{{ item.title }}</a>
      <p>{{ item.capacity }}</p>
    </li>
  {% endfor %}
</ul>