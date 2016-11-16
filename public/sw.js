//var cacheName = 'cache-v1'; //Cache Name
////Files to cache
//var filesToCache = [
//    './index.html',
//    './views/main.html',
//    './index.html?utm=homescreen', //query strings are treated as seperate page
//    './css/styls.css',
//    'https://fonts.googleapis.com/css?family=Overlock:400,400italic,700,700italic,900,900italic',
//    'https://fonts.googleapis.com/css?family=Roboto+Condensed:400,300,300italic,400italic,700,700italic',
//    'https://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css',
//    'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css',
//    'https://cdnjs.cloudflare.com/ajax/libs/angular-material/1.1.0/angular-material.min.css',
//    './js/controllers/MainCtrl.js',
//    './js/modules/bootstrap.js',
//    './js/app.js',
//    './js/appRoutes.js',
//    './img/minion dj.jpg'
//
//
//];
//
////Adding 'install' event listener
//self.addEventListener('install', function (event) {
//    console.log('Event: Install');
//    event.waitUntil(
//        //Add the files to cache here
//        caches.open(cacheName).then(function(cache) {
//            console.log('[ServiceWorker] Caching app shell');
//            return cache.addAll(filesToCache);
//        })
//    );
//});
//
////Adding 'activate' event listener
//self.addEventListener('activate', function (event) {
//    console.log('Event: Activate');
//    event.waitUntil(
//        //Delete unwanted and old caches here
//    );
//});
//
////Adding 'fetch' event listener
//self.addEventListener('fetch', function (event) {
//    console.log('Event: Fetch', event.request.url);
//
//    //Tell the browser to wait for network request and respond with below
//    event.respondWith(
//    //Check the caches.
//    //If request is already in cache, return its response
//    //Else, make a fetch and add it to the cache and return the response
//    );
//});
//
