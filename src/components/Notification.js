import React, { useContext } from 'react';
import { Alert } from 'react-bootstrap';
import { NotificationContext } from '../contexts/NotificationContext';

const Notification = () => {
  // notification details or null
  const { notification } = useContext(NotificationContext);

  if (!notification) {
    return null;
  }

  return (
    <Alert variant={notification.type}>
      {notification.message}
    </Alert>
  );

};

export default Notification;