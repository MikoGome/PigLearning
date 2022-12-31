function lerp(a, b, t) {
  return a + (b - a) * t;
}

function deepClone(input) {
  return JSON.parse(JSON.stringify(input))
  // if(typeof input === 'object' && input !== null) {
  //   const copy = Array.isArray(input) ? [] : Object.assign(Object.getPrototypeOf(input), input);
  //   for(const key in input) {
  //     copy[key] = deepClone(input[key]);
  //   }
  //   return copy;
  // }
  // return input;
}