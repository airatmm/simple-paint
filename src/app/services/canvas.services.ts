import { ElementRef, Injectable } from '@angular/core';
import { fromEvent, map, Observable, pairwise, switchMap, takeUntil } from 'rxjs';

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

  setStrokeColor(color: string) {
    this.cx.strokeStyle = color;
  }

  getContext(): CanvasRenderingContext2D {
    return this.cx;
  }

  createMouseEvents(
    destroy$: Observable<void>
  ): Observable<{ prevPos: { x: number; y: number }; currentPos: { x: number; y: number } }> {
    return fromEvent<MouseEvent>(this.canvasEl, 'mousedown').pipe(
      switchMap(() =>
        fromEvent<MouseEvent>(this.canvasEl, 'mousemove').pipe(
          takeUntil(fromEvent<MouseEvent>(this.canvasEl, 'mouseup')),
          takeUntil(fromEvent<MouseEvent>(this.canvasEl, 'mouseleave')),
          pairwise(),
          takeUntil(destroy$),
          map(([first, second]) => ({
            prevPos: {
              x: first.clientX - this.canvasEl.getBoundingClientRect().left,
              y: first.clientY - this.canvasEl.getBoundingClientRect().top,
            },
            currentPos: {
              x: second.clientX - this.canvasEl.getBoundingClientRect().left,
              y: second.clientY - this.canvasEl.getBoundingClientRect().top,
            },
          }))
        )
      )
    );
  }

  // drawLine(prevPos: { x: number; y: number }, currentPos: { x: number; y: number }) {
  //   this.cx.beginPath();
  //   this.cx.moveTo(prevPos.x, prevPos.y);
  //   this.cx.lineTo(currentPos.x, currentPos.y);
  //   this.cx.stroke();
  // }

  clearCanvas(): void {
    this.cx.clearRect(0, 0, this.cx.canvas.width, this.cx.canvas.height);
  }
}
