import PushNotification from 'react-native-push-notification';

class NotificationHandler {
  onNotification(notification) {
    console.log('Notification Handler', notification);
  }

  onRegister(token) {}

  onAction(notification) {}

  onRegistrationError(err) {}

  attatchRegister(handler) {}

  attatchNotification(handler) {}
}

const handler = new NotificationHandler();

PushNotification.configure({
  onRegister: handler.onRegister.bind(handler),

  onNotification: handler.onNotification.bind(handler),

  onRegistrationError: handler.onRegistrationError.bind(handler),

  requestPermissions: true,
});

export default handler;
