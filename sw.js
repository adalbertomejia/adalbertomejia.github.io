//Asignar nombre y versión de la cache 
const CACHE_NAME = 'v1_cache_AdalbertoMejiaPWA'
//Ficheros a cachear en la aplicación
var urlsToCache = [
    './',
    './css/styles.css',
    './img/favicon.png',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/facebook.png',
    './img/instagram.png',
    './img/twitter.png',
    './img/FAV1.png',
    './img/FAV2.png',
    './img/FAV3.png',
    './img/FAV4.png',
    './img/FAV5.png',
    './img/FAV6.png',
    './img/FAV7.png',
    './img/FAV8.png',
    './img/FAV9.png',
    './img/FAV10.png'
];

//Evento install
//Instalación del service Workery guarda en cache los recursos es

self.addEventListener('install',e =>{
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache =>{
            return cache.addAll(urlsToCache)
                .then(() =>{
                    self.skipWaiting();
                });
        })
        .catch(err => console.log('No se ha registrado el cache',err))
        );
});

//Evento activate
//Que la app funciione sin conexión
self.addEventListener('Activate', e =>{
    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cachesNames.map(cacheName => {
                        if(cacheWhitelist.indexOf(cacheName) === -1){
                            //Borrar elementos que no se necesitan
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() =>{
                //Activar cache
                self.clients.claim();
            })
    );
});

//Evento fetch
self.addEventListener('fetch', e =>{
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if(res){
                return res;
            }
            return fetch(e.request);
        })
    );
});