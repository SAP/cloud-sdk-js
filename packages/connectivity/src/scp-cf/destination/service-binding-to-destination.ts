import { serviceToken } from '../token-accessor';
import { decodeJwt } from '../jwt';
import type { Service } from '../environment-accessor';
import type {
  ServiceBindingTransformFunction,
  ServiceBindingTransformOptions
} from './destination-from-vcap';
import type { Destination } from './destination-service-types';

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
  xsuaa: xsuaaToDestination,
  aicore: aicoreToDestination
};

/**
 * Convenience function to create a destination from the provided service binding.
 * If a JWT is provided as part of options, the tenant in the JWT is used for client credentials grant, else the provider tenant is used, wherever applicable.
 * Supported service types are:
 * - business-logging (OAuth2ClientCredentials)
 * - destination (OAuth2ClientCredentials)
 * - s4-hana-cloud (BasicAuthentication)
 * - saas-registry (OAuth2ClientCredentials)
 * - workflow (OAuth2ClientCredentials)
 * - service-manager (OAuth2ClientCredentials)
 * - xsuaa (OAuth2ClientCredentials)
 * - aicore (OAuth2ClientCredentials)
 * Throws an error if the provided service binding is not supported.
 * @param serviceBinding - The service binding to transform.
 * @param options - Options used for fetching the destination.
 * @returns A promise returning the transformed destination on success.
 */
export async function transformServiceBindingToDestination(
  serviceBinding: Service,
  options?: ServiceBindingTransformOptions
): Promise<Destination> {
  if (serviceToDestinationTransformers[serviceBinding.label]) {
    return serviceToDestinationTransformers[serviceBinding.label](
      serviceBinding,
      options
    );
  }
  throw new Error(
    `The provided service binding of type ${serviceBinding.label} is not supported out of the box for destination transformation.`
  );
}

/**
 * Transforms a service binding to a destination of type OAuth2ClientCredentials.
 * @param serviceBinding - The service binding to transform.
 * @param options - Options used for fetching the destination.
 * @returns A promise returning the transformed destination on success.
 */
export async function transformServiceBindingToClientCredentialsDestination(
  serviceBinding: Service,
  options?: ServiceBindingTransformOptions & { url: string }
): Promise<Destination> {
  const token = await serviceToken(serviceBinding, options);
  return buildClientCredentialsDestination(
    token,
    options?.url ?? serviceBinding.url,
    serviceBinding.name
  );
}

async function aicoreToDestination(
  service: Service,
  options?: ServiceBindingTransformOptions
): Promise<Destination> {
  const token = await serviceToken(service, options);
  return buildClientCredentialsDestination(
    token,
    service.credentials.serviceurls.AI_API_URL,
    service.name
  );
}

async function xsuaaToDestination(
  service: Service,
  options?: ServiceBindingTransformOptions
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
  options?: ServiceBindingTransformOptions
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
  options?: ServiceBindingTransformOptions
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
  options?: ServiceBindingTransformOptions
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
  options?: ServiceBindingTransformOptions
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
  options?: ServiceBindingTransformOptions
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
  const expirationTime = decodeJwt(token).exp;
  const expiresIn = expirationTime
    ? Math.floor((expirationTime * 1000 - Date.now()) / 1000).toString(10)
    : undefined;
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
