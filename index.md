---
layout: default
title: Buddhafield Solar Power 2026 Energy Analysis and Inventory
---

# Site Installations

Select an installation below to view its inventory, photos, etc.

<ul>
  {% for site_item in site.data.installations %}
    <li>
      <a href="{{ site.baseurl }}/installations/{{ site_item.slug }}/">{{ site_item.name }}</a>
      <p>{{ site_item.summary }}</p>
    </li>
  {% endfor %}
</ul>