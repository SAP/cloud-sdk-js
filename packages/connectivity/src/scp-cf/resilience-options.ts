/**
 * Options to configure resilience when fetching destinations.
 * @deprecated Since v2.13.0. The resilience configuration will be removed in version 3.0 of the SDK and is switched on per default.
 */
export interface ResilienceOptions {
  /**
   * A boolean value that indicates whether to execute request to SCP-CF services using circuit breaker.
   * ResilienceOptions.
   * @deprecated Since v2.13.0. Option will be removed in version 3.0 of the SDK. Circuit breaker is enabled per default and it can not be disabled anymore.
   */
  enableCircuitBreaker?: boolean;

  /**
   * Timeout in milliseconds to retrieve the destination.
   * @deprecated Since v2.13.0. Option will be removed in version 3.0 of the SDK. Timeout is enabled per default with a value of 10 seconds.
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
