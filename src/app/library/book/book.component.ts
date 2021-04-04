import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Book } from '../../store/library/book.model';
import * as fromApp from '../../store';
import * as LibraryActions from '../../store/library/library.actions';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  @Input() book: Book;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onDeleteBook(book) {
    this.store.dispatch(new LibraryActions.DeleteBookAttempt(book.id));
  }
}
