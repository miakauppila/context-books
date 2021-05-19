import React, { useContext, useState } from 'react';
import { BookContext } from '../contexts/BookContext';
import BookDetails from './BookDetails';
import { Link, useHistory } from 'react-router-dom';
import { Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const BookList = () => {
  const { books } = useContext(BookContext);
  const { logout } = useAuth();
  const history = useHistory();

  const [sortBy, setSortBy] = useState('title');
  const [error, setError] = useState('');

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
      history.push('/login');
    } catch(error) {
      console.log('error', error);
      setError('Failed to log out.');
    }
  };

  return (
    <div className='books'>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className='sort'>
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
        <Button variant="outline-primary" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </div>
  );

};

export default BookList;
