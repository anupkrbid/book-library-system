import { ActionReducerMap } from '@ngrx/store';

import * as fromAlert from './alert/alert.reducers';
import * as fromLibrary from './library/library.reducer';

export interface AppState {
  alert: fromAlert.AlertState,
  library: fromLibrary.LibraryState;
}

export const appReducers: ActionReducerMap<AppState> = {
  alert: fromAlert.alertReducer,
  library: fromLibrary.libraryReducer
};


