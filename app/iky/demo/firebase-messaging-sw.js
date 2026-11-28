/* Public Firebase options are supplied by the client build; no service-account
 * credentials ever enter the browser or this service worker. */
importScripts('https://www.gstatic.com/firebasejs/12.15.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.15.0/firebase-messaging-compat.js');
const config = new URL(self.location.href).searchParams.get('config');
if (config) {
  firebase.initializeApp(JSON.parse(config));
  firebase.messaging();
  // FCM displays notification payloads in the background and handles its link.
}
