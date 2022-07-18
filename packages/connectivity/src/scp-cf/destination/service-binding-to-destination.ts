import { Service } from '../environment-accessor-types';
import { serviceToken } from '../token-accessor';
import { decodeJwt } from '../jwt';
import type {
  PartialDestinationFetchOptions,
  ServiceBinding,
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
  'service-manager': serviceManagerBindingToDestination
};

async function serviceManagerBindingToDestination(
  serviceBinding: ServiceBinding,
  options: PartialDestinationFetchOptions
): Promise<Destination> {
  const service: Service = {
    ...serviceBinding,
    tags: serviceBinding.tags,
    label: 'service-manager',
    credentials: { ...serviceBinding.credentials }
  };
  const token = await serviceToken(service, options);
  return buildClientCredentialsDestination(
    token,
    serviceBinding.credentials.sm_url,
    serviceBinding.name
  );
}

async function destinationBindingToDestination(
  serviceBinding: ServiceBinding,
  options: PartialDestinationFetchOptions
): Promise<Destination> {
  const service: Service = {
    ...serviceBinding,
    tags: serviceBinding.tags,
    label: 'destination',
    credentials: { ...serviceBinding.credentials }
  };
  const token = await serviceToken(service, options);
  return buildClientCredentialsDestination(
    token,
    serviceBinding.credentials.uri,
    serviceBinding.name
  );
}

async function saasRegistryBindingToDestination(
  serviceBinding: ServiceBinding,
  options: PartialDestinationFetchOptions
): Promise<Destination> {
  const service: Service = {
    ...serviceBinding,
    tags: serviceBinding.tags,
    label: 'saas-registry',
    credentials: { ...serviceBinding.credentials }
  };
  const token = await serviceToken(service, options);
  return buildClientCredentialsDestination(
    token,
    serviceBinding.credentials['saas_registry_url'],
    serviceBinding.name
  );
}

async function businessLoggingBindingToDestination(
  serviceBinding: ServiceBinding,
  options: PartialDestinationFetchOptions
): Promise<Destination> {
  const service: Service = {
    ...serviceBinding,
    tags: serviceBinding.tags,
    label: 'business-logging',
    credentials: { ...serviceBinding.credentials.uaa }
  };
  const token = await serviceToken(service, options);
  return buildClientCredentialsDestination(
    token,
    serviceBinding.credentials.writeUrl,
    serviceBinding.name
  );
}

async function workflowBindingToDestination(
  serviceBinding: ServiceBinding,
  options: PartialDestinationFetchOptions
): Promise<Destination> {
  const service: Service = {
    ...serviceBinding,
    tags: serviceBinding.tags,
    label: 'workflow',
    credentials: { ...serviceBinding.credentials.uaa }
  };
  const token = await serviceToken(service, options);
  return buildClientCredentialsDestination(
    token,
    serviceBinding.credentials.endpoints.workflow_odata_url,
    serviceBinding.name
  );
}

async function xfS4hanaCloudBindingToDestination(
  serviceBinding: ServiceBinding
): Promise<Destination> {
  return {
    url: serviceBinding.credentials.URL,
    authentication: 'BasicAuthentication',
    username: serviceBinding.credentials.User,
    password: serviceBinding.credentials.Password
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
