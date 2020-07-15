/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { createLogger } from '@sap-cloud-sdk/util';
import { Protocol } from './protocol';
import { Destination } from './scp-cf';

const logger = createLogger({
  package: 'core',
  messageContext: 'get-protocol'
});

/**
 * Extracts the http protocol from the destination url. The default value is http if no protocol is given.
 *
 * @param destination - URL of this destination is parsed
 * @throws Error in case a unsupported protocol is given in the destination URL like rfc://example.com.
 * @returns The protocol, either https or http.
 */
export function getProtocolOrDefault(destination: Destination): Protocol {
  const protocol = destination?.url?.toLowerCase()?.split('://');

  if (!protocol || protocol.length === 1) {
    logger.warn(
      `URL of the provided destination (${destination.url}) has no protocol specified! Assuming HTTPS.`
    );
    return Protocol.HTTPS;
  }
  const casted = Protocol.of(protocol[0]);
  if (casted) {
    return casted;
  }

  throw new Error(
    `Protocol of the provided destination (${destination.url}) is not supported! Currently only HTTP and HTTPS are supported.`
  );
}
