
// Names of the two caches used in this version of the service worker.
// Change to v2, etc. when you update any of the local resources, which will
// in turn trigger the install event again.
var PRECACHE = 'precache-v1';

// A list of local resources we always want to be cached.
var PRECACHE_URLS = [
    'soundboard-HW4.html',
    'service-worker.js',
    'CSS/stylesheet-HW4.css',
    'json/packet.txt',
    'soundBoard.js',
    'manifest.json',
    'Images/eagle.png',
    'Images/eagle-192.png',
    'Images/eagle-512.png',
    'Images/angry-elephant.jpg',
    'Images/baby-seal.jpg',
    'Images/beluga.jpg',
    'Images/bottlenose.jpg',
    'Images/cougar.jpg',
    'Images/dolphin-click.jpg',
    'Images/geese.jpg',
    'Images/gorilla.jpg',
    'Images/happy-elephant.jpg',
    'Images/harbor-seal.jpg',
    'Images/hawk.jpg',
    'Images/humpback-whale.jpg',
    'Images/jungle.jpg',
    'Images/killer-whale.jpg',
    'Images/lion.jpg',
    'Images/macaw.jpg',
    'Images/monkey.jpg',
    'Images/ocean.jpg',
    'Images/penguins.jpg',
    'Images/pig.jpg',
    'Images/rhino.jpg',
    'Images/rooster.jpg',
    'Images/sea-lion.jpg',
    'Images/sea-lion2.jpg',
    'Images/seagull.jpg',
    'Images/underwater-dolphin.jpg',
    'Sounds/angry-elephant.wav',
    'Sounds/baby-seal.mp3',
    'Sounds/beluga.mp3',
    'Sounds/bottlenose.mp3',
    'Sounds/cougar.wav',
    'Sounds/dolphin-click.mp3',
    'Sounds/geese.wav',
    'Sounds/gorilla.wav',
    'Sounds/happy-elephant.wav',
    'Sounds/harbor-seal.mp3',
    'Sounds/hawk.wav',
    'Sounds/humpback-whale.mp3',
    'Sounds/killer-whale.mp3',
    'Sounds/lion.wav',
    'Sounds/macaw.wav',
    'Sounds/monkey.wav',
    'Sounds/penguins.mp3',
    'Sounds/pig.wav',
    'Sounds/rhino.wav',
    'Sounds/rooster.wav',
    'Sounds/sea-lion.mp3',
    'Sounds/sea-lion2.mp3',
    'Sounds/seagull.mp3',
    'Sounds/underwater-dolphin.mp3'
  ];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(PRECACHE)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(PRECACHE_URLS);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(PRECACHE)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});