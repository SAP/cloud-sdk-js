import {
  getDefaultIsolationStrategy,
  IsolationStrategy
} from '../isolation-strategy';
import { JwtPayload } from '../jsonwebtoken-type';
import { tenantId } from '../tenant';
import { userId } from '../user';
import { Middleware, ResilienceMiddlewareOptions } from './resilience-options';

/**
 * TODO: Add JSDoc later.
 */
export interface ResilienceMiddlewareWithOptions<T> {
  middleware: Middleware<T>;
  options: Omit<ResilienceMiddlewareOptions, 'id'>;
}

/**
 * @internal
 * TODO: Add JSDoc later.
 */
export class ResilienceMiddlewareManager {
  private middlewares = new Map<string, ResilienceMiddlewareWithOptions<any>>();

  /**
   * Verify if the `id` already exists and matches the resilience middleware options.
   * @param resilienceMiddlewareOptions - TODO: Add JSDoc later.
   * @returns True, if a resilience middleware with the given `id` is found and matches the options. Otherwise, return false.
   */
  public verify(
    resilienceMiddlewareOptions: ResilienceMiddlewareOptions
  ): boolean {
    const middlewareWithOptions = this.middlewares.get(
      resilienceMiddlewareOptions.id
    );

    if (middlewareWithOptions) {
      const { options } = middlewareWithOptions;
      if (
        resilienceMiddlewareOptions.circuitBreaker() !==
          options.circuitBreaker() ||
        resilienceMiddlewareOptions.timeout() !== options.timeout()
      ) {
        return false;
      }
      return true;
    }
    return false;
  }

  /**
   * TODO: Add JSDoc later.
   * @param id - TODO: Add JSDoc later.
   * @returns TODO: Add JSDoc later.
   */
  public get<T>(id: string): Middleware<T> | undefined {
    return this.middlewares.get(id)?.middleware;
  }

  /**
   * Set the resilience middleware with the options. The `id` in the options will be used as the key of the map.
   * @param resilienceMiddlewareOptions - {@link ResilienceMiddlewareOptions}.
   * @param middleware - Resilience {@link Middleware}.
   */
  public setWithOptions<T>(
    resilienceMiddlewareOptions: ResilienceMiddlewareOptions,
    middleware: Middleware<T>
  ): void {
    this.middlewares.set(resilienceMiddlewareOptions.id, {
      middleware,
      options: resilienceMiddlewareOptions
    });
  }

  /**
   * Clear the map.
   */
  public clear(): void {
    this.middlewares.clear();
  }

  /**
   * Delete resilience middleware from the map.
   * @param id - Id of the resilience middleware. Used as key of the entry in the map.
   * @returns `true` if deletion was successful. `false` otherwise.
   */
  public delete(id: string): boolean {
    return this.middlewares.delete(id);
  }
}

/**
 * @internal
 * A map storing all the resilience middleware managers.
 */
const resilienceMiddlewareManagers = new Map<
  string,
  ResilienceMiddlewareManager
>([['default', new ResilienceMiddlewareManager()]]);

/**
 * Get resilience middleware manager based on the jwt and isolation strategy.
 * If tenant id cannot be extracted, the default manager is returned.
 * @param jwt - Jwt is used to extract tenant and user id.
 * @param isolationStragtegy - {@link IsolationStrategy} Isolation strategy for multi-tenancies.
 * @returns Resilience middleware manager.
 */
export function getResilienceMiddlewareManagerByIsolationStrategy(
  jwt?: JwtPayload,
  isolationStragtegy?: IsolationStrategy
): ResilienceMiddlewareManager {
  const strategy = isolationStragtegy ?? getDefaultIsolationStrategy(jwt);
  const tid = jwt && tenantId(jwt);
  const uid = jwt && userId(jwt);
  switch (strategy) {
    case IsolationStrategy.Tenant:
      return getResilienceMiddlewareManager(parseManagerId(tid));
    case IsolationStrategy.Tenant_User:
      return getResilienceMiddlewareManager(parseManagerId(tid, uid));
    default:
      throw new Error(
        `Failed to get resilience middleware manager! Unknown isolation strategy '${isolationStragtegy}' found.`
      );
  }
}

/**
 * @internal
 */
function parseManagerId(tid?: string, uid?: string): string {
  if (!tid) {
    return 'default';
  }
  if (!uid) {
    return 'tid_' + tid;
  }
  return 'tid_' + tid + '_uid_' + uid;
}

/**
 * @internal
 */
export function getResilienceMiddlewareManager(
  managerId: string
): ResilienceMiddlewareManager {
  let resilienceMiddlewareManager = resilienceMiddlewareManagers.get(managerId);
  if (resilienceMiddlewareManager) {
    return resilienceMiddlewareManager;
  }
  resilienceMiddlewareManager = new ResilienceMiddlewareManager();
  resilienceMiddlewareManagers.set(managerId, resilienceMiddlewareManager);
  return resilienceMiddlewareManager;
}

/**
 * @internal
 */
export function resetResilienceMiddlewareManager(): void {
  resilienceMiddlewareManagers.clear();
  resilienceMiddlewareManagers.set(
    'default',
    new ResilienceMiddlewareManager()
  );
}
