import { expectAssignable, expectError } from 'tsd';
import type {
  DestinationOrFetchOptions,
  Destination,
  HttpDestination,
  HttpDestinationOrFetchOptions,
  Service
} from '@sap-cloud-sdk/connectivity';

const mockService: Service = undefined as any;

// --- DestinationOrFetchOptions ---

// Destination branch: plain destination is assignable.
expectAssignable<DestinationOrFetchOptions>({
  url: 'https://example.com',
  name: 'my-dest'
} as Destination);

// Fetch-options branch: destinationName surfaces.
expectAssignable<DestinationOrFetchOptions>({ destinationName: 'foo' });

// Fetch-options branch: `service` surfaces - regression guard for the Xor-pollution bug.
expectAssignable<DestinationOrFetchOptions>({ service: mockService });

// Fetch-options branch: destinationName + jwt.
expectAssignable<DestinationOrFetchOptions>({
  destinationName: 'foo',
  jwt: 'token'
});

// XOR: a Destination cannot also carry fetch-options discriminators.
expectError<DestinationOrFetchOptions>({
  url: 'https://example.com',
  destinationName: 'foo'
});

expectError<DestinationOrFetchOptions>({
  url: 'https://example.com',
  service: mockService
});

// --- HttpDestinationOrFetchOptions ---

// HttpDestination branch.
expectAssignable<HttpDestinationOrFetchOptions>({
  url: 'https://example.com'
} as HttpDestination);

// Fetch-options branch: destinationName.
expectAssignable<HttpDestinationOrFetchOptions>({ destinationName: 'foo' });

// Fetch-options branch: `service` - regression guard for the Xor-pollution bug.
expectAssignable<HttpDestinationOrFetchOptions>({ service: mockService });

// XOR: an HttpDestination cannot also carry fetch-options discriminators.
expectError<HttpDestinationOrFetchOptions>({
  url: 'https://example.com',
  destinationName: 'foo'
} as HttpDestination & { destinationName: string });

expectError<HttpDestinationOrFetchOptions>({
  url: 'https://example.com',
  service: mockService
} as HttpDestination & { service: Service });
