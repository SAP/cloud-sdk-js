/**
 * TODO: Add JSDoc later.
 */
export interface OpossumLibOptions {
  errorThresholdPercentage?: number | undefined; // default 50
  volumeThreshold?: number | undefined; // default 10
  resetTimeout?: number | undefined; // default 30000
  // isolationStragtegy?: IsolationStrategy; // default tenant
}

/**
 * TODO: Add JSDoc later.
 */
export type CircuitBreakerOptions = false | OpossumLibOptions;

/**
 * TODO: Add JSDoc later.
 */
export const defaultCircuitBreakerOptions: Required<
  Exclude<CircuitBreakerOptions, false>
> = {
  errorThresholdPercentage: 50,
  volumeThreshold: 10,
  resetTimeout: 30000
  // isolationStragtegy: IsolationStrategy.Tenant
};
