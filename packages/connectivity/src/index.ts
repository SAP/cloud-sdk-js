export {
  Destination,
  DestinationRetrievalOptions
} from './scp-cf/destination/destination-service-types';

export {
  DestinationOptions,
  DestinationFetchOptions
} from './scp-cf/destination/destination-accessor-types';

export { buildHeadersForDestination } from './scp-cf/header-builder-for-destination';

export {
  noDestinationErrorMessage,
  toDestinationNameUrl,
  sanitizeDestination
} from './scp-cf/destination/destination';

export { useOrFetchDestination } from './scp-cf/destination/destination-accessor';

export { getAgentConfig } from './http-agent/http-agent';
