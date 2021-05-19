import React, { createContext, useReducer } from 'react';
import notificationReducer from '../reducers/notificationReducer';

export const NotificationContext = createContext();

const NotificationContextProvider = (props) => {

  // the hook contains + updates the state
  // 1st param reducer, 2nd initial state
  const [notification, dispatchNotification] = useReducer(notificationReducer, null);

  console.log('notification', notification);

  return (
    <NotificationContext.Provider value={{ notification, dispatchNotification }}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;
