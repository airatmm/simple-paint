import { DrawingStrategy } from './drawing-strategy';

export class CircleDrawingStrategy extends DrawingStrategy {
  protected constructor(color: string) {
    super(color);
  }

  static create(color: string): CircleDrawingStrategy {
    return new CircleDrawingStrategy(color);
  }
  draw(ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number): void {
    ctx.strokeStyle = this.color;
    const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }
}
