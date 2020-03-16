/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

export interface ResilienceOptions {
  /**
   * A boolean value that indicates whether to execute request to SCP-CF services using circuit breaker.
   */
  enableCircuitBreaker?: boolean;
}

export const circuitBreakerDefaultOptions = { timeout: 10000, errorThresholdPercentage: 50, resetTimeout: 30000 };
