---
layout: default
title: Workshop 1
summary: "Workshop tent consuming power for lighting, audio, etc."
generator: true
consumer: true
---

# {{ page.title }}

### Overview
{{ page.summary }}

### Inventory
*   EcoFlow Delta 2 Max 2kWh {% include datasheet-link.html file="3032120016spec-bi.pdf" %}
*   EcoWorthy 48V LiFePO4 Cubix100 rackmount battery {% include datasheet-link.html file="Eco-Worthy_Cubix_100_Manual_online-26.03.17.pdf" %} P/N ECO-LFP4810002 S/N ECO-3U-0832BC
*   Victron SmartSolar MPPT 150/85 - VE.Can charge controller {% include datasheet-link.html file="Datasheet-SmartSolar-charge-controller-MPPT-150-70-up-to-150-100-VE.Can-EN.pdf" %} S/N HQ2527Z2F4Z
*   15x Sanyo HIT-H250E01 250W solar panels {% include datasheet-link.html file="Download.pdf" %} in 3 strings: 3S2P, 3S2P, 3S1P

### Notes
* EcoFlow has no facility to record daily energy consumption. Therefore consumption was initially estimated using generation as a proxy for consumption (since the solar generated is used to replenish the battery to full capacity each day).
* From Fri 17th an energy monitor was installed but this was not enrolled with the online eWeLink monitoring system due to lack of network connection at Workshop 1. So the subsequent measurements are taken from the LCD display of the energy monnitor.

{% include energy-table-installation.html %}

{% include installation-gallery.html %}

