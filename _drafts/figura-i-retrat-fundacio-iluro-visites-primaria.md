---
layout: post
og: true
og-type: article
title: "I tu, què hi veus?" 
share: true
class: event
categories:
  - inscripcions
published: true
work: 3
email: "ateneu@fundacioiluro.cat"
---

{% assign work_data = site.data.inscripcions.primaries | where:"id", page.work %}
{% assign work = work_data | first %}
<figure class="no-margin margin-bottom-1">
    <div class="embed-container embed-container_{{ work.aspect_ratio }}">
      <core-image sizing="cover" class="core-image-size" preload fade src="{{ work.featured_src }}"></core-image> 
    </div>
    <div class="padding-artwork-container" itemscope itemtype="http://schema.org/Event">
        <h3>{{ work.category }}</h3>
        <strong>Activitat:</strong> <span itemprop="name">{{ work.activity }}</span><br/>
        <strong>Durada:</strong> {{ work.duration }}<br/>
        <meta itemprop="startDate" content="{{ work.startDate }}">
        <strong>Horari:</strong> {{ work.timetable }}
        <div itemprop="location" itemscope itemtype="http://schema.org/Place">
          <strong>Lloc:</strong> <span itemprop="name">{{ work.place }}</span>
          <div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
            <strong>Adreça:</strong> <span itemprop="streetAddress">{{ work.streetAddress }}</span> <span itemprop="postalCode">{{ work.postalCode }}</span>, <span itemprop="addressLocality">{{ work.addressLocality }}</span>
          </div>
        </div>
        <strong>Participants:</strong> {{ work.people }}
        <hr/>
        {{ work.description }}
    </div>
</figure>