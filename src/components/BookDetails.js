import React, { useContext, useState } from 'react';
import { BookContext } from '../contexts/BookContext';
import bookService from '../services/books';
import { removeBookAction } from '../reducers/bookReducer';
import { Button } from 'react-bootstrap';

const BookDetails = ({ book }) => {
  const { dispatch } = useContext(BookContext);

  const [showNotes, setShowNotes] = useState(false);

  // empty display value '' does not affect display
  const hideWhenNotesVisible = { display: showNotes ? 'none' : '' };
  const showWhenNotesVisible = { display: showNotes ? '' : 'none' };

  const removeHandler = (book) => {
    if (window.confirm(`Do you want to remove the book ${book.title}?`)) {
      bookService.deleteBook(book.id)
        .then(() => {
          console.log('Deleted document.');
          dispatch(removeBookAction(book.id));
        })
        .catch((error) => {
          console.log('Error removing document:', error);
        });

    }
  };

  return (
    <div>
      <li className="book-details">
        <div className="title" onClick={() => removeHandler(book)}>
          {book.title}
          <i className="bi bi-trash float-right" style={{ fontSize: '2.2rem' }}></i>
        </div>
        <div className="author">{book.author}</div>
        <div>
          <Button
            style={hideWhenNotesVisible}
            variant="light"
            size="sm"
            id="show"
            onClick={() => setShowNotes(true)}
          >show notes
          </Button>
        </div>

        <div style={showWhenNotesVisible} className="notes">{book.notes}
          <Button
            variant="light"
            size="sm"
            id="hide"
            onClick={() => setShowNotes(false)}
          >hide notes
          </Button>
        </div>
      </li>
    </div>
  );
};

export default BookDetails;
