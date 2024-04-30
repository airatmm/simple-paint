import { DrawingStrategy } from './drawing-strategy';

export class RectangleDrawingStrategy implements DrawingStrategy {
  draw(ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number, color: string): void {
    ctx.beginPath();
    ctx.rect(startX, startY, endX - startX, endY - startY);
    ctx.strokeStyle = color;
    ctx.stroke();
  }
}
