/**
 * TODO: Add JSDoc later.
 */
export interface OpossumLibOptions {
  timeout?: number | undefined; // default 10 sec
  errorThresholdPercentage?: number | undefined; // default 50
  volumeThreshold?: number | undefined; // default 10
  resetTimeout?: number | undefined; // default 30000
  // isolationStragtegy?: IsolationStrategy; // default tenant
}

/**
 * TODO: Add JSDoc later.
 */
export type CircuitBreakerOptions =
  | undefined
  | true
  | false
  | OpossumLibOptions;

/**
 * TODO: Add JSDoc later.
 */
export const defaultCircuitBreakerOptions: Required<OpossumLibOptions> = {
  timeout: 10000,
  errorThresholdPercentage: 50,
  volumeThreshold: 10,
  resetTimeout: 30000
  // isolationStragtegy: IsolationStrategy.Tenant
};
