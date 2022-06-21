import {
  Destination,
  DestinationCacheInterface,
  CacheEntry
} from '@sap-cloud-sdk/connectivity';

/**
 * Representation of a custom cache.
 */
export class TestCache implements DestinationCacheInterface {
  /**
   * Object that stores all cached entries.
   */
  cache: any;

  private defaultValidityTime: number | undefined;

  constructor(validityTime?: number) {
    this.cache = {};
    const currentDate = new Date();
    this.defaultValidityTime = validityTime
      ? currentDate
          .setMilliseconds(currentDate.getMilliseconds() + validityTime * 1000)
          .valueOf()
      : undefined;
  }

  async clear(): Promise<void> {
    this.cache = {};
  }

  /**
   * Specifies whether an entry with a given key is defined in cache.
   * @param key - The entry's key.
   * @returns A boolean value that indicates whether the entry exists in cache.
   */
  hasKey(key: string): Promise<boolean> {
    return this.cache.hasOwnProperty(key);
  }

  /**
   * Getter of cached entries.
   * @param key - The key of the entry to retrieve.
   * @returns The corresponding entry to the provided key if it is still valid, returns `undefined` otherwise.
   */
  async get(key: string | undefined): Promise<Destination | undefined> {
    return key &&
      (await this.hasKey(key)) &&
      !(this.cache[key].expires ? false : this.cache[key].expires < Date.now())
      ? this.cache[key].entry
      : undefined;
  }

  /**
   * Setter of entries in cache.
   * @param key - The entry's key.
   * @param item - The entry to cache.
   */
  async set(
    key: string | undefined,
    item: CacheEntry<Destination>
  ): Promise<void> {
    if (key) {
      const expires = item.expires ?? this.defaultValidityTime;
      this.cache[key] = { entry: item.entry, expires };
    }
  }
}
