import CircuitBreaker from 'opossum';
import { CircuitBreakerOptions } from './resilience-options';

describe('resilience-options', () => {
  // when compiling a generated client the compiler fails, because the CircuitBreaker.Options from @types/opossum are not present (long import chain)
  // since these types contain the @types/node they are 1.8MB in size and we do not want to include this as a prod dependency of the connectivity module.
  // Hence we copied the CircuitBreaker options and added this test to ensure type compatibility.
  it('ensure type compatibility to opossum', () => {
    type keysOpossum = keyof CircuitBreaker.Options;
    type keysSDK = keyof CircuitBreakerOptions;
    let a: keysOpossum = '' as any;
    const b: keysSDK = '' as any;
    // is assignment works they are compatible
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    a = b;
  });
});
