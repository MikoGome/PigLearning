async function main() {
  const canvas = document.getElementById('board');
  const ctx = canvas.getContext('2d');
  const spritesheet = document.createElement('img');
  spritesheet.setAttribute('src', '/assets/player_spritesheet.png');
  
  startGame(canvas, ctx, spritesheet);
}

function startGame(canvas, ctx, spritesheet) {
  const population = new Population(200, spritesheet, canvas);
  const obstacles = new Obstacles(canvas);
  
  let prevTime = performance.now();
  let cooldownTime = performance.now();
  function animate(time) {
    if(time - prevTime < 1000/60) return requestAnimationFrame(animate);
    
    if(population.checkExtinction()) {
      population.calculateFitnessSum();
      // population.clear();
      obstacles.clear();
      population.breed();
      document.getElementById('generation').innerText = population.generation;
    }
    population.steps += 1;
    document.getElementById('steps').innerText = population.steps;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(time-cooldownTime > 500) {
      obstacles.checkAndAdd();
      cooldownTime = time;
    }
  
    obstacles.update(ctx, canvas);

    if(time - prevTime > 1000/12) {
      population.updateSprite();
    }
    population.see(obstacles);
    population.update();
    population.updateStatus(obstacles);
    population.draw(ctx, spritesheet);

    if(time - prevTime > 1000/12) {
      prevTime = performance.now();
    }

    return requestAnimationFrame(animate);
  }

  animate();
}

main();