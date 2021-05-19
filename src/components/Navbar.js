import React, { useContext } from 'react';
import { BookContext } from '../contexts/BookContext';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { books } = useContext(BookContext);
  const { loggedUser } = useAuth();

  return (
    <div className="navBar">
      <h1>My Reading List</h1>
      { loggedUser? (<p>Currently you have {books.length} books to get through...</p>)
        :
        (<p>You can&apos;t buy happiness. But you can buy books.</p>) }
    </div>
  );
};

export default Navbar;
