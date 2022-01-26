import jwt from 'jsonwebtoken';
import nock from 'nock';
import {
  Destination,
  getDestination,
  IsolationStrategy
} from '@sap-cloud-sdk/connectivity';
import {
  destinationCache,
  destinationServiceCache,
  clientCredentialsTokenCache
} from '@sap-cloud-sdk/connectivity/internal';
import {
  decodeJwtComplete,
  wrapJwtInHeader
} from '@sap-cloud-sdk/connectivity/dist/scp-cf';
import {
  mockClientCredentialsGrantCall,
  mockUserTokenGrantCall
} from '../../../test-resources/test/test-util/xsuaa-service-mocks';
import {
  privateKey,
  publicKey
} from '../../../test-resources/test/test-util/keys';
import {
  destinationBindingClientSecretMock,
  mockServiceBindings,
  providerXsuaaUrl,
  xsuaaBindingMock
} from '../../../test-resources/test/test-util/environment-mocks';
import {
  mockInstanceDestinationsCall,
  mockSingleDestinationCall,
  mockSubaccountDestinationsCall
} from '../../../test-resources/test/test-util/destination-service-mocks';

describe('CacheDestination & CacheClientCredentialToken', () => {
  const jku = `http://${xsuaaBindingMock.credentials.uaadomain}`;
  const kid = 'myKidTest';
  const providerUserToken = jwt.sign(
    {
      zid: 'provider_token',
      user_id: 'user_id',
      aud: 'xsapp-myapp!123',
      iss: providerXsuaaUrl
    },
    privateKey,
    {
      // algorithm: 'RS256',
      header: { alg: 'RS256', jku, kid }
    }
  );

  const providerServiceToken = jwt.sign(
    {
      zid: 'provider_token',
      aud: 'xsapp-myapp!123',
      iss: providerXsuaaUrl
    },
    privateKey,
    {
      header: { alg: 'RS256', jku, kid }
    }
  );

  beforeEach(() => {
    mockServiceBindings();
    const destination = {
      Name: 'FINAL-DESTINATION',
      Authentication: 'BasicAuthentication',
      Password: 'password',
      User: 'username',
      ProxyType: 'Internet',
      sapclient: null,
      URL: 'https://example.com',
      authTokens: []
    };
    const destinationAuthFlow = {
      Name: 'FINAL-DESTINATION-AUTH-FLOW',
      Authentication: 'OAuth2JWTBearer',
      Password: 'password',
      User: 'username',
      ProxyType: 'Internet',
      sapclient: null,
      URL: 'https://example.com',
      authTokens: [{}]
    };

    mockVerificationKeyRetrieval(jku, kid);
    mockClientCredentialsGrantCall(
      providerXsuaaUrl,
      { access_token: providerServiceToken },
      200,
      destinationBindingClientSecretMock.credentials
    );
    mockInstanceDestinationsCall(
      nock,
      [destination, destinationAuthFlow],
      200,
      providerServiceToken
    );
    mockSubaccountDestinationsCall(nock, [], 200, providerServiceToken);
    mockSingleDestinationCall(
      nock,
      destinationAuthFlow,
      200,
      destinationAuthFlow.Name,
      wrapJwtInHeader(providerUserToken).headers
    );
  });

  afterEach(() => {
    nock.cleanAll();
    destinationCache.clear();
    destinationServiceCache.clear();
    clientCredentialsTokenCache.clear();
    delete process.env['VCAP_SERVICES'];
  });

  it('caches the Destinations service call which fixed isolation Tenant (only simple auth flows)', async () => {
    await populateDestinationsServiceCache();

    const destinationRequestTenantUser = await getDestination({
      destinationName: 'FINAL-DESTINATION',
      useCache: true,
      isolationStrategy: IsolationStrategy.Tenant_User
    });
    expect(destinationRequestTenantUser).toBeDefined();

    const destinationRequestTenant = await getDestination({
      destinationName: 'FINAL-DESTINATION',
      useCache: true,
      isolationStrategy: IsolationStrategy.Tenant
    });
    expect(destinationRequestTenant).toBeDefined();
  });

  it('caches the destination retrieval for relevant auth flow', async () => {
    const directCall = await populateDestinationCache();

    const cache = await getDestination({
      destinationName: 'FINAL-DESTINATION-AUTH-FLOW',
      useCache: true,
      jwt: providerUserToken,
      isolationStrategy: IsolationStrategy.Tenant_User
    });
    expect(cache).toBeDefined();
    expect(cache).toEqual(directCall);

    await expect(
      getDestination({
        destinationName: 'FINAL-DESTINATION-AUTH-FLOW',
        useCache: true,
        jwt: providerUserToken,
        isolationStrategy: IsolationStrategy.Tenant_User
      })
    ).rejects.toThrowError(/Nock: No match for request/);
  }, 600000);

  // Fill the cache of the destinations-service endpoint, which is enough for simple auth flow destinations
  async function populateDestinationsServiceCache(): Promise<void> {
    await getDestination({
      destinationName: 'FINAL-DESTINATION',
      useCache: true,
      isolationStrategy: IsolationStrategy.Tenant
    });
  }

  // Do the full logic in destination-from-serive.ts included auth flow leading to a filled destination cache
  async function populateDestinationCache(): Promise<Destination | null> {
    mockUserTokenGrantCall(
      providerXsuaaUrl,
      2,
      providerUserToken,
      providerUserToken,
      xsuaaBindingMock.credentials
    );
    // destinationBindingClientSecretMock.credentials)

    mockUserTokenGrantCall(
      providerXsuaaUrl,
      1,
      providerUserToken,
      providerUserToken,
      // xsuaaBindingMock.credentials)
      destinationBindingClientSecretMock.credentials
    );
    const decoded = decodeJwtComplete(providerUserToken);

    return getDestination({
      destinationName: 'FINAL-DESTINATION-AUTH-FLOW',
      useCache: true,
      jwt: providerUserToken,
      isolationStrategy: IsolationStrategy.Tenant_User
    });
  }
});

function mockVerificationKeyRetrieval(jku: string, kid: string) {
  const response = {
    keys: [
      {
        kty: 'RSA',
        e: 'AQAB',
        use: 'sig',
        kid,
        alg: 'RS256',
        value: publicKey,
        n: 'AMf4zeb9Zqf01Z_Z00KGFSFHwrFAx2t1Ka-bQ2Qu5s5U6zdj58K7s8ku8NSXfkrasFuP75_O7mtmJWc1PDm9I0eJWzjwimhyItJMjbSV0L0Oy2TxvHqUC28dCCD_1i1VVbQfGy-Tlrh5mt6VJ4m25gE7WzoeS5LENsyzJ4BI1BediUMs06Y6EJGoadATXv3a5QKjtud5HomOtxS-m3pSoyRpkqnZ6LUl8Qdspvh0NEoWjb0xSxL4tvjm5MoxloBaUGqAnBqtCl9MtJj8zr3RbDU_qwRXZB4iviZet_Em4ptc_XyLRWx_YYlcGN-0fay7R9WCotz7gEzI3_wye5lJbg0'
      }
    ]
  };

  nock(jku).get('/').times(2).reply(200, response);
}
