import { createPublicKey } from 'node:crypto';
import nock from 'nock';
import {
  jku,
  publicKey,
  signedJwtForVerification,
  xsuaaBindingMock
} from '../../../../../test-resources/test/test-util';
import { clearXsuaaServices } from '../environment-accessor';
import { verifyJwt } from './verify';

const jwtPayload = {
  sub: '1234567890',
  name: 'John Doe',
  iat: 1516239022,
  ext_attr: { enhancer: 'XSUAA' },
  aud: ['xsapp-myapp!123.clientid'],
  zid: 'my-zone',
  client_id: 'clientid'
};

export function responseWithPublicKey(key: string = publicKey) {
  const pubKey = createPublicKey(key);
  const jwk = pubKey.export({ format: 'jwk' });
  return {
    keys: [
      {
        use: 'sig',
        kid: 'key-id-1',
        alg: 'RS256',
        ...jwk
      }
    ]
  };
}

describe('verifyJwt())', () => {
  beforeEach(() => {
    process.env.VCAP_SERVICES = JSON.stringify({
      xsuaa: [
        {
          ...xsuaaBindingMock,
          credentials: {
            ...xsuaaBindingMock.credentials,
            verificationkey: undefined
          }
        }
      ]
    });
  });

  afterEach(() => {
    nock.cleanAll();
    delete process.env.VCAP_SERVICES;
    clearXsuaaServices();
  });

  it('succeeds and decodes for correct key', async () => {
    nock(jku)
      .get('')
      .query({ zid: jwtPayload.zid })
      .reply(200, responseWithPublicKey());

    await expect(
      verifyJwt(signedJwtForVerification(jwtPayload))
    ).resolves.toEqual(jwtPayload);
  });

  it('succeeds and decodes for correct inline key', async () => {
    nock(jku)
      .get('')
      .query({ zid: jwtPayload.zid })
      .reply(200, responseWithPublicKey(publicKey));

    await expect(
      verifyJwt(signedJwtForVerification(jwtPayload))
    ).resolves.toEqual(jwtPayload);
  });

  it('fails for no key', async () => {
    nock(jku).get('').query({ zid: jwtPayload.zid }).reply(200, { keys: [] });

    await expect(
      verifyJwt(signedJwtForVerification(jwtPayload))
    ).rejects.toMatchObject({
      message: 'Failed to verify JWT.',
      cause: {
        message: 'JWKS does not contain a key for kid=key-id-1'
      }
    });
  });

  it('fails for incorrect key id', async () => {
    const response = responseWithPublicKey();
    response.keys[0].kid = 'otherKey';
    nock(jku).get('').query({ zid: jwtPayload.zid }).reply(200, response);

    await expect(() =>
      verifyJwt(signedJwtForVerification(jwtPayload))
    ).rejects.toMatchObject({
      message: 'Failed to verify JWT.',
      cause: {
        message: 'JWKS does not contain a key for kid=key-id-1'
      }
    });
  });

  xit('fails if the verification key does not conform with the signed JWT', async () => {
    nock(jku)
      .get('')
      .query({ zid: jwtPayload.zid })
      .reply(200, responseWithPublicKey('WRONG'));

    await expect(() =>
      verifyJwt(signedJwtForVerification(jwtPayload))
    ).rejects.toThrowErrorMatchingInlineSnapshot('"Failed to verify JWT."');
  });

  it('caches the key after fetching it', async () => {
    // We mock only a single HTTP call
    nock(jku)
      .get('')
      .query({ zid: jwtPayload.zid })
      .reply(200, responseWithPublicKey());

    await verifyJwt(signedJwtForVerification(jwtPayload), {
      cacheVerificationKeys: true
    });
    // If you execute all tests the cache of xssec is populated already and the nock remains. Hence this extra clean.
    nock.cleanAll();

    // But due to caching multiple calls should not lead to errors
    await expect(
      verifyJwt(signedJwtForVerification(jwtPayload), {
        cacheVerificationKeys: true
      })
    ).resolves.toEqual(jwtPayload);
  });

  it('fails on the second call when caching is disabled', async () => {
    nock(jku)
      .get('')
      .query({ zid: jwtPayload.zid })
      .reply(200, responseWithPublicKey());

    await verifyJwt(signedJwtForVerification(jwtPayload), {
      cacheVerificationKeys: false
    });

    nock(jku).get('/').query({ zid: jwtPayload.zid }).reply(500);

    await expect(() =>
      verifyJwt(signedJwtForVerification(jwtPayload))
    ).rejects.toThrowErrorMatchingInlineSnapshot('"Failed to verify JWT."');
  });

  it('caches by default', async () => {
    nock(jku)
      .get('')
      .query({ zid: jwtPayload.zid })
      .reply(200, responseWithPublicKey());

    const jwt = signedJwtForVerification(jwtPayload);
    await verifyJwt(jwt);
    nock.cleanAll();
    // Second call does not fail due to caching.
    await verifyJwt(jwt);
  });
});
