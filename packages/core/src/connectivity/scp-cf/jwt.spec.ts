import { IncomingMessage } from 'http';
import { Socket } from 'net';
import { unixEOL } from '@sap-cloud-sdk/util';
import nock = require('nock');
import {
  publicKey,
  signedJwtForVerification
} from '../../../test/test-util/keys';
import { audiences, retrieveJwt, verificationKeyCache, verifyJwt } from './jwt';
const jwtPayload = {
  sub: '1234567890',
  name: 'John Doe',
  iat: 1516239022
};

const jwtPayload2 = {
  sub: '1234567890',
  name: 'Jane Doe',
  iat: 1516239022
};

describe('jwt', () => {
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
    const basicHeader = 'Basic Y2xpZW50aWQ6Y2xpZW50c2VjcmV0';
    const response = {
      keys: [
        {
          kty: 'RSA',
          e: 'AQAB',
          use: 'sig',
          kid: 'key-id-0',
          alg: 'RS256',
          value: publicKey('test.pub'),
          n: 'AMf4zeb9Zqf01Z_Z00KGFSFHwrFAx2t1Ka-bQ2Qu5s5U6zdj58K7s8ku8NSXfkrasFuP75_O7mtmJWc1PDm9I0eJWzjwimhyItJMjbSV0L0Oy2TxvHqUC28dCCD_1i1VVbQfGy-Tlrh5mt6VJ4m25gE7WzoeS5LENsyzJ4BI1BediUMs06Y6EJGoadATXv3a5QKjtud5HomOtxS-m3pSoyRpkqnZ6LUl8Qdspvh0NEoWjb0xSxL4tvjm5MoxloBaUGqAnBqtCl9MtJj8zr3RbDU_qwRXZB4iviZet_Em4ptc_XyLRWx_YYlcGN-0fay7R9WCotz7gEzI3_wye5lJbg0'
        }
      ]
    };
    const responseWithoutNewlines = {
      keys: [
        {
          kty: 'RSA',
          e: 'AQAB',
          use: 'sig',
          kid: 'key-id-0',
          alg: 'RS256',
          value: publicKey().split(unixEOL).join(''),
          n: 'AMf4zeb9Zqf01Z_Z00KGFSFHwrFAx2t1Ka-bQ2Qu5s5U6zdj58K7s8ku8NSXfkrasFuP75_O7mtmJWc1PDm9I0eJWzjwimhyItJMjbSV0L0Oy2TxvHqUC28dCCD_1i1VVbQfGy-Tlrh5mt6VJ4m25gE7WzoeS5LENsyzJ4BI1BediUMs06Y6EJGoadATXv3a5QKjtud5HomOtxS-m3pSoyRpkqnZ6LUl8Qdspvh0NEoWjb0xSxL4tvjm5MoxloBaUGqAnBqtCl9MtJj8zr3RbDU_qwRXZB4iviZet_Em4ptc_XyLRWx_YYlcGN-0fay7R9WCotz7gEzI3_wye5lJbg0'
        }
      ]
    };
    const responseWithWrongKey = {
      keys: [
        {
          kty: 'RSA',
          e: 'AQAB',
          use: 'sig',
          kid: 'key-id-0',
          alg: 'RS256',
          value: 'falschfalschfalsch',
          n: 'AMf4zeb9Zqf01Z_Z00KGFSFHwrFAx2t1Ka-bQ2Qu5s5U6zdj58K7s8ku8NSXfkrasFuP75_O7mtmJWc1PDm9I0eJWzjwimhyItJMjbSV0L0Oy2TxvHqUC28dCCD_1i1VVbQfGy-Tlrh5mt6VJ4m25gE7WzoeS5LENsyzJ4BI1BediUMs06Y6EJGoadATXv3a5QKjtud5HomOtxS-m3pSoyRpkqnZ6LUl8Qdspvh0NEoWjb0xSxL4tvjm5MoxloBaUGqAnBqtCl9MtJj8zr3RbDU_qwRXZB4iviZet_Em4ptc_XyLRWx_YYlcGN-0fay7R9WCotz7gEzI3_wye5lJbg0'
        }
      ]
    };

    const xsuaaUrl = 'https://example.com';
    const jku = 'https://my-jku-url.authentication.sap.hana.ondemand.com';

    beforeEach(() => {
      process.env.VCAP_SERVICES = JSON.stringify({
        xsuaa: [
          {
            credentials: {
              clientid: 'clientid',
              clientsecret: 'clientsecret',
              url: xsuaaUrl,
              uaadomain: 'authentication.sap.hana.ondemand.com'
            },
            name: 'my-xsuaa',
            plan: 'application',
            label: 'xsuaa'
          }
        ]
      });
    });

    afterEach(() => {
      nock.cleanAll();
      verificationKeyCache.clear();
      delete process.env.VCAP_SERVICES;
    });

    it('fails for no key', async () => {
      nock(jku, { reqheaders: { Authorization: basicHeader } })
        .get('/')
        .reply(200, { keys: [] });

      await expect(() =>
        verifyJwt(signedJwtForVerification(jwtPayload, jku))
      ).rejects.toMatchObject({
        message: 'Failed to verify JWT. Could not retrieve verification key.',
        cause: {
          message:
            'No verification keys have been returned by the XSUAA service.'
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
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        "\"The domains of the XSUAA and verification URL do not match. The XSUUA domain is 'authentication.sap.hana.ondemand.com' and the jku field provided in the JWT is 'my-jku-url.some.wrong.domain.com'.\""
      );
    });

    it('succeeds and decodes for correct key', async () => {
      nock(jku, { reqheaders: { Authorization: basicHeader } })
        .get('/')
        .reply(200, response);

      await expect(
        verifyJwt(signedJwtForVerification(jwtPayload, jku))
      ).resolves.toEqual(jwtPayload);
    });

    it('succeeds and decodes for correct inline key', async () => {
      nock(jku, { reqheaders: { Authorization: basicHeader } })
        .get('/')
        .reply(200, responseWithoutNewlines);

      await expect(
        verifyJwt(signedJwtForVerification(jwtPayload, jku))
      ).resolves.toEqual(jwtPayload);
    });

    it('caches the key after fetching it', async () => {
      // We mock only a single HTTP call
      nock(jku, { reqheaders: { Authorization: basicHeader } })
        .get('/')
        .reply(200, response);

      await verifyJwt(signedJwtForVerification(jwtPayload, jku));

      // But due to caching multiple calls should not lead to errors
      await expect(
        verifyJwt(signedJwtForVerification(jwtPayload, jku))
      ).resolves.toEqual(jwtPayload);
    });

    it('fails on the second call when caching is disabled', async () => {
      nock(jku, { reqheaders: { Authorization: basicHeader } })
        .get('/')
        .reply(200, response);

      await verifyJwt(signedJwtForVerification(jwtPayload, jku), {
        cacheVerificationKeys: false
      });

      nock(jku, { reqheaders: { Authorization: basicHeader } })
        .get('/')
        .reply(500);

      await expect(() =>
        verifyJwt(signedJwtForVerification(jwtPayload, jku))
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        '"Failed to verify JWT. Could not retrieve verification key."'
      );
    });

    it('fetches a new key when a key taken from the cache has been invalidated in the meantime', async () => {
      nock(jku, { reqheaders: { Authorization: basicHeader } })
        .get('/')
        .reply(200, response);

      const secondXsuaaMock = nock(jku, {
        reqheaders: { Authorization: basicHeader }
      })
        .get('/')
        .reply(200, response);

      const jwt1 = signedJwtForVerification(jwtPayload, jku);
      const jwt2 = signedJwtForVerification(jwtPayload2, jku);

      await verifyJwt(jwt1);
      verificationKeyCache.clear();

      await verifyJwt(jwt2);
      expect(secondXsuaaMock.isDone()).toBe(true);
    });

    it('fails if the verification key is not conform with the signed JWT', async () => {
      nock(jku, { reqheaders: { Authorization: basicHeader } })
        .get('/')
        .reply(200, responseWithWrongKey);

      await expect(() =>
        verifyJwt(signedJwtForVerification(jwtPayload, jku), {
          cacheVerificationKeys: false
        })
      ).rejects.toThrowErrorMatchingInlineSnapshot('"Invalid JWT."');
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
