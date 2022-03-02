export interface ResilienceOptions {
  /**
   * A boolean value that indicates whether to execute request to SCP-CF services using circuit breaker.
   * ResilienceOptions.
   */
  enableCircuitBreaker?: boolean;
}

/**
 *  @internal
 */
export const circuitBreakerDefaultOptions = {
  timeout: 10000,
  errorThresholdPercentage: 50,
  volumeThreshold: 10,
  resetTimeout: 30000
};
