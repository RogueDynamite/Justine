/**
 * @file Defines basic data types for generating numbers.
 * @author Nicholas De Leon
 */

import {ArgumentError} from './errors';

/** A number generator is simply an object that can generate numbers. */
export abstract class NumberGenerator {
    readonly min: number;
    readonly max: number;

    /**
     * Creates a number generator that generates integers in the
     * interval [min, max].
     * @param {number} min The lower bound of the range.
     * @param {number} max The upper bound of the range.
     * @constructor
     */
    constructor(min: number = 0, max: number = min+6) {
      if (min >= max) {
        throw new ArgumentError('min must be less than the max');
      }
      if (!Number.isInteger(min) || !Number.isInteger(max)) {
        throw new ArgumentError('min and max must be integers');
      }
      if (Number.MAX_SAFE_INTEGER < max) {
        throw new ArgumentError(
            `max must be less than ${Number.MAX_SAFE_INTEGER}`,
        );
      }
      if (Number.MIN_SAFE_INTEGER > min) {
        throw new ArgumentError(
            `min must be greater than ${Number.MIN_SAFE_INTEGER}`,
        );
      }
      this.min = min;
      this.max = max;
    }

    /** Gives the next number from the generator. */
    abstract nextNumber(): number;
}

/** A number generator that cycles through a range of numbers. */
export class CyclicNumberGenerator extends NumberGenerator {
    private curr: number;

    /**
     * Creates a cyclic number generator that starts at min and ends at max.
     * @param {number} min The lower bound of the cyclic range.
     * @param {number} max The upper bound of the cyclic range.
     * @constructor
     */
    constructor(min: number = 0, max: number = min+6) {
      super(min, max);
      this.curr = min;
    }

    /**
     * Gives the next number in the sequence.
     * @return {number} The next number in the sequence.
     */
    public nextNumber(): number {
      const temp = this.curr;
      this.curr = this.curr === this.max ? this.min : this.curr + 1;
      return temp;
    }
}

/** A number generator that gives random numbers. */
export class RandomNumberGenerator extends NumberGenerator {
  /**
   * Creates a random number generator that generates random integers
   * uniformly in the interval [min, max).
   * @param {number} min The lower bound of the range.
   * @param {number} max The upper bound of the range.
   * @constructor
   */
  constructor(min: number = 0, max: number = min+6) {
    super(min, max);
  }

  /**
   * Returns a random integer between min and max.
   * @return {number} A psuedorandom integer in the range [min, max).
   */
  public nextNumber(): number {
    return Math.floor(Math.random() * (this.max - this.min)) + this.min;
  }
}

/**
 * Generates the specified number of numbers from the given NumberGenerator.
 * @param {number} num The number of random numbers to generate.
 * @param {NumberGenerator} gen The source of the numbers.
 * @return {number[]} The array generated numbers. Will have length num.
 */
export function generateNumbers(num: number, gen: NumberGenerator): number[] {
  if (!Number.isInteger(num) || num <= 0) {
    throw new ArgumentError('num must be a positive integer');
  }
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(gen.nextNumber());
  }
  return arr;
}
