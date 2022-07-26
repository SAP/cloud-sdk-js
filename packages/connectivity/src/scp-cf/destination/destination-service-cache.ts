import { JwtPayload } from '../jsonwebtoken-type';
import { Cache } from '../cache';
import { Destination } from './destination-service-types';
import { getDestinationCacheKey, IsolationStrategy } from './destination-cache';

const DestinationServiceCache = (cache: Cache<Destination[]>) => ({
  retrieveDestinationsFromCache: (
    targetUrl: string,
    decodedJwt: JwtPayload
  ): Destination[] | undefined =>
    cache.get(
      getDestinationCacheKey(decodedJwt, targetUrl, IsolationStrategy.Tenant)
    ),
  cacheRetrievedDestinations: (
    destinationServiceUri: string,
    decodedJwt: JwtPayload,
    destinations: Destination[]
  ): void => {
    const key = getDestinationCacheKey(
      decodedJwt,
      destinationServiceUri,
      IsolationStrategy.Tenant
    );
    cache.set(key, { entry: destinations });
  },
  clear: (): void => {
    cache.clear();
  },
  getCacheInstance: () => cache
});

/**
 * @internal
 */
export const destinationServiceCache = DestinationServiceCache(
  new Cache<Destination[]>(300000)
);
