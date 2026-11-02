---
title: Publications
nav:
  order: 3
  tooltip: Research papers and PDFs
---

<h1 style="text-align: left; margin-bottom: 4px;">Publications</h1>

<style>
  /* journal names and links use a muted accent that works in light and dark */
  [data-dark="false"] .pubs-list { --pub-accent: #0369a1; }
  [data-dark="true"]  .pubs-list { --pub-accent: #7dd3fc; }

  .pubs-list, .pubs-list * { text-align: left !important; text-align-last: auto !important; }
  .pubs-note { text-align: left !important; font-size: 0.9em; color: var(--gray); margin-bottom: 0.5rem; }

  .pubs-year {
    margin: 2.2rem 0 0.8rem 0;
    padding-bottom: 4px;
    border-bottom: 1px solid var(--light-gray);
    font-size: 1.15rem;
    font-weight: var(--bold);
    letter-spacing: 0.5px;
    text-align: left;
  }

  .pubs { list-style: none; padding: 0; margin: 0; }
  .pubs li {
    margin: 0 0 1rem 0;
    padding-left: 1.5em;
    text-indent: -1.5em;          /* hanging indent */
    line-height: 1.6;
    color: var(--text);
  }
  .pub-journal { font-style: italic; color: var(--pub-accent); }
  .pub-link {
    display: inline-block;
    margin-left: 0.4em;
    padding: 0 0.5em;
    text-indent: 0;
    border: 1px solid var(--pub-accent);
    border-radius: var(--rounded);
    font-size: 0.75em;
    line-height: 1.7;
    letter-spacing: 0.5px;
    color: var(--pub-accent) !important;
    text-decoration: none;
    vertical-align: 1px;
  }
  .pub-link:hover {
    background-color: var(--pub-accent);
    color: var(--background) !important;
  }
</style>

<!--
  This list is generated from _data/citations.yaml, which is built by
  _cite/cite.py from the lab ORCID record plus _data/sources.yaml.
  To add a paper, add its DOI to _data/sources.yaml — don't edit this list.
-->

{%- comment %} in-press papers first, then the rest by date, newest first {% endcomment -%}
{%- assign by_date = site.data.citations | sort: "date" | reverse -%}
{%- assign in_press = by_date | where: "in_press", true -%}
{%- assign published = by_date | where_exp: "p", "p.in_press != true" -%}
{%- assign pubs = in_press | concat: published -%}

<div class="pubs-list">
<p class="pubs-note">* These authors contributed equally.</p>
{%- assign current_year = "" -%}
{%- for pub in pubs -%}
{%- unless pub.hide -%}
{%- if pub.in_press -%}{%- assign year = "In press" -%}{%- else -%}{%- assign year = pub.date | date: "%Y" -%}{%- endif -%}
{%- if year != current_year -%}
{%- unless current_year == "" %}
</ul>
{%- endunless %}
<h2 class="pubs-year">{{ year }}</h2>
<ul class="pubs">
{%- assign current_year = year -%}
{%- endif -%}
{%- assign doi = pub.id | remove_first: "doi:" -%}
{%- assign last_char = pub.title | slice: -1 -%}
{%- comment %} normalise missing fields: nil and "" must both count as absent {% endcomment -%}
{%- assign publisher = pub.publisher | default: "" -%}
{%- assign volume = pub.volume | default: "" -%}
{%- assign issue = pub.issue | default: "" -%}
{%- assign pages = pub.pages | default: "" -%}
  <li>
    {{ pub.authors_apa }} ({% if pub.in_press %}in press{% else %}{{ pub.date | date: "%Y" }}{% endif %}). {{ pub.title }}{% unless last_char == "." or last_char == "?" or last_char == "!" %}.{% endunless %}
    {%- if publisher != "" %}
      <span class="pub-journal">{{ publisher }}</span>
      {%- if volume != "" %}, <i>{{ volume }}</i>{% if issue != "" %}({{ issue }}){% endif %}{% endif %}
      {%- if pages != "" %}, {{ pages }}{% endif %}.
    {%- endif %}
    {% if pub.id contains "doi:" -%}
      <a class="pub-link" href="https://doi.org/{{ doi }}" target="_blank" rel="noopener noreferrer" title="https://doi.org/{{ doi }}">DOI</a>
    {%- elsif pub.link -%}
      <a class="pub-link" href="{{ pub.link }}" target="_blank" rel="noopener noreferrer" title="{{ pub.link }}">Link</a>
    {%- endif %}
  </li>
{%- endunless -%}
{%- endfor %}
</ul>
</div>
