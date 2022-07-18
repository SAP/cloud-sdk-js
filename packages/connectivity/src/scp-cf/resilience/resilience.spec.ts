import { addTimeout } from './resilience';

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
  });
});
