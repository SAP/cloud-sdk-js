import { DestinationInterface, CacheEntry, isExpired } from './cache';
import { Destination } from './destination';

/**
 * Representation of a custom cache.
 * @internal
 */
export class TestCache implements DestinationInterface {
  /**
   * Object that stores all cached entries.
   */
  cache: any;

  private defaultValidityTime: number | undefined;

  constructor(validityTime?: number) {
    this.cache = {};
    const currentDate = new Date();
    this.defaultValidityTime = validityTime ? currentDate.setMilliseconds(currentDate.getMilliseconds() + validityTime * 1000).valueOf() : undefined;
  }

  clear(): void {
    this.cache = {};
  }

  /**
   * Specifies whether an entry with a given key is defined in cache.
   * @param key - The entry's key.
   * @returns A boolean value that indicates whether the entry exists in cache.
   */
  hasKey(key: string): boolean {
    return this.cache.hasOwnProperty(key);
  }

  /**
   * Getter of cached entries.
   * @param key - The key of the entry to retrieve.
   * @returns The corresponding entry to the provided key if it is still valid, returns `undefined` otherwise.
   */
  get(key: string | undefined): Destination | undefined {
    return key && this.hasKey(key) && !isExpired(this.cache[key])
      ? this.cache[key].entry
      : undefined;
  }

  /**
   * Setter of entries in cache.
   * @param key - The entry's key.
   * @param item - The entry to cache.
   */
  set(key: string | undefined, item: CacheEntry<Destination>): void {
    if (key) {
      const expires = item.expires ?? this.defaultValidityTime;
      this.cache[key] = { entry: item.entry, expires };
    }
  }
}
