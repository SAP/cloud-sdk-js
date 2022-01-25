import { JwtPayload } from '../jsonwebtoken-type';
import { Cache } from '../cache';
import { Destination } from './destination-service-types';
import { getDestinationCacheKey } from './destination-cache';
import { IsolationStrategy} from "./destination-cache";

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
    cache.set(key, destinations);
  },
  clear: () => {
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
