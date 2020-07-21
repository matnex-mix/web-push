importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  apiKey: "AIzaSyDRtWW-VY3VWn3-u4i5gBuTlg8W-w0H-ec",
  authDomain: "push-452dc.firebaseapp.com",
  databaseURL: "https://push-452dc.firebaseio.com",
  projectId: "push-452dc",
  storageBucket: "push-452dc.appspot.com",
  messagingSenderId: "774095950303",
  appId: "1:774095950303:web:bc08b33d2050c77277f46a"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
var messaging = firebase.messaging();

self.onnotificationclick = function(event) {
  console.log('On notification click: ', event.notification.tag);
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(clients.matchAll({
    type: "window"
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url == '/' && 'focus' in client)
        return client.focus();
    }
    if (clients.openWindow)
      return clients.openWindow('/');
  }));
};

messaging.setBackgroundMessageHandler(function(payload) {
  console.log(payload);
  // Customize notification here
  var notificationTitle = payload.data.title;
  var notificationOptions = {
    body: payload.data.body,
    icon: 'https://vendor.push-eat.com/favicon.png',
    requireInteraction: true,
    vibrate: [200, 100, 200, 100, 200, 100, 200],
  };

  //self.registration.update();
  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});