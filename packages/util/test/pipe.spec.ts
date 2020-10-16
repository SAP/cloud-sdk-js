import { identity, pipe } from '../src';

describe('pipe', () => {
  const addAlice = (str: string): string => str + 'Alice';
  const addBob = (str: string): string => str + 'Bob';
  const addCharlie = (str?: string): string =>
    str ? str + 'Charlie' : 'noCharlie';

  it('should execute sync pipe with argument', () => {
    expect(pipe(addAlice, identity, addBob, addCharlie)('Start')).toEqual(
      'StartAliceBobCharlie'
    );
  });

  it('should execute sync pipe with no argument', () => {
    expect(pipe(addCharlie, identity, addAlice, identity, addBob)()).toEqual(
      'noCharlieAliceBob'
    );
  });
});
