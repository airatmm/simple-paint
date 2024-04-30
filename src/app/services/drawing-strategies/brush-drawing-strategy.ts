import { DrawingStrategy } from './drawing-strategy';

export class BrushDrawingStrategy implements DrawingStrategy {
  draw(ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number, color: string): void {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = color;
    ctx.stroke();
  }
}
