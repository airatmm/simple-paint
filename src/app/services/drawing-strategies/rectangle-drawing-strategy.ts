import { DrawingStrategy } from './drawing-strategy';

export class RectangleDrawingStrategy extends DrawingStrategy {
  protected constructor(color: string) {
    super(color);
  }

  static create(color: string): RectangleDrawingStrategy {
    return new RectangleDrawingStrategy(color);
  }
  draw(ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number): void {
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.rect(startX, startY, endX - startX, endY - startY);
    ctx.stroke();
  }
}
