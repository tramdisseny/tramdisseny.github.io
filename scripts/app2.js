(function () {
    /**
 * Conditionally loads webcomponents polyfill if needed.
 * Credit: Glen Maddern (geelen on GitHub)
 */
    var webComponentsSupported = ('registerElement' in document
      && 'import' in document.createElement('link')
      && 'content' in document.createElement('template'));

    if (!webComponentsSupported) {
      var wcPoly = document.createElement('script');
      wcPoly.src = '/bower_components/webcomponentsjs/webcomponents-lite.min.js';
      wcPoly.onload = lazyLoadPolymerAndElements;
      document.head.appendChild(wcPoly);
    } else {
      lazyLoadPolymerAndElements();
    }

    function lazyLoadPolymerAndElements() {

      // Let's use Shadow DOM if we have it, because awesome.
      window.Polymer = window.Polymer || {};
      window.Polymer.dom = 'shadow';

      var elements = [
        '/bower_components/google-map/google-map.html',
        '/bower_components/iron-image/iron-image.html',
        '/bower_components/platinum-sw/platinum-sw-register.html',
        '/bower_components/platinum-sw/platinum-sw-cache.html',
        '/bower_components/paper-toast/paper-toast.html',
        '/scripts/import-css-js.html'
      ];

      elements.forEach(function(elementURL) {

        var elImport = document.createElement('link');
        elImport.rel = 'import';
        elImport.href = elementURL;

        document.head.appendChild(elImport);

      })
    }  
})();