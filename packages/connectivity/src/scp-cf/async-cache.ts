import { Cache } from './cache';
import type { CacheEntry } from './cache';

/**
 * Generic async cache interface.
 * @internal
 */
export interface AsyncCacheInterface<T> {
  /**
   * This is called when an entry is added to the cache.
   * @param key - The cache key to store the item under.
   * @param item - The destination alongside an expiration time to store in the cache.
   */
  set(key: string | undefined, item: CacheEntry<T>): Promise<void>;
  /**
   * This is called when an entry shall be retrieved from the cache.
   * @param key - The cache key the item is stored under.
   */
  get(key: string | undefined): Promise<T | undefined>;
  /**
   * This is called when checking if a given key occurs in the cache.
   * @param key - The cache key the item should be stored under, if available.
   */
  hasKey(key: string): Promise<boolean>;
  /**
   * This can be called to remove all existing entries from the cache.
   */
  clear(): Promise<void>;
}

/**
 * @internal
 * Async wrapper around Cache<T>.
 */
export class AsyncCache<T> implements AsyncCacheInterface<T> {
  cache: Cache<T>;

  constructor(defaultValidityTime = 0) {
    this.cache = new Cache<T>(defaultValidityTime);
  }

  /**
   * Specifies whether an entry with a given key is defined in cache.
   * @param key - The entry's key.
   * @returns A boolean value that indicates whether the entry exists in cache.
   */
  async hasKey(key: string): Promise<boolean> {
    return this.cache.hasKey(key);
  }

  /**
   * Getter of cached entries.
   * @param key - The key of the entry to retrieve.
   * @returns The corresponding entry to the provided key if it is still valid, returns `undefined` otherwise.
   */
  async get(key: string | undefined): Promise<T | undefined> {
    return this.cache.get(key);
  }

  /**
   * Setter of entries in cache.
   * @param key - The entry's key.
   * @param item - The entry to cache.
   * @returns A promise to oid.
   */
  async set(key: string | undefined, item: CacheEntry<T>): Promise<void> {
    return this.cache.set(key, item);
  }

  /**
   * Clear all cached items.
   * @returns A promise to void.
   */
  async clear(): Promise<void> {
    return this.cache.clear();
  }
}
