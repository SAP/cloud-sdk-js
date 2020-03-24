/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { createLogger } from '@sap-cloud-sdk/util';

export function muteLoggers(...messageContexts: string[]) {
  messageContexts.forEach(messageContext => muteLogger(messageContext));
}

function muteLogger(messageContext: string) {
  const logger = createLogger(messageContext);
  logger.transports.forEach(transport => (transport.silent = true));
}

export function unmuteLoggers(...messageContexts: string[]) {
  messageContexts.forEach(messageContext => unmuteLogger(messageContext));
}

function unmuteLogger(messageContext: string) {
  const logger = createLogger(messageContext);
  logger.transports.forEach(transport => (transport.silent = false));
}
