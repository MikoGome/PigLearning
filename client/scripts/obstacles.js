class Obstacles {
  constructor() {
    this.content = [];
  }

  add(obstacle) {
    this.content.push(obstacle);
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