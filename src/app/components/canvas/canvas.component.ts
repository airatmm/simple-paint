import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { CanvasFacade } from '../../store/facade';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { CanvasService } from '../../services/canvas.service';
import { AsyncPipe } from '@angular/common';
import { DrawingStrategyFactory } from '../../services/factory/drawing-strategy-factory';
import { LineDrawingStrategy } from '../../services/drawing-strategies/line-drawing-strategy';
import { DrawingStrategy } from '../../services/drawing-strategies/drawing-strategy';

@Component({
  selector: 'app-canvas',
  standalone: true,
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe],
})
export class CanvasComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private destroy$ = new Subject<void>();
  public readonly facade = inject(CanvasFacade);
  private readonly canvasService = inject(CanvasService);
  drawingStrategy: DrawingStrategy = new LineDrawingStrategy();
  currentColor = '#000000';

  ngAfterViewInit(): void {
    this.canvasService.initializeCanvas(this.canvas);

    combineLatest([this.facade.currentTool$, this.facade.currentColor$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([tool, color]) => {
        this.drawingStrategy = DrawingStrategyFactory.getStrategy(tool, color);
        this.currentColor = color;
      });

    this.canvasService.createMouseEvents(this.destroy$).subscribe(positions => {
      if (this.drawingStrategy) {
        this.canvasService.getContext().strokeStyle = this.currentColor;
        this.drawingStrategy.draw(
          this.canvasService.getContext(),
          positions.prevPos.x,
          positions.prevPos.y,
          positions.currentPos.x,
          positions.currentPos.y,
          this.currentColor
        );
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
