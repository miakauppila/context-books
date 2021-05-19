import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../config/firebaseConfig';

const AuthContext = React.createContext();

// this hook gives access to all context values in other components
export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = (props) => {
  const [loggedUser, setLoggedUser] = useState(null);

  console.log('user', loggedUser);
  // loading until auth process ready
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  useEffect(() => {
    // listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged(user => {
      // set received user or null on logout
      setLoggedUser(user);
      // NB! must be done after setting the user
      setLoading(false);
    });
    //unsubscribe to the listener when component unmounts
    return unsubscribe;
  }, []);

  const value = {
    loggedUser,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;