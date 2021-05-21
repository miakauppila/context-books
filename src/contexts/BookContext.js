import React, { createContext, useReducer, useEffect } from 'react';
import { bookReducer, initializeBooksAction } from '../reducers/bookReducer';
import bookService from '../services/books';
import { useAuth } from '../contexts/AuthContext';

export const BookContext = createContext();

const BookContextProvider = (props) => {

  // the hook contains + updates the state
  // 1st param reducer, 2nd initial state (empty array)
  const [books, dispatch] = useReducer(bookReducer, []);

  console.log('books', books);
  const { loggedUser } = useAuth();

  useEffect(() => {
    if(loggedUser) {
      bookService.getAllFromUser(loggedUser.uid).then(data =>
        dispatch(initializeBooksAction(data))
      );
    }
  }, [loggedUser]);

  return (
    <BookContext.Provider value={{ books, dispatch }}>
      {props.children}
    </BookContext.Provider>
  );
};

export default BookContextProvider;
