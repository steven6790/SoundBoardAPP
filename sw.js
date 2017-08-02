importScripts('/cache-polyfill.js');

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('soundBoard').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/homePics/ChrisRamos.jpg',
       '/homePics/nature.jpg',
       '/homePics/StevenPartida.jpg'
     ]);
   })
 );
});


self.addEventListener('fetch', function(event) {

console.log(event.request.url);

event.respondWith(

caches.match(event.request).then(function(response) {

return response || fetch(event.request);

})

);

});
