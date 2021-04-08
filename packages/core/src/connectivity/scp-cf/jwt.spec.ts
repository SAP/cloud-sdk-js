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
          n:
            'AMf4zeb9Zqf01Z_Z00KGFSFHwrFAx2t1Ka-bQ2Qu5s5U6zdj58K7s8ku8NSXfkrasFuP75_O7mtmJWc1PDm9I0eJWzjwimhyItJMjbSV0L0Oy2TxvHqUC28dCCD_1i1VVbQfGy-Tlrh5mt6VJ4m25gE7WzoeS5LENsyzJ4BI1BediUMs06Y6EJGoadATXv3a5QKjtud5HomOtxS-m3pSoyRpkqnZ6LUl8Qdspvh0NEoWjb0xSxL4tvjm5MoxloBaUGqAnBqtCl9MtJj8zr3RbDU_qwRXZB4iviZet_Em4ptc_XyLRWx_YYlcGN-0fay7R9WCotz7gEzI3_wye5lJbg0'
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
          n:
            'AMf4zeb9Zqf01Z_Z00KGFSFHwrFAx2t1Ka-bQ2Qu5s5U6zdj58K7s8ku8NSXfkrasFuP75_O7mtmJWc1PDm9I0eJWzjwimhyItJMjbSV0L0Oy2TxvHqUC28dCCD_1i1VVbQfGy-Tlrh5mt6VJ4m25gE7WzoeS5LENsyzJ4BI1BediUMs06Y6EJGoadATXv3a5QKjtud5HomOtxS-m3pSoyRpkqnZ6LUl8Qdspvh0NEoWjb0xSxL4tvjm5MoxloBaUGqAnBqtCl9MtJj8zr3RbDU_qwRXZB4iviZet_Em4ptc_XyLRWx_YYlcGN-0fay7R9WCotz7gEzI3_wye5lJbg0'
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
          n:
            'AMf4zeb9Zqf01Z_Z00KGFSFHwrFAx2t1Ka-bQ2Qu5s5U6zdj58K7s8ku8NSXfkrasFuP75_O7mtmJWc1PDm9I0eJWzjwimhyItJMjbSV0L0Oy2TxvHqUC28dCCD_1i1VVbQfGy-Tlrh5mt6VJ4m25gE7WzoeS5LENsyzJ4BI1BediUMs06Y6EJGoadATXv3a5QKjtud5HomOtxS-m3pSoyRpkqnZ6LUl8Qdspvh0NEoWjb0xSxL4tvjm5MoxloBaUGqAnBqtCl9MtJj8zr3RbDU_qwRXZB4iviZet_Em4ptc_XyLRWx_YYlcGN-0fay7R9WCotz7gEzI3_wye5lJbg0'
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

    it('fails for no key', done => {
      nock(jku, { reqheaders: { Authorization: basicHeader } })
        .get('/')
        .reply(200, { keys: [] });

      verifyJwt(signedJwtForVerification(jwtPayload, jku))
        .then(() => done('Should have failed.'))
        .catch(error => {
          expect(error.message).toContain(
            'Failed to verify JWT - unable to get verification key!'
          );
          expect(error.stack).toContain(
            'No verification keys have been returned by the XSUAA service!'
          );
          done();
        });
    });

    it('fails for jku URL and xsuaa different domain', done => {
      verifyJwt(
        signedJwtForVerification(
          jwtPayload,
          'https://my-jku-url.some.wrong.domain.com'
        )
      )
        .then(() => done('Should have failed.'))
        .catch(error => {
          expect(error.message).toContain(
            'The domains of the XSUAA and verification URL do not match'
          );
          done();
        });
    });

    it('succeeds and decodes for correct key', done => {
      nock(jku, { reqheaders: { Authorization: basicHeader } })
        .get('/')
        .reply(200, response);

      verifyJwt(signedJwtForVerification(jwtPayload, jku))
        .then(() => done())
        .catch(done);
    });

    it('succeeds and decodes for correct inline key', done => {
      nock(jku, { reqheaders: { Authorization: basicHeader } })
        .get('/')
        .reply(200, responseWithoutNewlines);

      verifyJwt(signedJwtForVerification(jwtPayload, jku))
        .then(() => done())
        .catch(done);
    });

    it('caches the key after fetching it', done => {
      // We mock only a single HTTP call
      nock(jku, { reqheaders: { Authorization: basicHeader } })
        .get('/')
        .reply(200, response);

      // But due to caching multiple calls should not lead to errors
      verifyJwt(signedJwtForVerification(jwtPayload, jku))
        .then(() => verifyJwt(signedJwtForVerification(jwtPayload, jku)))
        .then(() => verifyJwt(signedJwtForVerification(jwtPayload, jku)))
        .then(() => done())
        .catch(done);
    });

    it('fails on the second call when caching is disabled', done => {
      // We mock only a single HTTP call
      nock(jku, { reqheaders: { Authorization: basicHeader } })
        .get('/')
        .reply(200, response);

      // So the second call should fail
      verifyJwt(signedJwtForVerification(jwtPayload, jku), {
        cacheVerificationKeys: false
      })
        .then(() =>
          verifyJwt(signedJwtForVerification(jwtPayload, jku), {
            cacheVerificationKeys: false
          })
        )
        .then(() => done('Should have failed!'))
        .catch(() => done());
    });

    it('fetches a new key when a key taken from the cache has been invalidated in the meantime', done => {
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

      verifyJwt(jwt1)
        .then(() => {
          verificationKeyCache.clear();
          return verifyJwt(jwt2);
        })
        .then(() => {
          expect(secondXsuaaMock.isDone()).toBe(true);
          done();
        })
        .catch(done);
    });

    it('fails if the verification key is not conform with the signed JWT', done => {
      nock(jku, { reqheaders: { Authorization: basicHeader } })
        .get('/')
        .reply(200, responseWithWrongKey);

      verifyJwt(signedJwtForVerification(jwtPayload, jku), {
        cacheVerificationKeys: false
      })
        .then(() => {
          done('Should have failed.');
        })
        .catch(error => {
          expect(error.message).toBe('JWT invalid');
          done();
        });
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
