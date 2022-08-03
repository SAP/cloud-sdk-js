/**
 * return type has to match SocksProxy type which is defined to expect Promise<Buffer>, even if the function below is not really async
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/require-await
export async function customAuthRequestHandler(jwt: string): Promise<Buffer> {
  const jwtBytes = [...Buffer.from(jwt)];
  const jwtBytesLength = jwtBytes.length;
  const jwtLengthBuffer = Buffer.alloc(4);
  jwtLengthBuffer.writeUInt32BE(jwtBytesLength, 0);
  const customAuthenticationRequest = [0x01, ...jwtLengthBuffer, ...jwtBytes, 0x00];
  return Buffer.from(customAuthenticationRequest);
}

/**
 * return type has to match SocksProxy type which is defined to expect Promise<boolean>, even if the function below is not really async
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/require-await
export async function customAuthResponseHandler(data: Buffer): Promise<boolean> {
  return data[0] === 0x01 && data[1] === 0x00;
}
