import React, { useContext, useState } from 'react';
import { BookContext } from '../contexts/BookContext';
import BookDetails from './BookDetails';

const BookList = () => {
  const { books } = useContext(BookContext);

  const [sortBy, setSortBy] = useState('title');

  // sort books by sortBy asc
  books.sort((a, b) => {
    let x = a[sortBy].toLowerCase();
    let y = b[sortBy].toLowerCase();
    if (x < y) {return -1;}
    if (x > y) {return 1;}
    return 0;
  });

  return (
    <div>
      <div className='sort'>
        <label>Sort By:</label>{' '}
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value='title'>Title</option>
          <option value='author'>Author</option>
        </select>
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
        <div className="empty">No books to read. Hello free time :)</div>
      )}
    </div>
  );

};

export default BookList;
