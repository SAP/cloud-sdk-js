import CircuitBreaker from 'opossum';
import { CircuitBreakerOptions } from './resilience-options';

describe('resilience-options', () => {
  // when compiling a generated client the compiler fails, because the CircuitBreaker.Options from @types/opssum are not present (long import chain)
  // since these types contain the @types/node they are 1.8MB in size and we do not want to include this as a prod dependency of the connectivity module.
  // Hence we copied the CircuitBreaker options and added this test to ensure type compatability.
  it('ensure type compatability to opssum', () => {
    type keysOpossum = keyof CircuitBreaker.Options;
    type keysSDK = keyof CircuitBreakerOptions;
    let a: keysOpossum = '' as any;
    const b: keysSDK = '' as any;
    // is assignment works they are compatible
    a = b;
  });
});
