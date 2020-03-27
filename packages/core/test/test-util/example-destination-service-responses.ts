/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import {
  AuthenticationType,
  DestinationConfiguration,
  DestinationJson
} from '../../src';

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

export const oauthMultipleResponse: DestinationConfiguration[] = [
  {
    Name: 'FINAL-DESTINATION',
    Type: 'HTTP',
    URL: 'https://my.system.com/',
    Authentication: 'OAuth2SAMLBearerAssertion' as AuthenticationType,
    ProxyType: 'Internet',
    audience: 'https://my.system.com',
    authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:X509',
    clientKey: 'password',
    nameIdFormat: 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress',
    scope: 'SOME_SCOPE',
    tokenServiceUser: 'TOKEN_USER',
    tokenServiceURL: 'https://my.system.com/sap/bc/sec/oauth2/token',
    userIdSource: 'email',
    tokenServicePassword: 'password'
  }
];

export const oauthSingleResponse: DestinationJson = {
  owner: {
    SubaccountId: 'a89ea924-d9c2-4eab-84fb-3ffcaadf5d24',
    InstanceId: null
  },
  destinationConfiguration: oauthMultipleResponse[0],
  authTokens: [
    {
      type: 'Bearer',
      value: 'token',
      expires_in: '3600'
    }
  ]
};

export const onPremiseMultipleResponse: DestinationConfiguration[] = [
  {
    Name: 'OnPremise',
    URL: 'my.on.premise.system:54321',
    ProxyType: 'OnPremise',
    Authentication: 'NoAuthentication' as AuthenticationType
  }
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
