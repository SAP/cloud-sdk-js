/* eslint-disable  import/export */
export enum Protocol {
  HTTP = 'http',
  HTTPS = 'https'
}
/**
 * @internal
 */
export namespace Protocol {
  /**
   * Get [[Protocol]] from its string representation.
   * @param protocol - Protocol as string, either 'http'/'https' or 'http:'/'https:'.
   * @returns Either the matching protocol or undefined.
   */
  export function of(protocol: string): Protocol | undefined {
    if (protocol.endsWith(':')) {
      return of(protocol.slice(0, -1));
    }
    if (protocol.toLowerCase() === Protocol.HTTP) {
      return Protocol.HTTP;
    }
    if (protocol.toLowerCase() === Protocol.HTTPS) {
      return Protocol.HTTPS;
    }
  }
}
