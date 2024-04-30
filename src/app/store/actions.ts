import { createAction, props } from '@ngrx/store';

export const changeTool = createAction('[Toolbar] Change Tool', props<{ tool: string }>());
export const changeColor = createAction('[Toolbar] Change Color', props<{ color: string }>());
