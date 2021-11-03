export {
  Destination,
  DestinationOptions,
  DestinationFetchOptions,
  DestinationRetrievalOptions
} from './scp-cf/destination/destination-service-types';

export { buildHeadersForDestination } from './scp-cf/header-builder-for-destination';

export {
  noDestinationErrorMessage,
  toDestinationNameUrl,
  sanitizeDestination
} from './scp-cf/destination/destination';

export { useOrFetchDestination } from './scp-cf/destination/destination-accessor';

export { getAgentConfig } from './http-agent/http-agent';
