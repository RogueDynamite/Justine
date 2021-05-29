/**
 * Returns a random integer between min and max.
 * @param {number} min - The lower bound of the range of values to return.
 * @param {number} max - The upper bound of the range of values to return.
 * @return {number} A psuedorandom integer in the range [min, max).
 */
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

export {getRandomInt};
