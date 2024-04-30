import { DrawingStrategy } from './drawing-strategy';

export class CircleDrawingStrategy implements DrawingStrategy {
  draw(ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number, color: string): void {
    let radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = color;
    ctx.stroke();
  }
}
