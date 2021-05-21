import React, { useContext } from 'react';
import { BookContext } from '../contexts/BookContext';
import { newBookAction } from '../reducers/bookReducer';
import bookService from '../services/books';
import { useHistory, Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Notification from './Notification';
import { NotificationContext } from '../contexts/NotificationContext';
import { showAction, closeAction } from '../reducers/notificationReducer';
import { useAuth } from '../contexts/AuthContext';

const AddBookForm = () => {

  const { dispatch } = useContext(BookContext);
  const { dispatchNotification } = useContext(NotificationContext);
  const history = useHistory();
  const { loggedUser } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = {
      title: e.target.title.value,
      author: e.target.author.value,
      notes: e.target.notes.value,
      userUid: loggedUser.uid
    };
    bookService.create(newBook)
      .then((bookId) => {
        console.log('Created document:', bookId);
        dispatch(newBookAction(newBook, bookId));
        dispatchNotification(showAction(`New book '${newBook.title}' added`, 'success'));
        setTimeout(() => {
          dispatchNotification(closeAction());
        }, 5000);
        history.push('/');
      })
      .catch((error) => {
        console.log('Error writing to database', error);
        dispatchNotification(showAction('Sorry, adding the book failed', 'danger'));
        setTimeout(() => {
          dispatchNotification(closeAction());
        }, 5000);
      });
  };

  return (
    <div className="container">
      <h2 className="mb-2">Add new</h2>
      <Notification />
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
