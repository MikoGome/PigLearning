class Obstacles {
  constructor(canvas) {
    this.canvas = canvas;
    this.content = [];
  }

  checkAndAdd() {
    if(Math.random() < 0.7) {
      const random = Math.floor(Math.random() * 100);
      const height = random % 2 ? 50 : 225;
      if(this.content.length === 0 || this.canvas.width - this.content[this.content.length - 1]?.x > 200) {
        this.add(new Obstacle(this.canvas.width, this.canvas.height - height, 50, 50, 3));
      }
    }
  }

  add(obstacle) {
    this.content.push(obstacle);
  }

  clear() {
    this.content = [];
  }

  update(ctx, canvas) {
    this.content.forEach(obstacle => {
      if(obstacle.x + obstacle.width < 0) {
        this.content.shift();
      } else {
        obstacle.update();
        obstacle.draw(ctx);
      }
    });
  }
}