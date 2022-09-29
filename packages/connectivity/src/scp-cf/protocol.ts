/* eslint-disable  import/export */

/**
 * Supported web protocols for requests made by the SAP Cloud SDK.
 */
export enum Protocol {
  HTTP = 'http',
  HTTPS = 'https',
  SOCKS = 'socks'
}
/**
 * @internal
 * Get {@link Protocol} from its string representation.
 * @param protocol - Protocol as string, either 'http'/'https' or 'http:'/'https:'.
 * @returns Either the matching protocol or undefined.
 */
export function getProtocol(protocol: string): Protocol | undefined {
  if (protocol.endsWith(':')) {
    return getProtocol(protocol.slice(0, -1));
  }
  if (protocol.toLowerCase() === Protocol.HTTP) {
    return Protocol.HTTP;
  }
  if (protocol.toLowerCase() === Protocol.HTTPS) {
    return Protocol.HTTPS;
  }
}
