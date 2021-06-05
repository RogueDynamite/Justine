/**
 * @file Contains tests for the number generators.
 * @author Nicholas De Leon
 */

import {expect} from 'chai';
import {
  CyclicNumberGenerator,
  generateNumbers,
  RandomNumberGenerator,
} from '../src/utils/number_generators';

describe('cyclic number generator tests', () => {
  it('cycles through all integers', () => {
    const numGen = new CyclicNumberGenerator(0, 6);
    let i = 0;
    while (i < 12) {
      expect(numGen.nextNumber()).to.equal(i % 7);
      i += 1;
    }
  });
  it('errors when an invalid range is used', () => {
    expect(() => new CyclicNumberGenerator(6, 1)).to.throw();
    expect(() => new CyclicNumberGenerator(6, 6)).to.throw();
  });
  it('errors when non-integers are used in the range', () => {
    expect(() => new CyclicNumberGenerator(1.2, 7)).to.throw();
    expect(() => new CyclicNumberGenerator(1, 7.4)).to.throw();
  });
  it('exhibits correct behavior at integer boundaries', () => {
    const maxInt = Number.MAX_SAFE_INTEGER;
    const minInt = Number.MIN_SAFE_INTEGER;
    // We disallow ranges that extend past the safe integer range.
    expect(() => new CyclicNumberGenerator(maxInt, maxInt + 1)).to.throw();
    expect(() => new CyclicNumberGenerator(minInt - 1, minInt)).to.throw();
    const i = maxInt - 2;
    const numGen = new CyclicNumberGenerator(i, maxInt);
    // Cyclic behavior
    expect(numGen.nextNumber()).to.equal(i);
    expect(numGen.nextNumber()).to.equal(i + 1);
    expect(numGen.nextNumber()).to.equal(i + 2);
    expect(numGen.nextNumber()).to.equal(i);
  });
});

describe('generateNumber() tests', () => {
  it('should generate numbers correctly', () => {
    const numGen = new CyclicNumberGenerator(0, 6);
    const arr = generateNumbers(50, numGen);
    expect(arr).to.have.length(50);
    let i = 0;
    while (i < 50) {
      expect(arr[i]).to.equal(i % 7);
      i += 1;
    }
  });
  it('should error on incorrect num', () => {
    const numGen = new CyclicNumberGenerator(0, 6);
    expect(() => generateNumbers(1.2, numGen)).to.throw();
    expect(() => generateNumbers(-1, numGen)).to.throw();
  });
});

describe('random number generator tests', () => {
  it('should produce the right integers', () => {
    const seenNum = new Array(7).fill(false);
    // If the number generator generates all numbers in the range with equal
    // probability, this will fail with an incredibly low probability.
    generateNumbers(100, new RandomNumberGenerator(0, 6)).forEach((value) => {
      expect(value).to.be.below(7).and.above(-1);
      seenNum[value] = true;
    });
    expect(seenNum.every((num) => num)).to.be.equal(true);
  });
});
