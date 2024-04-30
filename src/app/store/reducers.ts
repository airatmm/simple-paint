import { createReducer, on } from '@ngrx/store';
import { changeColor, changeTool } from './actions';

export interface DrawState {
  tool: string;
  color: string;
}

export const initialState: DrawState = {
  tool: 'line',
  color: '#000000',
};

export const drawReducer = createReducer(
  initialState,
  on(changeTool, (state, { tool }) => ({ ...state, tool })),
  on(changeColor, (state, { color }) => ({ ...state, color }))
);
