import * as zlib from 'node:zlib';
import { promisify } from 'node:util';
import nock from 'nock';
import axios from 'axios';
import { compressRequest } from './compress-request-middleware';
import { executeHttpRequest } from './http-client';
import type { HttpRequestConfig } from './http-client-types';
import { createLogger, ErrorWithCause } from '@sap-cloud-sdk/util';

const gunzip = promisify(zlib.gunzip);
const brotliDecompress = promisify(zlib.brotliDecompress);
const deflateDecompress = promisify(zlib.inflate);
const zstdDecompress = zlib.zstdDecompress
  ? promisify(zlib.zstdDecompress)
  : undefined;

describe('compressRequest middleware', () => {
  const host = 'http://example.com';
  const testPayload = 'This is a test payload that should be compressed';
  const largePayload = 'x'.repeat(2000); // 2KB payload for auto mode testing

  async function executeAndGetConfig(
    destination: any,
    config: any,
    options?: any
  ): Promise<any> {
    const spy = jest.spyOn(axios, 'request');
    await executeHttpRequest(destination, config, options);
    expect(spy).toHaveBeenCalledTimes(1);
    return spy.mock.calls[0][0];
  }

  function createTestConfig(
    overrides: Partial<HttpRequestConfig> = {}
  ): HttpRequestConfig {
    return {
      method: 'POST',
      url: '/test',
      ...overrides
    };
  }

  afterEach(() => {
    nock.cleanAll();
    jest.clearAllMocks();
  });

  describe('mode: never', () => {
    it('does not compress payload when mode is never', async () => {
      nock(host).post('/test', testPayload).reply(200, {});

      const call = await executeAndGetConfig(
        { url: host },
        createTestConfig({
          data: testPayload,
          middleware: [compressRequest({ mode: 'never' })]
        }),
        { fetchCsrfToken: false }
      );

      expect(call.data).toBe(testPayload);
      expect(call.headers?.['content-encoding']).toBeUndefined();
    });
  });

  describe('mode: always (always compress)', () => {
    it('compresses payload with gzip by default', async () => {
      nock(host).post('/test').reply(200, {});

      const call = await executeAndGetConfig(
        { url: host },
        createTestConfig({
          data: testPayload,
          middleware: [compressRequest({ mode: 'always' })]
        }),
        { fetchCsrfToken: false }
      );

      expect(Buffer.isBuffer(call.data)).toBe(true);
      expect(call.headers?.['content-encoding']).toBe('gzip');

      const decompressed = await gunzip(call.data as Buffer);
      expect(decompressed.toString()).toBe(testPayload);
    });

    it('compresses payload with brotli algorithm', async () => {
      nock(host).post('/test').reply(200, {});

      const call = await executeAndGetConfig(
        { url: host },
        createTestConfig({
          data: testPayload,
          middleware: [compressRequest({ mode: 'always', algorithm: 'brotli' })]
        }),
        { fetchCsrfToken: false }
      );

      expect(Buffer.isBuffer(call.data)).toBe(true);
      expect(call.headers?.['content-encoding']).toBe('br');

      const decompressed = await brotliDecompress(call.data as Buffer);
      expect(decompressed.toString()).toBe(testPayload);
    });

    it('compresses payload with deflate algorithm', async () => {
      nock(host).post('/test').reply(200, {});

      const call = await executeAndGetConfig(
        { url: host },
        createTestConfig({
          data: testPayload,
          middleware: [
            compressRequest({ mode: 'always', algorithm: 'deflate' })
          ]
        }),
        { fetchCsrfToken: false }
      );

      expect(Buffer.isBuffer(call.data)).toBe(true);
      expect(call.headers?.['content-encoding']).toBe('deflate');

      const decompressed = await deflateDecompress(call.data as Buffer);
      expect(decompressed.toString()).toBe(testPayload);
    });

    (zstdDecompress ? it : it.skip)(
      'compresses payload with zstd algorithm',
      async () => {
        nock(host).post('/test').reply(200, {});

        const call = await executeAndGetConfig(
          { url: host },
          createTestConfig({
            data: testPayload,
            middleware: [compressRequest({ mode: 'always', algorithm: 'zstd' })]
          }),
          { fetchCsrfToken: false }
        );

        expect(Buffer.isBuffer(call.data)).toBe(true);
        expect(call.headers?.['content-encoding']).toBe('zstd');

        const decompressed = await zstdDecompress!(call.data as Buffer);
        expect(decompressed.toString()).toBe(testPayload);
      }
    );

    (zstdDecompress ? it.skip : it)(
      'throws error when zstd algorithm is used in unsupported Node.js version',
      async () => {
        nock(host).post('/test').reply(200, {});

        await expect(
          executeHttpRequest(
            { url: host },
            {
              method: 'POST',
              url: '/test',
              data: testPayload,
              middleware: [
                compressRequest({ mode: 'always', algorithm: 'zstd' })
              ]
            },
            { fetchCsrfToken: false }
          )
        ).rejects.toThrow("'zstd' compression is not supported");
      }
    );

    it('compresses Buffer payloads', async () => {
      const bufferPayload = Buffer.from(testPayload);
      nock(host).post('/test').reply(200, {});

      const call = await executeAndGetConfig(
        { url: host },
        createTestConfig({
          data: bufferPayload,
          middleware: [compressRequest({ mode: 'always' })]
        }),
        { fetchCsrfToken: false }
      );

      expect(Buffer.isBuffer(call.data)).toBe(true);
      expect(call.headers?.['content-encoding']).toBe('gzip');

      const decompressed = await gunzip(call.data as Buffer);
      expect(decompressed.toString()).toBe(testPayload);
    });

    it('compresses Uint8Array payloads', async () => {
      const uint8Payload = new Uint8Array(Buffer.from(testPayload));
      nock(host).post('/test').reply(200, {});

      const call = await executeAndGetConfig(
        { url: host },
        createTestConfig({
          data: uint8Payload,
          middleware: [compressRequest({ mode: 'always' })]
        }),
        { fetchCsrfToken: false }
      );

      expect(Buffer.isBuffer(call.data)).toBe(true);
      expect(call.headers?.['content-encoding']).toBe('gzip');
    });
  });

  describe('mode: auto', () => {
    it('compresses payload when size exceeds default threshold (1024 bytes)', async () => {
      nock(host).post('/test').reply(200, {});

      const call = await executeAndGetConfig(
        { url: host },
        createTestConfig({
          data: largePayload,
          middleware: [compressRequest({ mode: 'auto' })]
        }),
        { fetchCsrfToken: false }
      );

      expect(Buffer.isBuffer(call.data)).toBe(true);
      expect(call.headers?.['content-encoding']).toBe('gzip');
    });

    it('does not compress payload when size is below threshold', async () => {
      const smallPayload = 'small';
      nock(host).post('/test', smallPayload).reply(200, {});

      const call = await executeAndGetConfig(
        { url: host },
        createTestConfig({
          data: smallPayload,
          middleware: [compressRequest({ mode: 'auto' })]
        }),
        { fetchCsrfToken: false }
      );

      expect(call.data).toBe(smallPayload);
      expect(call.headers?.['content-encoding']).toBeUndefined();
    });

    it('respects custom autoCompressMinSize threshold', async () => {
      const mediumPayload = 'x'.repeat(500); // 500 bytes
      nock(host).post('/test').reply(200, {});

      const call = await executeAndGetConfig(
        { url: host },
        createTestConfig({
          data: mediumPayload,
          middleware: [
            compressRequest({ mode: 'auto', autoCompressMinSize: 400 })
          ]
        }),
        { fetchCsrfToken: false }
      );

      expect(Buffer.isBuffer(call.data)).toBe(true);
      expect(call.headers?.['content-encoding']).toBe('gzip');
    });

    it('skips compression for unsupported payload types in auto mode', async () => {
      // Object payload that cannot be sized, but is larger than threshold
      const objectPayload = { key: 'x'.repeat(2000) };
      nock(host).post('/test', objectPayload).reply(200, {});

      const logger = createLogger({
        package: 'http-client',
        messageContext: 'compress-request-middleware'
      });
      const errorSpy = jest.spyOn(logger!, 'error');

      const call = await executeAndGetConfig(
        { url: host },
        createTestConfig({
          data: objectPayload,
          middleware: [compressRequest({ mode: 'auto' })]
        }),
        { fetchCsrfToken: false }
      );

      expect(call.data).toBe(objectPayload);
      expect(call.headers?.['content-encoding']).toBeUndefined();
      expect(errorSpy).toHaveBeenCalledTimes(1);
      const loggedError = errorSpy.mock.calls[0][0] as ErrorWithCause;
      expect(loggedError).toBeInstanceOf(ErrorWithCause);
      expect(loggedError.message).toBe(
        "Could not determine payload size for 'auto' compression decision."
      );
    });
  });

  describe('mode: header-only', () => {
    it('sets Content-Encoding header without compressing payload', async () => {
      nock(host).post('/test', testPayload).reply(200, {});

      const call = await executeAndGetConfig(
        { url: host },
        createTestConfig({
          data: testPayload,
          middleware: [compressRequest({ mode: 'header-only' })]
        }),
        { fetchCsrfToken: false }
      );

      expect(call.data).toBe(testPayload);
      expect(call.headers?.['content-encoding']).toBe('gzip');
    });
  });

  describe('header management', () => {
    it('appends to existing Content-Encoding header when value differs', async () => {
      nock(host).post('/test').reply(200, {});

      const call = await executeAndGetConfig(
        { url: host },
        createTestConfig({
          data: testPayload,
          headers: { 'Content-Encoding': 'deflate' },
          middleware: [compressRequest({ mode: 'always' })]
        }),
        { fetchCsrfToken: false }
      );

      expect(Buffer.isBuffer(call.data)).toBe(true);
      expect(call.headers?.['content-encoding']).toBe('deflate, gzip');
    });

    it('handles case-insensitive Content-Encoding header', async () => {
      nock(host).post('/test').reply(200, {});

      const call = await executeAndGetConfig(
        { url: host },
        createTestConfig({
          data: testPayload,
          headers: { 'content-encoding': 'deflate' },
          middleware: [compressRequest({ mode: 'always' })]
        }),
        { fetchCsrfToken: false }
      );

      expect(Buffer.isBuffer(call.data)).toBe(true);
      expect(call.headers?.['content-encoding']).toBe('deflate, gzip');
    });
  });

  describe('error handling', () => {
    it('throws error for unsupported algorithm', async () => {
      // Test with an invalid algorithm that doesn't exist
      await expect(
        executeHttpRequest(
          { url: host },
          {
            method: 'POST',
            url: '/test',
            data: testPayload,
            middleware: [
              compressRequest({ mode: 'always', algorithm: 'invalid' as any })
            ]
          },
          { fetchCsrfToken: false }
        )
      ).rejects.toThrow('Unsupported compression algorithm');
    });
  });

  describe('middleware composition', () => {
    it('works with multiple middleware in chain', async () => {
      nock(host).post('/test').reply(200, {});

      const customMiddleware =
        () =>
        (middlewareOptions: any) =>
        async (requestConfig: HttpRequestConfig) => {
          requestConfig.headers = {
            ...requestConfig.headers,
            'x-custom': 'header'
          };
          return middlewareOptions.fn(requestConfig);
        };

      const call = await executeAndGetConfig(
        { url: host },
        createTestConfig({
          data: testPayload,
          middleware: [customMiddleware(), compressRequest({ mode: 'always' })]
        }),
        { fetchCsrfToken: false }
      );

      expect(call.headers?.['x-custom']).toBe('header');
      expect(call.headers?.['content-encoding']).toBe('gzip');
      expect(Buffer.isBuffer(call.data)).toBe(true);
    });
  });

  describe('compression options', () => {
    it('passes compressOptions to gzip', async () => {
      nock(host).post('/test').reply(200, {});

      const call = await executeAndGetConfig(
        { url: host },
        createTestConfig({
          data: largePayload,
          middleware: [
            compressRequest({
              mode: 'always',
              compressOptions: { level: 9 }
            })
          ]
        }),
        { fetchCsrfToken: false }
      );

      expect(Buffer.isBuffer(call.data)).toBe(true);

      const defaultCompressed = await promisify(zlib.gzip)(largePayload);
      expect((call.data as Buffer).length).toBeLessThanOrEqual(
        defaultCompressed.length
      );
    });
  });
});
