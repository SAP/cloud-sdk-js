import { IncomingMessage } from 'http';
import { Socket } from 'net';
import {
  mockServiceBindings,
  signedJwtForVerification
} from '../../../../../test-resources/test/test-util';
import { audiences, decodeJwt, isXsuaaToken, retrieveJwt, userId } from './jwt';

describe('jwt', () => {
  describe('userId', () => {
    it('extracts user_id from XSUAA tokens', () => {
      const xsuaaPayload = { user_id: 'xsuaa-user-123' };
      expect(userId(xsuaaPayload)).toBe('xsuaa-user-123');
    });

    it('extracts user_uuid from IAS tokens', () => {
      const iasPayload = { user_uuid: 'ias-user-uuid-456' };
      expect(userId(iasPayload)).toBe('ias-user-uuid-456');
    });

    it('prefers user_uuid over user_id when both are present', () => {
      const mixedPayload = {
        user_uuid: 'ias-user-uuid-456',
        user_id: 'xsuaa-user-123'
      };
      expect(userId(mixedPayload)).toBe('ias-user-uuid-456');
    });
  });

  describe('isXsuaaToken()', () => {
    it('returns true if the token was issued by XSUAA', () => {
      const jwt = decodeJwt(
        signedJwtForVerification({ ext_attr: { enhancer: 'XSUAA' } })
      );
      expect(isXsuaaToken(jwt)).toBe(true);
    });

    it('returns false if the token was not issued XSUAA', () => {
      const jwt = decodeJwt(
        signedJwtForVerification({ ext_attr: { enhancer: 'IAS' } })
      );
      mockServiceBindings({ xsuaaBinding: false });
      expect(isXsuaaToken(jwt)).toBe(false);
    });

    it('returns false if no enhancer is set', () => {
      const jwt = decodeJwt(signedJwtForVerification({}));
      expect(isXsuaaToken(jwt)).toBe(false);
    });
  });

  describe('retrieveJwt()', () => {
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

  describe('audiences()', () => {
    it('returns a set of the entries of the "aud" claim, if present. If a dot is present, we only take everything before the dot', () => {
      const token = {
        aud: ['one', 'two.one', 'three.two.one']
      };

      expect(audiences(token)).toEqual(['one', 'two', 'three']);
    });

    it('returns an empty set if the "aud" claim is empty', () => {
      const tokenEmpty = { aud: [] };

      expect(audiences(tokenEmpty)).toEqual([]);
    });

    it('returns audiences from scope, if no "aud" property exists', () => {
      const token = {
        scope: ['one', 'two.one', 'three.two.one']
      };

      expect(audiences(token)).toEqual(['two', 'three']);
    });

    it('returns an empty set if the "aud" claim is missing and the "scope" claim is empty', () => {
      const tokenEmpty = { scope: [] };

      expect(audiences(tokenEmpty)).toEqual([]);
    });

    it('returns an empty set if neither the "aud" nor the "scope" claim are present', () => {
      expect(audiences({})).toEqual([]);
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
