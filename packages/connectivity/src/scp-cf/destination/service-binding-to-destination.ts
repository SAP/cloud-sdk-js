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
import type { IasOptions } from './ias-types';
import type { IasClientCredentialsResponse } from '../identity-service';
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
  identity: iasBindingToDestination
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

async function iasBindingToDestination(
  service: Service,
  options?: ServiceBindingTransformOptions
): Promise<Destination> {
  const iasOptions = {
    authenticationType: 'OAuth2ClientCredentials' as const,
    useCache: options?.useCache !== false,
    ...(options?.iasOptions || {})
  } as IasOptions & CachingOptions;

  let accessToken: string | undefined;
  let iasTenant: string | undefined;
  let tenantCacheKey: string | undefined;

  // Technical user client credentials grant preperation
  if (iasOptions.authenticationType === 'OAuth2ClientCredentials') {
    if (!iasOptions.appTid) {
      const requestAs = iasOptions.requestAs ?? 'current-tenant';
      if (requestAs === 'provider-tenant') {
        iasOptions.appTid = service.app_tid;
      } else if (requestAs === 'current-tenant') {
        iasOptions.appTid = options?.jwt?.app_tid;
      }
    }

    if (iasOptions.useCache) {
      iasTenant = parseUrlAndGetHost(service.credentials.url);
      tenantCacheKey = new URLSearchParams({
        iasTenant,
        ...(iasOptions.appTid && { appTid: iasOptions.appTid })
      }).toString();

      const cached = clientCredentialsTokenCache.getToken(
        tenantCacheKey,
        service.credentials.clientid,
        iasOptions.resource
      );
      if (cached) {
        accessToken = cached.access_token;
      }
    }
  }

  let response: IasClientCredentialsResponse | undefined;
  if (!accessToken) {
    response = await getIasClientCredentialsToken(service, {
      jwt: options?.jwt,
      ...(options?.iasOptions || {})
    });
    accessToken = response.access_token;

    if (
      iasOptions.authenticationType === 'OAuth2ClientCredentials' &&
      iasOptions.useCache &&
      response
    ) {
      clientCredentialsTokenCache.cacheToken(
        tenantCacheKey,
        service.credentials.clientid,
        iasOptions.resource,
        response
      );
    }
  }

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
