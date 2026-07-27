importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyD7Gw1XMzFxpQ6ihVJxiNVog2L1gMelhwc",
  authDomain: "scribble-notes-ni-studio-us.firebaseapp.com",
  projectId: "scribble-notes-ni-studio-us",
  storageBucket: "scribble-notes-ni-studio-us.firebasestorage.app",
  messagingSenderId: "264532754957",
  appId: "1:264532754957:web:3cfee7baaa1ab78a6e8b44",
  measurementId: "G-ELHS32Y01Z"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification?.title || 'Background Sync';
  const notificationOptions = {
    body: payload.notification?.body || 'Syncing data...',
    icon: '/favicon.png'
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
