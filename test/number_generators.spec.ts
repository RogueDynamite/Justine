/**
 * @file Contains tests for the commands that generate numbers.
 * @author Nicholas De Leon
 */

import {expect} from 'chai';
import {CyclicNumberGenerator} from '../src/utils/number_generators';

describe('Cyclic Number Generator Tests', () => {
  it('cycles through all integers', () => {
    const numGen = new CyclicNumberGenerator(0, 7);
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
    expect(numGen.nextNumber()).to.equal(i);
  });
});
