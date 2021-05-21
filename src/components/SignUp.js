import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useHistory, Link } from 'react-router-dom';
import Notification from './Notification';
import { NotificationContext } from '../contexts/NotificationContext';
import { showAction, closeAction } from '../reducers/notificationReducer';

const SignUp = () => {
  const { signup } = useAuth();
  // button will be disabled while authenticating
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { dispatchNotification } = useContext(NotificationContext);

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const passwordConfirm = event.target.passwordConfirm.value;
    if (password !== passwordConfirm) {
      dispatchNotification(showAction('Passwords do not match, please check them', 'danger'));
      setTimeout(() => {
        dispatchNotification(closeAction());
      }, 5000);
      return;
    }

    try {
      setLoading(true);
      await signup(email, password);
      history.push('/');
      dispatchNotification(showAction(`Welcome ${email}!`, 'success'));
      setTimeout(() => {
        dispatchNotification(closeAction());
      }, 5000);
    } catch(error) {
      console.log(error);
      dispatchNotification(showAction(`Failed to create an account: ${error.message}`, 'danger'));
      setTimeout(() => {
        dispatchNotification(closeAction());
      }, 5000);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Create an account</h2>
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
            placeholder="min. 6 characters"
            required
          />
        </Form.Group>
        <Form.Group controlId="passwordConfirm">
          <Form.Label>Password confirmation:</Form.Label>
          <Form.Control
            type="password"
            required
          />
        </Form.Group>
        <Button disabled={loading} variant="primary" type="submit" id="login-button">Sign Up</Button>
      </Form>
      <div className="link mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  );
};

export default SignUp;

