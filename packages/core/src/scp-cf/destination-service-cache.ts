import { DecodedJWT } from '../util';
import { Cache, IsolationStrategy } from './cache';
import { Destination } from './destination-service-types';
import { getDestinationCacheKey } from './destination-cache';

const DestinationServiceCache = (cache: Cache<Destination[]>) => ({
  retrieveDestinationsFromCache: (
    destinationServiceUri: string,
    decodedJwt: DecodedJWT,
    isolationStrategty?: IsolationStrategy
  ): Destination[] | undefined =>
    cache.get(
      getDestinationCacheKeyService(
        destinationServiceUri,
        decodedJwt,
        isolationStrategty
      )
    ),
  cacheRetrievedDestinations: (
    destinationServiceUri: string,
    decodedJwt: DecodedJWT,
    destinations: Destination[],
    isolationStrategty?: IsolationStrategy
  ): void => {
    const key = getDestinationCacheKeyService(
      destinationServiceUri,
      decodedJwt,
      isolationStrategty
    );
    cache.set(key, destinations);
  },
  clear: () => {
    cache.clear();
  },
  getCacheInstance: () => cache
});

// The destination service Uri contains the destination name (single request) or the instance/subaccount information for get all request
// The used isolation strategty is either Tenant or Tenat_User because we want to get results for subaccount and provider tenants which rules out no-isolation or user islation
function getDestinationCacheKeyService(
  destinationServiceUri: string,
  decodedJwt: DecodedJWT,
  isolationStrategty?: IsolationStrategy
): string {
  const usedIsolationStrategy =
    isolationStrategty === IsolationStrategy.Tenant ||
    isolationStrategty === IsolationStrategy.Tenant_User
      ? isolationStrategty
      : IsolationStrategy.Tenant;

  return getDestinationCacheKey(
    decodedJwt,
    destinationServiceUri,
    usedIsolationStrategy
  );
}

export const destinationServiceCache = DestinationServiceCache(
  new Cache<Destination[]>({ hours: 0, minutes: 5, seconds: 0 })
);
