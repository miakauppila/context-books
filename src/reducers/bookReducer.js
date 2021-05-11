import { v4 as uuidv4 } from "uuid";

export const bookReducer = (state, action) => {
  switch (action.type) {
    case "ADD_BOOK":
      return [
        ...state,
        {
          title: action.book.title,
          author: action.book.author,
          notes: action.book.notes,
          id: uuidv4(),
        },
      ];
    case "REMOVE_BOOK":
      return state.filter((book) => book.id !== action.id);
    default:
      return state;
  }
};

export const newBookAction = (title, author, notes) => {
  return {
    type: "ADD_BOOK",
    book: {
      title,
      author,
      notes
    },
  };
}

export const removeBookAction = (id) => {
  return {
    type: "REMOVE_BOOK",
    id
  };
}
