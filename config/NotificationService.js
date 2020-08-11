import PushNotification from 'react-native-push-notification';
import NotificationHandler from './NotificationHandler';

export default class NotificationService {
  constructor(onRegister, onNotification) {
    this.lastId = 0;
    this.lastChannelCounter = 0;

    NotificationHandler.attatchRegister(onRegister);
    NotificationHandler.attatchNotification(onNotification);

    // Clear the badge number at start
    PushNotification.getApplicationIconBadgeNumber((num) => {
      if (num) {
        PushNotification.setApplicationIconBadgeNumber(0);
      }
    });

    PushNotification.getChannels((c) => {
      console.log('channels', c);
    });
  }

  createOrUpdateChannel() {
    this.lastChannelCounter++;
    PushNotification.createChannel(
      {
        channelId: 'notefy-channel-id',
        channelName: `Notefy Channel: ${this.lastChannelCounter}`,
        channelDescription: 'Notefy Custom Channel for Reminders',
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`created channel returned ${created}`),
    );
  }

  popInitialNotification() {
    PushNotification.popInitialNotification((notification) =>
      console.log('Initial Notification: ', notification),
    );
  }

  localNotification(title, message) {
    this.lastId++;
    PushNotification.localNotification({
      title,
      message,
      userInfo: {screen: 'Home'},
      channelId: 'notefy-channel-id',
    });
  }

  scheduleNotification(title, message, date) {
    this.lastId++;
    PushNotification.localNotificationSchedule({
      date,
      title,
      message,
      userInfo: {screen: 'Home'},
      channelId: 'notefy-channel-id',
    });
  }

  checkPermissions(cbk) {
    return PushNotification.checkPermissions(cbk);
  }

  requestPermissions() {
    return PushNotification.requestPermissions();
  }

  cancelNotification() {
    PushNotification.cancelLocalNotifications({id: String(this.lastId)});
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }

  abandonPermissions() {
    PushNotification.abandonPermissions();
  }

  getScheduledLocalNotifications(callback) {
    PushNotification.getScheduledLocalNotifications(callback);
  }
}
