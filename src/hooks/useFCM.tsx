import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import messaging from "@react-native-firebase/messaging";
import { PermissionsAndroid } from "react-native";

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
  }

  return enabled;
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Handle user clicking on a notification and open the screen
const handleNotificationClick = async (response: any) => {
  const screen = response?.notification?.request?.content?.data;
  console.log(screen);
};

// Listen for user clicking on a notification
const notificationClickSubscription =
  Notifications.addNotificationResponseReceivedListener(
    handleNotificationClick
  );

// Handle user opening the app from a notification (when the app is in the background)
messaging().onNotificationOpenedApp((remoteMessage: any) => {
  console.log(
    "Notification caused app to open from background state:",
    remoteMessage.data
  );
});

// Check if the app was opened from a notification (when the app was completely quit)
messaging()
  .getInitialNotification()
  .then((remoteMessage: any) => {
    if (remoteMessage) {
      console.log(
        "Notification caused app to open from quit state:",
        remoteMessage.notification
      );
    }
  });

// Handle push notifications when the app is in the background
messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
  console.log("Message handled in the background!", remoteMessage);
  const notification = {
    title: remoteMessage?.notification?.title,
    body: remoteMessage?.notification?.body,
    data: remoteMessage?.data,
  };

  // Schedule the notification with a null trigger to show immediately
  // await Notifications.scheduleNotificationAsync({
  //   content: notification,
  //   trigger: null,
  // });
});

// Handle push notifications when the app is in the foreground
const handlePushNotification = async (remoteMessage: any) => {
  const notification = {
    title: remoteMessage.notification.title,
    body: remoteMessage.notification.body,
    data: remoteMessage.data, // optional data payload
  };
};

const useFCM = () => {
  useEffect(() => {
    async function initFCM() {
      if (await requestUserPermission()) {
        messaging()
          .getToken()
          .then((token) => console.log(token));
      }

      if (!messaging().isDeviceRegisteredForRemoteMessages) {
        await messaging().registerDeviceForRemoteMessages();
      }
    }

    const unsubscribe = messaging().onMessage(handlePushNotification);

    initFCM();

    return () => {
      unsubscribe();
      notificationClickSubscription.remove();
    };
  }, []);
  return {};
};

export default useFCM;
