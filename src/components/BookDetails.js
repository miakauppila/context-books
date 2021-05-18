import React, { useContext, useState } from 'react';
import { BookContext } from '../contexts/BookContext';
import bookService from '../services/books';
import { removeBookAction } from '../reducers/bookReducer';

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
        <div className="remove" onClick={() => removeHandler(book)}>
          <div className="title">{book.title}</div>
          <div className="author">{book.author}</div>
        </div>
        <div>
          <button
            style={hideWhenNotesVisible}
            type="button"
            id="show"
            onClick={() => setShowNotes(true)}
          >show notes
          </button>
        </div>

        <div style={showWhenNotesVisible} className="notes">{book.notes}
          <button type="button" id="hide" onClick={() => setShowNotes(false)}>hide notes</button>
        </div>
      </li>
    </div>
  );
};

export default BookDetails;
