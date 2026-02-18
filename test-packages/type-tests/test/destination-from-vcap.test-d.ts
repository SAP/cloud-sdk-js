import { expectType, expectError, expectAssignable } from 'tsd';
import type {
  DestinationFromServiceBindingOptions,
  Service,
  ServiceBindingTransformFunction
} from '@sap-cloud-sdk/connectivity';

const mockService: Service = undefined as any;

const validWithService: DestinationFromServiceBindingOptions = {
  service: mockService
};
expectAssignable<DestinationFromServiceBindingOptions>(validWithService);

const validWithDestName: DestinationFromServiceBindingOptions = {
  destinationName: 'my-destination'
};
expectAssignable<DestinationFromServiceBindingOptions>(validWithDestName);

const transformFn: ServiceBindingTransformFunction = undefined as any;

const validWithServiceAndFn: DestinationFromServiceBindingOptions = {
  service: mockService,
  serviceBindingTransformFn: transformFn
};
expectAssignable<DestinationFromServiceBindingOptions>(validWithServiceAndFn);

// Valid case 4: destinationName with optional serviceBindingTransformFn
const validWithDestNameAndFn: DestinationFromServiceBindingOptions = {
  destinationName: 'my-destination',
  serviceBindingTransformFn: transformFn
};
expectAssignable<DestinationFromServiceBindingOptions>(validWithDestNameAndFn);

expectError<DestinationFromServiceBindingOptions>({
  service: mockService,
  destinationName: 'my-destination'
});

expectError<DestinationFromServiceBindingOptions>({
  serviceBindingTransformFn: transformFn
});

expectError<DestinationFromServiceBindingOptions>({});

// Test the discriminated union behavior when accessing properties
declare const options: DestinationFromServiceBindingOptions;

const serviceOptions = options as { service: Service };
expectType<Service>(serviceOptions.service);

const destNameOptions = options as { destinationName: string };
expectType<string>(destNameOptions.destinationName);

// serviceBindingTransformFn should always be optional on the base type
expectType<ServiceBindingTransformFunction | undefined>(
  options.serviceBindingTransformFn
);
