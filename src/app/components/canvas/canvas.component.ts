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
import { Subject, takeUntil } from 'rxjs';
import { CanvasService } from '../../services/canvas.services';
import { AsyncPipe } from '@angular/common';
import { DrawingStrategyFactory } from '../../services/drawing-strategies/drawing-strategy-factory';

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
  drawingStrategy: any;
  // // В методе ngAfterViewInit или в обработчике событий мыши
  // this.facade.currentTool$.pipe(takeUntil(this.destroy$)).subscribe(tool => {
  //   drawingStrategy = DrawingStrategyFactory.getStrategy(tool, this.facade.currentColor$.value);
  // });
  //
  // this.canvasService.createMouseEvents(this.destroy$).subscribe(positions => {
  //   if (drawingStrategy) {
  //     drawingStrategy.draw(
  //       this.canvasService.getContext(),
  //       positions.prevPos.x, positions.prevPos.y,
  //       positions.currentPos.x, positions.currentPos.y,
  //       this.facade.currentColor$.value
  //     );
  //   }
  // });

  // ngAfterViewInit(): void {
  //     this.canvasService.initializeCanvas(this.canvas.nativeElement);
  //
  //     // Подписка на текущий выбранный инструмент и получение соответствующей стратегии
  //     this.facade.currentTool$.pipe(takeUntil(this.destroy$)).subscribe(tool => {
  //       this.drawingStrategy = DrawingStrategyFactory.getStrategy(tool, this.facade.currentColor$.value);
  //     });
  //
  //     // Обработка событий мыши для рисования
  //     this.canvasService.createMouseEvents(this.destroy$).subscribe(positions => {
  //       if (this.drawingStrategy) {
  //         this.drawingStrategy.draw(
  //           this.canvasService.getContext(),
  //           positions.prevPos.x, positions.prevPos.y,
  //           positions.currentPos.x, positions.currentPos.y,

  ngAfterViewInit() {
    this.canvasService.initializeCanvas(this.canvas);

    this.facade.currentTool$.pipe(takeUntil(this.destroy$)).subscribe(tool => {
      this.drawingStrategy = DrawingStrategyFactory.getStrategy(tool, this.facade.currentColor$.value);
    });
    //
    // this.facade.currentColor$.pipe(takeUntil(this.destroy$)).subscribe(color => {
    //   this.canvasService.setStrokeColor(color);
    // });
    //
    // this.canvasService.createMouseEvents(this.destroy$).subscribe(positions => {
    //   this.canvasService.drawLine(positions.prevPos, positions.currentPos);
    // });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
