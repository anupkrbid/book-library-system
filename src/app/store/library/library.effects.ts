import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as LibraryActions from './library.actions';
import { environment } from '../../../environments/environment';

@Injectable()
export class LibraryEffects {

  @Effect()
  addBook = this.actions$.pipe(
    ofType(LibraryActions.ADD_BOOK_ATTEMPT),
    switchMap((action: LibraryActions.AddBookAttempt) => {
      const apiUrl = `${environment.apiBaseUrl}/api/v1/books`;
      return this.http.post(apiUrl, action.payload).pipe(
        mergeMap((res: any) => {
          if (res.status) {
            return [
              // {
              //   type: LibraryActions.ALERT_SHOW,
              //   payload: {message: res.message, type: 'success'}
              // },
              {
                type: LibraryActions.ADD_BOOK_SUCCESS,
                payload: res.result
              }
            ];
          } else {
            return [
              // {
              //   type: LibraryActions.ALERT_SHOW,
              //   payload: {message: res.message, type: 'danger'}
              // },
              {
                type: LibraryActions.ADD_BOOK_FAILED
              }
            ];
          }
        }),
        catchError((err: HttpErrorResponse) => {
          return of({
            type: LibraryActions.ADD_BOOK_FAILED
          });
          // return of({
          //   type: AlertActions.ALERT_SHOW,
          //   payload: { message: err.message, type: 'danger' }
          // })
        })
      );
    })
  )

  @Effect()
  getBook = this.actions$.pipe(
    ofType(LibraryActions.GET_BOOK_ATTEMPT),
    switchMap((action: LibraryActions.GetBookAttempt) => {
      const apiUrl = `${environment.apiBaseUrl}/api/v1/books/${action.payload}`;
      return this.http.get(apiUrl).pipe(
        mergeMap((res: any) => {
          if (res.status) {
            return [
              // {
              //   type: LibraryActions.ALERT_SHOW,
              //   payload: {message: res.message, type: 'success'}
              // },
              {
                type: LibraryActions.GET_BOOK_SUCCESS,
                payload: res.result
              }
            ];
          } else {
            return [
              // {
              //   type: LibraryActions.ALERT_SHOW,
              //   payload: {message: res.message, type: 'danger'}
              // },
              {
                type: LibraryActions.GET_BOOK_FAILED
              }
            ];
          }
        }),
        catchError((err: HttpErrorResponse) => {
          return of({
            type: LibraryActions.GET_BOOK_FAILED
          });
          // return of({
          //   type: AlertActions.ALERT_SHOW,
          //   payload: { message: err.message, type: 'danger' }
          // })
        })
      );
    })
  )

  @Effect()
  getBooks = this.actions$.pipe(
    ofType(LibraryActions.GET_BOOKS_ATTEMPT),
    switchMap((action: LibraryActions.GetBooksAttempt) => {
      const apiUrl = `${environment.apiBaseUrl}/api/v1/books`;
      return this.http.get(apiUrl).pipe(
        mergeMap((res: any) => {
          if (res.status) {
            return [
              // {
              //   type: LibraryActions.ALERT_SHOW,
              //   payload: {message: res.message, type: 'success'}
              // },
              {
                type: LibraryActions.GET_BOOKS_SUCCESS,
                payload: res.result
              }
            ];
          } else {
            return [
              // {
              //   type: LibraryActions.ALERT_SHOW,
              //   payload: {message: res.message, type: 'danger'}
              // },
              {
                type: LibraryActions.GET_BOOKS_FAILED
              }
            ];
          }
        }),
        catchError((err: HttpErrorResponse) => {
          return of({
            type: LibraryActions.GET_BOOKS_FAILED
          });
          // return of({
          //   type: AlertActions.ALERT_SHOW,
          //   payload: { message: err.message, type: 'danger' }
          // })
        })
      );
    })
  )

  @Effect()
  editBook = this.actions$.pipe(
    ofType(LibraryActions.EDIT_BOOK_ATTEMPT),
    switchMap((action: LibraryActions.EditBookAttempt) => {
      const apiUrl = `${environment.apiBaseUrl}/api/v1/books/${action.payload.id}`;
      return this.http.put(apiUrl, action.payload).pipe(
        mergeMap((res: any) => {
          if (res.status) {
            return [
              // {
              //   type: LibraryActions.ALERT_SHOW,
              //   payload: {message: res.message, type: 'success'}
              // },
              {
                type: LibraryActions.EDIT_BOOK_SUCCESS,
                payload: res.result
              }
            ];
          } else {
            return [
              // {
              //   type: LibraryActions.ALERT_SHOW,
              //   payload: {message: res.message, type: 'danger'}
              // },
              {
                type: LibraryActions.EDIT_BOOK_FAILED
              }
            ];
          }
        }),
        catchError((err: HttpErrorResponse) => {
          return of({
            type: LibraryActions.EDIT_BOOK_FAILED
          });
          // return of({
          //   type: AlertActions.ALERT_SHOW,
          //   payload: { message: err.message, type: 'danger' }
          // })
        })
      );
    })
  )

  @Effect()
  deleteBook = this.actions$.pipe(
    ofType(LibraryActions.DELETE_BOOK_ATTEMPT),
    switchMap((action: LibraryActions.DeleteBookAttempt) => {
      const apiUrl = `${environment.apiBaseUrl}/api/v1/books/${action.payload}`;
      return this.http.delete(apiUrl).pipe(
        mergeMap((res: any) => {
          if (res.status) {
            return [
              // {
              //   type: LibraryActions.ALERT_SHOW,
              //   payload: {message: res.message, type: 'success'}
              // },
              {
                type: LibraryActions.DELETE_BOOK_SUCCESS,
                payload: res.result
              }
            ];
          } else {
            return [
              // {
              //   type: LibraryActions.ALERT_SHOW,
              //   payload: {message: res.message, type: 'danger'}
              // },
              {
                type: LibraryActions.DELETE_BOOK_FAILED
              }
            ];
          }
        }),
        catchError((err: HttpErrorResponse) => {
          return of({
            type: LibraryActions.DELETE_BOOK_FAILED
          });
          // return of({
          //   type: AlertActions.ALERT_SHOW,
          //   payload: { message: err.message, type: 'danger' }
          // })
        })
      );
    })
  )

  constructor(private actions$: Actions, private http: HttpClient) {}
}
