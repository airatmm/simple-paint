import { LineDrawingStrategy } from './line-drawing-strategy';
import { DrawingStrategy } from './drawing-strategy';
import { RectangleDrawingStrategy } from './rectangle-drawing-strategy';
import { CircleDrawingStrategy } from './circle-drawing-strategy';
import { BrushDrawingStrategy } from './brush-drawing-strategy';

export class DrawingStrategyFactory {
  static getStrategy(tool: string, color: string): DrawingStrategy {
    switch (tool) {
      case 'line':
        return new LineDrawingStrategy();
      case 'rectangle':
        return new RectangleDrawingStrategy();
      case 'circle':
        return new CircleDrawingStrategy();
      case 'brush':
        return new BrushDrawingStrategy();
      default:
        throw new Error(`Unknown drawing tool: ${tool}`);
    }
  }
}
