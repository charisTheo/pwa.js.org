// https://developers.google.com/web/tools/workbox/guides/configure-workbox
const PAGE_ICON_URL = '/push-examples/favicon/android-chrome-192x192.png';
const OFFLINE_PAGE_URL = '/offline.html';

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

addEventListener('activate', event => {
  event.waitUntil(clients.claim());
  skipWaiting();
});

//  TODO
// addEventListener('message', event => {
//   if (event.data && event.data.type === 'NEW_VERSION') {
//     skipWaiting();
//   }
// });

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
  /(service-worker\.js)$/,
  new workbox.strategies.NetworkOnly()
);

workbox.precaching.precacheAndRoute((self.__precacheManifest || []).concat([OFFLINE_PAGE_URL]));

workbox.routing.registerRoute(
  /(https:\/\/fonts\.(googleapis|gstatic)\.com)/,
  new workbox.strategies.StaleWhileRevalidate()
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|svg|jpeg|webp)$/,
  new workbox.strategies.CacheFirst()
);

workbox.routing.registerRoute(
  /(index\.html)/g,
  new workbox.strategies.CacheFirst()
);

self.addEventListener('push', function(event) {
  let options = {};
  if (!!event.data) {
      const data = event.data.json();
      options = {
          ...data,
          icon: './img/chrome-web-icon-96.png',
          chrome_web_icon: './img/chrome-web-icon-96.png',
          badge: './img/speech-notification-badge-inverted-48.png',
          chrome_web_badge: './img/speech-notification-badge-inverted-48.png',
      }
      self.registration.showNotification(data.title, options);
  }
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  // * data received from server (dataPushOptions)
  const data = event.notification.data;
  console.log("Push Notification was clicked! Data object from server:", data);
  
  if (!event.action) {
      // ? Was a normal notification click
      return;
  }

  switch (event.action) {
    case 'cool':
      event.waitUntil(clients.openWindow(`/push-examples/?push-notifications-are-cool=${true}`));

    break;
    
    case 'not-cool':
      event.waitUntil(clients.openWindow(`/push-examples/?push-notifications-are-cool=${false}`));

    break;

    default:
        console.warn(`Unknown action clicked: '${event.action}'`);
    break;
  }
});
