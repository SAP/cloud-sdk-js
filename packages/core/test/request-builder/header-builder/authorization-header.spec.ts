import { buildAndAddAuthorizationHeader, Destination } from '../../../src';
/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { buildAndAddAuthorizationHeader, Destination } from '../../../src';
import { addAuthorizationHeader } from '../../../src/request-builder/header-builder/authorization-header';
import { ODataGetAllRequestConfig } from '../../../src/request-builder/request/odata-get-all-request-config';
import { ODataRequest } from '../../../src/request-builder/request/odata-request';
import { muteLoggers } from '../../test-util/mute-logger';
import { defaultDestination } from '../../test-util/request-mocker';
import { TestEntity } from '../../test-util/test-services/test-service';

describe('Authorization header builder', () => {
  beforeAll(() => {
    muteLoggers('authorization-header');
  });

  it('Prioritizes custom Authorization headers (upper case A)', async () => {
    const request = new ODataRequest(new ODataGetAllRequestConfig(TestEntity), defaultDestination);
    request.config.addCustomHeaders({
      Authorization: 'Basic SOMETHINGSOMETHING'
    });

    const headers = await addAuthorizationHeader(request, {});
    expect(headers.authorization).toBe('Basic SOMETHINGSOMETHING');
  });

  it('Prioritizes custom Authorization headers (lower case A)', async () => {
    const request = new ODataRequest(new ODataGetAllRequestConfig(TestEntity), defaultDestination);
    request.config.addCustomHeaders({
      authorization: 'Basic SOMETHINGSOMETHING'
    });

    const headers = await addAuthorizationHeader(request, {});
    expect(headers.authorization).toBe('Basic SOMETHINGSOMETHING');
  });

  it('does not throw on NoAuthentication', async () => {
    await expect(buildAndAddAuthorizationHeader({ url: 'https://example.com', authentication: 'NoAuthentication' })({})).resolves.not.toThrow();
  });

  it('does not throw on ClientCertificateAuthentication', async () => {
    await expect(
      buildAndAddAuthorizationHeader({ url: 'https://example.com', authentication: 'ClientCertificateAuthentication' })({})
    ).resolves.not.toThrow();
  });

  it('defaults to NoAuthentication', async () => {
    await expect(buildAndAddAuthorizationHeader({ url: 'https://example.com' })({})).resolves.not.toThrow();
  });

  it('does not throw on Principal Propagation', async () => {
    const destination = {
      authentication: 'PrincipalPropagation',
      proxyConfiguration: {
        headers: { 'SAP-Connectivity-Authentication': 'someValue' }
      }
    } as Destination;

    await expect(buildAndAddAuthorizationHeader(destination)({})).resolves.not.toThrow();

    delete destination!.proxyConfiguration!.headers!['SAP-Connectivity-Authentication'];
    await expect(buildAndAddAuthorizationHeader(destination)({})).rejects.toThrowErrorMatchingSnapshot();
  });
});
