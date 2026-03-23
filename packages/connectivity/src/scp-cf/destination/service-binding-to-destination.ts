import { serviceToken, getIasToken } from '../token-accessor';
import { decodeJwt } from '../jwt';
import type { Service } from '../environment-accessor';
import type {
  ServiceBindingTransformFunction,
  ServiceBindingTransformOptions
} from './destination-from-vcap';
import type {
  AuthenticationType,
  Destination
} from './destination-service-types';
import type { IasOptions } from './ias-types';

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
  aicore: aicoreToDestination,
  identity: transformIasBindingToDestination
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
 * - identity (OAuth2ClientCredentials with mTLS or client secret)
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
 * Convenience function to create a destination from the provided service binding.
 * Transforms a service binding to a destination of type OAuth2ClientCredentials.
 * If a JWT is provided as part of the options, the tenant in the JWT is used for the client credentials grant, else the provider tenant is used, wherever applicable.
 * @param service - The service binding to transform.
 * @param options - Options used to transform the service binding.
 * @returns A promise returning the transformed destination on success.
 */
export async function transformServiceBindingToClientCredentialsDestination(
  service: Service,
  options?: ServiceBindingTransformOptions & { url?: string }
): Promise<Destination> {
  const token = await serviceToken(service, options);
  return buildDestination(token, options?.url ?? service.url, service.name);
}

async function aicoreToDestination(
  service: Service,
  options?: ServiceBindingTransformOptions
): Promise<Destination> {
  const token = await serviceToken(service, options);
  return buildDestination(
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
  return buildDestination(token, service.credentials.apiurl, service.name);
}

async function serviceManagerBindingToDestination(
  service: Service,
  options?: ServiceBindingTransformOptions
): Promise<Destination> {
  const token = await serviceToken(service, options);
  return buildDestination(token, service.credentials.sm_url, service.name);
}

async function destinationBindingToDestination(
  service: Service,
  options?: ServiceBindingTransformOptions
): Promise<Destination> {
  const token = await serviceToken(service, options);
  return buildDestination(token, service.credentials.uri, service.name);
}

async function saasRegistryBindingToDestination(
  service: Service,
  options?: ServiceBindingTransformOptions
): Promise<Destination> {
  const token = await serviceToken(service, options);
  return buildDestination(
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
  return buildDestination(token, service.credentials.writeUrl, service.name);
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
  return buildDestination(
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

/**
 * Builds destination based on supplied IAS options.
 * Uses `targetUrl` as the destination URL if supplied and adds `mtlsKeyPair` if available.
 * @param accessToken - The JWT token to access the service.
 * @param service - Service binding for identity service.
 * @param iasOptions - IAS options to build the destination.
 * @returns A destination object.
 * @internal
 */
export function buildIasDestination(
  accessToken: string,
  service: Service,
  iasOptions: IasOptions
): Destination {
  const destination = buildDestination(
    accessToken,
    iasOptions?.targetUrl ?? service.credentials.url,
    service.name,
    iasOptions.authenticationType || 'OAuth2ClientCredentials'
  );

  // Add mTLS key pair if available
  if (service.credentials.certificate && service.credentials.key) {
    destination.mtlsKeyPair = {
      cert: service.credentials.certificate,
      key: service.credentials.key
    };
  }
  return destination;
}

async function transformIasBindingToDestination(
  service: Service,
  options?: ServiceBindingTransformOptions
): Promise<Destination> {
  const iasOptions: IasOptions = {
    authenticationType: 'OAuth2ClientCredentials',
    ...(options?.iasOptions || {})
  };

  const { token } = await getIasToken(service, {
    jwt: options?.jwt,
    useCache: options?.useCache !== false,
    ...iasOptions
  });

  return buildIasDestination(token, service, iasOptions);
}

/**
 * Builds a destination object with a token, name, and url.
 * If no authentication type is provided, 'OAuth2ClientCredentials' is used by default.
 * @internal
 * @param token - The access token for the destination.
 * @param url - The URL of the destination.
 * @param name - The name of the destination.
 * @param authentication - The authentication type for the destination. Defaults to 'OAuth2ClientCredentials'.
 * @returns A destination object.
 */
function buildDestination(
  token: string,
  url: string,
  name: string,
  authentication: Extract<
    AuthenticationType,
    'OAuth2ClientCredentials' | 'OAuth2JWTBearer'
  > = 'OAuth2ClientCredentials'
): Destination {
  const expirationTime = decodeJwt(token).exp;
  const expiresIn = expirationTime
    ? Math.floor((expirationTime * 1000 - Date.now()) / 1000).toString(10)
    : undefined;
  return {
    url,
    name,
    authentication,
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
