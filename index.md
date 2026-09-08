---
layout: default
title: "Buddhafield 2026 Solar Power Information Repository"
---

# {{ site.title }}

## Site Installations

Select an installation below to view its inventory, photos, etc.

## Energy measurements

<p>Estimated values are shown in <i>italics</i> and the basis of the estimate can be shown by touching or rolling over the numeric value.</p>
<p>A dash (&mdash;) means we have no data and no basis for estimation.</p>
<p>Mean values represent the average of those days which have actual or estimated data.</p>

### Daily consumption by installation (kWh)
{% include energy-table.html 
   type="consumer" 
   actual_key="ConsKWh" 
   est_key="ConsEstimated" 
   basis_key="ConsEstimationBasis" 
   bg_rgb="239, 68, 68" %}

### Daily generation by installation (kWh)
{% include energy-table.html 
   type="generator" 
   actual_key="GenKWh" 
   est_key="GenEstimated" 
   basis_key="GenEstimationBasis" 
   bg_rgb="34, 197, 94" %}

