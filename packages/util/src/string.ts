export function encodeBase64(str: string): string {
  return Buffer.from(str).toString('base64');
}
