import {
  executeHttpRequest,
  fetchDestination,
  getDestinationFromDestinationService,
  getService,
  serviceToken,
  userApprovedServiceToken,
  wrapJwtInHeader
} from '@sap-cloud-sdk/core';
import { BusinessPartner } from '@sap/cloud-sdk-vdm-business-partner-service';
import { loadLocalVcap } from './oauth-util';
import { accessToken } from './user-access-token';
import { systems } from './systems';

/*
Consider the README.md to understand how to execute these tests.
 */

describe('OAuth flows', () => {
  let destinationService;

  beforeAll(() => {
    loadLocalVcap();
    destinationService = getService('destination');
  });

  it('OAuth2SAMLBearerAssertion Provider Destination & Provider Token', async () => {
    const destinationName = 'CC8-HTTP-OAUTH';
    const highLevelFlow = await getDestinationFromDestinationService(
      destinationName,
      { userJwt: accessToken.provider }
    );

    const userGrant = await userApprovedServiceToken(
      accessToken.provider,
      destinationService
    );

    const destination = await fetchDestination(
      destinationService!.credentials.uri,
      userGrant,
      destinationName
    );
    expect(destination.authTokens![0].error).toBeUndefined();

    const result = await BusinessPartner.requestBuilder()
      .getAll()
      .top(1)
      .execute(destination);
    expect(result.length).toBe(1);
  }, 60000);

  it('Basic Provider Destination & Provider Token', async () => {
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

  it('Basic Subscriber Destination & Subscriber Token', async () => {
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

  it('OAuth2ClientCredentials Provider Destination & Provider Token', async () => {
    const clientGrant = await serviceToken('destination', {
      userJwt: accessToken.provider
    });

    const destination = await fetchDestination(
      destinationService!.credentials.uri,
      clientGrant,
      systems.workflow.providerClientCert
    );
    expect(destination.authTokens![0].error).toBeNull();

    destination.url = destination.url + '/v1/workflow-definitions';
    const response = await executeHttpRequest(destination, { method: 'get' });

    expect(response.status).toBe(200);
  }, 60000);

  it('OAuth2UserTokenExchange Provider Destination & Provider Token', async () => {
    const userGrant = await userApprovedServiceToken(
      accessToken.provider,
      destinationService
    );

    const destination = await fetchDestination(
      destinationService!.credentials.uri,
      userGrant,
      systems.workflow.providerUserExchange
    );
    expect(destination.authTokens![0].error).toBeNull();

    destination.url = destination.url + '/v1/workflow-definitions';
    const response = await executeHttpRequest(destination, { method: 'get' });

    expect(response.status).toBe(200);
  }, 60000);

  it('OAuth2UserTokenExchange Provider Destination & Subscriber Token', async () => {
    const providerDestToken = await serviceToken('destination', {});

    const destination = await fetchDestination(
      destinationService!.credentials.uri,
      {
        authHeaderJwt: providerDestToken,
        exchangeHeaderJwt: accessToken.subscriber
      },
      systems.workflow.providerUserExchange
    );
    expect(destination.authTokens![0].error).toBeNull();

    destination.url = destination.url + '/v1/workflow-definitions';
    const response = await executeHttpRequest(destination, { method: 'get' });

    expect(response.status).toBe(200);
  }, 60000);

  it('Direct access token for Workflow, Provider', async () => {
    const workflowService = getService('workflow')!;


    // For some reason credentials under UUA - WHY?
     workflowService.credentials.clientid = workflowService.credentials.uaa.clientid
     workflowService.credentials.clientsecret =workflowService.credentials.uaa.clientsecret
    const token = await serviceToken(workflowService, {
      userJwt: accessToken.provider
    });

    const url =
      workflowService!.credentials.endpoints.workflow_rest_url +
      '/v1/workflow-definitions';
    const response = await executeHttpRequest(
      { url },
      { method: 'get', headers: wrapJwtInHeader(token).headers }
    );

    expect(response.status).toBe(200);
  }, 60000);
});
