import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookDetailsComponent } from './book-details/book-details.component';
import { LibraryComponent } from './library/library.component';

const routes: Routes = [
  { path: '', redirectTo: '/library', pathMatch: 'full' },
  { path: 'library', component: LibraryComponent },
  { path: 'library/add', component: BookDetailsComponent, data: { editMode: false } },
  { path: 'library/:bookId/edit', component: BookDetailsComponent, data: { editMode: true } },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
