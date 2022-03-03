import CircuitBreaker from 'opossum';

export interface ResilienceOptions {
  /**
   * A boolean value that indicates whether to execute request to SCP-CF services using circuit breaker.
   * ResilienceOptions.
   */
  enableCircuitBreaker?: boolean;

  /**
   * Timeout in miliseconds to retrieve the destination.
   */
  timeout?: number;
}

export const defaultResilienceBTPServices: Required<ResilienceOptions> = {
  enableCircuitBreaker: true,
  timeout: 10000
};

/**
 *  @internal
 */
export const circuitBreakerDefaultOptions: CircuitBreaker.Options = {
  timeout: false,
  errorThresholdPercentage: 50,
  volumeThreshold: 10,
  resetTimeout: 30000
};
