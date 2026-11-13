import { createPrivateKey, getFips, X509Certificate } from 'node:crypto';
import { join } from 'node:path';
import { jest } from '@jest/globals';
import { certificateToPem, decryptJksPrivateKey, parseJks } from './jks-parser';
import type * as crypto from 'node:crypto';
import type * as fs from 'node:fs';

jest.mock('node:crypto', () => ({
  ...jest.requireActual<typeof crypto>('node:crypto'),
  getFips: jest.fn()
}));

const jksPassword = 'password';
const readFixture = (name: string): Buffer =>
  jest
    .requireActual<typeof fs>('node:fs')
    .readFileSync(join(__dirname, '../../test', name));
const rsaKeystore = readFixture('client-cert.jks');
const ecKeystore = readFixture('client-cert-ec.jks');

describe('jks-parser', () => {
  afterEach(() => {
    jest.mocked(getFips).mockReset();
  });

  describe('parseJks', () => {
    it('collects key entries and skips trusted certificate entries', () => {
      const store = parseJks(rsaKeystore, jksPassword);
      // The RSA fixture holds one key entry and one trusted certificate entry.
      expect(store.entryCount).toBe(2);
      expect(store.keyEntries).toHaveLength(1);
      expect(store.keyEntries[0].certChain).toHaveLength(1);
    });

    it('throws for a wrong password', () => {
      expect(() => parseJks(rsaKeystore, 'wrong-password')).toThrow(
        'JKS integrity check failed'
      );
    });

    it('throws for content that is not a JKS keystore', () => {
      expect(() =>
        parseJks(Buffer.from('not a keystore'), jksPassword)
      ).toThrow('Invalid JKS magic');
    });
  });

  describe('decryptJksPrivateKey', () => {
    it('decrypts an RSA key that matches its certificate', () => {
      const [entry] = parseJks(rsaKeystore, jksPassword).keyEntries;
      const key = createPrivateKey(
        decryptJksPrivateKey(entry.encryptedKey, jksPassword)
      );
      expect(key.asymmetricKeyType).toBe('rsa');
      expect(
        new X509Certificate(
          certificateToPem(entry.certChain[0])
        ).checkPrivateKey(key)
      ).toBe(true);
    });

    it('decrypts an EC key that matches its certificate', () => {
      const [entry] = parseJks(ecKeystore, jksPassword).keyEntries;
      const key = createPrivateKey(
        decryptJksPrivateKey(entry.encryptedKey, jksPassword)
      );
      expect(key.asymmetricKeyType).toBe('ec');
      expect(
        new X509Certificate(
          certificateToPem(entry.certChain[0])
        ).checkPrivateKey(key)
      ).toBe(true);
    });

    it('refuses to decrypt in FIPS mode', () => {
      const [entry] = parseJks(rsaKeystore, jksPassword).keyEntries;
      jest.mocked(getFips).mockReturnValueOnce(1);
      expect(() =>
        decryptJksPrivateKey(entry.encryptedKey, jksPassword)
      ).toThrow('not FIPS 140-2 compliant');
    });
  });
});
