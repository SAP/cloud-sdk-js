import { readFile } from 'fs/promises';
import { X509Certificate } from 'crypto';
import { createLogger } from '@sap-cloud-sdk/util';
import { MtlsOptions } from '../../http-agent';
import { AsyncCache, AsyncCacheInterface } from '../async-cache';
import {
  DefaultDestinationCache,
  DestinationCache,
  DestinationCacheType
} from './destination-cache';

const logger = createLogger('register-destination-cache');

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

interface RegisterDestinationCacheType {
  destination: DestinationCacheType;
  mtls: MtlsCacheType;
}

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
  getMtlsOptions: () => Promise<MtlsOptions | Record<string, never>>;
  /**
   * @internal
   */
  clear: () => Promise<void>;
  /**
   * @internal
   */
  getCacheInstance: () => MtlsCacheInterface;
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
  getMtlsOptions: async (): Promise<MtlsOptions | Record<string, never>> => {
    let mtlsOptions = await retrieveMtlsOptionsFromCache(mtlsCache);
    if (!mtlsOptions) {
      await cacheMtlsOptions(mtlsCache);
      mtlsOptions = await retrieveMtlsOptionsFromCache(mtlsCache);
    }
    if (!mtlsOptions) {
      logger.warn(
        'Neither the previous nor the current mtls certificate is valid anymore.'
      );
      return {};
    }
    return mtlsOptions;
  },
  clear: async (): Promise<void> => mtlsCache.clear(),
  getCacheInstance: () => mtlsCache
});

function getCertExpirationDate(cert: string): number {
  return Number(new X509Certificate(cert).validTo);
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
  destination: {
    ...DestinationCache(new DefaultDestinationCache(0))
  },
  mtls: {
    ...MtlsCache()
  }
});

/**
 * @internal
 */
export const registerDestinationCache: RegisterDestinationCacheType =
  RegisterDestinationCache();
