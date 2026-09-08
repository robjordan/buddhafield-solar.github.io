---
layout: default
title: "Buddhafield 2026 Solar Power Information Repository"
---

{% if site.title %}
  <h1><a href="{{ "/" | relative_url }}">{{ site.title }}</a></h1>
{% endif %}

## Energy measurements

* Estimated values are shown in <i>italics</i> and the basis of the estimate can be shown by touching or rolling over the numeric value.
* A dash (&mdash;) means we have no data and no basis for estimation.
* Mean values represent the average of those days which have actual or estimated data.
* Select an installation name to view its inventory, photos, etc.

### Daily generation by installation (kWh)
{% include energy-table.html 
   type="generator" 
   actual_key="GenKWh" 
   est_key="GenEstimated" 
   basis_key="GenEstimationBasis" 
   bg_rgb="34, 197, 94" %}

### Daily consumption by installation (kWh)
{% include energy-table.html 
   type="consumer" 
   actual_key="ConsKWh" 
   est_key="ConsEstimated" 
   basis_key="ConsEstimationBasis" 
   bg_rgb="239, 68, 68" %}



