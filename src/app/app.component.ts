import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from './store';
import * as fromAlert from './store/alert/alert.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  alertState$: Observable<fromAlert.AlertState>;
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.alertState$ = this.store.select('alert');
  }
}
