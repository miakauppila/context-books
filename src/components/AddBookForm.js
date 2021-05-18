import React, { useContext } from 'react';
import { BookContext } from '../contexts/BookContext';
import  { useField } from '../hooks';
import { newBookAction } from '../reducers/bookReducer';
import bookService from '../services/books';

const AddBookForm = () => {

  const { dispatch } = useContext(BookContext);

  // state of the form in custom-hook
  const title = useField('text');
  const author = useField('text');
  const notes = useField('text');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      title: title.value,
      author: author.value,
      notes: notes.value
    };
    title.onReset();
    author.onReset();
    notes.onReset();
    bookService.create(newBook)
      .then((bookId) => {
        console.log('Created document:', bookId);
        dispatch(newBookAction(newBook, bookId));
      })
      .catch((error) => {
        console.log('Error writing to database', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input {... title}
        placeholder="Book title"
        required
      />
      <input {... author}
        placeholder="Author"
        required
      />
      <input {... notes}
        placeholder="Additional info"
        required
      />
      <input type="submit" value="add book" />
    </form>
  );
};

export default AddBookForm;
