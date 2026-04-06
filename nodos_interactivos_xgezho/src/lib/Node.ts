export class Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
  targetOpacity: number;
  scale: number;
  targetScale: number;
  private width: number;
  private height: number;

  constructor(width: number, height: number, color: string) {
    this.width = width;
    this.height = height;
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.35;
    this.vy = (Math.random() - 0.5) * 0.35;
    this.radius = 3 + Math.random() * 2;
    this.color = color;
    this.opacity = 0;
    this.targetOpacity = 0.6 + Math.random() * 0.4;
    this.scale = 0.8;
    this.targetScale = 1;
  }

  update() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off edges
    if (this.x < 0 || this.x > this.width) {
      this.vx *= -1;
      this.x = Math.max(0, Math.min(this.width, this.x));
    }
    if (this.y < 0 || this.y > this.height) {
      this.vy *= -1;
      this.y = Math.max(0, Math.min(this.height, this.y));
    }

    // Smooth opacity transition
    this.opacity += (this.targetOpacity - this.opacity) * 0.05;

    // Smooth scale transition
    this.scale += (this.targetScale - this.scale) * 0.1;
  }

  applyMouseForce(mouseX: number, mouseY: number, radius: number, forceMultiplier: number = 1) {
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < radius) {
      const force = (radius - distance) / radius;
      const angle = Math.atan2(dy, dx);
      
      // Repel from mouse/touch with adjustable force
      const baseForce = 0.3 * forceMultiplier;
      this.vx += Math.cos(angle) * force * baseForce;
      this.vy += Math.sin(angle) * force * baseForce;

      // Limit velocity (higher for touch)
      const maxSpeed = forceMultiplier > 1 ? 3 : 2;
      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (speed > maxSpeed) {
        this.vx = (this.vx / speed) * maxSpeed;
        this.vy = (this.vy / speed) * maxSpeed;
      }
    }
  }

  distanceTo(other: Node): number {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    
    // Draw glow
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.radius * this.scale * 3
    );
    gradient.addColorStop(0, this.color.replace(')', ', 0.8)').replace('hsl', 'hsla'));
    gradient.addColorStop(0.5, this.color.replace(')', ', 0.3)').replace('hsl', 'hsla'));
    gradient.addColorStop(1, this.color.replace(')', ', 0)').replace('hsl', 'hsla'));
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * this.scale * 3, 0, Math.PI * 2);
    ctx.fill();

    // Draw core
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * this.scale, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }

  updateBoundaries(width: number, height: number) {
    this.width = width;
    this.height = height;
    
    // Keep node within new boundaries
    this.x = Math.max(0, Math.min(width, this.x));
    this.y = Math.max(0, Math.min(height, this.y));
  }
}
