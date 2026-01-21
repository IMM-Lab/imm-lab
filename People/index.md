---
title: People
nav:
  order: 3
  tooltip: About our team
---

# {% include icon.html icon="fa-solid fa-users" %}People

<!-- # Current Lab Members -->
## Directors
{% include list.html data="members" component="portrait" filters="role: Lead" background="white" %}
{% include list.html data="members" component="portrait" filters="role: Co-PI" background="white" %}

## Postdoctoral Researchers
{% include list.html data="members" component="portrait" filters="role: PD" background="white" %}

## Graduate Students
{% include list.html data="members" component="portrait" filters="role: GA, group:phd" background="white" %}
{% include list.html data="members" component="portrait" filters="role: GA, group:msc" background="white" %}

## Research Assistants
{% include list.html data="members" component="portrait" filters="role: RA, group: Research Technician" background="white" %}
{% include list.html data="members" component="portrait" filters="role: RA, group: Co-op Student" background="white" %}
{% include list.html data="members" component="portrait" filters="role: RA, group: Work-Learn Student" background="white" %}
{% include list.html data="members" component="portrait" filters="role: RA, group: Research Assistant" background="white" %}


<!-- Section for Collaborators -->


<!-- Section for Alumni -->
{% include section.html %}
<div class="previous-members">

## Previous Members

### PhD & Master's Students
{% include list.html data="members" component="portrait" filters="role: Al, group: PostDoc" background="gray" %}
{% include list.html data="members" component="portrait" filters="role: Al, group: Masters" background="gray" %}
{% include list.html data="members" component="portrait" filters="role: Al, group: Lecturer" background="gray" %}

### Research Assistants
{% include list.html data="members" component="portrait" filters="role: Al, group: Research Technician" background="gray" %}
{% include list.html data="members" component="portrait" filters="role: Al, group: Co-op Student" background="gray" %}
{% include list.html data="members" component="portrait" filters="role: Al, group: Work-Learn Student" background="gray" %}
{% include list.html data="members" component="portrait" filters="role: Al, group: Research Assistant" background="gray" %}
</div>

<style>
.previous-members .list,
.previous-members .portrait-list {
  grid-template-columns: repeat(3, 1fr);
}
</style>


## Our Affiliations 
We are proud to be affiliated with these esteemed organizations and institutes.

<!-- Using cols.html; first three affiliations-->
{% capture col1 %}
  {% include figure.html image="images/ubc-psych-img.jpg" caption="[UBC Psychology](https://psych.ubc.ca/)" %}
{% endcapture %}

{% capture col2 %}
  {% include figure.html image="images/bcchr-transparent.jpg" caption="[BC Children's Hospital](https://www.bcchr.ca/)" %}
{% endcapture %}

{% capture col3 %}
  {% include figure.html image="images/djavadicon-transparent.png" caption="[Djavad Mowafaghian Centre for Brain Health](https://www.centreforbrainhealth.ca/)" %}
{% endcapture %}  

{% include cols.html col1=col1 col2=col2 col3=col3 %}


<!-- Last two affiliations -->
{% capture col1 %}
  {% include figure.html image="images/Fig-affiliations-ubc-vision.png" caption="[Research Excellence Cluster in Vision: Molecules, Behaviour, Society](https://vision.ubc.ca)" %}
{% endcapture %}

{% capture col2 %}
  {% include figure.html image="images/Fig-affiliations-ubc-langsci.jpg" caption="[UBC Language Sciences Institute](https://languagesciences.ubc.ca/)" %}
{% endcapture %}

{% include cols.html col1=col1 col2=col2 %}



