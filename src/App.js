import React from 'react';
import BookContextProvider from './contexts/BookContext';
import Navbar from './components/Navbar';
import BookList from './components/BookList';
import AddBookForm from './components/AddBookForm';

function App() {
  return (
    <div className="App">
      <BookContextProvider>
        <Navbar />
        <BookList />
        <AddBookForm />
      </BookContextProvider>
    </div>
  );
}

export default App;
