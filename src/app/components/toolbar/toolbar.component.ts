import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgClass, NgForOf, NgStyle } from '@angular/common';
import { CanvasService } from '../../services/canvas.service';
import { CanvasFacade } from '../../store/facade';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [NgForOf, NgStyle, NgClass],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  private readonly canvasService = inject(CanvasService);
  private readonly facade = inject(CanvasFacade);
  public readonly tools = ['line', 'rectangle', 'circle'];
  public readonly colors = ['#000000', '#FF5733', '#33FF57', '#5733FF', '#33FFFF', '#FF33F2'];
  public readonly timestamp = Date.now();
  public selectedTool: string = this.tools[0];
  public selectedColor: string = this.colors[0];

  public selectTool(tool: string): void {
    this.selectedTool = tool;
    this.facade.changeTool(tool);
  }

  public selectColor(color: string): void {
    this.selectedColor = color;
    this.facade.changeColor(color);
  }

  public clear(): void {
    this.canvasService.clearCanvas();
  }

  public trackByItem(index: number): number {
    return index;
  }
}
