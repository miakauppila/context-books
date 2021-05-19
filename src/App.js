import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import AuthContextProvider from './contexts/AuthContext';
import BookContextProvider from './contexts/BookContext';
import NotificationContextProvider from './contexts/NotificationContext';
import Navbar from './components/Navbar';
import BookList from './components/BookList';
import AddBookForm from './components/AddBookForm';
import LoginForm from './components/LoginForm';
import SignUp from './components/SignUp';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthContextProvider>
          <BookContextProvider>
            <Navbar />
            <NotificationContextProvider>
              <Switch>
                <PrivateRoute exact path="/" component={BookList} />
                <PrivateRoute path="/create" component={AddBookForm} />
                <PublicRoute restricted={true} path="/login" component={LoginForm} />
                <PublicRoute restricted={true} path="/signup" component={SignUp} />
                {/* <Route path="/reset-password" component={ResetPassword} /> */}
                <PublicRoute restricted={false} component={NotFound} />
              </Switch>
            </NotificationContextProvider>
          </BookContextProvider>
        </AuthContextProvider>
      </Router>





    </div>
  );
}

export default App;
