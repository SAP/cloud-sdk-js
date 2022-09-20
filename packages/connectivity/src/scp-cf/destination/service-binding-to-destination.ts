import { Service } from '../environment-accessor-types';
import { serviceToken } from '../token-accessor';
import { decodeJwt } from '../jwt';
import type {
  PartialDestinationFetchOptions,
  ServiceBindingTransformFunction
} from './destination-from-vcap';
import { Destination } from './destination-service-types';

/**
 * @internal
 */
export const serviceToDestinationTransformers: Record<
  string,
  ServiceBindingTransformFunction
> = {
  'business-logging': businessLoggingBindingToDestination,
  's4-hana-cloud': xfS4hanaCloudBindingToDestination,
  destination: destinationBindingToDestination,
  'saas-registry': saasRegistryBindingToDestination,
  workflow: workflowBindingToDestination,
  'service-manager': serviceManagerBindingToDestination,
  xsuaa: xsuaaToDestination
};

async function xsuaaToDestination(
  service: Service,
  options?: PartialDestinationFetchOptions
): Promise<Destination> {
  const token = await serviceToken(service, options);
  return buildClientCredentialsDestination(
    token,
    service.credentials.apiurl,
    service.name
  );
}

async function serviceManagerBindingToDestination(
  service: Service,
  options?: PartialDestinationFetchOptions
): Promise<Destination> {
  const token = await serviceToken(service, options);
  return buildClientCredentialsDestination(
    token,
    service.credentials.sm_url,
    service.name
  );
}

async function destinationBindingToDestination(
  service: Service,
  options?: PartialDestinationFetchOptions
): Promise<Destination> {
  const token = await serviceToken(service, options);
  return buildClientCredentialsDestination(
    token,
    service.credentials.uri,
    service.name
  );
}

async function saasRegistryBindingToDestination(
  service: Service,
  options?: PartialDestinationFetchOptions
): Promise<Destination> {
  const token = await serviceToken(service, options);
  return buildClientCredentialsDestination(
    token,
    service.credentials['saas_registry_url'],
    service.name
  );
}

async function businessLoggingBindingToDestination(
  service: Service,
  options?: PartialDestinationFetchOptions
): Promise<Destination> {
  const transformedService = {
    ...service,
    credentials: { ...service.credentials.uaa }
  };
  const token = await serviceToken(transformedService, options);
  return buildClientCredentialsDestination(
    token,
    service.credentials.writeUrl,
    service.name
  );
}

async function workflowBindingToDestination(
  service: Service,
  options?: PartialDestinationFetchOptions
): Promise<Destination> {
  const transformedService = {
    ...service,
    credentials: { ...service.credentials.uaa }
  };
  const token = await serviceToken(transformedService, options);
  return buildClientCredentialsDestination(
    token,
    service.credentials.endpoints.workflow_odata_url,
    service.name
  );
}

async function xfS4hanaCloudBindingToDestination(
  service: Service
): Promise<Destination> {
  return {
    url: service.credentials.URL,
    authentication: 'BasicAuthentication',
    username: service.credentials.User,
    password: service.credentials.Password
  };
}

function buildClientCredentialsDestination(
  token: string,
  url: string,
  name
): Destination {
  const expiresIn = Math.floor(
    (decodeJwt(token).exp! * 1000 - Date.now()) / 1000
  ).toString(10);
  return {
    url,
    name,
    authentication: 'OAuth2ClientCredentials',
    authTokens: [
      {
        value: token,
        type: 'bearer',
        expiresIn,
        http_header: { key: 'Authorization', value: `Bearer ${token}` },
        error: null
      }
    ]
  };
}
