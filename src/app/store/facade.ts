import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeColor, changeTool } from './actions';
import { selectCurrentColor, selectCurrentTool } from './selectors';
import { AppState } from './state';

@Injectable({
  providedIn: 'root',
})
export class CanvasFacade {
  private readonly store: Store<AppState> = inject(Store);
  public readonly currentTool$ = this.store.select(selectCurrentTool);
  public readonly currentColor$ = this.store.select(selectCurrentColor);

  public changeTool(tool: string) {
    this.store.dispatch(changeTool({ tool }));
  }

  public changeColor(color: string) {
    this.store.dispatch(changeColor({ color }));
  }
}
