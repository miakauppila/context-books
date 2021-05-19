import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import AuthProvider from './contexts/AuthContext';
import BookContextProvider from './contexts/BookContext';
import Navbar from './components/Navbar';
import BookList from './components/BookList';
import AddBookForm from './components/AddBookForm';
import LoginForm from './components/LoginForm';
import SignUp from './components/SignUp';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <BookContextProvider>
            <Navbar />
            <Switch>
              <PrivateRoute exact path="/" component={BookList} />
              <Route path="/create" component={AddBookForm} />
              <Route path="/login">
                <LoginForm />
              </Route>
              <Route path="/signup" component={SignUp} />
              {/* <Route path="/reset-password" component={ResetPassword} /> */}
            </Switch>
          </BookContextProvider>
        </AuthProvider>
      </Router>





    </div>
  );
}

export default App;
