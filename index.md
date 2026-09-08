---
layout: default
title: Buddhafield Solar Power 2026 Energy Analysis and Inventory
---

# Site Installations

Select an installation below to view its inventory, photos, etc.

# Daily consumption by installation (kWh)
<table>

  <thead>
    <tr>
      <th>Installation</th>
      {% assign dates = site.data.energy | map: "Date" | uniq | compact | sort %}
      {% for d in dates %}
        <th>{{ d | date: "%b %d" }}</th>
      {% endfor %}
      <th>Mean</th>
    </tr>
  </thead>
  <tbody>
    {% assign installations = site.data.energy | map: "Installation" | uniq | compact %}
    {% for inst in installations %}
      {% assign total_cons = 0.0 %}
      {% assign count_cons = 0 %}
      {% comment %} 
        Skip rendering this row if the installation explicitly sets consumer: false or lacks the flag 
      {% endcomment %}
      {% assign inst_page = site.installations | where: "title", inst | first %}
      {% if inst_page.consumer == true %}
        <tr>
            <td>
            <strong>
                {% if inst_page %}
                <a href="{{ inst_page.url | relative_url }}">{{ inst }}</a>
                {% else %}
                {{ inst }}
                {% endif %}
            </strong>
            </td>
            {% for d in dates %}
            {% assign record = site.data.energy | where: "Installation", inst | where: "Date", d | first %}
            {% assign val = nil %}
            {% if record.ConsKWh != "" and record.ConsKWh != nil %}
                {% assign val = record.ConsKWh | times: 1.0 %}
            {% elsif record.ConsEstimated != "" and record.ConsEstimated != nil %}
                {% assign val = record.ConsEstimated | times: 1.0 %}
            {% endif %}

            {% if val %}
                {% assign total_cons = total_cons | plus: val %}
                {% assign count_cons = count_cons | plus: 1 %}
                {% assign opacity = val | divided_by: 15.0 | at_most: 1.0 %}
            {% endif %}

            <td {% if val %}style="background-color: rgba(239, 68, 68, {{ opacity | round: 2 }}); color: {% if opacity > 0.6 %}white{% else %}inherit{% endif %};"{% endif %}>
                {% if record.ConsKWh != "" and record.ConsKWh != nil %}
                {{ val | round: 1 }}
                {% elsif record.ConsEstimated != "" and record.ConsEstimated != nil %}
                <span class="annot" data-tip="{{ record.ConsEstimationBasis }}">{{ val | round: 1 }}</span>
                {% else %}
                —
                {% endif %}
            </td>
            {% endfor %}
            <td>
            {% if count_cons > 0 %}
                {% assign mean = total_cons | divided_by: count_cons %}
                {{ mean | round: 1 }}
            {% else %}
                —
            {% endif %}
            </td>
        </tr>
      {% endif %}
    {% endfor %}
  </tbody>
</table>

# Daily generation by installation (kWh)
<table>

  <thead>
    <tr>
      <th>Installation</th>
      {% assign dates = site.data.energy | map: "Date" | uniq | compact | sort %}
      {% for d in dates %}
        <th>{{ d | date: "%b %d" }}</th>
      {% endfor %}
      <th>Mean</th>
    </tr>
  </thead>
  <tbody>
    {% assign installations = site.data.energy | map: "Installation" | uniq | compact %}
    {% for inst in installations %}
      {% assign total_gen = 0.0 %}
      {% assign count_gen = 0 %}
      {% comment %} 
        Skip rendering this row if the installation explicitly sets generator: false or lacks the flag 
      {% endcomment %}
      {% assign inst_page = site.installations | where: "title", inst | first %}
      {% if inst_page.generator == true %}
        <tr>
            <td>
            <strong>
                {% assign inst_page = site.installations | where: "title", inst | first %}
                {% if inst_page %}
                <a href="{{ inst_page.url | relative_url }}">{{ inst }}</a>
                {% else %}
                {{ inst }}
                {% endif %}
            </strong>
            </td>
            {% for d in dates %}
            {% assign record = site.data.energy | where: "Installation", inst | where: "Date", d | first %}
            {% assign val = nil %}
            {% if record.GenKWh != "" and record.GenKWh != nil %}
                {% assign val = record.GenKWh | times: 1.0 %}
            {% elsif record.GenEstimated != "" and record.GenEstimated != nil %}
                {% assign val = record.GenEstimated | times: 1.0 %}
            {% endif %}

            {% if val %}
                {% assign total_gen = total_gen | plus: val %}
                {% assign count_gen = count_gen | plus: 1 %}
                {% assign opacity = val | divided_by: 15.0 | at_most: 1.0 %}
            {% endif %}

            <td {% if val %}style="background-color: rgba(239, 68, 68, {{ opacity | round: 2 }}); color: {% if opacity > 0.6 %}white{% else %}inherit{% endif %};"{% endif %}>
                {% if record.GenKWh != "" and record.GenKWh != nil %}
                {{ val | round: 1 }}
                {% elsif record.GenEstimated != "" and record.GenEstimated != nil %}
                <span class="annot" data-tip="{{ record.GenEstimationBasis }}">{{ val | round: 1 }}</span>
                {% else %}
                —
                {% endif %}
            </td>
            {% endfor %}
            <td>
            {% if count_gen > 0 %}
                {% assign mean = total_gen | divided_by: count_gen %}
                {{ mean | round: 1 }}
            {% else %}
                —
            {% endif %}
            </td>
        </tr>
      {% endif %}
    {% endfor %}
  </tbody>
</table>