---
---
importScripts('/bower_components/cache-polyfill/dist/serviceworker-cache-polyfill.js');

// The SW will be shutdown when not in use to save memory,
// be aware that any global state is likely to disappear

var DEFAULT_CACHE = 'tramdisseny-app-cache{{ site.time | date_to_xmlschema }}';
var AIP_CACHE = 'tramdisseny-aip-cache{{ site.time | date_to_xmlschema }}';

console.log('SW startup', DEFAULT_CACHE);

self.addEventListener('install', function(event) {
  // pre cache a load of stuff:
  event.waitUntil(
    caches.open(DEFAULT_CACHE).then(function(cache) {
      return cache.addAll([
        '/styles/main.css',
        '/font-awesome/css/font-awesome.min.css',
        '/font-awesome/fonts/FontAwesome.otf',
        '/font-awesome/fonts/fontawesome-webfont.eot',
        '/font-awesome/fonts/fontawesome-webfont.svg',
        '/font-awesome/fonts/fontawesome-webfont.ttf',
        '/font-awesome/fonts/fontawesome-webfont.woff',
        '/feed.xml',
        '/images/touch/chrome-touch-icon-192x192.png',
        "/images/touch/favicon-web-468x128.png",
        '/apple-touch-icon-precomposed.png',
        '/images/touch/ms-touch-icon-144x144-precomposed.png',
        '/favicon.ico',
        "/images/artinpocket-partner-figura-i-retrat-footer.png",
        "/images/oxygen-partner-figura-i-retrat-footer.png",
        "/images/premi-tram-merchan-design-inscripcions-adult.jpg",
        "/images/premi-tram-merchan-design-inscripcions-batxillerat.jpg",
        "/images/premi-tram-merchan-design-inscripcions-primaria.jpg",
        "/images/tram-merchan-design-tram-bg-ii-web.jpg",
        "/images/tram-merchan-design-tram-bg-iii-web.jpg",
        "/images/tram-merchan-design-tram-bg-iv-web.jpg",
        "/images/tram-merchan-design-tram-bg-v-web.jpg",
        "/images/tram-merchan-design-tram-bg-web.jpg",
        '/bower_components/google-map/google-map.min.html',
        '/bower_components/core-image/core-image.min.html',
        '/bower_components/google-apis/google-apis.min.html',
        '/bower_components/polymer/polymer.html',
        '/bower_components/polymer/layout.min.html',
        '/bower_components/polymer/polymer.min.js',
        '/bower_components/webcomponentsjs/webcomponents.min.js',
        '/scripts/jquery-1.11.0.min.js',
        '/scripts/bootstrap.min.js',
        '/scripts/jquery.easing.min.js',
        '/scripts/grayscale.min.js',
        '/scripts/import-css-js.html',
        '/vendor/add-to-homescreen/addtohomescreen.min.js',
        '/vendor/add-to-homescreen/addtohomescreen.min.css',
        {% for page in site.pages %}{% if page.url != '/worker.js' and page.url != '/404.html' %}'{{ page.url }}',{% endif %}
        {% endfor %}{% for post in site.posts %}{% if post.url != '/worker.js' and post.url != '/404.html' and forloop.last != true %}'{{ post.url }}',{% elsif post.url != '/worker.js' and post.url != '/404.html' and forloop.last == true %}'{{ post.url }}'{% endif %}
        {% endfor %}
      ]);
    })
  )
});

// Remove any cache that isn't on the whitelist
// This is a good way to clean up left over caches
// when a new Service Worker is installed
self.addEventListener('activate', function(event) {
  var cacheWhitelist = [DEFAULT_CACHE, AIP_CACHE];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// During a fetch, check to see if the requested
// resource is already cached, if so, return it.
// If the requested resource comes from TRAM,
// dynamically cache it.
self.addEventListener('fetch', function(event) {
  console.log('fetching', event.request.url);
  var requestURL = new URL(event.request.url);

  if (requestURL.hostname == 'www.tram.cat') {
    console.log('fetching from aip');
    event.respondWith(aipResponse(event.request));
  } else {
    console.log('fetching generic asset');
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  }
});

function aipResponse(request) {
  return caches.match(request).then(function(response) {
    if (response) {
      console.log('found match in aip cache');
      return response;
    }

    return fetch(request).then(function(response) {
      caches.open(AIP_CACHE).then(function(cache) {
        cache.put(request, response).then(function() {
          console.log('yey img cache');
        }, function() {
          console.log('nay img cache');
        });
      });

      return response.clone();
    });
  });
}
