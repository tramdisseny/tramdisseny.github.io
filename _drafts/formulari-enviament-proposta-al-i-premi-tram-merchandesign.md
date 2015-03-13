---
layout: post
og: true
og-type: article
title: "Formulari enviament proposta al Concurs <span class='bold'>TRAM</span>disseny" 
share: true
class: event
categories:
  - inscripcions
published: true
work: 1
email: "info@tramdisseny.cat"
---

{% assign work_data = site.data.inscripcions.adults | where:"id", page.work %}
{% assign work = work_data | first %}
<figure class="no-margin margin-bottom-1">
    <!-- <div class="embed-container embed-container_{{ work.aspect_ratio }}">
      <core-image sizing="cover" class="core-image-size" preload fade src="{{ work.featured_src }}"></core-image> 
    </div> -->
    <div class="padding-artwork-container">
      <h2>Formulari enviament proposta al Concurs <span class="bold">TRAM</span>disseny</h2>
          <div class="embed-container embed-container_{{ work.aspect_ratio }}">              
          </div>
    </div>
</figure>