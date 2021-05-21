import React, { useContext, useState } from 'react';
import { BookContext } from '../contexts/BookContext';
import BookDetails from './BookDetails';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import Notification from './Notification';
import { NotificationContext } from '../contexts/NotificationContext';
import { showAction, closeAction } from '../reducers/notificationReducer';

const BookList = () => {
  const { books } = useContext(BookContext);
  const { loggedUser, logout } = useAuth();
  const history = useHistory();
  const { dispatchNotification } = useContext(NotificationContext);

  const [sortBy, setSortBy] = useState('title');

  // sort books by sortBy asc
  books.sort((a, b) => {
    let x = a[sortBy].toLowerCase();
    let y = b[sortBy].toLowerCase();
    if (x < y) {return -1;}
    if (x > y) {return 1;}
    return 0;
  });

  const handleLogout = async () =>  {
    try {
      await logout();
      // avoid leaks and refresh the page
      history.push('/login');
      window.location.reload();
    } catch(error) {
      console.log('error', error);
      dispatchNotification(showAction('Failed to log out.', 'danger'));
      setTimeout(() => {
        dispatchNotification(closeAction());
      }, 5000);
    }
  };

  return (
    <div className='books'>
      <div className='sort'>
        <Notification />
        <label>Sort By:</label>{' '}
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value='title'>Title</option>
          <option value='author'>Author</option>
        </select>
        <Link to="/create" className="btn btn-primary float-right">
            Add new
        </Link>
      </div>
      { books.length ? (
        <div className="book-list">
          <ul>
            {books.map((book) => {
              return <BookDetails book={book} key={book.id} />;
            })}
          </ul>
        </div>
      ) : (
        <div className="empty">No books to read. A house without books is like a room without windows... </div>
      )}
      <div className="link">
        User <b>{loggedUser.email}</b> logged in
        <Button variant="link" className="ml-2 pb-2" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </div>
  );

};

export default BookList;
