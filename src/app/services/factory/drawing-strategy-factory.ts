import { LineDrawingStrategy } from '../drawing-strategies/line-drawing-strategy';
import { DrawingStrategy } from '../drawing-strategies/drawing-strategy';
import { RectangleDrawingStrategy } from '../drawing-strategies/rectangle-drawing-strategy';
import { CircleDrawingStrategy } from '../drawing-strategies/circle-drawing-strategy';

export class DrawingStrategyFactory {
  static getStrategy(tool: string, color: string): DrawingStrategy {
    switch (tool) {
      case 'line':
        return LineDrawingStrategy.create(color);
      case 'rectangle':
        return RectangleDrawingStrategy.create(color);
      case 'circle':
        return CircleDrawingStrategy.create(color);
      default:
        throw new Error(`Неизвестный инструмент рисования: ${tool}`);
    }
  }
}
