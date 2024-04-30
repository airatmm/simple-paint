import { AppState } from './state';
import { createSelector } from '@ngrx/store';

export const selectDrawReducer = (state: AppState) => state.drawReducer;
export const selectCurrentColor = createSelector(selectDrawReducer, state => state.color);
export const selectCurrentTool = createSelector(selectDrawReducer, state => state.tool);
