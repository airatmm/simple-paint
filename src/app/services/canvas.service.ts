import { ElementRef, Injectable } from '@angular/core';
import { fromEvent, last, map, Observable, switchMap, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  private canvasEl!: HTMLCanvasElement;
  private cx!: CanvasRenderingContext2D;

  initializeCanvas(canvas: ElementRef<HTMLCanvasElement>) {
    this.canvasEl = canvas.nativeElement;
    this.canvasEl.width = this.canvasEl.offsetWidth;
    this.canvasEl.height = this.canvasEl.offsetHeight;

    this.cx = this.canvasEl.getContext('2d') as CanvasRenderingContext2D;
    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
  }

  getContext(): CanvasRenderingContext2D {
    return this.cx;
  }
  createMouseEvents(
    destroy$: Observable<void>
  ): Observable<{ prevPos: { x: number; y: number }; currentPos: { x: number; y: number } }> {
    return fromEvent<MouseEvent>(this.canvasEl, 'mousedown').pipe(
      switchMap(startEvent => {
        const startX = startEvent.clientX - this.canvasEl.getBoundingClientRect().left;
        const startY = startEvent.clientY - this.canvasEl.getBoundingClientRect().top;

        return fromEvent<MouseEvent>(this.canvasEl, 'mousemove').pipe(
          takeUntil(fromEvent<MouseEvent>(this.canvasEl, 'mouseup')),
          takeUntil(fromEvent<MouseEvent>(this.canvasEl, 'mouseleave')),
          takeUntil(destroy$),
          last(),
          map(moveEvent => {
            const endX = moveEvent.clientX - this.canvasEl.getBoundingClientRect().left;
            const endY = moveEvent.clientY - this.canvasEl.getBoundingClientRect().top;
            return { prevPos: { x: startX, y: startY }, currentPos: { x: endX, y: endY } };
          })
        );
      })
    );
  }

  clearCanvas(): void {
    this.cx.clearRect(0, 0, this.cx.canvas.width, this.cx.canvas.height);
  }
}
