/* eslint-disable no-bitwise -- JKS binary parsing and decryption require bitwise operators. */
import {
  createHash,
  createPrivateKey,
  getFips,
  timingSafeEqual
} from 'node:crypto';

const JKS_MAGIC = 0xfeedfeed;
const JKS_STORE_MAGIC = Buffer.from('Mighty Aphrodite', 'utf8');
const KEY_ENTRY = 1;
const CERT_ENTRY = 2;
const MAX_ENTRY_COUNT = 65_536;

interface RawJksKeyEntry {
  alias: string;
  encryptedKey: Uint8Array;
  certChain: Uint8Array[];
}

interface RawJksStore {
  entryCount: number;
  keyEntries: RawJksKeyEntry[];
}

class BinaryReader {
  private readonly view: DataView;
  private offset = 0;

  constructor(private readonly data: Uint8Array) {
    this.view = new DataView(data.buffer, data.byteOffset, data.byteLength);
  }

  readU16(): number {
    this.ensureAvailable(2);
    const value = this.view.getUint16(this.offset, false);
    this.offset += 2;
    return value;
  }

  readU32(): number {
    this.ensureAvailable(4);
    const value = this.view.getUint32(this.offset, false);
    this.offset += 4;
    return value;
  }

  readBytes(length: number): Uint8Array {
    this.ensureAvailable(length);
    const value = this.data.subarray(this.offset, this.offset + length);
    this.offset += length;
    return value;
  }

  readUTF(): string {
    return new TextDecoder().decode(this.readBytes(this.readU16()));
  }

  private ensureAvailable(length: number): void {
    if (
      !Number.isSafeInteger(length) ||
      length < 0 ||
      length > this.data.byteLength - this.offset
    ) {
      throw new Error('Unexpected end of keystore data');
    }
  }
}

function passwordToBytes(password: string): Buffer {
  const bytes = Buffer.from(password, 'utf16le');
  for (let index = 0; index < bytes.length - 1; index += 2) {
    const highByte = bytes[index];
    bytes[index] = bytes[index + 1];
    bytes[index + 1] = highByte;
  }
  return bytes;
}

function readCertificate(reader: BinaryReader): Uint8Array {
  const certificateType = reader.readUTF();
  if (certificateType !== 'X.509') {
    throw new Error(`Unsupported cert type: ${certificateType}`);
  }
  return reader.readBytes(reader.readU32());
}

/** @internal */
export function parseJks(data: Uint8Array, password: string): RawJksStore {
  const reader = new BinaryReader(data);
  const magic = reader.readU32();
  if (magic !== JKS_MAGIC) {
    throw new Error(`Invalid JKS magic: 0x${magic.toString(16).toUpperCase()}`);
  }

  const version = reader.readU32();
  if (version !== 2) {
    throw new Error(
      `Unsupported JKS version: ${version} (only version 2 supported)`
    );
  }

  const entryCount = reader.readU32();
  if (entryCount > MAX_ENTRY_COUNT) {
    throw new Error(`Unreasonable JKS entry count: ${entryCount}`);
  }

  const keyEntries: RawJksKeyEntry[] = [];
  for (let index = 0; index < entryCount; index++) {
    const tag = reader.readU32();
    if (tag === KEY_ENTRY) {
      const alias = reader.readUTF();
      reader.readBytes(8); // Timestamp.
      const encryptedKey = reader.readBytes(reader.readU32());
      const chainLength = reader.readU32();
      const certChain: Uint8Array[] = [];
      for (let chainIndex = 0; chainIndex < chainLength; chainIndex++) {
        certChain.push(readCertificate(reader));
      }
      keyEntries.push({ alias, encryptedKey, certChain });
    } else if (tag === CERT_ENTRY) {
      reader.readUTF(); // Alias.
      reader.readBytes(8); // Timestamp.
      readCertificate(reader);
    } else {
      throw new Error(`Unknown JKS entry tag: ${tag}`);
    }
  }

  const passwordBytes = passwordToBytes(password);
  const expectedDigest = createHash('sha1')
    .update(passwordBytes)
    .update(JKS_STORE_MAGIC)
    .update(data.subarray(0, data.byteLength - 20))
    .digest();
  const storedDigest = data.subarray(data.byteLength - 20);
  if (
    storedDigest.byteLength !== expectedDigest.byteLength ||
    !timingSafeEqual(expectedDigest, storedDigest)
  ) {
    throw new Error(
      'JKS integrity check failed (wrong password or corrupted file)'
    );
  }

  return { entryCount, keyEntries };
}

interface DerElement {
  tag: number;
  contentStart: number;
  contentEnd: number;
  end: number;
}

function readDerElement(data: Uint8Array, offset: number): DerElement {
  if (offset + 2 > data.byteLength) {
    throw new Error('Failed to parse EncryptedPrivateKeyInfo');
  }

  const tag = data[offset];
  let contentStart = offset + 2;
  const firstLengthByte = data[offset + 1];
  let length = firstLengthByte;

  if (firstLengthByte & 0x80) {
    const lengthByteCount = firstLengthByte & 0x7f;
    if (
      lengthByteCount === 0 ||
      lengthByteCount > 4 ||
      contentStart + lengthByteCount > data.byteLength
    ) {
      throw new Error('Failed to parse EncryptedPrivateKeyInfo');
    }
    length = 0;
    for (let index = 0; index < lengthByteCount; index++) {
      length = length * 256 + data[contentStart + index];
    }
    contentStart += lengthByteCount;
  }

  const contentEnd = contentStart + length;
  if (contentEnd > data.byteLength) {
    throw new Error('Failed to parse EncryptedPrivateKeyInfo');
  }
  return { tag, contentStart, contentEnd, end: contentEnd };
}

function extractCiphertext(encryptedKey: Uint8Array): Uint8Array {
  const encryptedInfo = readDerElement(encryptedKey, 0);
  if (
    encryptedInfo.tag !== 0x30 ||
    encryptedInfo.end !== encryptedKey.byteLength
  ) {
    throw new Error('Failed to parse EncryptedPrivateKeyInfo');
  }

  const algorithmIdentifier = readDerElement(
    encryptedKey,
    encryptedInfo.contentStart
  );
  if (algorithmIdentifier.tag !== 0x30) {
    throw new Error('Failed to parse EncryptedPrivateKeyInfo');
  }

  const encryptedData = readDerElement(encryptedKey, algorithmIdentifier.end);
  if (
    encryptedData.tag !== 0x04 ||
    encryptedData.end !== encryptedInfo.contentEnd
  ) {
    throw new Error('Failed to parse EncryptedPrivateKeyInfo');
  }
  return encryptedKey.subarray(
    encryptedData.contentStart,
    encryptedData.contentEnd
  );
}

function decryptJksKey(encryptedKey: Uint8Array, password: string): Buffer {
  if (getFips()) {
    throw new Error(
      'JKS key decryption is not FIPS 140-2 compliant: the format uses a non-approved cipher. Use PKCS#12 instead.'
    );
  }

  const ciphertext =
    encryptedKey[0] === 0x30 ? extractCiphertext(encryptedKey) : encryptedKey;
  if (ciphertext.byteLength < 40) {
    throw new Error('Invalid encrypted JKS key');
  }

  const passwordBytes = passwordToBytes(password);
  const xorKey = ciphertext.subarray(0, 20);
  const protectedKey = ciphertext.subarray(20, -20);
  const storedCheck = ciphertext.subarray(-20);
  const plaintext = Buffer.allocUnsafe(protectedKey.byteLength);
  const passwordPrimed = createHash('sha1').update(passwordBytes);
  let cursor = Buffer.from(xorKey);

  for (let offset = 0; offset < protectedKey.byteLength; offset += 20) {
    const digest = passwordPrimed.copy().update(cursor).digest();
    const chunkLength = Math.min(20, protectedKey.byteLength - offset);
    for (let index = 0; index < chunkLength; index++) {
      plaintext[offset + index] = protectedKey[offset + index] ^ digest[index];
    }
    cursor = digest;
  }

  const computedCheck = passwordPrimed.copy().update(plaintext).digest();
  if (!timingSafeEqual(computedCheck, storedCheck)) {
    throw new Error(
      'JKS key decryption failed: integrity check mismatch (wrong password?)'
    );
  }
  return plaintext;
}

/** @internal */
export function decryptJksPrivateKey(
  encryptedKey: Uint8Array,
  password: string
): Buffer {
  const privateKey = createPrivateKey({
    key: decryptJksKey(encryptedKey, password),
    format: 'der',
    type: 'pkcs8'
  });
  return Buffer.from(privateKey.export({ format: 'pem', type: 'pkcs8' }));
}

/** @internal */
export function certificateToPem(certificateDer: Uint8Array): string {
  const base64 = Buffer.from(certificateDer).toString('base64');
  let body = '';
  for (let offset = 0; offset < base64.length; offset += 64) {
    body += `${base64.slice(offset, offset + 64)}\n`;
  }
  return `-----BEGIN CERTIFICATE-----\n${body}-----END CERTIFICATE-----\n`;
}
