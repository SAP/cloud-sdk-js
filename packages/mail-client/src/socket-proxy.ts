/**
 * Custom authentication request handler used for OnPrem connectivity.
 * Return type has to match SocksProxy type which is defined to expect Promise<Buffer>, even if the function below is not really async
 * @see https://help.sap.com/docs/CP_CONNECTIVITY/cca91383641e40ffbe03bdc78f00f681/cd1583775afa43f0bb9ec69d9dbcc880.html?locale=en-US#loiocd1583775afa43f0bb9ec69d9dbcc880__example
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/require-await
export async function customAuthRequestHandler(jwt: string): Promise<Buffer> {
  const jwtBytes = [...Buffer.from(jwt)];
  const jwtBytesLength = jwtBytes.length;
  const jwtLengthBuffer = Buffer.alloc(4);
  jwtLengthBuffer.writeUInt32BE(jwtBytesLength, 0);
  const customAuthenticationRequest = [
    // Authentication method version - currently 1
    0x01,
    // Length of the JWT
    ...jwtLengthBuffer,
    // The actual value of the JWT in its encoded form
    ...jwtBytes,
    // Length of the Cloud Connector location ID (0 if no Cloud Connector location ID is used)
    0x00
    // Optional. The value of the Cloud Connector location ID in base64-encoded form (if the the value of the location ID is not 0)
  ];
  return Buffer.from(customAuthenticationRequest);
}

/**
 * Custom authentication response handler used for OnPrem connectivity.
 * Return type has to match SocksProxy type which is defined to expect Promise<boolean>, even if the function below is not really async
 * @see https://help.sap.com/docs/CP_CONNECTIVITY/cca91383641e40ffbe03bdc78f00f681/cd1583775afa43f0bb9ec69d9dbcc880.html?locale=en-US#loiocd1583775afa43f0bb9ec69d9dbcc880__example
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/require-await
export async function customAuthResponseHandler(
  data: Buffer
): Promise<boolean> {
  // data[0]: Authentication method version - currently 1
  // data[1]: 0x00 means success
  return data[0] === 0x01 && data[1] === 0x00;
}
