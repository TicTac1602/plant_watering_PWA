const cacheName = 'water-me-v3';
const dynamicCache = 'water-me-dynamic-v3';

// install service worker
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
        return cache.addAll([
            '/',
            '/index.html',
            '/pages/offline.html',
            '/css/styles.css',
            '/css/materialize.min.css',
            '/js/app.js',
            '/js/ui.js',
            '/js/materialize.min.js',
            '/img/logo.png',
            '/img/favicon.ico',
            'https://fonts.googleapis.com/icon?family=Material+Icons',
            'https://fonts.gstatic.com/s/materialicons/v142/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2'

        ]);
        })
    );
    console.log('Service Worker Installed');
});

// activate service worker
self.addEventListener('activate', function(event) {
    console.log('Service Worker Updated');
    // remove unwanted caches
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
        return Promise.all(
            cacheNames.map(function(cache) {
                if (cache !== cacheName && cache !== dynamicCache) {
                    return caches.delete(cache);
                }
            })
        );
        })
    );
});

// fetch service worker
self.addEventListener('fetch', function(event) {
    
    if (event.request.url.indexOf('firestore.googleapis.com') === -1){
        event.respondWith(
            caches.match(event.request).then(function(response) {
                return response || fetch(event.request).then(function(fetchResponse) {
                    return caches.open(dynamicCache).then(function(cache) {
                        if (event.request.url.indexOf('http') !== 0) return fetchResponse;
                        else {
                            cache.put(event.request, fetchResponse.clone());
                            return fetchResponse;
                        }
                    });
                });
            }).catch(function() {
                if (event.request.url.indexOf('.html') > -1) 
                    return caches.match('/pages/offline.html');
            })
        )
    }

});