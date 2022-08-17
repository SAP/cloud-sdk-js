import CircuitBreaker from 'opossum';
import {
  circuitBreakerDefaultOptions,
  Destination,
  JwtPayload,
  timeoutPromise
} from '../scp-cf';

/**
 * @internal
 */
export interface MiddlewareInOut<T> {
  fn: (argv: any[]) => Promise<T>;
  exitChain: boolean;
  context?: RequestContext;
}

/**
 * @internal
 */
export type MiddlewareFunction<T> = (
  options: MiddlewareInOut<T>
) => MiddlewareInOut<T>;
interface MiddleWareWithPrio<T> {
  priority: number;
  middleWare: MiddlewareFunction<T>;
}

/**
 * @internal
 */
export interface MiddleWare<T> {
  [key: string]: MiddleWareWithPrio<T> | undefined;
  timeout?: MiddleWareWithPrio<T>;
  circuitBreaker?: MiddleWareWithPrio<T>;
  retry?: MiddleWareWithPrio<T>;
}

/**
 * @internal
 */
export interface RequestContext {
  category: 'xsuaa' | 'destination' | 'target';
  url?: string;
  request?: any; // TODO httprequest config in client -> circular dependency
  jwt?: string | JwtPayload; // for convinience
  destination?: Destination;
}

const timeOutPriority = 10;
const circuitBreakerPriority = 20;
const defaultTimeout = 100000;

/**
 * @internal
 */
export function resilience<T>(): MiddleWare<T> {
  return {
    timeout: timeoutMiddleWare<T>()
  };
}

function stackMiddleWare<T>(middleWare: MiddleWare<T>): MiddlewareFunction<T> {
  const sortedByPrioList = Object.values(middleWare)
    .filter(m => m !== undefined)
    .sort((a, b) => (a!.priority > b!.priority ? 1 : -1))
    .map(m => m!.middleWare);
  const merged: MiddlewareFunction<T> = sortedByPrioList.reduce(
    (all, curr) => inOut => {
      const foo = curr(inOut);
      return all(foo);
    },
    (inOut => inOut) as MiddlewareFunction<T>
  );
  return merged;
}

/**
 * @internal
 */
export async function executeWithMiddleWare<T>(
  fn: (...argv: any) => Promise<T>,
  args: any[],
  middleWare: MiddleWare<T> = resilience<T>(),
  context: RequestContext
): Promise<T> {
  const sortedByPrioList = stackMiddleWare(middleWare);
  return sortedByPrioList({ fn, exitChain: false, context }).fn(args);
}

function timeoutMiddleWare<T>(): MiddleWareWithPrio<T> {
  const timeoutMidleware: MiddlewareFunction<T> = (
    middleWareInOut: MiddlewareInOut<T>
  ) => {
    const { context, fn, exitChain } = middleWareInOut;
    const wrapped = (args: any[]) =>
      exitChain
        ? fn(args)
        : Promise.race([fn(args), timeoutPromise<T>(defaultTimeout)]);
    return {
      fn: wrapped,
      context,
      exitChain
    };
  };
  return {
    middleWare: timeoutMidleware,
    priority: timeOutPriority
  };
}

function circuitBreakerMiddleWare<T>(): MiddleWareWithPrio<T> {
  const circuitBreakMiddleWare: MiddlewareFunction<T> = (
    middleWareInOut: MiddlewareInOut<T>
  ) => {
    const { context, fn, exitChain } = middleWareInOut;
    // TODO have map extracting the right circuit breaker from context for service and tenant
    const wrapped = (args: any[]) =>
      exitChain
        ? fn(args)
        : new CircuitBreaker<any[], T>(
            middleWareInOut.fn,
            circuitBreakerDefaultOptions
          ).fire(args);
    return {
      fn: wrapped,
      context,
      exitChain
    };
  };
  return {
    middleWare: circuitBreakMiddleWare,
    priority: circuitBreakerPriority
  };
}
