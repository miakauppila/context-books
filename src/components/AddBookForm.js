import React, { useContext } from 'react';
import { BookContext } from '../contexts/BookContext';
import  { useField } from '../hooks';
import { newBookAction } from '../reducers/bookReducer';
import bookService from '../services/books';
import { useHistory, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const AddBookForm = () => {

  const { dispatch } = useContext(BookContext);
  const history = useHistory();

  // state of the form in custom-hook
  const title = useField('text');
  const author = useField('text');
  const notes = useField('text');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      title: e.target.title.value,
      author: e.target.author.value,
      notes: e.target.notes.value
    };
    title.onReset();
    author.onReset();
    notes.onReset();
    bookService.create(newBook)
      .then((bookId) => {
        console.log('Created document:', bookId);
        dispatch(newBookAction(newBook, bookId));
        history.push('/');
      })
      .catch((error) => {
        console.log('Error writing to database', error);
      });
  };

  return (
    <div className="container">
      <Form id="add-book" onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Book title:</Form.Label>
          <Form.Control type="text"
            required
          />
        </Form.Group>
        <Form.Group controlId="author">
          <Form.Label>Author:</Form.Label>
          <Form.Control type="text"
            required
          />
        </Form.Group>
        <Form.Group controlId="notes">
          <Form.Label>Additional info:</Form.Label>
          <Form.Control type="text"
            placeholder="Optional notes you wish to add"
          />
        </Form.Group>
        <Button type="submit" variant="primary">Add book</Button>
        <Button type="reset" variant="secondary" className="ml-2">Reset</Button>
      </Form>
      <div className="link w-100">
        <Link to="/" className="btn btn-outline-primary">
          Back
        </Link>
      </div>
    </div>
  );
};

export default AddBookForm;
