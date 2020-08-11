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

const initState = {
  notif_service: new NotifService((token) => onRegister(token), onNotfication),
  token: null,
};

export default function (state = initState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
