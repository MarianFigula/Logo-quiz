
const cache_container = "static_v1";
const files = [
    "../zFinal/",
    "../zFinal/index.html",
    "../zFinal/gameSite.html",
    "../zFinal/css/game.css",
    "../zFinal/css/mainMenu.css",
    "../zFinal/jsFiles/game.js",
    "../zFinal/jsFiles/mainMenu.js",
    "../zFinal/imgs/audi.png",
    "../zFinal/imgs/beats.png",
    "../zFinal/imgs/chevrolet.png",
    "../zFinal/imgs/favicon.png",
    "../zFinal/imgs/icon-192x192.png",
    "../zFinal/imgs/icon-256x256.png",
    "../zFinal/imgs/icon-384x384.png",
    "../zFinal/imgs/lexus.png",
    "../zFinal/imgs/mastercard.png",
    "../zFinal/imgs/motorola.jpg",
    "../zFinal/imgs/paypal.png",
    "../zFinal/imgs/snapchat.jpg",
    "../zFinal/imgs/starbucks.png",
    "../zFinal/imgs/twitter.png",
    "../zFinal/sounds/success.mp3",
    "../zFinal/sounds/fail.mp3",
    "https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.14.0/Sortable.min.js",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"

]


// install service worker and add all files to cache
self.addEventListener('install', function (event){
   event.waitUntil(
       caches.open(cache_container).then(cache => {
           cache.addAll(files)
       })
   )
})

self.addEventListener('activate', function (event){
    console.log("service worker activated", event);
})

addEventListener('fetch', event => {
    // Prevent the default, and handle the request ourselves.
    event.respondWith(async function() {
        // Try to get the response from a cache.
        const cachedResponse = await caches.match(event.request);
        // Return it if we found one.
        if (cachedResponse) return cachedResponse;
        // If we didn't find a match in the cache, use the network.
        return fetch(event.request);
    }());
});

/*
self.addEventListener('fetch', function (event){
    event.respondWith(
        caches.match(event.request)
            .then(function (response){
                if (response){
                    return response;
                }
            })
    )
})*/
