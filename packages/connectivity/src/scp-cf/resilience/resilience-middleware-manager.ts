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
class ResilienceMiddlewareManager {
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
 * The default resilience middleware manager.
 */
export const resilienceMiddlewareManager: ResilienceMiddlewareManager =
  new ResilienceMiddlewareManager();
