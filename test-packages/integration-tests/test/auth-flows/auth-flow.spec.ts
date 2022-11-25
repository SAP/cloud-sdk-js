import { businessPartnerService } from '@sap/cloud-sdk-vdm-business-partner-service';
import * as xssec from '@sap/xssec';
import { Destination, getAgentConfig } from '@sap-cloud-sdk/connectivity';
import { sendMail } from '@sap-cloud-sdk/mail-client';
import { executeHttpRequest } from '../../../../packages/http-client/src';
import {
  getService,
  fetchDestination,
  wrapJwtInHeader,
  decodeJwt,
  getDestination,
  getDestinationFromDestinationService,
  serviceToken
} from '../../../../packages/connectivity/src/internal';
import { signedJwt } from '../../../../test-resources/test/test-util';
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
  const { businessPartnerApi } = businessPartnerService();

  beforeAll(() => {
    accessToken = readUserAccessToken();
    systems = readSystems();
    loadLocalVcap();
    destinationService = getService('destination');
  });

  xit('creates a destination from service binding and gets a client credentials grant', async () => {
    let destination = await getDestination({
      destinationName: 'destination-js-sdk'
    });
    expect(destination?.authTokens![0].value).toBeDefined();
    expect(destination?.url).toBeDefined();

    destination = await getDestination({
      destinationName: 'business-logging-js-sdk'
    });
    expect(destination?.authTokens![0].value).toBeDefined();
    expect(destination?.url).toBeDefined();

    destination = await getDestination({
      destinationName: 's4-hana-cloud-js-sdk'
    });
    expect(destination?.username).toBeDefined();
    expect(destination?.url).toBeDefined();

    destination = await getDestination({
      destinationName: 'saas-registry-js-sdk'
    });
    expect(destination?.authTokens![0].value).toBeDefined();
    expect(destination?.url).toBeDefined();

    destination = await getDestination({
      destinationName: 'service-manager-js-sdk'
    });
    expect(destination?.authTokens![0].value).toBeDefined();
    expect(destination?.url).toBeDefined();

    destination = await getDestination({ destinationName: 'workflow-js-sdk' });
    expect(destination?.authTokens![0].value).toBeDefined();
    expect(destination?.url).toBeDefined();
  }, 60000);

  xit('get assertion test', async () => {
    const destination = await getDestination({
      destinationName: systems.s4.providerSamlAssertion,
      jwt: accessToken.provider
    });

    expect(destination!.authTokens![0].type).toBe('SAML2.0');
    expect(destination!.authTokens![0].value).toBeDefined();
  }, 60000);

  xit('OAuth2Password: Fetches destination and destination service has token', async () => {
    const destination = await getDestination({
      destinationName: systems.destination.providerOauth2Password
    });

    expect(destination!.authTokens![0].type).toBe('bearer');
    expect(destination!.authTokens![0].value).toBeDefined();
  }, 60000);

  xit('BasicAuth: Provider Destination & Provider Token + GET request', async () => {
    const destination = await getDestination({
      destinationName: systems.s4.providerBasic,
      jwt: accessToken.provider
    });

    const result = await businessPartnerApi
      .requestBuilder()
      .getAll()
      .top(1)
      .execute(destination!);
    expect(result.length).toBe(1);
  }, 60000);

  xit('BasicAuth onPrem  Basic Authentication', async () => {
    const destination = await getDestinationFromDestinationService({
      destinationName: systems.s4onPrem.providerBasic
    });

    expect(destination!.proxyConfiguration).toMatchObject({
      headers: { 'Proxy-Authorization': expect.stringMatching(/Bearer.*/) },
      host: expect.stringMatching(/.*sap\.hana\.ondemand\.com/),
      port: expect.stringMatching(/\d+/),
      protocol: 'http'
    });
  }, 60000);

  xit('BasicAuth: Provider Destination & Provider Token + PUT request (csrf token)', async () => {
    const destination = await getDestination({
      destinationName: systems.s4.providerBasic,
      jwt: accessToken.provider
    });

    const buPa = businessPartnerApi
      .entityBuilder()
      .businessPartnerCategory('1')
      .lastName('name')
      .build();
    const result = await businessPartnerApi
      .requestBuilder()
      .create(buPa)
      .execute(destination!);
    expect(result.lastName).toBe('name');
  }, 60000);

  xit('Service Token: Gets token for non XSUAA jwt', async () => {
    const token = await serviceToken('destination', {
      jwt: signedJwt({ user: 'MrX' })
    });
    expect(decodeJwt(token).iss).toBe(
      'http://s4sdk.localhost:8080/uaa/oauth/token'
    );
  });

  xit('BasicAuth: Subscriber Destination & Subscriber Token', async () => {
    const destination = await getDestination({
      destinationName: systems.s4.subscriberBasic,
      jwt: accessToken.subscriber
    });

    const result = await businessPartnerApi
      .requestBuilder()
      .getAll()
      .top(1)
      .execute(destination!);
    expect(result.length).toBe(1);
  }, 60000);

  xit('Basic Auth: iss as token ', async () => {
    const destination = await getDestination({
      destinationName: systems.s4.providerBasic,
      iss: 'http://s4sdk.localhost:8080/uaa/oauth/token'
    });
    expect(destination?.password).toBeDefined();
  }, 60000);

  xit('Oauth2ClientCredentials: JWT with no JKU should be accepted if destination has jwks or jwks_uri property', async () => {
    const destination = await getDestination({
      destinationName:
        systems.destination.providerOauth2ClientCredentialsWithoutJKU
    });
    expect(destination?.jwksUri).toBeDefined();
    expect(destination?.jwks).toBeDefined();
  }, 60000);

  xit('No Auth: trust store certificates are fetched', async () => {
    const destination = await getDestination({
      destinationName: systems.destination.providerTrustStore
    });
    expect(destination?.trustStoreCertificate).toBeDefined();
    expect(destination?.trustStoreCertificate?.content).toBeDefined();
    const agent = getAgentConfig(destination!);
    expect(agent['httpsAgent'].options.ca[0]).toMatch(/BEGIN CERTIFICATE/);
  }, 60000);

  xit('OAuth2SAMLBearerAssertion: Provider Destination & Provider Token', async () => {
    const destination = await getDestination({
      destinationName: systems.s4.providerOAuth2SAMLBearerAssertion,
      jwt: accessToken.provider
    });
    expect(destination!.authTokens![0].error).toBeNull();

    const result = await businessPartnerApi
      .requestBuilder()
      .getAll()
      .top(1)
      .execute(destination!);
    expect(result.length).toBe(1);
  }, 60000);

  xit('OAuth2ClientCredentials: Provider Destination (common token url)', async () => {
    let destination = await getDestination({
      destinationName:
        systems.destination.providerOauth2ClientCredentialsCommonTokenURL
    });
    expect(destination!.authTokens![0]!.error).toBeUndefined();
    destination = await getDestination({
      destinationName:
        systems.destination.providerOauth2ClientCredentialsCommonTokenURL,
      jwt: accessToken.subscriber
    });
    expect(destination!.authTokens![0]!.error).toBeUndefined();
    destination = await getDestination({
      destinationName:
        systems.destination.providerOauth2ClientCredentialsCommonTokenURL,
      jwt: accessToken.provider
    });
    expect(destination!.authTokens![0]!.error).toBeUndefined();
    assertCommenTokenUrl(destination!);
  }, 60000);

  xit('OAuth2ClientCredentials: Provider Destination (dedicated token service url)', async () => {
    let destination = await getDestination({
      destinationName: systems.destination.providerOauth2ClientCredentials
    });
    expect(destination!.authTokens![0]!.error).toBeNull();
    destination = await getDestination({
      destinationName: systems.destination.providerOauth2ClientCredentials,
      jwt: accessToken.provider
    });
    expect(destination!.authTokens![0]!.error).toBeNull();
    destination = await getDestination({
      destinationName: systems.destination.providerOauth2ClientCredentials,
      jwt: accessToken.subscriber
    });
    expect(destination!.authTokens![0]!.error).toBeNull();
    assertDedicatedTokenUrl(destination!);
  }, 60000);

  xit('OAuth2ClientCredentials: Provider Destination & Provider Jwt (workflow)', async () => {
    const destination = await getDestination({
      destinationName: systems.workflow.providerOAuth2ClientCredentials,
      jwt: accessToken.provider
    });
    expect(destination!.authTokens![0].error).toBeNull();

    destination!.url = destination!.url + '/v1/workflow-definitions';
    const response = await executeHttpRequest(destination!, {
      method: 'get'
    });

    expect(response.status).toBe(200);
  }, 60000);

  xit('OAuth2UserTokenExchange: Provider destination and Provider Jwt (workflow)', async () => {
    const destination = await getDestination({
      destinationName: systems.workflow.providerOAuth2UserTokenExchange,
      jwt: accessToken.provider
    });

    expect(destination!.authTokens![0].error).toBeNull();

    destination!.url = destination!.url + '/v1/workflow-definitions';
    const response = await executeHttpRequest(destination!, {
      method: 'get'
    });

    expect(response.status).toBe(200);
  }, 60000);

  xit('OAuth2UserTokenExchange: Provider destination (common token url)', async () => {
    let destination = await getDestination({
      destinationName:
        systems.destination.providerOauth2UserTokenExchangeCommonTokenURL,
      jwt: accessToken.subscriber
    });
    expect(destination!.authTokens![0].error).toBeNull();
    destination = await getDestination({
      destinationName:
        systems.destination.providerOauth2UserTokenExchangeCommonTokenURL,
      jwt: accessToken.provider
    });
    expect(destination!.authTokens![0].error).toBeNull();
    assertCommenTokenUrl(destination!);
  }, 60000);

  xit('OAuth2UserTokenExchange: Subscriber destination and Subscriber Jwt', async () => {
    const destination = await getDestination({
      destinationName: systems.destination.subscriberOauth2UserTokenExchange,
      jwt: accessToken.subscriber
    });
    expect(destination!.authTokens![0].error).toBeNull();

    const response = await executeHttpRequest(
      {
        url: 'https://destination-configuration.cfapps.sap.hana.ondemand.com/destination-configuration/v1/subaccountDestinations'
      },
      {
        method: 'get',
        headers: {
          custom: wrapJwtInHeader(destination!.authTokens![0].value).headers,
          requestConfig: {}
        }
      }
    );

    expect(response.status).toBe(200);
  }, 60000);

  xit('OAuth2UserTokenExchange: Provider destination (dedicated token url)', async () => {
    let destination = await getDestination({
      destinationName: systems.destination.providerOauth2UserTokenExchange,
      jwt: accessToken.provider
    });
    expect(destination!.authTokens![0].error).toBeNull();
    destination = await getDestination({
      destinationName: systems.destination.providerOauth2UserTokenExchange,
      jwt: accessToken.subscriber
    });
    expect(destination!.authTokens![0].error).toMatch(
      /Invalid issuer.*token did not match expected/
    );
    assertDedicatedTokenUrl(destination!);
  }, 60000);

  xit('OAuth2JWTBearer: Provider Destination & Provider Token (workflow call)', async () => {
    const destination = await getDestination({
      destinationName: systems.workflow.providerOauth2JWTBearer,
      jwt: accessToken.provider
    });

    expect(destination!.authTokens![0].error).toBeNull();

    destination!.url = destination!.url + '/v1/workflow-definitions';
    const response = await executeHttpRequest(destination!, {
      method: 'get'
    });

    expect(response.status).toBe(200);
  }, 60000);

  xit('OAuth2JWTBearer: Provider Destination  (common token service URL)', async () => {
    let destination = await getDestination({
      destinationName:
        systems.destination.providerOauth2JWTBearerCommonTokenURL,
      jwt: accessToken.provider
    });
    expect(destination!.authTokens![0]!.error).toBeNull();
    destination = await getDestination({
      destinationName:
        systems.destination.providerOauth2JWTBearerCommonTokenURL,
      jwt: accessToken.subscriber
    });
    expect(destination!.authTokens![0]!.error).toBeNull();
  }, 60000);

  xit('OAuth2JWTBearer: Provider Destination (dedicated token service URL)', async () => {
    let destination = await getDestination({
      destinationName: systems.destination.providerOauth2JWTBearer,
      jwt: accessToken.subscriber
    });
    expect(destination!.authTokens![0]!.error).toMatch(/Unable to map issuer/);
    destination = await getDestination({
      destinationName: systems.destination.providerOauth2JWTBearer,
      jwt: accessToken.provider
    });
    expect(destination!.authTokens![0]!.error).toBeNull();
  }, 60000);

  xit('ClientCertificate: Fetches the certificate and uses it', async () => {
    const destination = await getDestination({
      destinationName: systems.s4.providerClientCert
    });
    expect(destination!.certificates!.length).toBe(1);
    const bps = await businessPartnerApi
      .requestBuilder()
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

    const destination = await getDestination({
      destinationName: systems.s4.providerClientCert
    });
    expect(destination!.certificates!.length).toBe(1);
    const bps = await businessPartnerApi
      .requestBuilder()
      .getAll()
      .top(5)
      .execute(destination!);
    expect(bps.length).toBeGreaterThan(0);
  }, 60000);

  xit('PrincipalPropagation: Provider not E2E', async () => {
    const destination = await getDestination({
      destinationName: systems.s4onPrem.providerPrincipalPropagation,
      jwt: accessToken.provider
    });
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

  xit('IAS: token exchange by making an xsuaa call', async () => {
    const iasToken = accessToken.iasProvider;
    const xsuaaConfig = JSON.parse(process.env.VCAP_SERVICES!).xsuaa[0]
      .credentials;
    const token = await new Promise(
      (resolve: (value: string) => void, reject) => {
        xssec.requests.requestUserToken(
          iasToken,
          xsuaaConfig,
          null,
          null,
          null,
          xsuaaConfig.subaccountid,
          (err: Error, xsuaaToken) => (err ? reject(err) : resolve(xsuaaToken))
        );
      }
    );
    const decoded = decodeJwt(token);
    expect(decoded.scope.length).toBeGreaterThan(0);
  }, 60000);

  xit('IAS: token exchange with xssec createSecurityContext', async () => {
    const iasToken = accessToken.iasProvider;
    const xsuaaConfig = JSON.parse(process.env.VCAP_SERVICES!).xsuaa[0]
      .credentials;
    const token = await new Promise((resolve: (p: string) => void, reject) => {
      xssec.createSecurityContext(
        iasToken,
        xsuaaConfig,
        (err: Error, context, tokenInfo) =>
          err ? reject(err) : resolve(tokenInfo.getTokenValue())
      );
    });
    const decoded = decodeJwt(token);
    expect(decoded.scope.length).toBeGreaterThan(0);
  }, 60000);

  xit('PrivateLink: Provider Destination', async () => {
    const myDestination = await getDestination({
      destinationName: systems.destination.providerBasicPrivateLink
    });
    expect(myDestination?.proxyType).toEqual('PrivateLink');
  });

  xit('Mail: Provider cloud basic auth', async () => {
    const destination = await getDestinationFromDestinationService({
      destinationName: systems.email.providerCloudBasic
    });
    expect(destination?.type).toEqual('MAIL');
    expect(destination?.proxyType).toEqual('Internet');
    expect(destination?.originalProperties?.['mail.user']).toBeTruthy();
    expect(destination?.originalProperties?.['mail.smtp.host']).toBeTruthy();

    const myEmailAddress = destination?.originalProperties!['mail.user'];
    const res = await sendMail(destination!, {
      from: myEmailAddress,
      to: myEmailAddress,
      subject: 'sub',
      text: 'txt'
    });
    expect(res).toBeTruthy();
  }, 60000);

  xit('Mail: Provider op basic auth', async () => {
    const destination = await getDestinationFromDestinationService({
      destinationName: systems.email.providerOnPremBasic
    });

    expect(destination?.proxyType).toEqual('OnPremise');
    expect(destination?.proxyConfiguration).toMatchObject({
      'proxy-authorization': expect.any(String),
      host: expect.stringMatching(/.*sap\.hana\.ondemand\.com/),
      port: expect.any(Number),
      protocol: 'socks'
    });
  }, 60000);

  xit('IAS + OAuth2ClientCredentials: Provider Destination & Provider Jwt', async () => {
    const iasToken = accessToken.iasProvider;
    const xsuaaConfig = JSON.parse(process.env.VCAP_SERVICES!).xsuaa[0]
      .credentials;
    const xsuaaToken = await new Promise(
      (resolve: (p: string) => void, reject) => {
        xssec.createSecurityContext(
          iasToken,
          xsuaaConfig,
          (err: Error, context, tokenInfo) =>
            err ? reject(err) : resolve(tokenInfo.getTokenValue())
        );
      }
    );

    const clientGrant = await serviceToken('destination', {
      jwt: xsuaaToken
    });

    const destination = await fetchDestination(
      destinationService!.credentials.uri,
      clientGrant,
      { destinationName: systems.workflow.providerOAuth2ClientCredentials }
    );
    expect(destination.authTokens![0].error).toBeNull();

    destination.url = destination.url + '/v1/workflow-definitions';
    const response = await executeHttpRequest(destination! as any, {
      method: 'get'
    });

    expect(response.status).toBe(200);
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
