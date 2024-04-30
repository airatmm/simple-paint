import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgForOf, NgStyle } from '@angular/common';
import { CanvasService } from '../../services/canvas.services';
import { CanvasFacade } from '../../store/facade';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [NgForOf, NgStyle],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  private canvasService = inject(CanvasService);
  private facade = inject(CanvasFacade);
  public tools = ['line', 'rectangle', 'circle'];
  public colors = ['#000000', '#FF5733', '#33FF57', '#5733FF', '#33FFFF', '#FF33F2'];
  public readonly timestamp = Date.now();

  public selectTool(tool: string): void {
    this.facade.changeTool(tool);
  }

  public selectColor(color: string): void {
    this.facade.changeColor(color);
  }

  public clear(): void {
    this.canvasService.clearCanvas();
  }
}
