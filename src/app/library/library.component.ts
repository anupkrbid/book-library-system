import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Book } from '../store/library/book.model';
import * as fromApp from '../store';
import * as LibraryActions from '../store/library/library.actions';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  searchText = '';
  books: Book[] = [];
  bookNames: string[] = [];
  // libraryState$: Observable<{ books: Book[] }>;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    // this.libraryState$ = this.store.select('library');
    this.store.select('library').subscribe(data => {
      this.books = data.books;
      this.bookNames = data.books.map(book => book.name);
    })
    this.store.dispatch(new LibraryActions.GetBooksAttempt());
  }
}
