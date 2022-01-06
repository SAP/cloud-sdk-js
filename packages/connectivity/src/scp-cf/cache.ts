interface CacheInterface<T> {
  hasKey(key: string): boolean;
  get(key: string): T | undefined;
  set(key: string, item: T, expirationTime?: number): void;
}

/**
 * @internal
 */
export interface CacheEntry<T> {
  expires?: number;
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
 * @typeparam T - Type of the cache entries.
 * @internal
 */
export class Cache<T> implements CacheInterface<T> {
  /**
   * Object that stores all cached entries.
   */
  private cache: Record<string, CacheEntry<T>>;

  /**
   * Default validity period for each entry in cache.
   * If `undefined`, all cached entries will be valid indefinitely.
   */
  private defaultValidityTime: DateInputObject | undefined;

  constructor(validityTime?: DateInputObject) {
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
   * @param key - The key of the entry to retrieve.
   * @returns The corresponding entry to the provided key if it is still valid, returns `undefined` otherwise.
   */
  get(key: string | undefined): T | undefined {
    return key && this.hasKey(key) && !isExpired(this.cache[key])
      ? this.cache[key].entry
      : undefined;
  }

  /**
   * Setter of entries in cache.
   * @param key - The entry's key
   * @param entry - The entry to cache
   * @param expirationTime - The time expressed in UTC in which the given entry expires
   */
  set(key: string | undefined, entry: T, expirationTime?: number): void {
    if (key) {
      const expires = expirationTime
        ? expirationTime
        : inferExpirationTime(this.defaultValidityTime);
      this.cache[key] = { entry, expires };
    }
  }
}

function isExpired<T>(item: CacheEntry<T>): boolean {
  if (item.expires === undefined) {
    return false;
  }
  // return !item.expires.isAfter(moment());
  return item.expires < Date.now();
}

function inferExpirationTime(
  expirationTime: DateInputObject | undefined
): number | undefined {
  return expirationTime ? addDate(expirationTime) : undefined;
}

interface DateInputObject {
  years?: number;
  year?: number;
  y?: number;

  months?: number;
  month?: number;
  M?: number;

  dates?: number;
  date?: number;
  D?: number;

  hours?: number;
  hour?: number;
  h?: number;

  minutes?: number;
  minute?: number;
  m?: number;

  seconds?: number;
  second?: number;
  s?: number;

  milliseconds?: number;
  millisecond?: number;
  ms?: number;
}

function addDate(expirationTime: DateInputObject): number {
  const currentDate = new Date();
  // const years = currentDate.setFullYear(
  //   expirationTime.years ?? expirationTime.year ?? expirationTime.y ??
  // const months =
  //   expirationTime?.months ?? expirationTime.month ?? expirationTime.m ?? 0;
  // const dates =
  //   expirationTime?.dates ?? expirationTime.dates ?? expirationTime.D;
  const hours =
    expirationTime?.hours ?? expirationTime.hour ?? expirationTime.h ?? 0;
  const minutes =
    expirationTime?.minutes ?? expirationTime.minute ?? expirationTime.m ?? 0;
  const seconds =
    expirationTime?.seconds ?? expirationTime.second ?? expirationTime.s ?? 0;
  const milliseconds =
    expirationTime?.milliseconds ??
    expirationTime.millisecond ??
    expirationTime.ms ??
    0;

  currentDate.setHours(currentDate.getHours() + hours);
  currentDate.setMinutes(currentDate.getMinutes() + minutes);
  currentDate.setSeconds(currentDate.getSeconds() + seconds);
  currentDate.setMilliseconds(currentDate.getMilliseconds() + milliseconds);

  return currentDate.valueOf();
}
