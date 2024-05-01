export abstract class DrawingStrategy {
  protected color: string;

  protected constructor(color: string) {
    this.color = color;
  }

  abstract draw(ctx: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number): void;
}
