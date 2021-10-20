import {
  executeHttpRequest,
  fetchDestination,
  getDestination,
  getService,
  serviceToken,
  userApprovedServiceToken,
  wrapJwtInHeader,
  jwtBearerToken,
  getDestinationFromDestinationService,
  decodeJwt
} from '@sap-cloud-sdk/core';
import { BusinessPartner } from '@sap/cloud-sdk-vdm-business-partner-service';
import * as xssec from '@sap/xssec';
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
    destinationService = getService('destination');
  });

  xit('OAuth2SAMLBearerAssertion: Provider Destination & Provider Token', async () => {
    const userGrant = await userApprovedServiceToken(
      accessToken.provider,
      destinationService
    );

    const destination = await fetchDestination(
      destinationService!.credentials.uri,
      userGrant,
      systems.s4.providerOAuth2SAMLBearerAssertion
    );
    expect(destination.authTokens![0].error).toBeNull();

    const result = await BusinessPartner.requestBuilder()
      .getAll()
      .top(1)
      .execute(destination);
    expect(result.length).toBe(1);
  }, 60000);

  xit('OAuth2Password: Fetches destination and destination service has token', async () => {
    const clientGrant = await serviceToken('destination', {
      userJwt: accessToken.provider
    });

    const destination = await fetchDestination(
      destinationService!.credentials.uri,
      clientGrant,
      systems.destination.providerOAuth2Password
    );
    expect(destination!.authTokens![0].type).toBe('bearer');
    expect(destination!.authTokens![0].value).toBeDefined();
  }, 60000);

  xit('BasicAuth: Provider Destination & Provider Token + GET request', async () => {
    const clientGrant = await serviceToken('destination', {
      userJwt: accessToken.provider
    });

    const destination = await fetchDestination(
      destinationService!.credentials.uri,
      clientGrant,
      systems.s4.providerBasic
    );

    const result = await BusinessPartner.requestBuilder()
      .getAll()
      .top(1)
      .execute(destination);
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
    const clientGrant = await serviceToken('destination', {
      userJwt: accessToken.provider
    });

    const destination = await fetchDestination(
      destinationService!.credentials.uri,
      clientGrant,
      systems.s4.providerBasic
    );

    const buPa = BusinessPartner.builder()
      .businessPartnerCategory('1')
      .lastName('name')
      .build();
    const result = await BusinessPartner.requestBuilder()
      .create(buPa)
      .execute(destination);
    expect(result.lastName).toBe('name');
  }, 60000);

  xit('BasicAuth: Subscriber Destination & Subscriber Token', async () => {
    const clientGrant = await serviceToken('destination', {
      userJwt: accessToken.subscriber
    });

    const destination = await fetchDestination(
      destinationService!.credentials.uri,
      clientGrant,
      systems.s4.subscriberBasic
    );

    const result = await BusinessPartner.requestBuilder()
      .getAll()
      .top(1)
      .execute(destination);
    expect(result.length).toBe(1);
  }, 60000);

  xit('OAuth2ClientCredentials: Provider Destination & Provider Jwt', async () => {
    const clientGrant = await serviceToken('destination', {
      userJwt: accessToken.provider
    });

    const destination = await fetchDestination(
      destinationService!.credentials.uri,
      clientGrant,
      systems.workflow.providerOAuth2ClientCredentials
    );
    expect(destination.authTokens![0].error).toBeNull();

    destination.url = destination.url + '/v1/workflow-definitions';
    const response = await executeHttpRequest(destination, { method: 'get' });

    expect(response.status).toBe(200);
  }, 60000);

  xit('OAuth2UserTokenExchange: Provider destination and Subscriber Jwt', async () => {
    const providerDestToken = await serviceToken('destination', {});

    const destination = await fetchDestination(
      destinationService!.credentials.uri,
      {
        authHeaderJwt: providerDestToken,
        exchangeHeaderJwt: accessToken.subscriber
      },
      systems.workflow.providerOAuth2UserTokenExchange
    );

    expect(destination!.authTokens![0].error).toBeNull();

    destination.url = destination.url + '/v1/workflow-definitions';
    const response = await executeHttpRequest(destination, { method: 'get' });

    expect(response.status).toBe(200);
  }, 60000);

  xit('OAuth2JWTBearer: Provider Destination & Provider Token', async () => {
    const token = await serviceToken('destination', {
      userJwt: accessToken.provider
    });

    const destination = await fetchDestination(
      destinationService!.credentials.uri,
      token,
      systems.workflow.providerOauth2JWTBearer
    );

    expect(destination!.authTokens![0].error).toBeNull();

    destination.url = destination.url + '/v1/workflow-definitions';
    const response = await executeHttpRequest(destination, { method: 'get' });

    expect(response.status).toBe(200);
  }, 60000);

  xit('ClientCertificate: Fetches the certificate and uses it', async () => {
    const destination = await getDestination('CC8-HTTP-CERT');
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
    process.env.HTTPS_PROXY = 'http://someHost:1234';
    process.env.NO_PROXY =
      'https://s4sdk.authentication.sap.hana.ondemand.com/oauth/token,https://my300470-api.s4hana.ondemand.com';

    const destination = await getDestination('CC8-HTTP-CERT');
    expect(destination!.certificates!.length).toBe(1);
    const bps = await BusinessPartner.requestBuilder()
      .getAll()
      .top(5)
      .execute(destination!);
    expect(bps.length).toBeGreaterThan(0);
  }, 10000);

  xit('OAuth2UserTokenExchange: Subscriber destination and Subscriber Jwt', async () => {
    const subscriberDestToken = await serviceToken('destination', {
      userJwt: accessToken.subscriber
    });

    const destination = await fetchDestination(
      destinationService!.credentials.uri,
      {
        authHeaderJwt: subscriberDestToken,
        exchangeHeaderJwt: accessToken.subscriber
      },
      systems.destination.subscriberOAuth2UserTokenExchange
    );
    expect(destination.authTokens![0].error).toBeNull();

    const response = await executeHttpRequest(
      {
        url: 'https://destination-configuration.cfapps.sap.hana.ondemand.com/destination-configuration/v1/subaccountDestinations'
      },
      {
        method: 'get',
        headers: wrapJwtInHeader(destination.authTokens![0].value).headers
      }
    );

    expect(response.status).toBe(200);
  }, 60000);

  xit('OAuth2SAMLBearerAssertion: Provider Destination & Provider Token', async () => {
    const jwtToken = await jwtBearerToken(
      accessToken.provider,
      destinationService
    );

    const destination = await fetchDestination(
      destinationService!.credentials.uri,
      jwtToken,
      systems.s4.providerOAuth2SAMLBearerAssertion
    );
    expect(destination.authTokens![0].error).toBeNull();

    const result = await BusinessPartner.requestBuilder()
      .getAll()
      .top(1)
      .execute(destination);
    expect(result.length).toBe(1);
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
      userJwt: xsuaaToken
    });

    const destination = await fetchDestination(
      destinationService!.credentials.uri,
      clientGrant,
      systems.workflow.providerOAuth2ClientCredentials
    );
    expect(destination.authTokens![0].error).toBeNull();

    destination.url = destination.url + '/v1/workflow-definitions';
    const response = await executeHttpRequest(destination, { method: 'get' });

    expect(response.status).toBe(200);
  }, 60000);
});
