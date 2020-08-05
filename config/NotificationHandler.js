import PushNotification from 'react-native-push-notification';

class NotificationHandler {
  onNotification(notification) {
    console.log('Notification Handler', notification);

    if (typeof this._onNotification === 'function') {
      this._onNotification(notification);
    }
  }

  onRegister(token) {
    console.log('about to register notification with token', token);

    if (typeof this._onRegister === 'function') {
      this._onRegister(token);
    }
  }

  onAction(notification) {
    console.log('Notification action received');
    console.log(notification.action);
    console.log(notification);

    if (notification.action === 'Yes') {
      PushNotification.invokeApp(notification);
    }
  }

  onRegistrationError(err) {
    console.log(err);
  }

  attatchRegister(handler) {
    this._onRegister = handler;
  }

  attatchNotification(handler) {
    this._onNotification = handler;
  }
}

const handler = new NotificationHandler();

PushNotification.configure({
  onRegister: handler.onRegister.bind(handler),

  onNotification: handler.onNotification.bind(handler),

  onRegistrationError: handler.onRegistrationError.bind(handler),

  requestPermissions: true,
});

export default handler;
