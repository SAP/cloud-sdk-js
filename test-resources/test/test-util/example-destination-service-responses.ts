import {
  AuthenticationType,
  DestinationConfiguration,
  DestinationJson
} from '@sap-cloud-sdk/connectivity/internal';

export const destinationName = 'FINAL-DESTINATION';
export const certificateMultipleResponse: DestinationConfiguration[] = [
  {
    Name: 'ERNIE-UND-CERT',
    Type: 'HTTP',
    URL: 'https://my.ca.com',
    Authentication: 'ClientCertificateAuthentication' as AuthenticationType,
    ProxyType: 'Internet',
    KeyStorePassword: 'password',
    KeyStoreLocation: 'key.p12'
  }
];

export const certificateSingleResponse = {
  owner: {
    SubaccountId: 'a61ed66e-3bc1-4013-ab96-477bd8bc83df',
    InstanceId: null
  },
  destinationConfiguration: certificateMultipleResponse[0],
  certificates: [
    {
      Name: 'key.p12',
      Content: 'base64string',
      Type: 'CERTIFICATE'
    }
  ]
};

function destinationWithAuthType(
  authType: AuthenticationType
): DestinationConfiguration {
  return {
    Name: 'FINAL-DESTINATION',
    Type: 'HTTP',
    URL: 'https://my.system.com/',
    Authentication: authType,
    ProxyType: 'Internet',
    audience: 'https://my.system.com',
    clientKey: 'password',
    scope: 'SOME_SCOPE',
    tokenServiceUser: 'TOKEN_USER',
    tokenServiceURL: 'https://my.system.com/sap/bc/sec/oauth2/token',
    userIdSource: 'email',
    tokenServicePassword: 'password'
  };
}

function destinationSingleResponse(
  multipleResponse: DestinationConfiguration[]
): DestinationJson {
  return {
    owner: {
      SubaccountId: 'a89ea924-d9c2-4eab-84fb-3ffcaadf5d24',
      InstanceId: null
    },
    destinationConfiguration: multipleResponse[0],
    authTokens: [
      {
        type: 'Bearer',
        value: 'token',
        expires_in: '3600'
      }
    ]
  };
}

export const oauthMultipleResponse: DestinationConfiguration[] = [
  destinationWithAuthType('OAuth2SAMLBearerAssertion')
];
export const oauthSingleResponse: DestinationJson = destinationSingleResponse(
  oauthMultipleResponse
);

export const oauthUserTokenExchangeMultipleResponse: DestinationConfiguration[] =
  [destinationWithAuthType('OAuth2UserTokenExchange')];
export const oauthUserTokenExchangeSingleResponse: DestinationJson =
  destinationSingleResponse(oauthUserTokenExchangeMultipleResponse);

export const oauthPasswordMultipleResponse: DestinationConfiguration[] = [
  destinationWithAuthType('OAuth2Password')
];
export const oauthPasswordSingleResponse = destinationSingleResponse(
  oauthPasswordMultipleResponse
);

export const oauthClientCredentialsMultipleResponse: DestinationConfiguration[] =
  [destinationWithAuthType('OAuth2ClientCredentials')];
export const oauthClientCredentialsSingleResponse: DestinationJson =
  destinationSingleResponse(oauthClientCredentialsMultipleResponse);

export const onPremiseMultipleResponse: DestinationConfiguration[] = [
  getOnPremDestination('NoAuthentication')
];

export const basicMultipleResponse: DestinationConfiguration[] = [
  {
    Name: 'FINAL-DESTINATION',
    Type: 'HTTP',
    URL: 'https://my.system.com',
    Authentication: 'BasicAuthentication' as AuthenticationType,
    ProxyType: 'Internet',
    TrustAll: 'TRUE',
    User: 'USER_NAME',
    Password: 'password'
  }
];

export const onPremiseBasicMultipleResponse: DestinationConfiguration[] = [
  getOnPremDestination('BasicAuthentication')
];
export const onPremiseBasicSingleResponse: DestinationJson =
  destinationSingleResponse(oauthMultipleResponse);

export const onPremisePrincipalPropagationMultipleResponse: DestinationConfiguration[] =
  [getOnPremDestination('PrincipalPropagation')];
export const onPremisePrincipalPropagationSingleResponse: DestinationJson =
  destinationSingleResponse(onPremisePrincipalPropagationMultipleResponse);

function getOnPremDestination(authType: AuthenticationType) {
  return {
    Name: 'OnPremise',
    URL: 'my.on.premise.system:54321',
    ProxyType: 'OnPremise',
    Authentication: authType
  };
}
