import * as asyncRetry from 'async-retry';
import { Context, Middleware, MiddlewareIn, MiddlewareOut } from './middleware';

const defaultRetryCount = 3;

/**
 * Helper method to build a retry middleware.
 * @param retryCount - Number of retry attempts. Default value is 3.
 * @returns The middleware adding a retry to the function.
 */
export function retry<ReturnType, ContextType extends Context>(
    retryCount: number = defaultRetryCount
): Middleware<ReturnType, ContextType> {
    return function (
        options: MiddlewareIn<ReturnType, ContextType>
    ): MiddlewareOut<ReturnType> {
        return () => asyncRetry.default(options.fn, { retries: retryCount });
    };
}
