import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useHistory, Link } from 'react-router-dom';
import Notification from './Notification';
import { NotificationContext } from '../contexts/NotificationContext';
import { showAction, closeAction } from '../reducers/notificationReducer';

const LoginForm = () => {
  const { login } = useAuth();
  // button will be disabled while authenticating
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { dispatchNotification } = useContext(NotificationContext);

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    try {
      setLoading(true);
      await login(email, password);
      history.push('/');
      dispatchNotification(showAction(`Welcome ${email}!`, 'success'));
      setTimeout(() => {
        dispatchNotification(closeAction());
      }, 5000);
    } catch (error) {
      console.log(error);
      dispatchNotification(showAction('Failed to log in. Please check your credentials.', 'danger'));
      setTimeout(() => {
        dispatchNotification(closeAction());
      }, 5000);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Log in to application</h2>
      <Notification />
      <Form id="login" onSubmit={handleLogin}>
        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email"
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            required
          />
        </Form.Group>
        <Button disabled={loading} variant="primary" type="submit" id="login-button">Log In</Button>
        <Link to="/reset-password" className="ml-3" >Forgot Password?</Link>
      </Form>
      <div className="link w-100 mt-2">
        Need a new account? <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};

export default LoginForm;

