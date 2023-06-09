import { X509Certificate } from 'node:crypto';
import { certAsString } from '@sap-cloud-sdk/test-util';
import mock from 'mock-fs';
import { createLogger } from '@sap-cloud-sdk/util';
import { registerDestinationCache } from './register-destination-cache';

const { mtls, destination } = registerDestinationCache;

describe('register-destination-cache', () => {
  beforeAll(() => {
    process.env.CF_INSTANCE_CERT = 'cf-crypto/cf-cert';
    process.env.CF_INSTANCE_KEY = 'cf-crypto/cf-key';
  });

  beforeEach(() => {
    mock({
      'cf-crypto': {
        'cf-cert': certAsString,
        'cf-key': 'my-key'
      }
    });
  });

  afterEach(() => {
    destination.clear();
    mtls.clear();
    jest.clearAllMocks();
  });

  afterAll(() => {
    delete process.env.CF_INSTANCE_CERT;
    delete process.env.CF_INSTANCE_KEY;
  });

  it('retrieveMtlsOptionsFromCache returns undefined if nothing was cached yet', async () => {
    mtls.useMtlsCache = true;
    const mtlsOptions = await mtls.retrieveMtlsOptionsFromCache();
    expect(mtlsOptions).toBeUndefined();
  });

  it('getMtlsOptions calls retrieveMtlsOptionsFromCache twice if nothing was cached yet', async () => {
    const currentTimeInMs = Date.now();
    const validCertTime = currentTimeInMs + 10000;
    jest
      .spyOn(X509Certificate.prototype, 'validTo', 'get')
      .mockImplementation(() => validCertTime.toString());
    const cacheSpy = jest.spyOn(mtls, 'retrieveMtlsOptionsFromCache');

    mtls.useMtlsCache = true;
    const mtlsOptions = await mtls.getMtlsOptions();

    expect(mtlsOptions?.cert).toEqual(certAsString);
    expect(cacheSpy).toHaveBeenCalledTimes(2);
  });

  it('getMtlsOptions calls retrieveMtlsOptionsFromCache only once if mtlsOptions were already cached', async () => {
    const currentTimeInMs = Date.now();
    const validCertTime = currentTimeInMs + 10000;
    jest
      .spyOn(X509Certificate.prototype, 'validTo', 'get')
      .mockImplementation(() => validCertTime.toString());
    const cacheSpy = jest.spyOn(mtls, 'retrieveMtlsOptionsFromCache');

    mtls.useMtlsCache = true;
    await mtls.cacheMtlsOptions();
    const mtlsOptions = await mtls.getMtlsOptions();

    expect(mtlsOptions?.cert).toEqual(certAsString);
    expect(cacheSpy).toHaveBeenCalledTimes(1);
  });

  it('getMtlsOptions calls retrieveMtlsOptionsFromCache twice if certificate was no longer valid', async () => {
    const currentTimeInMs = Date.now();
    const expiredCertTime = currentTimeInMs - 10000;
    const validCertTime = currentTimeInMs + 10000;
    jest
      .spyOn(X509Certificate.prototype, 'validTo', 'get')
      .mockImplementationOnce(() => expiredCertTime.toString())
      .mockImplementationOnce(() => validCertTime.toString());
    const cacheSpy = jest.spyOn(mtls, 'retrieveMtlsOptionsFromCache');

    mtls.useMtlsCache = true;
    await mtls.cacheMtlsOptions();
    const mtlsOptions = await mtls.getMtlsOptions();

    expect(mtlsOptions?.cert).toEqual(certAsString);
    expect(cacheSpy).toHaveBeenCalledTimes(2);
  });

  it('throws warning if neither the current, nor the past mtlsOptions certificate are valid anymore, returns empty object', async () => {
    const currentTimeInMs = Date.now();
    const expiredCertTime = currentTimeInMs - 10000;
    jest
      .spyOn(X509Certificate.prototype, 'validTo', 'get')
      .mockImplementation(() => expiredCertTime.toString());
    const cacheSpy = jest.spyOn(mtls, 'retrieveMtlsOptionsFromCache');
    const logger = createLogger('register-destination-cache');
    const warnSpy = jest.spyOn(logger, 'warn');

    mtls.useMtlsCache = true;
    await mtls.cacheMtlsOptions();
    const mtlsOptions = await mtls.getMtlsOptions();

    expect(mtlsOptions?.cert).toBeUndefined();
    expect(cacheSpy).toHaveBeenCalledTimes(2);
    expect(warnSpy).toHaveBeenCalledTimes(1);
  });
});
