import NotifService from '../config/NotificationService';
import {notificationTypes} from './action_types';
import store from '../config/store';

const onRegister = (token) => {
  console.log(token);
  store.dispatch({
    type: notificationTypes.NOTIFICATION_ON_REGISTER,
    payload: {
      token,
    },
  });
};

const initState = {
  notif_service: new NotifService((token) => onRegister(token)),
  token: null,
};

export default function (state = initState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
