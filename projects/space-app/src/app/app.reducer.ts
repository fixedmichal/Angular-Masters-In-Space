import { createReducer, on } from '@ngrx/store';
import { hideNavigation, showNavigation } from './app.actions';

export interface AppState {
  navigationVisible: boolean;
}

export const initialState: AppState = {
  navigationVisible: true,
};

export const appReducer = createReducer(
  initialState,
  on(showNavigation, (state) => ({ ...state, navigationVisible: true })),
  on(hideNavigation, (state) => ({ ...state, navigationVisible: false })),
);
