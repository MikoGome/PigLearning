class NeuralNetwork {
  constructor(neuronCounts) {
    this.levels = [];
    for(let i = 0; i < neuronCounts.length-1; i++) {
      this.levels.push(new Level(neuronCounts[i], neuronCounts[i+1]))
    }
  }

  static feedForward(inputs, networks) {
    let outputs = Level.feedForward(inputs, networks.levels[0]);
    for(let i = 1; i < networks.levels.length; i++) {
      outputs = Level.feedForward(outputs, networks.levels[i]); 
    }
    return outputs;
  }

  static Mutate(network, amount) {
    network.levels.forEach(level => {
      for(let i = 0; i < level.biases.length; i++) {
        level.biases[i] = lerp(level.biases[i], Math.random() * 2 - 1, amount);
      }

      for(let i = 0; i < level.weights.length; i++) {
        for(let j = 0; j < level.weights[i].length; j++) {
          level.weights[i][j] = lerp(level.weights[i][j], Math.random() * 2 - 1, amount);
        }
      }
    });
    
  }
}

class Level {
  constructor(inputCount, outputCount) {
    this.inputLevel = Array(inputCount);
    this.outputLevel = Array(outputCount);

    this.biases = Array(inputCount);
    this.weights = [];

    for(let i = 0; i < this.inputLevel.length; i++) {
      this.weights[i] = Array(outputCount);
    }
    this.randomize();
  }

  randomize() {
    for(let i = 0; i < this.biases.length; i++) {
      this.biases[i] = Math.random() * 2 - 1;
    }

    for(let i = 0; i < this.weights.length; i++) {
      for(let j = 0; j < this.weights[i].length; j++) {
        this.weights[i][j] = Math.random() * 2 - 1;
      }
    }
  }

  static feedForward(inputs, levels) {
    for(let i = 0; i < inputs.length; i++) {
      levels.inputLevel[i] = inputs[i];
    }

    for(let i = 0; i < levels.outputLevel.length; i++) {
      let sum = 0;
      for(let j = 0; j < levels.inputLevel.length; j++) {
        sum += levels.weights[j][i] * levels.inputLevel[j];
      }
      if(sum > levels.biases[i]) {
        levels.outputLevel[i] = 1;
      } else {
        levels.outputLevel[i] = 0;
      }
    }
    return levels.outputLevel;
  }
}