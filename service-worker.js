const cacheName = 'restaurant-reviews-cache-v1';
const filesToCache = [
    
];

// install service worker
self.addEventListener('install', event => {
    console.log('Trying to install the service worker and cache static assets');
    self.skipWaiting();
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(index.html);
            })
    );
});

// activate event
self.addEventListener('activate', event => {
    console.log('Activating new service worker...');
});

// fetch event
self.addEventListener('fetch', event => {
    console.log('Fetch event');
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request)
                .then(response => {
                    return caches.open(cacheName).then(cache => {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                });
        }).catch(err => {
            console.log(err);
        })
    );
});

