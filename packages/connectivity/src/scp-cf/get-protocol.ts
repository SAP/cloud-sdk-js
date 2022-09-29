import { createLogger } from '@sap-cloud-sdk/util';
import { Destination } from './destination/destination-service-types';
import { Protocol, getProtocol } from './protocol';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'get-protocol'
});

/**
 * Extracts the http protocol from the destination URL. The default value is http if no protocol is given.
 * @param destination - URL of this destination is parsed
 * @throws Error in case a unsupported protocol is given in the destination URL like rfc://example.com.
 * @returns The protocol, either https or http.
 * @internal
 */
export function getProtocolOrDefault(destination: Destination): Protocol {
  const protocol = destination?.url?.toLowerCase()?.split('://');

  if (!protocol || protocol.length === 1) {
    logger.warn(
      `URL of the provided destination (${destination.url}) has no protocol specified! Assuming HTTPS.`
    );
    return Protocol.HTTPS;
  }
  const casted = getProtocol(protocol[0]);
  if (casted) {
    return casted;
  }

  throw new Error(
    `Protocol of the provided destination (${destination.url}) is not supported! Currently only HTTP and HTTPS are supported.`
  );
}
