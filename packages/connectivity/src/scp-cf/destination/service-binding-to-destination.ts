import { serviceToken } from '../token-accessor';
import { decodeJwt } from '../jwt';
import { getIasClientCredentialsToken } from '../identity-service';
import { clientCredentialsTokenCache } from '../client-credentials-token-cache';
import { parseUrlAndGetHost } from '../subdomain-replacer';
import type { Service } from '../environment-accessor';
import type {
  ServiceBindingTransformFunction,
  ServiceBindingTransformOptions
} from './destination-from-vcap';
import type { Destination } from './destination-service-types';
import type { IasOptions, IasOptionsTechnicalUser } from './ias-types';
import type { CachingOptions } from '../cache';

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
  return buildClientCredentialsDestination(
    token,
    options?.url ?? service.url,
    service.name
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
/**
 * Tries to resolve `app_tid` based on supplied IAS options.
 * @param iasOptions - IAS technical user options.
 * @param service - Service binding for identity service.
 * @param options - Service bidning transform options.
 * @returns The BTP app_tid based on `requestAs` configuration.
 */
function getIasAppTid(
  iasOptions: IasOptionsTechnicalUser,
  service: Service,
  options?: ServiceBindingTransformOptions
): string {
  const { requestAs } = iasOptions;
  if (requestAs === 'provider-tenant') {
    return service.app_tid;
  }
  if (requestAs === 'current-tenant' || !requestAs) {
    return options?.jwt?.app_tid;
  }

  requestAs satisfies never;
  throw new Error(`Invalid requestAs value: ${requestAs}`);
}

/**
 * Builds destination based on supplied IAS options.
 * Uses `targetUrl` as the destination URL if supplied and adds `mtlsKeyPair` if available.
 * @param accessToken - The JWT token to access the service.
 * @param service - Service binding for identity service.
 * @param options - Service bidning transform options.
 * @returns A destination object.
 */
function buildIasDestination(
  accessToken: string,
  service: Service,
  options?: ServiceBindingTransformOptions
): Destination {
  const destination = buildClientCredentialsDestination(
    accessToken,
    options?.iasOptions?.targetUrl ?? service.credentials.url,
    service.name
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
  const iasOptions = {
    authenticationType: 'OAuth2ClientCredentials' as const,
    useCache: options?.useCache !== false,
    ...(options?.iasOptions || {})
  } satisfies IasOptions & CachingOptions;

  const iasInstance = parseUrlAndGetHost(service.credentials.url);

  // Technical user client credentials grant preperation
  if (iasOptions.authenticationType === 'OAuth2ClientCredentials') {
    if (!iasOptions.appTid) {
      iasOptions.appTid = getIasAppTid(iasOptions, service, options);
    }

    if (iasOptions.useCache) {
      const cached = clientCredentialsTokenCache.getTokenIas({
        iasInstance,
        appTid: iasOptions.appTid,
        clientId: service.credentials.clientid,
        resource: options?.iasOptions?.resource
      });
      if (cached) {
        return buildIasDestination(cached.access_token, service, options);
      }
    }
  }

  const response = await getIasClientCredentialsToken(service, {
    jwt: options?.jwt,
    ...iasOptions
  });

  if (
    iasOptions.authenticationType === 'OAuth2ClientCredentials' &&
    iasOptions.useCache &&
    response
  ) {
    clientCredentialsTokenCache.cacheIasToken(
      {
        iasInstance,
        appTid: iasOptions.appTid,
        clientId: service.credentials.clientid,
        resource: iasOptions?.resource
      },
      response
    );
  }

  return buildIasDestination(response.access_token, service, options);
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
