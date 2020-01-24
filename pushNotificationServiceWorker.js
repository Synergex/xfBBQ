// Source for most of this file is from: https://itnext.io/an-introduction-to-web-push-notifications-a701783917ce

const pushServerPublicKey = "<A PUSH SERVER PUBLIC KEY GOES HERE>";

/**
 * Checks if push notification and service workers are supported by the browser
 */
export function isPushNotificationSupported() {
  return "serviceWorker" in navigator && "PushManager" in window;
}

/**
 * Asks user permission to receive push notifications and returns the response of the user: granted, default, or denied
 */
export function requestPermissionsForPushNotifications() {
  // Request user grant to show notification
  return Notification.requestPermission(result => {
    return result;
  });
}

/**
 * Sends a push notification
 * @param {String} title Title of the push notification
 * @param {String} text Text inside the push notification
 */
export function sendPushNotification(title, text) {
  const options = {
    body: text
  };

  navigator.serviceWorker.ready.then(serviceWorker => {
    serviceWorker.showNotification(title, options);
  });
}

/**
 * Using the registered service worker, creates a push notification subscription and returns it
 */
function createPushNotificationSubscription() {
  // Waits for service worker installation to be ready
  return navigator.serviceWorker.ready.then(function(serviceWorker) {
    // Subscribe and return the subscription
    return serviceWorker.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: pushServerPublicKey
      })
      .then(function(subscription) {
        console.log("User is subscribed.", subscription);
        return subscription;
      });
  });
}

self.addEventListener("push", event => {
  const { title, text } = event.data.json();
  const options = {
    body: text
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
