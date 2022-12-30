async function main() {
  const canvas = document.getElementById('board');
  const ctx = canvas.getContext('2d');
  const spritesheet = document.createElement('img');
  spritesheet.setAttribute('src', '/assets/player_spritesheet.png');
  
  startGame(canvas, ctx, spritesheet, [null, null, null], 1);
}

function startGame(canvas, ctx, spritesheet, brains, generation) {
  document.getElementById('generation').innerText = generation;
  const players = [];
  let steps = 0;
  const limit = 200;
  for(let i = 0; i < limit; i++) {
    let brain = brains[Math.floor(Math.random() * brains.length)]
    const newBrain = JSON.parse(JSON.stringify(brain));
    const mutationRate = 0.15;
    if(i > brains.length - 1 && brain) {
      NeuralNetwork.Mutate(newBrain, mutationRate);
    } else {
      brain = brains[i];
    }
    const player = new Player(50, canvas.height, 69, 69, spritesheet, newBrain);
    players.push(player);
  }
  const obstacles = new Obstacles();
  
  let prevTime = performance.now();
  let cooldownTime = performance.now();
  function animate(time) {
    if(time - prevTime < 1000/60) return requestAnimationFrame(animate);
    let allDead = false;
    for(let i = 0; i < players.length; i++) {
      const player = players[i];
      allDead = true;
      if(!player.isDead) {
        allDead = false;
        break;
      }
    }
    steps += 1;
    document.getElementById('steps').innerText = steps;
    if(allDead) {
      const brains = fitness(players);
      startGame(canvas, ctx, spritesheet, brains, generation + 1);
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(time-cooldownTime > 500) {
      if(Math.random() < 0.7) {
        const random = Math.random();
        const height = random < 0.6 ? 50 : 225;
        if(obstacles.content.length === 0 || canvas.width - obstacles.content[obstacles.content.length - 1]?.x > 200) {
          obstacles.add(new Obstacle(canvas.width, canvas.height - height, 10, 50, 3));
        }
      }
      cooldownTime = time;
    }
  
    obstacles.update(ctx, canvas);
    players.forEach(player => {
      if(time - prevTime > 1000/12) {
        player.updateSprite();
      }
      
      player.see(
        (obstacles.content[0]?.x - player.x + player.width)/canvas.width || 0, 
        (obstacles.content[0]?.y - player.y)/canvas.height || 0, 
        (obstacles.content[1]?.x - player.x + player.width)/canvas.width || 0, 
        (obstacles.content[1]?.y - player.y)/canvas.height || 0,
        (obstacles.content[2]?.x - player.x + player.width)/canvas.width || 0, 
        (obstacles.content[2]?.y - player.y)/canvas.height || 0,
        (obstacles.content[3]?.x - player.x + player.width)/canvas.width || 0, 
        (obstacles.content[3]?.y - player.y)/canvas.height || 0
      );

      player.update();
      obstacles.content.forEach((obstacle) => {
        player.checkStatus(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      });
      player.draw(ctx);
    })

    if(time - prevTime > 1000/12) {
      prevTime = performance.now();
    }

    return requestAnimationFrame(animate);
  }

  animate();
}

main();