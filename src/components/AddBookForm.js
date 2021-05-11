import React, { useContext } from "react";
import { BookContext } from "../contexts/BookContext";
import  { useField } from '../hooks'
import { newBookAction } from "../reducers/bookReducer";

const AddBookForm = () => {

  const { dispatch } = useContext(BookContext);
  
  // state of the form in custom-hook
  const title = useField('text');
  const author = useField('text');
  const notes = useField('text');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(newBookAction(title.value, author.value, notes.value));
    title.onReset();
    author.onReset();
    notes.onReset();
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
