import NotifService from '../config/NotificationService';
import {notificationTypes} from './action_types';
import store from '../config/store';
import {ToastAndroid, Platform, Alert} from 'react-native';

const onRegister = (token) => {
  console.log('Registration Token', token);
  store.dispatch({
    type: notificationTypes.NOTIFICATION_ON_REGISTER,
    payload: {
      token,
    },
  });
};

const onNotfication = (notification) => {
  console.log('on Notification', notification);
  if (Platform.OS === 'ios') {
    Alert.alert(notification.title);
  } else if (Platform.OS === 'android') {
    ToastAndroid.show(notification.title, ToastAndroid.SHORT);
  }
};

export const scheduleNotification = (title, date, message) => (dispatch) => {
  try {
    OurNotificationService.scheduleNotification(title, message, date);
    dispatch({
      type: notificationTypes.NOTIFICATION_SCHEDULE_SUCCESS,
    });
  } catch (e) {
    dispatch({
      payload: {
        type: notificationTypes.NOTIFICATION_SCHEDULE_FAILURE,
        errorMessage: e.message,
      },
    });
  }
};

const OurNotificationService = new NotifService(
  (token) => onRegister(token),
  onNotfication,
);

export default function (
  state = {
    notif_service: OurNotificationService,
    token: null,
    error: null,
  },
  action,
) {
  switch (action.type) {
    case notificationTypes.NOTIFICATION_ON_REGISTER:
      return {
        ...state,
        token: action.payload.token,
      };
    case notificationTypes.NOTIFICATION_SCHEDULE_FAILURE:
      return {
        ...state,
        error: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
