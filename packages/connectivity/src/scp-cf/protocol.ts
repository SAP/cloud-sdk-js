const protocols = {
  http: 'http',
  https: 'https',
  socks: 'socks'
} satisfies Record<Protocol, Protocol>;

/**
 * Supported web protocols for requests made by the SAP Cloud SDK.
 */
export type Protocol = 'http' | 'https' | 'socks';

/**
 * @internal
 * Get {@link Protocol} from its string representation.
 * @param protocol - Protocol as string, either 'http'/'https' or 'http:'/'https:'.
 * @returns Either the matching protocol or undefined.
 */
export function getProtocol(protocol: string): Protocol | undefined {
  return protocol.endsWith(':')
    ? getProtocol(protocol.slice(0, -1))
    : protocols[protocol];
}
