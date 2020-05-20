importScripts("precache-manifest.505efe48ff629d71ce8556ac3d9a03c6.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

// https://developers.google.com/web/tools/workbox/guides/configure-workbox

// ? Both files are precached in the __precacheManifest file
const OFFLINE_PAGE_URL = '/offline.html';
const PLACEHOLDER_IMAGE_URL = '/img/placeholder-image.png';

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.precaching.precacheAndRoute(self.__precacheManifest);

addEventListener('activate', event => {
  clients.claim();
});

addEventListener('message', event => {
  if (event.data && event.data.type === 'NEW_VERSION') {
    // console.log('calling skipWaiting...', skipWaiting);
    skipWaiting();
  }
});

addEventListener('fetch', async event => {
    if (event.request.mode === 'navigate') {
      event.respondWith((async () => {
        const staleWhileRevalidate = new workbox.strategies.StaleWhileRevalidate();
        const url = event.request.url;
        
        try {
          // check if the event.request.url exists in the cache or in the network
          const response = await caches.match(event.request) || await fetch(event.request);
          if (!response || response.status === 404) {
            throw new Error(response.status);
          } else {
            return await staleWhileRevalidate.handle({event});
          }
    
        } catch (error) {
          // if not found in any of the two, respond with the offline.html file
          console.warn(`ServiceWorker: ${url} was not found either in the network or the cache. Responding with offline page instead.\n`);
          return await caches.match(OFFLINE_PAGE_URL) || await fetch(OFFLINE_PAGE_URL, { method: 'GET' });
    
        }
      })());
    }
});

workbox.routing.registerRoute(
  /(https:\/\/fonts\.(googleapis|gstatic)\.com)/,
  new workbox.strategies.StaleWhileRevalidate()
);
workbox.routing.registerRoute(
  /\.(?:woff|woff2|ttf|otf|eot)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'fonts'
  })
);

workbox.routing.registerRoute(
  /(service-worker\.js)$/,
  new workbox.strategies.NetworkOnly()
);

workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  new workbox.strategies.StaleWhileRevalidate()
);

workbox.routing.registerRoute(
  /\.(?:webp|png|jpg|jpeg|svg)$/,
  async ({url, event, params}) => {
    const staleWhileRevalidate = new workbox.strategies.StaleWhileRevalidate();

    try {
      const response = await caches.match(event.request) || await fetch(url, { method: 'GET' });
      if (!response || response.status === 404) {
        throw new Error(response.status);
      } else {
        return await staleWhileRevalidate.handle({event});
      }

    } catch (error) {
      console.warn(`\nServiceWorker: Image [${url.href}] was not found either in the network or the cache. Responding with placeholder image instead.\n`);
      // * get placeholder image from cache || get placeholder image from network
      return await caches.match(PLACEHOLDER_IMAGE_URL) || await fetch(PLACEHOLDER_IMAGE_URL, { method: 'GET' });

    }
  }
);

workbox.routing.registerRoute(
  /(index\.html|\/)$/,
  new workbox.strategies.StaleWhileRevalidate(),
  'GET'
);
