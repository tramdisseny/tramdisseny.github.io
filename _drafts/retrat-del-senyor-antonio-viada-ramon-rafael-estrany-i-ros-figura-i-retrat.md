---
layout: post
og: true
og-type: product
title: "Retrat del Sr. Antonio Viada Ramon. Rafael Estrany i Ros" 
share: true
class: artwork
categories:
  - simboliques
published: true
work: 3
---

{% assign work_data = site.data.obres.figurairetratobressimboliques | where:"id", page.work %}
{% assign work = work_data | first %}
<figure>
  <div class="padding-artwork-container">
    <div class="embed-container embed-container_{{ work.aspect_ratio }}">
      <core-image sizing="cover" class="core-image-size" preload fade src="{{ work.featured_src }}"></core-image> 
    </div>
  </div>
  <figcaption>
    <p><small><strong>{{ work.title }}</strong> | {% if work.downloadable == true %} digital art{% else if %} dimensions: {{ work.dimensions.length }}x{{ work.dimensions.height }} {{ work.dimensions.unit }}{% endif %}</small></p>
  </figcaption>
</figure>
<!--more-->
{{ work.description }}