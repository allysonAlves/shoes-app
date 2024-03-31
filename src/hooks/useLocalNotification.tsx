import * as Notifications from "expo-notifications";
import { useEffect, useRef } from "react";

type ScheduleProps = {
    title: string;
    body: string;
    data?: any;
    trigger?: Date;
}

const useLocalNotification = () => {

    const notificationListener = useRef<any>();
    const notificationReceivedListener = useRef<any>();

    const scheduleNotifications = async ({title, body, data, trigger}: ScheduleProps) => {
        const time = new Date(Date.now());
        time.setSeconds(time.getSeconds() + 5);
      
        await Notifications.scheduleNotificationAsync({
          content: {
            title: title,
            body: body,
            data: data
          },
          trigger: trigger || time,
        });
    };

    const onReceivedNotification = (callback: (event : Notifications.Notification) => void ) => {
        if(notificationReceivedListener.current)
            Notifications.removeNotificationSubscription(notificationReceivedListener.current);

        if(callback)
            notificationReceivedListener.current = Notifications.addNotificationReceivedListener(callback);
    }

    const onClickNotification = (callback: (event : Notifications.NotificationResponse) => void ) => {
        if(notificationListener.current)
            Notifications.removeNotificationSubscription(notificationListener.current);

        if(callback)
            notificationListener.current = Notifications.addNotificationResponseReceivedListener(callback);
    }
    
    useEffect(() => {  
        return () => {
            if(notificationReceivedListener.current)
                Notifications.removeNotificationSubscription(notificationReceivedListener.current);
            if(notificationListener.current)
                Notifications.removeNotificationSubscription(notificationListener.current);
        }
    },[])
   
      
  return { scheduleNotifications, onClickNotification, onReceivedNotification }
}

export default useLocalNotification