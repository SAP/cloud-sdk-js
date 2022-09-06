/**
 * Options to configure resilience when fetching destinations.
 */
export interface ResilienceOptions {
  /**
   * A boolean value that indicates whether to execute request to SCP-CF services using circuit breaker.
   * ResilienceOptions.
   */
  enableCircuitBreaker?: boolean;

  /**
   * Timeout in milliseconds to retrieve the destination.
   */
  timeout?: number;
}

/**
 * @internal
 */
export const defaultResilienceBTPServices: Required<ResilienceOptions> = {
  enableCircuitBreaker: true,
  timeout: 10000
};

/**
 * @internal
 */
export const circuitBreakerDefaultOptions: CircuitBreakerOptions = {
  timeout: false,
  errorThresholdPercentage: 50,
  volumeThreshold: 10,
  resetTimeout: 30000
};

/**
 * Creates a promise for a timeout race.
 * @internal
 * @param timeout - Value for the timeout.
 * @returns A promise which times out after the given time.
 */
export function timeoutPromise<T>(timeout: number): Promise<T> {
  return new Promise<T>((resolve, reject) =>
    setTimeout(
      () => reject(new Error('Token retrieval ran into timeout.')),
      timeout
    )
  );
}

/**
 * This is partially copied from CircuitBreaker.Options of `@types/opossum`.
 * @internal
 */
export interface CircuitBreakerOptions {
  /**
   * @internal
   */
  timeout?: number | false | undefined;
  /**
   * @internal
   */
  errorThresholdPercentage?: number | undefined;
  /**
   * @internal
   */
  volumeThreshold?: number | undefined;
  /**
   * @internal
   */
  resetTimeout?: number | undefined;
}
