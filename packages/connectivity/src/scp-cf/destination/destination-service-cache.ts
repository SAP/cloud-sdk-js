import { JwtPayload } from '../jsonwebtoken-type';
import { Cache } from '../cache';
import { Destination } from './destination-service-types';
import { getDestinationCacheKey, IsolationStrategy } from './destination-cache';

const DestinationServiceCache = (cache: Cache<Destination[]>) => ({
  retrieveDestinationsFromCache: async (
    targetUrl: string,
    decodedJwt: JwtPayload
  ): Promise<Destination[] | undefined> =>
    cache.get(
      getDestinationCacheKey(decodedJwt, targetUrl, IsolationStrategy.Tenant)
    ),
  cacheRetrievedDestinations: async (
    destinationServiceUri: string,
    decodedJwt: JwtPayload,
    destinations: Destination[]
  ): Promise<void> => {
    const key = getDestinationCacheKey(
      decodedJwt,
      destinationServiceUri,
      IsolationStrategy.Tenant
    );
    cache.set(key, { entry: destinations });
  },
  clear: async (): Promise<void> => {
    cache.clear();
  },
  getCacheInstance: () => cache
});

/**
 * @internal
 */
export const destinationServiceCache = DestinationServiceCache(
  new Cache<Destination[]>({ hours: 0, minutes: 5, seconds: 0 })
);
