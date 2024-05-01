import { LineDrawingStrategy } from '../drawing-strategies/line-drawing-strategy';
import { DrawingStrategy } from '../drawing-strategies/drawing-strategy';
import { RectangleDrawingStrategy } from '../drawing-strategies/rectangle-drawing-strategy';
import { CircleDrawingStrategy } from '../drawing-strategies/circle-drawing-strategy';

export class DrawingStrategyFactory {
  static getStrategy(tool: string, color: string): DrawingStrategy {
    switch (tool) {
      case 'line':
        return new LineDrawingStrategy();
      case 'rectangle':
        return new RectangleDrawingStrategy();
      case 'circle':
        return new CircleDrawingStrategy();
      default:
        throw new Error(`Неизвестный инструмент рисования: ${tool}`);
    }
  }
}
