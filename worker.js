---
---
importScripts('/bower_components/cache-polyfill/dist/serviceworker-cache-polyfill.js');

// The SW will be shutdown when not in use to save memory,
// be aware that any global state is likely to disappear

var DEFAULT_CACHE = 'figurairetrat-app-cache7';
var AIP_CACHE = 'figurairetrat-aip-cache7';

console.log('SW startup', DEFAULT_CACHE);

self.addEventListener('install', function(event) {
  // pre cache a load of stuff:
  event.waitUntil(
    caches.open(DEFAULT_CACHE).then(function(cache) {
      return cache.addAll([
        '/styles/main.css',
        '/font-awesome/css/font-awesome.min.css',
        '/font-artinpocket/dist/stylesheet.min.css',
        '/feed.xml',
        '/images/touch/chrome-touch-icon-192x192.png',
        '/apple-touch-icon-precomposed.png',
        '/images/touch/ms-touch-icon-144x144-precomposed.png',
        '/favicon.ico',
        '/images/1-jordi-pages-collage-serie-far-de-cala-nans-cadaques-inspirada-en-la-poesia-de-michel-houellebecq.jpg',
        '/images/2-jordi-pages-collage-serie-far-de-cala-nans-cadaques-inspirada-en-la-poesia-de-michel-houellebecq.jpg',
        '/images/3-jordi-pages-collage-serie-far-de-cala-nans-cadaques-inspirada-en-la-poesia-de-michel-houellebecq.jpg',
        '/images/4-jordi-pages-gravat-serie-far-de-cala-nans-cadaques.jpg',
        '/images/artinpocket-organitzadors-barcelona-digital-art-footer.jpg',
        '/images/grayscale-jordi-pages.jpg',
        '/images/jordi-pages-busquet-pujolas-bg-obra.jpg',
        '/images/jordi-pages-cala-nans-bg-obra.jpg',
        '/images/jordi-pages-exposicio-joan-vinyoli-santa-eulalia.jpg',
        '/images/jordi-pages-gabriel-ferrater-bg-obra.jpg',
        '/images/jordi-pages-galeria-cadaques-espai-dos.jpg',
        '/images/jordi-pages-inauguracio-poetes-ferits-palau-zuriaga-barcelona-2014.jpg',
        '/images/jordi-pages-joan-vinyoli-bg-obra.jpg',
        '/images/jordi-pages-poetes-ferits-bg-obra.jpg',
        '/images/jordi-pages-serie-poetes-ferits-sense-tÃ­tol-collage.jpg',
        '/images/jordi-pages-trajectoria-bg.jpg',
        '/images/oxygen-organitzadors-barcelona-digital-art-footer.jpg',
        '/bower_components/core-image/core-image.min.html',
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
// If the requested resource comes from Amazon S3,
// dynamically cache it.
self.addEventListener('fetch', function(event) {
  console.log('fetching', event.request.url);
  var requestURL = new URL(event.request.url);

  if (requestURL.hostname == 'artinpocket.cat') {
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
