import { Service } from '../environment-accessor/environment-accessor-types';
import { serviceToken } from '../token-accessor';
import { decodeJwt } from '../jwt';
import type {
  ServiceBindingTransformFunction,
  ServiceBindingTransformOptions
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
  xsuaa: xsuaaToDestination,
  aicore: aicoreToDestination
};

/**
 * Creates a OAuth2ClientCredentials destination from the provided service binding.
 * If a JWT is provided, the tenant in the JWT is used for client credentials grant, else the provider tenant is used.
 * 
 * Supported service types are:
 * - business-logging
 * - s4-hana-cloud
 * - destination
 * - saas-registry
 * - workflow
 * - service-manager
 * - xsuaa
 * - aicore
 * 
 * Throws an error if the provided service binding is not supported.
 * @param serviceBinding - The service binding to transform. 
 * @param options - Options used during fetching destinations;includes a JWT payload {@link JwtPayload} and options to influence caching behavior (see {@link CachingOptions}) 
 * @returns 
 */
export async function transformServiceBindingToDestination(
  serviceBinding: Service,
  options?: ServiceBindingTransformOptions
): Promise<Destination> {
  if (serviceToDestinationTransformers[serviceBinding.label]) {
    return serviceToDestinationTransformers[serviceBinding.label](serviceBinding, options);
  }
  throw new Error(`The provided service binding of type ${serviceBinding.label} is not supported out of the box for destination transformation.`);
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
