class Player {
  constructor(x, y, width, height) {
    this.height = height;
    this.scale = 1.5;
    this.width = width;
    this.x = x;
    this.y = y - this.height * this.scale;
    this.ground = y - (this.height * this.scale);
    this.jumpForce = 5;
    this.velocity = 0;
    this.gravity = 0.085;
    this.isDead = false;
    this.steps = 0;


    this.frameIndex = 0;

    this.controls = new Controls();

    this.brain = new NeuralNetwork([6, 4, 4, 1]); 
  }

  checkStatus(obstacleX, obstacleY, obstacleWidth, obstacleHeight) {
    /*rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.h + rect1.y > rect2.y*/
    if(obstacleX < this.x + this.width && 
      obstacleX + obstacleWidth > this.x &&
      obstacleY < this.y + this.height &&
      obstacleHeight + obstacleY > this.y) {
      this.isDead = true;
    }
  }
  
  update() {
    this.#move();
  }

  updateSprite() {
    this.frameIndex = (this.frameIndex + 1) % 4;
  }

  see(...vision) {
    const inputs = [...vision];
    const output = NeuralNetwork.feedForward(inputs, this.brain);

    if(output[0] === 1) {
      this.controls.jump = true;
    }
  }
  
  #move() {
    if(this.isDead) return;
    this.steps += 1;
    
    if(this.controls.jump) {
      this.y -= this.jumpForce;
      this.jumpForce -= this.gravity;
    }
    

    if(this.y > this.ground) {
      this.y = this.ground;
      this.jumpForce = 5;
      this.controls.jump = false;
    }

  }

  draw(ctx, spritesheet) {
    if(this.isDead) return;
    ctx.beginPath();
    if(this.controls.jump) {
      ctx.drawImage(spritesheet, (spritesheet.width - 75), 210, this.width, this.height, this.x, this.y, this.width * this.scale, this.height * this.scale);
    } else {
      ctx.drawImage(spritesheet, spritesheet.width - 75 - (70 * this.frameIndex), 75, this.width, this.height, this.x, this.y, this.width * this.scale, this.height * this.scale);
    }
    // ctx.drawImage(spritesheet, 0, 0, this.width, this.height);
  }
}