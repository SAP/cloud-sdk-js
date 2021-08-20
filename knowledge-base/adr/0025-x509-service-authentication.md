# Support x509 based Service Authentication

## Status

accepted

## Context

Currently, we have only implemented one flow when you want to access a service:

- You bind the service to the application or create a service key.
- This creates a VCAP env variable entry including `clientID` and `clientSecret`
- With this information you can ask the XSUAA to issue a token to access the service
- Different grant types are available for the token (clientGrant, userGrant....)

This changes slightly when you want to use certificates as a secret to request a token at the XSUAA

- Now per default XSUAA accepts x509 as authentication type.
  You can configure this in the security descriptor JSON:

```JSON
{
    "xsappname": "someName",
    "oauth2-configuration": {
    "credential-types": ["binding-secret", "x509"]
    }
}
```

- You bind the service or create a service key as usual `cf create-service-key myservice myservicekey -c parameters.json` where the parameters.json is:

```json
{
  "credential-type": "x509",
  "x509": {
    "key-length": 2048,
    "validity": 7,
    "validity-type": "DAYS"
  }
}
```

- If you want to support multiple credential-types you have to create multiple service keys.
- This binding leads to a `certificate` and `key` property in the VCAP service variables.
- You add this certificate to the HTTP client (mTLS) making the call to the XSUAA instead of the `clientSecret` in the payload.
- The XSUAA returns a token to access the desired service

### Advantages of x509

At first glance it seems like one string in the service keys:

```json
{
 "apiurl": "https://api.authentication.sap.hana.ondemand.com",
 "clientid": "someID",
 "clientsecret": "someSecret",
 "credential-type": "instance-secret",
 ...
}
```

is replaced by another string (certificate and key):

```json
{
 "apiurl": "https://api.authentication.sap.hana.ondemand.com",
 "certificate": "-----BEGIN CERTIFICATE-----...-----END CERTIFICATE-----\n-----BEGIN CERTIFICATE-----..-----END CERTIFICATE-----\n-----BEGIN CERTIFICATE-----...-----END CERTIFICATE-----\n",
 "clientid": "someID",
 "credential-type": "x509",
 "key": "-----BEGIN RSA PRIVATE KEY-----...-----END RSA PRIVATE KEY-----\n",
 ...
}
```

However, the certificate based approach has some advantages:

- The secret is not part of HTTP traffic but the TLS layer.
  So if customers switch on the HTTP trace you will not see secrets in the logs
- The lifetime of a certificate can be set so that even in the token retrieval you can not use an old stolen secret

### Disadvantages of x509

We are still investigating the details, but we are afraid of a higher support load.
Assume the following flow:

- Customer creates new application using the SDK
- Binds XSUAA and destination service to the application
- Per default the credentials-type will be `x509` and the XSUAA manages the certificate
- Everything works fine initially, but after 7 days the certificate expires.
- The support request will go to the SDK, because we throw the error.

You can of course configure the duration of the certificate validity but it seems to be limited to a maximum of one year.

### Rollout and Compatibility

For existing bindings and service keys nothing will change.
As of Q3, XSUAA will accept x509 and so will the other services like destination and connectivity.
Note that for service keys with `credential-type` x509 there is no `clientsecret` property.
At the current state the SDK will fail for this case.
In Q3 and Q4 the SDK relevant services like XSUAA, destination and connectivity should support x509 and are rolled out internally.

### Self Managed Certificates

We have discussed the XSUAA managed flow up to know.
In this case the certificates are created by the XSUAA.
But it is also possible to bring your own certificate when you create the service key:

```json
{
  "credential-type": "x509",
  "x509": {
    "certificate": "-----BEGIN CERTIFICATE-----...-----END CERTIFICATE-----",
    "ensure-uniqueness": false,
    "certificate-pinning": true
  }
}
```

In this case the `key` property is not part of the VCAP service variables, and you need to bring it from the outside.

## Decision

For the self-managed certificates we have to find a secure way for the customer to pass the private part of the certificate to the application.
In the first version this is not considered.
Implementation is easy it is more a security question.

### Option A - Extend our current code

We could extend our current code to support the x509 authentication.
This would require the current changes:

- Ensure the right service credentials are found in the VCAP (should already be the case).
- Investigate the `credential-type` if it is `instance-secret` or `x509`.
- Depending on the value use the http client with certificate or clientSecret to get a token.

Note that the xsuaa endpoints are different:

- X.509: https://<subdomain>.authentication.cert.<landscape domain>/oauth/token
- clientSecret: https://<subdomain>.authentication.<landscape domain>/oauth/token

### Option B

We change the token retrieval to the [xssec](https://www.npmjs.com/package/@sap/xssec) library.
We would need to do the following:

- Replace our existing call with the lib
- Ensure the right service credentials are found in the VCAP (should already be the case)
- The lib will take care of evaluation which type the service key is.

### Comparison A versus B

Option B is the winner.
With the library we are future-proof for other things to come.
Also, from a security point of view we should use the the `xssec` and not a homemade implementation.

## Consequences

The SDK supports token retrieval via `credential-type` x509.
