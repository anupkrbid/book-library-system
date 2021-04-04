import { ActionReducerMap } from '@ngrx/store';

import * as fromLibrary from './library/library.reducer';

export interface AppState {
  library: fromLibrary.LibraryState
}

export const appReducers: ActionReducerMap<AppState> = {
  library: fromLibrary.libraryReducer
};


