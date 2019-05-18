const CACHE_NAME = 'v1';
const CACHE_FILES = [
    '/css/styles.css',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/index.html',
    '/restaurant.html',
    '/'
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

