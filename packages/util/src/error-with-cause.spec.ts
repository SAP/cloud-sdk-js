import { ErrorWithCause } from './error-with-cause';

describe('ErrorWithCause', () => {
  it('creates an error', () => {
    const err = new ErrorWithCause('message', new Error('root cause'));
    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(ErrorWithCause);
  });

  it('creates an error with cause', () => {
    const err = new ErrorWithCause('message', new Error('root cause'));
    expect(err.cause.message).toEqual('root cause');
    expect(err.cause).toBe(err.rootCause);
  });

  it('creates an error with nested causes', () => {
    const err = new ErrorWithCause(
      'message',
      new ErrorWithCause('cause', new Error('root cause'))
    );
    expect(err.cause.message).toEqual('cause');
    expect(err.rootCause.message).toBe('root cause');
  });

  it('serializes to JSON', () => {
    expect(
      JSON.stringify(new ErrorWithCause('error', new Error('cause')), null, 2)
    ).toMatchInlineSnapshot(`
      "{
        \\"cause\\": {},
        \\"name\\": \\"ErrorWithCause\\"
      }"
    `);
  });
});
