import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {

  const { loggedUser } = useAuth();

  // restricted = false means public route
  // restricted = true means restricted route for loggedUser
  return (
    <Route {...rest} render={props => (
      loggedUser && restricted ?
        <Redirect to="/" />
        : <Component {...props} />
    )} />
  );
};

export default PublicRoute;