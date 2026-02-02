import * as zlib from 'node:zlib';
import { promisify } from 'node:util';
import {
  createLogger,
  ErrorWithCause,
  pickValueIgnoreCase,
  mergeIgnoreCase
} from '@sap-cloud-sdk/util';
import type {
  HttpMiddleware,
  HttpMiddlewareOptions
} from './http-client-types';

const logger = createLogger({
  package: 'http-client',
  messageContext: 'compress-request-middleware'
});

const brotliCompress = promisify(zlib.brotliCompress);
const gzipCompress = promisify(zlib.gzip);
const deflateCompress = promisify(zlib.deflate);
const zstdCompress = zlib.zstdCompress
  ? promisify(zlib.zstdCompress)
  : undefined;

const compressors = {
  brotli: brotliCompress,
  gzip: gzipCompress,
  deflate: deflateCompress,
  zstd: zstdCompress
};

function getSupportedAlgorithms(): string {
  return Object.entries(compressors)
    .filter(([, fn]) => fn !== undefined)
    .map(([name]) => `'${name}'`)
    .join(', ');
}

/**
 * Supported compression algorithms.
 * @remarks
 * - `gzip` is widely supported.
 * - `brotli` is supported by modern servers and can offer better compression rates, but may be slower.
 * - `deflate` is similar to `gzip` but less commonly used.
 * - `zstd` is experimental, requires Node.js v22.15.0 or higher, and can provide higher compression ratios and speed.
 */
export type RequestCompressionAlgorithm =
  | 'gzip'
  | 'brotli'
  | 'deflate'
  | 'zstd';

/**
 * Configuration for the request compression middleware.
 */
export interface RequestCompressionMiddlewareOptions<
  C extends RequestCompressionAlgorithm = 'gzip'
> {
  /**
   * The algorithm to compress the payload with.
   * Please note that not all servers support all algorithms.
   * @defaultValue 'gzip'
   */
  algorithm?: C;
  /**
   * Options for the chosen compression algorithm, e.g. to control the compression effort.
   */
  compressOptions?: C extends 'brotli'
    ? zlib.BrotliOptions
    : C extends 'zstd'
      ? // TODO: Use `zlib.ZstdOptions` when available in `@types/node` for oldest supported Node.js version
        Record<string, any>
      : zlib.ZlibOptions;
  /**
   * Compression mode. Can be 'auto', 'passthrough' or a boolean.
   * - In 'auto' mode, the payload is compressed based on the `autoCompressMinSize` threshold.
   * - In 'passthrough' mode, it is assumed that the payload is already compressed.
   * - If `true` is provided, the payload will always be compressed.
   * - If `false` is provided, the payload will never be compressed.
   * @defaultValue 'auto'
   */
  mode?: 'auto' | 'passthrough' | boolean;
  /**
   * Minimum size in bytes a payload must have to be compressed in 'auto' mode.
   * @defaultValue 1024
   */
  autoCompressMinSize?: number;
}

/**
 * Determines whether the payload needs compression based on the provided options.
 * @param payload - The HTTP request payload.
 * @param options - Configuration options for request compression.
 * @returns Returns one of:
 * - `true` if the payload should be compressed and Content-Encoding header should be set.
 * - `'header-only'` if only the Content-Encoding header should be set (passthrough mode).
 * - `false` if compression should be skipped entirely (no header, no compression).
 */
function checkIfNeedsCompression<
  C extends RequestCompressionAlgorithm = 'gzip'
>(
  payload: unknown,
  options?: RequestCompressionMiddlewareOptions<C>
): boolean | 'header-only' {
  const mode = options?.mode ?? 'auto';
  if (mode === 'passthrough') {
    return 'header-only';
  }
  if (mode === 'auto') {
    const minSize = options?.autoCompressMinSize ?? 1024;
    let payloadSize: number;
    try {
      payloadSize = Buffer.byteLength(payload as any);
    } catch (e: any) {
      throw new ErrorWithCause(
        "Could not determine payload size for 'auto' compression decision.",
        e
      );
    }
    const shouldCompress = payloadSize >= minSize;
    const comparison = shouldCompress ? '>=' : '<';
    const action = shouldCompress ? 'Compressing' : 'Skipping compression';
    logger.debug(
      `Auto compression: payload size ${payloadSize} bytes ${comparison} threshold ${minSize} bytes. ${action}.`
    );
    return shouldCompress;
  }
  return Boolean(mode);
}

function getContentEncodingValue(
  algorithm?: RequestCompressionAlgorithm
): string {
  switch (algorithm) {
    case 'brotli':
      return 'br';
    case undefined:
    case 'gzip':
      return 'gzip';
    default:
      return algorithm;
  }
}

/**
 * Middleware to compress HTTP request payloads.
 * @param options - Configuration options for request compression.
 * @remarks
 * **Middleware Ordering**: Place compression middleware early in your middleware array,
 * typically after logging/csrf but before resilience middleware (retry, timeout, circuit breaker).
 * This ensures the payload is compressed once and reused across retry attempts.
 * @returns An HTTP middleware that compresses request payloads based on the provided options.
 */
export function compressRequest<C extends RequestCompressionAlgorithm = 'gzip'>(
  options?: RequestCompressionMiddlewareOptions<C>
): HttpMiddleware {
  return (middlewareOptions: HttpMiddlewareOptions) => async requestConfig => {
    const algorithm: RequestCompressionAlgorithm = options?.algorithm ?? 'gzip';

    const needsCompression = checkIfNeedsCompression(
      requestConfig.data,
      options
    );

    if (needsCompression === false) {
      return middlewareOptions.fn(requestConfig);
    }

    // Check existing Content-Encoding header - append to existing if present
    const currentValue = pickValueIgnoreCase(
      requestConfig.headers,
      'content-encoding'
    );
    const algorithmValue = getContentEncodingValue(algorithm);
    const targetValue = currentValue
      ? `${currentValue}, ${algorithmValue}`
      : algorithmValue;
    requestConfig.headers = mergeIgnoreCase(requestConfig.headers, {
      'content-encoding': targetValue
    });

    if (needsCompression === 'header-only') {
      return middlewareOptions.fn(requestConfig);
    }

    const compressor = compressors[algorithm];
    if (!compressor) {
      if (algorithm === 'zstd') {
        throw new Error(
          `'zstd' compression is not supported in this Node.js versions older than v22.15.0 to use 'zstd'. Supported algorithms for this version are: ${getSupportedAlgorithms()}.`
        );
      }
      throw new Error(
        `Unsupported compression algorithm '${algorithm}'. Supported algorithms are: ${getSupportedAlgorithms()}.`
      );
    }

    // TODO: (future) Consider streaming compression for large payloads
    const compressed = await compressor(
      requestConfig.data,
      options?.compressOptions as any
    ).catch((err: Error) => {
      throw new ErrorWithCause(
        `Failed to compress request payload using '${algorithm}'.`,
        err
      );
    });

    requestConfig.data = compressed;

    return middlewareOptions.fn(requestConfig);
  };
}
