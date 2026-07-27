---
title: Publications
nav:
  order: 3
  tooltip: Research papers and PDFs
---

<h1 style="text-align: left;">Publications</h1>

<style>
  /* alignment + hanging indent */
  .pubs, .pubs li {
    text-align: left !important;
    text-align-last: auto !important;
    word-spacing: normal !important;
    letter-spacing: normal !important;
    white-space: normal !important;
  }
  .pubs { list-style-type: disc; padding-left: 0; margin: 0; }
  .pubs li { margin-bottom: 1.5rem; padding-left: 1.2em; text-indent: -1.2em; }
  .pubs a { overflow-wrap: anywhere; word-break: break-word; }

  /* follow the light/dark theme rather than forcing a fixed colour */
  .pubs { color: var(--text); }
  .pubs * { color: inherit; }
</style>

<!--
  This list is generated from _data/citations.yaml, which is built by
  _cite/cite.py from the lab ORCID record plus _data/sources.yaml.
  To add a paper, add its DOI to _data/sources.yaml — don't edit this list.
-->

{%- assign pubs = site.data.citations | sort: "date" | reverse -%}

<ul class="pubs">
{%- for pub in pubs -%}
{%- unless pub.hide -%}
{%- assign doi = pub.id | remove_first: "doi:" -%}
{%- assign last_char = pub.title | slice: -1 -%}
{%- comment %} normalise missing fields: nil and "" must both count as absent {% endcomment -%}
{%- assign publisher = pub.publisher | default: "" -%}
{%- assign volume = pub.volume | default: "" -%}
{%- assign issue = pub.issue | default: "" -%}
{%- assign pages = pub.pages | default: "" -%}
  <li>
    {{ pub.authors_apa }} ({{ pub.date | date: "%Y" }}). {{ pub.title }}{% unless last_char == "." or last_char == "?" or last_char == "!" %}.{% endunless %}
    {%- if publisher != "" %}
      <i>{{ publisher }}</i>
      {%- if volume != "" %}, <i>{{ volume }}</i>{% if issue != "" %}({{ issue }}){% endif %}{% endif %}
      {%- if pages != "" %}, {{ pages }}{% endif %}.
    {%- endif %}
    {% if pub.id contains "doi:" -%}
      <a href="https://doi.org/{{ doi }}" target="_blank" rel="noopener noreferrer">https://doi.org/{{ doi }}</a>
    {%- elsif pub.link -%}
      <a href="{{ pub.link }}" target="_blank" rel="noopener noreferrer">{{ pub.link }}</a>
    {%- endif %}
  </li>
{%- endunless -%}
{%- endfor %}
</ul>
