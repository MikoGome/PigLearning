function fitness(players) {
  const bestBrains = players.sort((a,b) => b.steps - a.steps).slice(0, 5).map(player => player.brain);
  console.log(bestBrains);
  return bestBrains;
}