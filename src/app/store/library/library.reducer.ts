import { Book } from './book.model';
import * as LibraryActions from './library.actions';

export interface LibraryState {
  books: Book[];
  bookToEdit: Book | {};
}

const initialState: LibraryState = {
  books: [],
  bookToEdit: {}
};

export function libraryReducer(state = initialState, action: LibraryActions.LibraryActions) {
  switch (action.type) {
    case LibraryActions.GET_BOOKS_SUCCESS: {
      return {
        ...state,
        books: action.payload
      }
      break;
    }
    case LibraryActions.GET_BOOK_SUCCESS: {
      return {
        ...state,
        bookToEdit: action.payload
      }
      break;
    }
    case LibraryActions.ADD_BOOK_SUCCESS: {
      return {
        ...state,
        books: [
          ...state.books,
          action.payload
        ]
      }
      break;
    }
    case LibraryActions.EDIT_BOOK_SUCCESS: {
      const bookToUpdateIndex = state.books.findIndex(book => book.id === action.payload.id);
      const booksCopy = [...state.books];
      if (bookToUpdateIndex > -1) {
        booksCopy[bookToUpdateIndex] = {
          ...booksCopy[bookToUpdateIndex],
          ...action.payload
        };
      }

      return {
        ...state,
        books: booksCopy,
        bookToEdit: action.payload
      }
      break;
    }
    case LibraryActions.DELETE_BOOK_SUCCESS: {
      return {
        ...state,
        books: state.books.filter(book => book.id !== action.payload.id)
      }
      break;
    }
    default:
      return state;
  }
}
