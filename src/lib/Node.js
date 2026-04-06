/**
 * Clase Node: partícula con posición, velocidad, glow y repulsión al mouse/touch.
 */
export class Node {
  constructor(width, height, color) {
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
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > this.width) {
      this.vx *= -1;
      this.x = Math.max(0, Math.min(this.width, this.x));
    }
    if (this.y < 0 || this.y > this.height) {
      this.vy *= -1;
      this.y = Math.max(0, Math.min(this.height, this.y));
    }

    this.opacity += (this.targetOpacity - this.opacity) * 0.05;
    this.scale += (this.targetScale - this.scale) * 0.1;
  }

  applyMouseForce(mouseX, mouseY, radius, forceMultiplier = 1) {
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < radius) {
      const force = (radius - distance) / radius;
      const angle = Math.atan2(dy, dx);
      const baseForce = 0.3 * forceMultiplier;
      this.vx += Math.cos(angle) * force * baseForce;
      this.vy += Math.sin(angle) * force * baseForce;

      const maxSpeed = forceMultiplier > 1 ? 3 : 2;
      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (speed > maxSpeed) {
        this.vx = (this.vx / speed) * maxSpeed;
        this.vy = (this.vy / speed) * maxSpeed;
      }
    }
  }

  applyAttractForce(centerX, centerY, radius, strength = 0.3) {
    const dx = centerX - this.x;
    const dy = centerY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 1) return;

    if (distance < radius) {
      const force = (radius - distance) / radius;
      const angle = Math.atan2(dy, dx);
      this.vx += Math.cos(angle) * force * strength;
      this.vy += Math.sin(angle) * force * strength;

      const maxSpeed = 2.5;
      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (speed > maxSpeed) {
        this.vx = (this.vx / speed) * maxSpeed;
        this.vy = (this.vy / speed) * maxSpeed;
      }
    }
  }

  distanceTo(other) {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  _colorToHsla(alpha) {
    return this.color.replace(')', `, ${alpha})`).replace('hsl', 'hsla');
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;

    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.radius * this.scale * 3
    );
    gradient.addColorStop(0, this._colorToHsla(0.8));
    gradient.addColorStop(0.5, this._colorToHsla(0.3));
    gradient.addColorStop(1, this._colorToHsla(0));

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * this.scale * 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * this.scale, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  updateBoundaries(width, height) {
    this.width = width;
    this.height = height;
    this.x = Math.max(0, Math.min(width, this.x));
    this.y = Math.max(0, Math.min(height, this.y));
  }
}
