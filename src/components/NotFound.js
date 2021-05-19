import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="container">
    <h2>404 - This page does not not exist yet</h2>
    <div className="link">
      <Link to="/">
      Go Home
      </Link>
    </div>
  </div>
);

export default NotFound;