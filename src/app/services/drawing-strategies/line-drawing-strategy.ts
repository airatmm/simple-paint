import { DrawingStrategy } from './drawing-strategy';

export class LineDrawingStrategy extends DrawingStrategy {
  protected constructor(color: string) {
    super(color);
  }

  static create(color: string): LineDrawingStrategy {
    return new LineDrawingStrategy(color);
  }

  draw(ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number): void {
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }
}
