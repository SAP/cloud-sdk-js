import { addTimeout, resilience } from './resilience';

describe('resilience', () => {
  describe('addTimeout', () => {
    it('should throw a time out rejection', async () => {
      const fn = () => new Promise(resolve => setTimeout(resolve, 1000));
      await expect(addTimeout(fn, 500)).rejects.toThrowError(
        'Timed out after 500ms'
      );
    });

    it('should disable timeout if invalid', async () => {
      const fn = () =>
        new Promise(resolve => setTimeout(() => resolve('resolved'), 1000));
      await expect(addTimeout(fn, -10)).resolves.toEqual('resolved');
    });

    it('should throw an error if two resilience middlewares has the same id but different options', () => {
      let actualError;
      try {
        resilience({
          id: 'middleware-id',
          timeout: () => false,
          circuitBreaker: () => false
        });
        resilience({
          id: 'middleware-id',
          timeout: () => 10000,
          circuitBreaker: () => false
        });
      } catch (e) {
        actualError = e;
      }
      expect(actualError).toEqual(new Error(`Id 'middleware-id' has already been used by another resilience middleware with different options!`));
    });
  });
});
