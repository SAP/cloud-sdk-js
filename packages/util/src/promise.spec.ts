import { finishAll } from './promise';

describe('finishAll', () => {
  it('throws an accumulated error if some promises are rejected', async () => {
    const promises = [
      Promise.resolve(),
      Promise.resolve(),
      Promise.reject('ERROR1'),
      Promise.reject('ERROR2')
    ];
    await expect(() =>
      finishAll(promises)
    ).rejects.toThrowErrorMatchingInlineSnapshot('"ERROR1, ERROR2"');
  });

  it('does not throw if all promises are resolved', async () => {
    const promises = [Promise.resolve(), Promise.resolve()];
    await expect(finishAll(promises)).resolves.toBeUndefined();
  });
});
