export default class RenderUtils {
  constructor() {
    throw new Error('Static class.');
  }

  static drawRectangle(ctx, x, y, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x * Size, y * Size, Size, Size);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(x * Size, y * Size, Size, Size);
    ctx.closePath();
  }

  static drawCircle(ctx, x, y, color) {
    ctx.beginPath();
    ctx.arc((x + 0.5) * Size, (y + 0.5) * Size, Size * 0.45, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();
  }
}

const Size = 32;

RenderUtils.Size = Size;
