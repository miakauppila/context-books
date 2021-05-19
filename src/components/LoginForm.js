import React, { useState } from 'react';
//import { setLoggedUserAction } from '../reducers/authReducer';
import { Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useHistory, Link } from 'react-router-dom';

const LoginForm = () => {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    try {
      setLoading(true);
      await login(email, password);
      history.push('/');
      //dispatch(notificationAction('Welcome', 'success'));
    } catch (error) {
      console.log(error);
      setError('Failed to log in');
      setTimeout(() => {
        setError('');
      }, 5000);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h2>Log in to application</h2>
      {error && <Alert variant="danger">{error}</Alert>}
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

