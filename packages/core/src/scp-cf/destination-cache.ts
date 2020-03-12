/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { MapType } from '@sap-cloud-sdk/util';
import { tenantId, userId } from '../util';
import { Cache, IsolationStrategy } from './cache';
import { DestinationsByType } from './destination-accessor-types';
import { Destination } from './destination-service-types';

const DestinationCache = (cache: Cache<Destination>) => ({
  retrieveDestinationFromCache: (decodedJwt: MapType<any>, name: string, isolation: IsolationStrategy): Destination | undefined => {
    return cache.get(getDestinationCacheKey(decodedJwt, name, isolation));
  },
  cacheRetrievedDestinations: (decodedJwt: MapType<any>, retrievedDestinations: DestinationsByType, isolation: IsolationStrategy): void => {
    [...retrievedDestinations.instance, ...retrievedDestinations.subaccount].forEach(destination => {
      if (!destination.name) {
        throw new Error('The destination name is undefined.');
      }

      const key = getDestinationCacheKey(decodedJwt, destination.name, isolation);
      cache.set(key, destination);
    });
  },
  clear: () => {
    cache.clear();
  },
  getCacheInstance: () => {
    return cache;
  }
});

/**
 * Calculates a cache key based on the jwt and destination name for the given isolation strategy.
 * Cache keys for strategies are non-overlapping, i.e. using a cache key for strategy [[IsolationStrategy.Tenant]]
 * will not result in a cache hit for a destination that has been cached with strategy [[IsolationStrategy.Tenant_User]].
 *
 * @param decodedJwt - The decoded JWT of the current request.
 * @param destinationName - The name of the destination.
 * @param isolationStrategy - The strategy used to isolate cache entries.
 * @returns The cache key.
 * @hidden
 */
export function getDestinationCacheKey(decodedJwt: MapType<any>, destinationName: string, isolationStrategy: IsolationStrategy): string {
  switch (isolationStrategy) {
    case IsolationStrategy.No_Isolation:
      return `::${destinationName}`;
    case IsolationStrategy.Tenant_User:
      return `${tenantId(decodedJwt)}:${userId(decodedJwt)}:${destinationName}`;
    case IsolationStrategy.User:
      return `:${userId(decodedJwt)}:${destinationName}`;
    default:
      return `${tenantId(decodedJwt)}::${destinationName}`;
  }
}

export const destinationCache = DestinationCache(
  new Cache<Destination>({ hours: 0, minutes: 5, seconds: 0 })
);
