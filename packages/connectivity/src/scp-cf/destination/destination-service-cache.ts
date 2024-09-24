import type { JwtPayload } from '../jsonwebtoken-type';
import { Cache } from '../cache';
import type { Destination } from './destination-service-types';
import { getDestinationCacheKey } from './destination-cache';

const DestinationServiceCache = (cache: Cache<Destination[]>) => ({
  retrieveDestinationsFromCache: (
    targetUrl: string,
    decodedJwt: JwtPayload
  ): Destination[] | undefined =>
    cache.get(getDestinationCacheKey(decodedJwt, targetUrl, 'tenant')),
  cacheRetrievedDestinations: (
    destinationServiceUri: string,
    decodedJwt: JwtPayload,
    destinations: Destination[]
  ): void => {
    const key = getDestinationCacheKey(
      decodedJwt,
      destinationServiceUri,
      'tenant'
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
