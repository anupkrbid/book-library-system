import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AutoCompleteDirective } from './directives/auto-complete.directive';
import { SearchComponent } from './components/search/search.component';
import { FilterByPipe } from './pipes/filter-by.pipe';

@NgModule({
  declarations: [
    AutoCompleteDirective,
    FilterByPipe,
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    AutoCompleteDirective,
    FilterByPipe,
    SearchComponent
  ]
})
export class SharedModule { }
