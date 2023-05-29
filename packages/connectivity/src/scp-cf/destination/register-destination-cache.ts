import { readFile } from 'node:fs/promises';
import { parseCert } from 'x509';
import { MtlsOptions } from '../../http-agent';
import { AsyncCache, AsyncCacheInterface } from '../async-cache';
import { DestinationCache, DestinationCacheType } from './destination-cache';

// 1) Implement tests

/**
 * @internal
 */
type MtlsCacheInterface = AsyncCacheInterface<MtlsOptions>;

class DefaultMtlsCache
  extends AsyncCache<MtlsOptions>
  implements MtlsCacheInterface
{
  constructor(defaultValidityTime = 300000) {
    super(defaultValidityTime);
  }
}

type RegisterDestinationCacheType = MtlsCacheType & DestinationCacheType;

interface MtlsCacheType {
  /**
   * @internal
   */
  useMtlsCache: boolean;
  /**
   * @internal
   */
  retrieveMtlsOptionsFromCache: () => Promise<MtlsOptions | undefined>;
  /**
   * @internal
   */
  cacheMtlsOptions: () => Promise<void>;
  /**
   * @internal
   */
  getMtlsOptions: () => Promise<MtlsOptions>;
  /**
   * @internal
   */
  clearMtlsCache: () => Promise<void>;
  /**
   * @internal
   */
  getMtlsCacheInstance: () => MtlsCacheInterface;
}

/**
 * @internal
 */
const MtlsCache = (
  mtlsCache: MtlsCacheInterface = new DefaultMtlsCache()
): MtlsCacheType => ({
  useMtlsCache: false,
  retrieveMtlsOptionsFromCache: async (): Promise<MtlsOptions | undefined> =>
    retrieveMtlsOptionsFromCache(mtlsCache),
  cacheMtlsOptions: async (): Promise<void> => cacheMtlsOptions(mtlsCache),
  getMtlsOptions: async (): Promise<MtlsOptions> => {
    const mtlsOptions = await retrieveMtlsOptionsFromCache(mtlsCache);
    if (!mtlsOptions) {
      await cacheMtlsOptions(mtlsCache);
    }
    return (
      mtlsOptions ??
      (retrieveMtlsOptionsFromCache(mtlsCache) as Promise<MtlsOptions>)
    );
  },
  clearMtlsCache: async (): Promise<void> => mtlsCache.clear(),
  getMtlsCacheInstance: () => mtlsCache
});

function getCertExpirationDate(cert: string): number {
  return new Date(parseCert(cert).notAfter).getMilliseconds();
}

async function retrieveMtlsOptionsFromCache(
  cache: MtlsCacheInterface
): Promise<MtlsOptions | undefined> {
  return cache.get('mtlsOptions');
}

async function cacheMtlsOptions(cache: MtlsCacheInterface): Promise<void> {
  const getCert = readFile(process.env.CF_INSTANCE_CERT as string, 'utf8');
  const getKey = readFile(process.env.CF_INSTANCE_KEY as string, 'utf8');
  const [cert, key] = await Promise.all([getCert, getKey]);
  cache.set('mtlsOptions', {
    entry: {
      cert,
      key
    },
    expires: getCertExpirationDate(cert)
  });
}

/**
 * @internal
 */
export const RegisterDestinationCache = (): RegisterDestinationCacheType => ({
  ...MtlsCache(),
  ...DestinationCache()
});

/**
 * @internal
 */
export const registerDestinationCache: RegisterDestinationCacheType =
  RegisterDestinationCache();
