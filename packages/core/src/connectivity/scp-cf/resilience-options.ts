import CircuitBreaker from 'opossum';

export interface ResilienceOptions {
  /**
   * A boolean value that indicates whether to execute request to SCP-CF services using circuit breaker.
   */
  enableCircuitBreaker?: boolean;
}

export const circuitBreakerDefaultOptions: CircuitBreaker.Options = {
  timeout: 10000,
  errorThresholdPercentage: 50,
  volumeThreshold: 10,
  resetTimeout: 30000
};
