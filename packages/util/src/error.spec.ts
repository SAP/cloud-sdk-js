import { EOL } from 'os';
import { errorWithCause } from './error';

describe('errorWithCause', () => {
  it("creates a new error and appends the cause's stacktrace", () => {
    const cause = new Error('cause');
    const wrapper = errorWithCause('wrapper', cause);
    expect(wrapper instanceof Error).toBeTruthy();
    expect(wrapper.message).toBe('wrapper');
    expect(wrapper.stack).toContain(`Caused by:${EOL}Error: cause`);
  });
});
