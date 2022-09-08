import { finishAll } from './promise';

describe('finishAll', () => {
  it('throws an accumulated error if some promises are rejected', async () => {
    const promises = [
      Promise.resolve(),
      Promise.resolve(),
      Promise.reject('ERROR1'),
      Promise.reject('ERROR2')
    ];
    await expect(() => finishAll(promises)).rejects
      .toThrowErrorMatchingInlineSnapshot(`
            "Errors: [
            	ERROR1
            	ERROR2
            ]"
          `);
  });

  it('throws an with a custom message', async () => {
    const promises = [Promise.reject('ERROR')];
    await expect(() => finishAll(promises, 'Message')).rejects
      .toThrowErrorMatchingInlineSnapshot(`
            "Message Errors: [
            	ERROR
            ]"
          `);
  });

  it('does not throw if all promises are resolved', async () => {
    const promises = [Promise.resolve(), Promise.resolve()];
    await expect(finishAll(promises)).resolves.toBeUndefined();
  });
});
