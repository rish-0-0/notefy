import NotifService from '../config/NotificationService';
import {notificationTypes} from './action_types';
import store from '../config/store';
import {ToastAndroid, Platform, Alert} from 'react-native';

const onRegister = ({token}) => {
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

export const getLocalNotificationsScheduled = (cb) => (dispatch) => {
  OurNotificationService.getScheduledLocalNotifications((stuff) => {
    dispatch({
      type: notificationTypes.NOTIFICATION_GET_SCHEDULED,
      payload: {
        notifs: stuff,
      },
    });
    cb(stuff);
  });
};

export const checkPermissions = (callback) => (dispatch) => {
  dispatch({
    type: notificationTypes.NOTIFICATION_CHECK_PERMISSION,
  });
  OurNotificationService.checkPermissions(callback);
};

export const requestPermissions = () => (dispatch) => {
  dispatch({
    type: notificationTypes.NOTIFICATION_REQUEST_PERMISSION,
  });
  OurNotificationService.requestPermissions();
};

export const scheduleNotification = (title, date, message) => (dispatch) => {
  OurNotificationService.scheduleNotification(title, message, date);
  dispatch({
    type: notificationTypes.NOTIFICATION_SCHEDULE_SUCCESS,
  });
};

const OurNotificationService = new NotifService(
  (token) => onRegister(token),
  onNotfication,
);
// OurNotificationService.createOrUpdateChannel();

export default function (
  state = {
    notif_service: OurNotificationService,
    token: null,
    error: null,
    scheduled: [],
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
    case notificationTypes.NOTIFICATION_GET_SCHEDULED:
      return {
        ...state,
        scheduled: action.payload.notifs,
      };
    default:
      return state;
  }
}
