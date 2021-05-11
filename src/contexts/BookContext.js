import React, { createContext, useReducer, useEffect } from "react";
import { bookReducer } from "../reducers/bookReducer";

export const BookContext = createContext();

const BookContextProvider = (props) => {
  
  // this hook contains + updates the data
  const [books, dispatch] = useReducer(bookReducer, [],  // 1st param reducer, 2nd initial state (empty array)
    () => { // 3 rd (optional) param: fn to get data from local storage
      const localData = localStorage.getItem("books");
      return localData ? JSON.parse(localData) : [];
    });

  // run once
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);
  return (
    <BookContext.Provider value={{ books, dispatch }}>
      {props.children}
    </BookContext.Provider>
  );
};

export default BookContextProvider;
