import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useHistory, Link } from 'react-router-dom';

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(email);
      setMessage('Check your email for further instructions.');
      setTimeout(() => {
        history.push('/login');
      }, 10000);
    } catch(error) {
      setError('Failed to reset password');
      setTimeout(() => {
        setError('');
      }, 5000);
    }
    setLoading(false);
  }

  return (
    <div className="container">
      <h2 className="mb-2">Password Reset</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}
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