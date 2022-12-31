class Population {
  constructor(size, spritesheet, canvas) {
    this.size = size;
    this.spritesheet = spritesheet;
    this.canvas = canvas;

    this.steps = 0;
    this.fitnessSum = 0;
    this.generation = 1;
    this.champion = null;
    this.players = [];
    for(let i = 0; i < this.size; i++) {
      const player = new Player(50, this.canvas.height, 69, 69);
      this.players.push(player);
    }
  }
  
  breed() {
    this.chooseChampion();
    this.players[0] = this.champion;
    const children = [];
    children.push(this.champion);
    for(let i = 1; i < this.size - 1; i++) {
      const parent = this.chooseParent();
      const baby = new Player(50, this.canvas.height, 69, 69);
      baby.brain = deepClone(parent.brain);
      if(Math.random() < 0.01) {
        NeuralNetwork.Mutate(baby.brain, 1);   
      } else {
        NeuralNetwork.Mutate(baby.brain, 0.02);
      }
      children.push(baby);
    }
    this.players = children;
    this.players.forEach(player => player.steps = 0)
    this.steps = 0;
    this.generation += 1;
  }

  chooseChampion() {
    this.champion = this.players.reduce((acc, curr) => {
      if(curr.steps > acc.steps) return curr;
      return acc;
    });
  }

  chooseParent() {
    const rand = Math.random() * this.fitnessSum;
    let runningSum = 0;
    for(let i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      runningSum += (player.steps ** 2);
      if(runningSum > rand) {
        return player;
      }
    }
    console.log('got to this point')
    return null;
  }

  calculateFitnessSum() {
    this.fitnessSum = this.players.reduce((acc, curr) => {
      return acc + curr.steps ** 2;
    }, 0);
  }
  
  checkExtinction() {
    for(let i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      if(!player.isDead) {
        return false;
      }
    }
    return true;
  }
  
  // clear() {
  //   this.players = [];
  // }

  updateStatus(obstacles) {
    this.players.forEach(player => {
      obstacles.content.forEach(obstacle => {
        player.checkStatus(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      });
    });
  }

  see(obstacles) {
    this.players.forEach(player => {
      player.see(
        (obstacles.content[0]?.x - player.x + player.width)/this.canvas.width || 0, 
        (obstacles.content[0]?.y - player.y)/this.canvas.height || 0, 
        (obstacles.content[1]?.x - player.x + player.width)/this.canvas.width || 0, 
        (obstacles.content[1]?.y - player.y)/this.canvas.height || 0,
        (obstacles.content[2]?.x - player.x + player.width)/this.canvas.width || 0, 
        (obstacles.content[2]?.y - player.y)/this.canvas.height || 0
      );
    });
  }

  update() {
    this.players.forEach(player => {
      player.update();
    });
  }

  draw(ctx, spritesheet) {
    this.players.forEach(player => {
      player.draw(ctx, spritesheet);
    });
  }

  updateSprite() {
    this.players.forEach(player => {
      player.updateSprite();
    });
  }
}