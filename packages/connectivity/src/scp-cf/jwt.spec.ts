import { IncomingMessage } from 'http';
import { Socket } from 'net';
import { unixEOL } from '@sap-cloud-sdk/util';
import nock from 'nock';
import {
  mockServiceBindings,
  publicKey,
  signedJwtForVerification,
  xsuaaBindingMock
} from '../../../../test-resources/test/test-util';
import {
  audiences,
  decodeJwtComplete,
  isXsuaaToken,
  retrieveJwt,
  verifyJwt
} from './jwt';

const jwtPayload = {
  sub: '1234567890',
  name: 'John Doe',
  iat: 1516239022,
  ext_attr: { enhancer: 'XSUAA' },
  aud: ['clientid'],
  zid: 'my-zone'
};

export function responseWithPublicKey(key = publicKey) {
  return {
    keys: [
      {
        kty: 'RSA',
        e: 'AQAB',
        use: 'sig',
        kid: 'key-id-1',
        alg: 'RS256',
        value: key,
        n: 'AMf4zeb9Zqf01Z_Z00KGFSFHwrFAx2t1Ka-bQ2Qu5s5U6zdj58K7s8ku8NSXfkrasFuP75_O7mtmJWc1PDm9I0eJWzjwimhyItJMjbSV0L0Oy2TxvHqUC28dCCD_1i1VVbQfGy-Tlrh5mt6VJ4m25gE7WzoeS5LENsyzJ4BI1BediUMs06Y6EJGoadATXv3a5QKjtud5HomOtxS-m3pSoyRpkqnZ6LUl8Qdspvh0NEoWjb0xSxL4tvjm5MoxloBaUGqAnBqtCl9MtJj8zr3RbDU_qwRXZB4iviZet_Em4ptc_XyLRWx_YYlcGN-0fay7R9WCotz7gEzI3_wye5lJbg0'
      }
    ]
  };
}

describe('jwt', () => {
  describe('isXsuaa', () => {
    it('returns true if jku and uaa are from same domain', () => {
      const jwt = decodeJwtComplete(
        signedJwtForVerification(
          {},
          'https://myTenant.authentication.sap.hana.ondemand.com/token_keys'
        )
      );
      mockServiceBindings();
      expect(isXsuaaToken(jwt)).toBe(true);
    });

    it('returns false if jku is missing', () => {
      const jwt = decodeJwtComplete(signedJwtForVerification({}, undefined));
      mockServiceBindings();
      expect(isXsuaaToken(jwt)).toBe(false);
    });

    it('returns false if jku and uaa are from different domain', () => {
      const jwt = decodeJwtComplete(
        signedJwtForVerification(
          {},
          'https://myTenant.some.non.xsuaa.domain.com/token_keys'
        )
      );
      mockServiceBindings();
      expect(isXsuaaToken(jwt)).toBe(false);
    });
  });
  describe('retrieveJwt', () => {
    it('returns undefined when incoming message has no auth header', () => {
      expect(retrieveJwt(createIncomingMessageWithJWT())).toBeUndefined();
    });

    it('returns undefined when incoming message has non bearer auth token', () => {
      expect(retrieveJwt(createIncomingMessageWithJWT('test'))).toBeUndefined();
    });

    it('correctly reads jwt from incoming message with correct auth token', () => {
      expect(retrieveJwt(createIncomingMessageWithJWT('Bearer test'))).toBe(
        'test'
      );
    });

    it('works for arbitrary capitalizations of "bearer" (e.g. lowercase)', () => {
      expect(retrieveJwt(createIncomingMessageWithJWT('bearer test'))).toBe(
        'test'
      );
      expect(retrieveJwt(createIncomingMessageWithJWT('BeArEr test'))).toBe(
        'test'
      );
      expect(retrieveJwt(createIncomingMessageWithJWT('BEARER test'))).toBe(
        'test'
      );
    });
  });

  describe('verifyJwt', () => {
    const jku = 'https://my-jku-url.authentication.sap.hana.ondemand.com';

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
    });

    it('succeeds and decodes for correct key', async () => {
      nock(jku).get('/').reply(200, responseWithPublicKey());
      await expect(
        verifyJwt(signedJwtForVerification(jwtPayload, jku))
      ).resolves.toEqual(jwtPayload);
    });

    it('succeeds and decodes for correct inline key', async () => {
      nock(jku)
        .get('/')
        .reply(200, responseWithPublicKey(publicKey.split(unixEOL).join('')));

      await expect(
        verifyJwt(signedJwtForVerification(jwtPayload, jku))
      ).resolves.toEqual(jwtPayload);
    });

    it('fails for no key', async () => {
      nock(jku).get('/').reply(200, { keys: [] });

      await expect(
        verifyJwt(signedJwtForVerification(jwtPayload, jku), {
          cacheVerificationKeys: false
        })
      ).rejects.toMatchObject({
        message: 'Failed to verify JWT.',
        cause: {
          message:
            'Obtained token keys from UAA, but key with requested keyID "https://my-jku-url.authentication.sap.hana.ondemand.comkey-id-1" still not found in cache.'
        }
      });
    });

    it('fails for incorrect key id', async () => {
      const response = responseWithPublicKey();
      response.keys[0].kid = 'unknown';
      nock(jku).get('/').reply(200, response);

      await expect(() =>
        verifyJwt(signedJwtForVerification(jwtPayload, jku), {
          cacheVerificationKeys: false
        })
      ).rejects.toMatchObject({
        message: 'Failed to verify JWT.',
        cause: {
          message:
            'Obtained token keys from UAA, but key with requested keyID "https://my-jku-url.authentication.sap.hana.ondemand.comkey-id-1" still not found in cache.'
        }
      });
    });

    it('fails for jku URL and xsuaa different domain', async () => {
      await expect(() =>
        verifyJwt(
          signedJwtForVerification(
            jwtPayload,
            'https://my-jku-url.some.wrong.domain.com'
          )
        )
      )
        .rejects.toThrowError()
        .catch(err => {
          expect(err.cause).toEqual('test');
        });
    });

    it('fails if the verification key is not conform with the signed JWT', async () => {
      nock(jku).get('/').reply(200, responseWithPublicKey('WRONG'));

      await expect(() =>
        verifyJwt(signedJwtForVerification(jwtPayload, jku), {
          cacheVerificationKeys: false
        })
      ).rejects.toThrowErrorMatchingInlineSnapshot('"Failed to verify JWT."');
    });

    it('caches the key after fetching it', async () => {
      // We mock only a single HTTP call
      nock(jku).get('/').reply(200, responseWithPublicKey());

      await verifyJwt(signedJwtForVerification(jwtPayload, jku), {
        cacheVerificationKeys: true
      });
      // If you execute all tests the cache of xssec is populated already and the nock remains. Hence this extra clear.
      nock.cleanAll();

      // But due to caching multiple calls should not lead to errors
      await expect(
        verifyJwt(signedJwtForVerification(jwtPayload, jku), {
          cacheVerificationKeys: true
        })
      ).resolves.toEqual(jwtPayload);
    });

    it('fails on the second call when caching is disabled', async () => {
      nock(jku).get('/').reply(200, responseWithPublicKey());

      await verifyJwt(signedJwtForVerification(jwtPayload, jku), {
        cacheVerificationKeys: false
      });

      nock(jku).get('/').reply(500);

      await expect(() =>
        verifyJwt(signedJwtForVerification(jwtPayload, jku), {
          cacheVerificationKeys: false
        })
      ).rejects.toThrowErrorMatchingInlineSnapshot('"Failed to verify JWT."');
    });

    it('caches per default', async () => {
      nock(jku).get('/').reply(200, responseWithPublicKey());

      const jwt = signedJwtForVerification(jwtPayload, jku);
      await verifyJwt(jwt);
      nock.cleanAll();
      // Second call does not fail due to caching.
      await verifyJwt(jwt);
    });

    it('fetches a new key when a the cache has been disabled', async () => {
      nock(jku).get('/').reply(200, responseWithPublicKey());

      const jwt = signedJwtForVerification(jwtPayload, jku);
      await verifyJwt(jwt);
      // If you execute all tests the cache of xssec is populated already and the nock remains. Hence this extra clear.
      nock.cleanAll();

      const nockAfter = nock(jku).get('/').reply(200, responseWithPublicKey());
      await verifyJwt(jwt, { cacheVerificationKeys: false });
      expect(nockAfter.isDone()).toBe(true);
    });
  });

  describe('audiences', () => {
    it('returns a set of the entries of the "aud" claim, if present. If a dot is present, we only take everything before the dot', () => {
      const token = {
        aud: ['one', 'two.one', 'three.two.one']
      };

      expect(audiences(token)).toEqual(new Set(['one', 'two', 'three']));
    });

    it('returns an empty set if the "aud" claim is empty', () => {
      const tokenEmpty = { aud: [] };

      expect(audiences(tokenEmpty)).toEqual(new Set());
    });

    it('returns a set of the entries of the "scope" claim iff the "aud" claim is not present and if the entry contains a dot (and then we again only take everything before the dot', () => {
      const token = {
        scope: ['one', 'two.one', 'three.two.one']
      };

      expect(audiences(token)).toEqual(new Set(['two', 'three']));
    });

    it('returns an empty set if the "aud" claim is missing and the "scope" claim is empty', () => {
      const tokenEmpty = { scope: [] };

      expect(audiences(tokenEmpty)).toEqual(new Set());
    });

    it('returns an empty set if neither the "aud" nor the "scope" claim are present', () => {
      expect(audiences({})).toEqual(new Set());
    });
  });
});

function createIncomingMessageWithJWT(token?: string): IncomingMessage {
  const msg = new IncomingMessage(new Socket());
  if (token) {
    msg.headers.authorization = token;
  }

  return msg;
}
