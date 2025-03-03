import { ErrorWithCause } from './error-with-cause';
import type { AxiosError } from 'axios';

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
        "cause": {},
        "name": "ErrorWithCause"
      }"
    `);
  });

  it('adds Axios error to stack', () => {
    const axiosError: AxiosError = {
      message: "Request failed with status code 400",
      name: "AxiosError",
      stack: "AxiosError: Request failed with status code 400",
      code: "ERR_BAD_REQUEST",
      status: 400,
      response: {
        data: {
          my_error: {
            my_code: 'Four Hundred',
            my_message: 'This is a bad request',
          }
        }
      } as any,
      isAxiosError: true,
      toJSON: () => ({}),
    };
    const err = new ErrorWithCause('message', axiosError);
    expect(err.stack).toContain('ErrorWithCause: message');
    expect(err.stack).toContain('at ');
    expect(err.stack).toContain('Caused by:');
    expect(err.stack).toContain('HTTP Response: Request failed with status code 400');
    expect(err.stack).toContain('Four Hundred');
  });
});
