import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useHistory, Link } from 'react-router-dom';
import Notification from './Notification';
import { NotificationContext } from '../contexts/NotificationContext';
import { showAction, closeAction } from '../reducers/notificationReducer';

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);

  const { resetPassword } = useAuth();
  const history = useHistory();
  const { dispatchNotification } = useContext(NotificationContext);

  async function handleSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;

    try {
      setLoading(true);
      await resetPassword(email);
      dispatchNotification(showAction('Check your email for further instructions.', 'success'));
      setTimeout(() => {
        dispatchNotification(closeAction());
        history.push('/login');
      }, 10000);
    } catch(error) {
      console.log(error);
      dispatchNotification(showAction('Failed to reset password', 'danger'));
      setTimeout(() => {
        dispatchNotification(closeAction());
      }, 5000);
    }
    setLoading(false);
  }

  return (
    <div className="container">
      <h2 className="mb-2">Password Reset</h2>
      <Notification />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required />
        </Form.Group>
        <Button disabled={loading} className="" type="submit">
          Reset Password
        </Button>
        <Link to="/login" className="ml-3">Back to Login</Link>
      </Form>
      <div className="link mt-2">
        Need a new account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default ResetPassword;