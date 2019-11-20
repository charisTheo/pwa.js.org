// https://developers.google.com/web/tools/workbox/guides/configure-workbox
const placeholderURL = '/img/placeholder-image.png'; // precaching this in __precacheManifest file
const API_URL = 'https://ecommerce-pwa.herokuapp.com';
var db;

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

addEventListener('message', event => {
  if (event.data && event.data.type === 'NEW_VERSION') {
    skipWaiting();
  }
});

workbox.routing.registerRoute(
  /(https:\/\/fonts.googleapis.com)/,
  new workbox.strategies.StaleWhileRevalidate()
);

workbox.routing.registerRoute(
  /(https:\/\/fonts.gstatic.com)/,
  new workbox.strategies.StaleWhileRevalidate()
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
    const response = await fetch(url, { method: 'GET' }) || await caches.match(event.request);
    
    if (response && response.status === 404 && url.href.match('\/products\/')) {
      console.warn(`\nServiceWorker: Image [${url.href}] was not found either in network or in cache! Responding with placeholder image instead...`);
      // * respond with placeholder image
      return await fetch(placeholderURL, { method: 'GET' });

    } else {
      return await staleWhileRevalidate.handle({event});
      
    }
  }
);

workbox.routing.registerRoute(
  new RegExp('/.*'), 
  new workbox.strategies.NetworkFirst(), 
  'GET'
);

self.addEventListener('sync', async event => {
  if (event.tag === 'sync-cart-items') {
    await configureLocalDatabase();
    // * sync items between IndexDB and the API
    syncToAddShoppingCartItems();
    event.waitUntil(syncToRemoveShoppingCartItems());
  }
});

const syncToAddShoppingCartItems = async () => {
  const items = await getAllItemsInObjectStore('toAdd');

  const response = await fetch(`${API_URL}/cart`, { 
    method: 'POST', 
    body: JSON.stringify({items}),
    headers: {'Content-Type': 'application/json'}
  });
  
  if (response.status === 200) {
    const totalCartItems = await response.json();
    console.log("syncToAddShoppingCartItems: totalCartItems", totalCartItems);
    // ! remove items from indexdb
    items.map(item => removeItemFromObjectStore('toAdd', item));
    
  } else {
    console.warn(`Request [POST] to [/cart] returned status [${response.status}]`);

  }
}

const syncToRemoveShoppingCartItems = async () => {
  const items = await getAllItemsInObjectStore('toRemove');

  const response = await fetch(`${API_URL}/cart`, { 
    method: 'DELETE', 
    body: JSON.stringify({items}),
    headers: {'Content-Type': 'application/json'}
  });
  
  if (response.status === 200) {
    const totalCartItems = await response.json();
    console.log("syncToRemoveShoppingCartItems: totalCartItems", totalCartItems);
    // ! remove items from indexdb
    items.map(item => removeItemFromObjectStore('toRemove', item));
    
  } else {
    console.warn(`Request [DELETE] to [/cart] returned status [${response.status}]`);

  }
}

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

  if (!event.action) {
    // ? Was a normal notification click

    if (event.notification.tag === 'cart-abandoned') {
      const { items } = data;

      event.waitUntil(
        clients.openWindow(`/?checkout=${true}&items=${encodeURIComponent(JSON.stringify(items))}`)
      );
    }

    return;
  }

  switch (event.action) {
    case 'checkout':
      const { items } = data;
      event.waitUntil(clients.openWindow(`/?checkout=${true}&items=${encodeURIComponent(JSON.stringify(items))}`));
    break;
    
    case 'clear':
      event.waitUntil(clients.openWindow(`/?clear-shopping-cart=${true}`));
    break;

    default:
        console.warn(`service-worker notificationclick event -> Unknown action clicked: ${event.action}`);
    break;
  }
});

/* //* IndexDB helper functions */
const configureLocalDatabase = () => {
  let DBOpenRequest = indexedDB.open("shoppingCart", 1);

  DBOpenRequest.onerror = function(event) {
      showSnackBar('Error loading database.');
  };

  DBOpenRequest.onupgradeneeded = function(event) {
      let db = event.target.result;
      db.onerror = function(event) {
          console.warn("DBOpenRequest.onupgradeneeded: db.onerror -> event", event);
          showSnackBar('Error loading database.');          
      };
  
      let toAddObjectStore = db.createObjectStore("toAdd", { keyPath: "name" });
      toAddObjectStore.createIndex("name", "name", { unique: false });
      toAddObjectStore.createIndex("price", "price", { unique: false });
      toAddObjectStore.createIndex("image", "image", { unique: false });
      
      let toRemoveObjectStore = db.createObjectStore("toRemove", { keyPath: "name" });
      toRemoveObjectStore.createIndex("name", "name", { unique: false });
      toRemoveObjectStore.createIndex("price", "price", { unique: false });
      toRemoveObjectStore.createIndex("image", "image", { unique: false });
  };

  return new Promise((resolve, reject) => {
      DBOpenRequest.onsuccess = function(event) {
          db = DBOpenRequest.result;
          return resolve(db);
      };
  }) 
}

const getAllItemsInObjectStore = objectStoreName => {
  const transaction = db.transaction([objectStoreName], "readwrite");
  const objectStore = transaction.objectStore(objectStoreName);
  const getAllItemsRequest = objectStore.getAll();

  return new Promise((resolve, reject) => {
      getAllItemsRequest.onsuccess = () => {
          const items = getAllItemsRequest.result;
          resolve(items);
      };
  });
}

const removeItemFromObjectStore = (objectStoreName, item) => {
  const transaction = db.transaction([objectStoreName], "readwrite");
  const objectStore = transaction.objectStore(objectStoreName);
  const objectStoreRequest = objectStore.delete(item.name);

  return new Promise((resolve, reject) => {
      objectStoreRequest.onsuccess = () => {
          resolve(item);
      }
      objectStoreRequest.onerror = error => {
          reject(error);
      }
  });
}
