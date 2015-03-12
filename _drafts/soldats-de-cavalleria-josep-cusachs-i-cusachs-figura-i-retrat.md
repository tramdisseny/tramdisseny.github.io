---
layout: post
og: true
og-type: product
title: "Soldats de cavalleria. Josep Cusachs i Cusachs" 
share: true
class: artwork
categories:
  - figuracions
published: true
work: 5
---

{% assign work_data = site.data.obres.figurairetratobresfiguracions | where:"id", page.work %}
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