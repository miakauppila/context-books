export const bookReducer = (state, action) => {
  switch (action.type) {
  case 'INIT_BOOKS':
    return action.payload;
  case 'RESET_BOOKS':
    return [];
  case 'ADD_BOOK':
    return [
      ...state,
      action.payload,
    ];
  case 'REMOVE_BOOK':
    return state.filter((book) => book.id !== action.id);
  default:
    return state;
  }
};

export const initializeBooksAction = (books) => {
  return {
    type: 'INIT_BOOKS',
    payload: books
  };
};

export const newBookAction = (book, id) => {
  return {
    type: 'ADD_BOOK',
    payload: {
      id,
      ...book
    },
  };
};

export const removeBookAction = (id) => {
  return {
    type: 'REMOVE_BOOK',
    id
  };
};

export const resetBooksAction = () => {
  return {
    type: 'RESET_BOOKS'
  };
};
