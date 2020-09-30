export enum Protocol {
  HTTP = 'http',
  HTTPS = 'https'
}

/* eslint-disable-next-line no-redeclare */
export namespace Protocol {
  /**
   * Get [[Protocol]] from its string representation.
   * @param protocol Protocol as string, either 'http' or 'https'.
   * @returns Either the matching protocol or undefined
   */
  export function of(protocol: string): Protocol | undefined {
    if (protocol.toLowerCase() === Protocol.HTTP) {
      return Protocol.HTTP;
    }
    if (protocol.toLowerCase() === Protocol.HTTPS) {
      return Protocol.HTTPS;
    }
  }
}
