const cacheName = 'restaurant-reviews-cache-v1';
const filesToCache = [
    '/',
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
    '/restaurant.html'
];

// install service worker
self.addEventListener('install', event => {
    console.log('Trying to install the service worker and cache static assets');
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(filesToCache);
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

