import { Action } from '@ngrx/store';

import { Book } from './book.model';

export const ADD_BOOK_ATTEMPT = 'ADD_BOOK_ATTEMPT';
export const ADD_BOOK_SUCCESS = 'ADD_BOOK_SUCCESS';
export const ADD_BOOK_FAILED = 'ADD_BOOK_FAILED';
export const GET_BOOK_ATTEMPT = 'GET_BOOK_ATTEMPT';
export const GET_BOOK_SUCCESS = 'GET_BOOK_SUCCESS';
export const GET_BOOK_FAILED = 'GET_BOOK_FAILED';
export const GET_BOOKS_ATTEMPT = 'GET_BOOKS_ATTEMPT';
export const GET_BOOKS_SUCCESS = 'GET_BOOKS_SUCCESS';
export const GET_BOOKS_FAILED = 'GET_BOOKS_FAILED';
export const EDIT_BOOK_ATTEMPT = 'EDIT_BOOK_ATTEMPT';
export const EDIT_BOOK_SUCCESS = 'EDIT_BOOK_SUCCESS';
export const EDIT_BOOK_FAILED = 'EDIT_BOOK_FAILED';
export const DELETE_BOOK_ATTEMPT = 'DELETE_BOOK_ATTEMPT';
export const DELETE_BOOK_SUCCESS = 'DELETE_BOOK_SUCCESS';
export const DELETE_BOOK_FAILED = 'DELETE_BOOK_FAILED';

export class AddBookAttempt implements Action {
  readonly type = ADD_BOOK_ATTEMPT;
  constructor(public payload: Book) {}
}

export class AddBookSuccess implements Action {
  readonly type = ADD_BOOK_SUCCESS;
  constructor(public payload: any) {}
}

export class AddBookFailed implements Action {
  readonly type = ADD_BOOK_FAILED;
  // constructor(public payload: Book) {}
}

export class GetBookAttempt implements Action {
  readonly type = GET_BOOK_ATTEMPT;
  constructor(public payload: string) {}
}

export class GetBookSuccess implements Action {
  readonly type = GET_BOOK_SUCCESS;
  constructor(public payload: any) {}
}

export class GetBookFailed implements Action {
  readonly type = GET_BOOK_FAILED;
  // constructor(public payload: string) {}
}

export class GetBooksAttempt implements Action {
  readonly type = GET_BOOKS_ATTEMPT;
}

export class GetBooksSuccess implements Action {
  readonly type = GET_BOOKS_SUCCESS;
  constructor(public payload: any) {}
}

export class GetBooksFailed implements Action {
  readonly type = GET_BOOKS_FAILED;
}

export class EditBookAttempt implements Action {
  readonly type = EDIT_BOOK_ATTEMPT;
  constructor(public payload: Book) {}
}

export class EditBookSuccess implements Action {
  readonly type = EDIT_BOOK_SUCCESS;
  constructor(public payload: any) {}
}

export class EditBookFailed implements Action {
  readonly type = EDIT_BOOK_FAILED;
  // constructor(public payload: Book) {}
}

export class DeleteBookAttempt implements Action {
  readonly type = DELETE_BOOK_ATTEMPT;
  constructor(public payload: string) {}
}

export class DeleteBookSuccess implements Action {
  readonly type = DELETE_BOOK_SUCCESS;
  constructor(public payload: any) {}
}

export class DeleteBookFailed implements Action {
  readonly type = DELETE_BOOK_FAILED;
  constructor(public payload: string) {}
}

export type LibraryActions =
  AddBookAttempt | AddBookSuccess | AddBookFailed |
  GetBookAttempt | GetBookSuccess | GetBookFailed |
  GetBooksAttempt | GetBooksSuccess | GetBooksFailed |
  EditBookAttempt | EditBookSuccess | EditBookFailed |
  DeleteBookAttempt | DeleteBookSuccess | DeleteBookFailed;
