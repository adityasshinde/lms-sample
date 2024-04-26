// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdMDE1N74WkGRMdgGDC1aUKFK-3j0yj84",
  authDomain: "cloudmessaging-7f4f7.firebaseapp.com",
  projectId: "cloudmessaging-7f4f7",
  storageBucket: "cloudmessaging-7f4f7.appspot.com",
  messagingSenderId: "691326362683",
  appId: "1:691326362683:web:0f64a1a9ceabe78f8ea81e",
  measurementId: "G-FJ4XEWPTVD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const getPermission = async () => {
  console.log("requesting permission")
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    console.log("permission granted");
    const token = await getToken(messaging, {
      vapidKey: "BCPgTO2jQTRrhVifP6jOSptF2XfQl-lWCuZ2HcheWhuafvweiqfu7x615VDRRqAlhxjpIgeTdhLfJlme2xeUOZ8"
    });
    console.log("token", token);
    return token;
  } else {
    console.log("permission denied");
    return null;
  }
}

export const storeNotification=(payload)=>{
  console.log('Storing notification:', payload);
  const request = indexedDB.open('notificationsDB', 1);
  console.log('Opening IndexedDB');
  request.onerror = function(event) {
    console.error("IndexedDB error:", event.target.error);
  };
  request.onupgradeneeded = function(event) {
    const db = event.target.result;
    // Create the object store if it doesn't exist
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
    //random key for each notification
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
export const fetchDataFromIndexedDB = async () => {
  const request = indexedDB.open('notificationsDB', 1);

  request.onerror = function(event) {
    console.error("IndexedDB error:", event.target.error);
  };

  request.onsuccess = function(event) {
    const db = event.target.result;
    //return null if object store not present
    if (!db.objectStoreNames.contains('notifications')) {
      return [];
    }
    const transaction = db.transaction(['notifications'], 'readonly');
    const objectStore = transaction.objectStore('notifications');
    const getRequest = objectStore.getAll();

    getRequest.onsuccess = function(event) {
      return event.target.result;
    };
  };
};
export const deleteNotification=(key)=> {
  const request = indexedDB.open('notificationsDB', 1);

  request.onerror = function(event) {
    console.error("IndexedDB error:", event.target.error);
  };
  //delete only if object store is present
  request.onsuccess = function(event) {
    const db = event.target.result;
    const transaction = db.transaction(['notifications'], 'readwrite');
    const objectStore = transaction.objectStore('notifications');

    const deleteRequest = objectStore.delete(key);

    deleteRequest.onsuccess = function(event) {
      console.log('Item deleted successfully.');
    };

    deleteRequest.onerror = function(event) {
      console.error('Error deleting item:', event.target.error);
    };
  };

}