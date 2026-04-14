import { createHash } from 'node:crypto';

interface CacheInterface<T> {
  hasKey(key: string): boolean;
  get(key: string | undefined): T | undefined;
  set(key: string | undefined, item: CacheEntry<T>): void;
  clear(): void;
  getOrInsertComputed(
    key: string | undefined,
    computeFn: () => CacheEntry<T>
  ): T;
}

/**
 * Representation of a cached object.
 */
export interface CacheEntry<T> {
  /**
   * The expiration time of the cache entry in milliseconds.
   */
  expires?: number;
  /**
   * The cache entry.
   */
  entry: T;
}

/**
 * Options to enable caching when fetching destinations.
 */
export interface CachingOptions {
  /**
   * A boolean value that indicates whether to read and write destinations from and to cache.
   * This never writes destinations with authentication type "SAMLAssertion".
   */
  useCache?: boolean;
}

/**
 * Representation of a cache to transiently store objects locally for faster access.
 * @typeParam T - Type of the cache entries.
 * @internal
 */
export class Cache<T> implements CacheInterface<T> {
  /**
   * Object that stores all cached entries.
   */
  private cache: Map<string, CacheEntry<T>>;

  /**
   * Creates an instance of Cache.
   * @param defaultValidityTime - The default validity time in milliseconds. Use 0 for unlimited cache duration.
   * @param maxSize - The maximum number of entries in the cache. Use Infinity for unlimited size. Items are evicted based on a least recently used (LRU) strategy.
   */
  constructor(
    private defaultValidityTime: number,
    private maxSize = Infinity
  ) {
    this.cache = new Map<string, CacheEntry<T>>();
  }

  /**
   * Clear all cached items.
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Specifies whether an entry with a given key is defined in cache.
   * @param key - The entry's key.
   * @returns A boolean value that indicates whether the entry exists in cache.
   */
  hasKey(key: string): boolean {
    return this.cache.has(key);
  }

  /**
   * Getter of cached entries.
   * @param key - The key of the entry to retrieve.
   * @returns The corresponding entry to the provided key if it is still valid, returns `undefined` otherwise.
   */
  get(key: string | undefined): T | undefined {
    const entry = key ? this.cache.get(key) : undefined;
    if (entry) {
      if (isExpired(entry)) {
        this.cache.delete(key!);
        return undefined;
      }
      // LRU cache: Move accessed entry to the end of the Map to mark it as recently used
      if (this.maxSize !== Infinity) {
        this.cache.delete(key!);
        this.cache.set(key!, entry);
      }
    }
    return entry?.entry;
  }

  /**
   * Setter of entries in cache.
   * @param key - The entry's key.
   * @param item - The entry to cache.
   */
  set(key: string | undefined, item: CacheEntry<T>): void {
    if (!key) {
      return;
    }
    if (
      this.cache.size >= this.maxSize &&
      this.cache.size > 0 &&
      !this.cache.has(key)
    ) {
      // Evict the least recently used (LRU) entry
      const lruKey = this.cache.keys().next().value;
      this.cache.delete(lruKey!); // SAFETY: size > 0
    }
    if (this.maxSize !== Infinity && this.cache.has(key)) {
      // If the key already exists, delete it to update its position in the LRU order
      this.cache.delete(key);
    }

    const expires = item.expires ?? this.inferDefaultExpirationTime();
    this.cache.set(key, { entry: item.entry, expires });
  }

  getOrInsertComputed(
    key: string | undefined,
    computeFn: () => CacheEntry<T>
  ): T {
    if (!key) {
      return computeFn().entry;
    }
    const cachedEntry = this.get(key);
    if (cachedEntry !== undefined) {
      return cachedEntry;
    }
    const newEntry = computeFn();
    this.set(key, newEntry);
    return newEntry.entry;
  }

  private inferDefaultExpirationTime(): number | undefined {
    const now = new Date();
    return this.defaultValidityTime
      ? now
          .setMilliseconds(now.getMilliseconds() + this.defaultValidityTime)
          .valueOf()
      : undefined;
  }
}

/**
 * Hashes the given value to create a cache key.
 * @internal
 * @param value - The value to hash.
 * @returns A hash of the given value using a cryptographic hash function.
 */
export function hashCacheKey(value: Record<string, unknown>): string {
  const serialized = JSON.stringify(value);
  return createHash('blake2s256').update(serialized).digest('hex');
}

function isExpired<T>(item: CacheEntry<T>): boolean {
  if (item.expires === undefined) {
    return false;
  }
  return item.expires < Date.now();
}