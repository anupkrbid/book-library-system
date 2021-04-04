import { Book } from './../store/library/book.model';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as LibraryActions from '../store/library/library.actions';
import { CustomValidator } from '../shared/custom.validator';
import * as fromApp from '../store';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  bookId: string;
  editMode: boolean;
  bookForm: FormGroup;
  bookToEdit: Book | any = {};
  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new LibraryActions.GetBookSuccess({}));

    this.bookForm = this.fb.group({
      name: [null, [Validators.required]],
      author: [null, [Validators.required]],
      description: [null, [Validators.required]],
      count: [null, [Validators.required, Validators.min(1), CustomValidator.notWholeNoValidatorFn()]]
    });

    this.editMode = this.activatedRoute.snapshot.data.editMode;

    this.store.select('library').subscribe(data => {
      if (this.editMode) {
        this.bookToEdit = { ...data.bookToEdit };
        delete this.bookToEdit.id;
        if (Object.keys(this.bookToEdit).length > 0) {
          this.bookForm.setValue(this.bookToEdit);
        }
      }
    });

    if (this.editMode) {
      this.bookId = this.activatedRoute.snapshot.params.bookId;
      this.store.dispatch(new LibraryActions.GetBookAttempt(this.bookId));
    }
  }

  onBookFormSubmit() {
    if (this.editMode) {
      this.store.dispatch(new LibraryActions.EditBookAttempt({ ...this.bookForm.value, id: this.bookId }));
    } else {
      this.store.dispatch(new LibraryActions.AddBookAttempt(this.bookForm.value));
      this.bookForm.reset();
    }
  }

  onResetForm() {
    if (this.editMode) {
      this.bookForm.setValue(this.bookToEdit);
    } else {
      this.bookForm.reset();
    }
  }
}
