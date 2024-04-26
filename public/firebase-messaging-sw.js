// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey:process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain:process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId:process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket:process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId:process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId:process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

  // Set up messaging.onBackgroundMessage outside IndexedDB setup
  messaging.onBackgroundMessage((payload) => {
    console.log(payload);
    storeNotification(payload);
    const notificationTitle =  payload?.notification?.title;
    const notificationOptions = {
      body: payload?.notification?.body || 'Background Message body',
      icon: payload?.notification?.icon || '/firebase-logo.png'
    };
    //push notification in array notification inside local storage (create array if not present)
    self.registration.showNotification(notificationTitle, notificationOptions);
  });


function storeNotification(payload) {
  console.log('Storing notification:', payload);
  const request = indexedDB.open('notificationsDB', 1);
  console.log('Opening IndexedDB');
  request.onerror = function(event) {
    console.error("IndexedDB error:", event.target.error);
  };
    // Create the object store if it doesn't exist
  request.onupgradeneeded = function(event) {
    const db = event.target.result;
    if (!db.objectStoreNames.contains('notifications')) {
      db.createObjectStore('notifications', { autoIncrement: true });
      console.log('Object store created.');
    }
  };
  console.log('IndexedDB opened successfully.');
  request.onsuccess = function(event) {
    const db = event.target.result;
    const transaction = db.transaction(['notifications'], 'readwrite');
    const objectStore = transaction.objectStore('notifications');
    console.log('Transaction created successfully.');
    const key=Math.floor(Math.random() * 1000000);
    const data = { title: payload.notification.title, body: payload.notification.body,key:key };
    const addRequest = objectStore.add(data,key);
    console.log('Adding notification to IndexedDB.');
    addRequest.onerror = function(event) {
      console.error('Error adding notification:', event.target.error);
    };
    console.log('Notification added to IndexedDB.');
    addRequest.onsuccess = function(event) {
      console.log('Notification added successfully.');
    };
  };
}