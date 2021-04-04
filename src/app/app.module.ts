import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { appReducers } from './store';
import { AppRoutingModule } from './app-routing.module';
import { BookComponent } from './library/book/book.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { LibraryComponent } from './library/library.component';
import { LibraryEffects } from './store/library/library.effects';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookDetailsComponent,
    LibraryComponent
  ],
  imports: [
    BrowserModule,
    EffectsModule.forRoot([LibraryEffects]),
    NgxPaginationModule,
    StoreModule.forRoot(appReducers),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
