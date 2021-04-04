import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @Input('searchList') searchList: string[] = [];
  @Input('defaultSearchText') defaultSearchText = '';
  @Output('searchTextChanged') searchTextChanged = new EventEmitter<string>();
  @HostListener('input', ['$event'])
  onInput($event) {
    if ($event.target.value === '') {
      this.searchTextChanged.emit('');
    }
  }
  constructor() { }

  onFilterBooks(form: NgForm) {
    this.searchTextChanged.emit(form.value.search);
  }
}
