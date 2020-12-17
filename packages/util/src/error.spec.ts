import { ErrorWithCause, errorWithCause } from './error';

describe('errorWithCause', () => {
  it("creates a new error and appends the cause's stacktrace", () => {
    const cause = new Error('cause');
    const wrapper = errorWithCause('wrapper', cause);
    expect(wrapper instanceof Error).toBeTruthy();
    expect(wrapper.message).toBe('wrapper');
    expect(wrapper.stack).toContain('Caused by:\nError: cause');
  });
});

describe('ErrorWithCause', () => {
  it('creates an error', () => {
    const err = new ErrorWithCause('message', new Error('rootCause'));
    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(ErrorWithCause);
  });

  it('creates an error with cause', () => {
    const err = new ErrorWithCause('message', new Error('rootCause'));
    expect(err.cause.message).toEqual('rootCause');
    expect(err.cause).toBe(err.rootCause);
  });

  it('creates an error with nested causes', () => {
    const err = new ErrorWithCause(
      'message',
      new ErrorWithCause('cause', new Error('rootCause'))
    );
    expect(err.cause.message).toEqual('cause');
    expect(err.rootCause.message).toBe('rootCause');
  });
});
