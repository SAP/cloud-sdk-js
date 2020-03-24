/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import moment, { Moment, MomentInputObject } from 'moment';

interface CacheInterface<T> {
  hasKey(key: string): boolean;
  get(key: string): T | undefined;
  set(key: string, item: T, expirationTime?: number): void;
}

/**
 * @hidden
 */
export interface CacheEntry<T> {
  expires?: Moment;
  entry: T;
}

/**
 * Enumerator that selects the isolation type of destination in cache.
 */
export enum IsolationStrategy {
  Tenant = 'Tenant',
  User = 'User',
  Tenant_User = 'TenantUser',
  No_Isolation = 'NoIsolation'
}

export interface CachingOptions {
  /**
   * A boolean value that indicates whether to read destinations from cache.
   */
  useCache?: boolean;

  /**
   * The isolation strategy used for caching destinations. For the available options, see [[IsolationStrategy]].
   * By default, IsolationStrategy.Tenant is set.
   */
  isolationStrategy?: IsolationStrategy; // TODO: this is kind of too generic. For destinations, this makes sense, whereas for caching access tokens this has no effect at all.
}

/**
 * Representation of a cache to transiently store objects locally for faster access.
 * @template T
 */
export class Cache<T> implements CacheInterface<T> {
  /**
   * Object that stores all cached entries.
   */
  private cache: MapType<CacheEntry<T>>;

  /**
   * Default validity period for each entry in cache.
   * If undefined, all cached entries will be valid indefinitely.
   */
  private defaultValidityTime: MomentInputObject | undefined;

  constructor(validityTime?: MomentInputObject) {
    this.cache = {};
    this.defaultValidityTime = validityTime;
  }

  /**
   * Clear all cached items.
   */
  clear(): void {
    this.cache = {};
  }

  /**
   * Specifies whether an entry with a given key is defined in cache.
   * @param key - The entry's key
   * @returns boolean A boolean value that indicates whether the entry exists in cache
   */
  hasKey(key: string): boolean {
    return this.cache.hasOwnProperty(key);
  }

  /**
   * Getter of cached entries.
   * @param key - The key of the entry to retrieve
   * @returns The corresponding entry to the provided key if it is still valid, returns undefined otherwise
   */
  get(key: string): T | undefined {
    return this.hasKey(key) && !isExpired(this.cache[key])
      ? this.cache[key].entry
      : undefined;
  }

  /**
   * Setter of entries in cache.
   * @param key - The entry's key
   * @param entry - The entry to cache
   * @param expirationTime - The time expressed in UTC in which the given entry expires
   */
  set(key: string, entry: T, expirationTime?: number): void {
    const expires = expirationTime
      ? moment(expirationTime)
      : inferExpirationTime(this.defaultValidityTime);
    this.cache[key] = { entry, expires };
  }
}

function isExpired<T>(item: CacheEntry<T>): boolean {
  if (item.expires === undefined) {
    return false;
  }
  return !item.expires.isAfter(moment());
}

function inferExpirationTime(
  expirationTime: MomentInputObject | undefined
): Moment | undefined {
  return expirationTime ? moment().add(expirationTime) : undefined;
}
