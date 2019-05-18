const CACHE_NAME = 'v1';
const CACHE_FILES = [

];

// install service worker
self.addEventListener('install', event => {
    console.log('Installing service worker and caching static assets...')
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(CACHE_FILES);
            })
    );
});

// activate event
self.addEventListener('activate', event => {
    console.log('Activating service worker...');
});

// fetch event
self.addEventListener('fetch', event => {
    console.log('Fetching request...');
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request)
                .then(response => {
                    let responseClone = response.clone();
                    return caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseClone);
                        return response;
                    });
                })
        }).catch(err => {
            console.log(err);
        })
    );
});

