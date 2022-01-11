import {
  Destination,
  executeHttpRequest,
  wrapJwtInHeader,
  getDestination,
  getDestinationFromDestinationService
} from '@sap-cloud-sdk/core';
import { BusinessPartner } from '@sap/cloud-sdk-vdm-business-partner-service';
import {
  loadLocalVcap,
  readSystems,
  readUserAccessToken,
  Systems,
  UserAccessTokens
} from './auth-flow-util';
/* Consider the how-to-execute-auth-flow-tests.md to understand how to execute these tests. */

describe('OAuth flows', () => {
  let destinationService;
  let accessToken: UserAccessTokens;
  let systems: Systems;

  beforeAll(() => {
    accessToken = readUserAccessToken();
    systems = readSystems();
    loadLocalVcap();
  });

  xit('OAuth2Password: Fetches destination and destination service has token', async () => {
    const destination = await getDestination(
      systems.destination.providerOauth2Password
    );

    expect(destination!.authTokens![0].type).toBe('bearer');
    expect(destination!.authTokens![0].value).toBeDefined();
  }, 60000);

  xit('BasicAuth: Provider Destination & Provider Token + GET request', async () => {
    const destination = await getDestination(systems.s4.providerBasic, {
      userJwt: accessToken.provider
    });

    const result = await BusinessPartner.requestBuilder()
      .getAll()
      .top(1)
      .execute(destination!);
    expect(result.length).toBe(1);
  }, 60000);

  xit('BasicAuth onPrem  Basic Authentication', async () => {
    const destination = await getDestinationFromDestinationService(
      systems.s4onPrem.providerBasic,
      {}
    );

    expect(destination!.proxyConfiguration).toMatchObject({
      headers: { 'Proxy-Authorization': expect.stringMatching(/Bearer.*/) },
      host: expect.stringMatching(/.*sap\.hana\.ondemand\.com/),
      port: expect.stringMatching(/\d+/),
      protocol: 'http'
    });
  }, 60000);

  xit('BasicAuth: Provider Destination & Provider Token + PUT request (csrf token)', async () => {
    const destination = await getDestination(systems.s4.providerBasic, {
      userJwt: accessToken.provider
    });

    const buPa = BusinessPartner.builder()
      .businessPartnerCategory('1')
      .lastName('name')
      .build();
    const result = await BusinessPartner.requestBuilder()
      .create(buPa)
      .execute(destination!);
    expect(result.lastName).toBe('name');
  }, 60000);

  xit('BasicAuth: Subscriber Destination & Subscriber Token', async () => {
    const destination = await getDestination(systems.s4.subscriberBasic, {
      userJwt: accessToken.subscriber
    });

    const result = await BusinessPartner.requestBuilder()
      .getAll()
      .top(1)
      .execute(destination!);
    expect(result.length).toBe(1);
  }, 60000);

  xit('Basic Auth: iss as token ', async () => {
    const destination = await getDestination(systems.s4.providerBasic, {
      iss: 'http://s4sdk.localhost:8080/uaa/oauth/token'
    });
    expect(destination?.password).toBeDefined();
  }, 60000);

  xit('OAuth2SAMLBearerAssertion: Provider Destination & Provider Token', async () => {
    const destination = await getDestination(
      systems.s4.providerOAuth2SAMLBearerAssertion,
      {
        userJwt: accessToken.provider
      }
    );
    expect(destination!.authTokens![0].error).toBeNull();

    const result = await BusinessPartner.requestBuilder()
      .getAll()
      .top(1)
      .execute(destination!);
    expect(result.length).toBe(1);
  }, 60000);

  xit('OAuth2ClientCredentials: Provider Destination (common token url)', async () => {
    let destination = await getDestination(
      systems.destination.providerOauth2ClientCredentialsCommonTokenURL,
      {}
    );
    expect(destination!.authTokens![0]!.error).toBeNull();
    destination = await getDestination(
      systems.destination.providerOauth2ClientCredentialsCommonTokenURL,
      {
        userJwt: accessToken.subscriber
      }
    );
    expect(destination!.authTokens![0]!.error).toBeNull();
    destination = await getDestination(
      systems.destination.providerOauth2ClientCredentialsCommonTokenURL,
      {
        userJwt: accessToken.provider
      }
    );
    expect(destination!.authTokens![0]!.error).toBeNull();
    assertCommenTokenUrl(destination!);
  }, 60000);

  xit('OAuth2ClientCredentials: Provider Destination (dedicated token service url)', async () => {
    let destination = await getDestination(
      systems.destination.providerOauth2ClientCredentials,
      {}
    );
    expect(destination!.authTokens![0]!.error).toBeNull();
    destination = await getDestination(
      systems.destination.providerOauth2ClientCredentials,
      {
        userJwt: accessToken.provider
      }
    );
    expect(destination!.authTokens![0]!.error).toBeNull();
    destination = await getDestination(
      systems.destination.providerOauth2ClientCredentials,
      {
        userJwt: accessToken.subscriber
      }
    );
    expect(destination!.authTokens![0]!.error).toBeNull();
    assertDedicatedTokenUrl(destination!);
  }, 60000);

  xit('OAuth2ClientCredentials: Provider Destination & Provider Jwt (workflow)', async () => {
    const destination = await getDestination(
      systems.workflow.providerOAuth2ClientCredentials,
      {
        userJwt: accessToken.provider
      }
    );
    expect(destination!.authTokens![0].error).toBeNull();

    destination!.url = destination!.url + '/v1/workflow-definitions';
    const response = await executeHttpRequest(destination!, { method: 'get' });

    expect(response.status).toBe(200);
  }, 60000);

  xit('OAuth2UserTokenExchange: Provider destination and Provider Jwt (workflow)', async () => {
    const destination = await getDestination(
      systems.workflow.providerOAuth2UserTokenExchange,
      {
        userJwt: accessToken.provider
      }
    );

    expect(destination!.authTokens![0].error).toBeNull();

    destination!.url = destination!.url + '/v1/workflow-definitions';
    const response = await executeHttpRequest(destination!, { method: 'get' });

    expect(response.status).toBe(200);
  }, 60000);

  xit('OAuth2UserTokenExchange: Provider destination (common token url)', async () => {
    let destination = await getDestination(
      systems.destination.providerOauth2UserTokenExchangeCommonTokenURL,
      {
        userJwt: accessToken.subscriber
      }
    );
    expect(destination!.authTokens![0].error).toBeNull();
    destination = await getDestination(
      systems.destination.providerOauth2UserTokenExchangeCommonTokenURL,
      {
        userJwt: accessToken.provider
      }
    );
    expect(destination!.authTokens![0].error).toBeNull();
    assertCommenTokenUrl(destination!);
  }, 60000);

  xit('OAuth2UserTokenExchange: Subscriber destination and Subscriber Jwt', async () => {
    const destination = await getDestination(
      systems.destination.subscriberOauth2UserTokenExchange,
      {
        userJwt: accessToken.subscriber
      }
    );
    expect(destination!.authTokens![0].error).toBeNull();

    const response = await executeHttpRequest(
      {
        url: 'https://destination-configuration.cfapps.sap.hana.ondemand.com/destination-configuration/v1/subaccountDestinations'
      },
      {
        method: 'get',
        headers: wrapJwtInHeader(destination!.authTokens![0].value).headers
      }
    );

    expect(response.status).toBe(200);
  }, 60000);

  xit('OAuth2UserTokenExchange: Provider destination (dedicated token url)', async () => {
    let destination = await getDestination(
      systems.destination.providerOauth2UserTokenExchange,
      {
        userJwt: accessToken.provider
      }
    );
    expect(destination!.authTokens![0].error).toBeNull();
    destination = await getDestination(
      systems.destination.providerOauth2UserTokenExchange,
      {
        userJwt: accessToken.subscriber
      }
    );
    expect(destination!.authTokens![0].error).toMatch(
      /Invalid issuer.*token did not match expected/
    );
    assertDedicatedTokenUrl(destination!);
  }, 60000);

  xit('OAuth2JWTBearer: Provider Destination & Provider Token (workflow call)', async () => {
    const destination = await getDestination(
      systems.workflow.providerOauth2JWTBearer,
      {
        userJwt: accessToken.provider
      }
    );

    expect(destination!.authTokens![0].error).toBeNull();

    destination!.url = destination!.url + '/v1/workflow-definitions';
    const response = await executeHttpRequest(destination!, { method: 'get' });

    expect(response.status).toBe(200);
  }, 60000);

  xit('OAuth2JWTBearer: Provider Destination  (common token service URL)', async () => {
    let destination = await getDestination(
      systems.destination.providerOauth2JWTBearerCommonTokenURL,
      {
        userJwt: accessToken.provider
      }
    );
    expect(destination!.authTokens![0]!.error).toBeNull();
    destination = await getDestination(
      systems.destination.providerOauth2JWTBearerCommonTokenURL,
      {
        userJwt: accessToken.subscriber
      }
    );
    expect(destination!.authTokens![0]!.error).toBeNull();
  }, 60000);

  xit('OAuth2JWTBearer: Provider Destination (dedicated token service URL)', async () => {
    let destination = await getDestination(
      systems.destination.providerOauth2JWTBearer,
      {
        userJwt: accessToken.subscriber
      }
    );
    expect(destination!.authTokens![0]!.error).toMatch(/Unable to map issuer/);
    destination = await getDestination(
      systems.destination.providerOauth2JWTBearer,
      {
        userJwt: accessToken.provider
      }
    );
    expect(destination!.authTokens![0]!.error).toBeNull();
  }, 60000);

  xit('ClientCertificate: Fetches the certificate and uses it', async () => {
    const destination = await getDestination(systems.s4.providerClientCert, {});
    expect(destination!.certificates!.length).toBe(1);
    const bps = await BusinessPartner.requestBuilder()
      .getAll()
      .top(5)
      .execute(destination!);
    expect(bps.length).toBeGreaterThan(0);
  }, 10000);

  // The axios does currently not support that the client cert socket is forwarded via a proxy:https://github.com/TooTallNate/node-https-proxy-agent/pull/111
  // Hence as a workaround it is possible to disable the proxy if it is not mandatory to pass the request.
  xit('ClientCertificate: Fetches the certificate and uses it - ignoring broken proxy', async () => {
    process.env.HTTPS_PROXY = 'http://someHost:1234'; // we changed to xssec which does not consider the no_proxy when calling the token. We would need a proper local forward everything proxy
    process.env.NO_PROXY =
      'https://s4sdk.authentication.sap.hana.ondemand.com/oauth/token,https://my300470-api.s4hana.ondemand.com';

    const destination = await getDestination(systems.s4.providerClientCert, {});
    expect(destination!.certificates!.length).toBe(1);
    const bps = await BusinessPartner.requestBuilder()
      .getAll()
      .top(5)
      .execute(destination!);
    expect(bps.length).toBeGreaterThan(0);
  }, 60000);

  xit('PrincipalPropagation: Provider not E2E', async () => {
    const destination = await getDestination(
      systems.s4onPrem.providerPrincipalPropagation,
      {
        userJwt: accessToken.provider
      }
    );
    // Call to backend will not work because the proxy is not rechable, but you can check the set headers.
    expect(destination?.proxyConfiguration).toBeDefined();
    expect(
      destination?.proxyConfiguration?.headers?.['Proxy-Authorization']
    ).toBeDefined();
    expect(
      destination?.proxyConfiguration?.headers?.[
        'SAP-Connectivity-Authentication'
      ]
    ).toBeDefined();
  }, 60000);
});

function assertCommenTokenUrl(destination: Destination) {
  expect(
    destination.originalProperties!.destinationConfiguration[
      'tokenServiceURLType'
    ]
  ).toBe('Common');
}

function assertDedicatedTokenUrl(destination: Destination) {
  expect(
    destination.originalProperties!.destinationConfiguration[
      'tokenServiceURLType'
    ]
  ).toBe('Dedicated');
}
