## Set up identity service (IAS) on CF

As SDK developers, we would like to have an e2e test running on the CF for testing the IAS features.
This documentation shows how to set up an e2e test landscape.

### You will learn

After reading this "how-to" document, you will be able to:

- create an identity service
- create a service key for the identity service
- manage the default identity provider
- verify the IAS token (JWT) from the identity service

### Prerequisites

This documentation assumes you know how to set up a minimal e2e test landscape on CF, which includes:

- creating a space
- creating an XSUAA service instance
- creating a saas registry service instance
- configuring and deploying an App Router
- configuring and deploying an application

### Step 1: Create an identity service instance on CF

To create your identity service, you can use the command below:

```
cf create-service identity application your-identity-service-name -c ias-config.json
```

The `ias-config.json` looks like:

```json
{
  "oauth2-configuration": {
    "redirect-uris": ["https://*.cfapps.sap.hana.ondemand.com/login/callback"]
  },
  "consumed-services": [],
  "xsuaa-cross-consumption": true,
  "multi-tenant": true
}
```

### Step 2: Create a service key for the identity service

Similarly, you can use the command below:

```
cf create-service-key your-identity-service-name your-identity-service-key-name
```

You can check your service key information via the command below:

```
cf service-key your-identity-service-name your-identity-service-key-name
```

The response should look like the json below, where the `url` shows how to access the default IdP:

```json
{
  "clientid": "xxx",
  "clientsecret": "xxx",
  "domain": "xxx.ondemand.com",
  "domains": ["xxx.ondemand.com"],
  "url": "https://xxx.xxx.ondemand.com",
  "zone_uuid": "xxx"
}
```

### Step 3: Manage the default IdP

Follow the steps below for the IdP management:

1. Go to the admin page (`/admin`) of the default IdP shown in the previous step like: `http://xx.xx.ondemand.com/admin/`.
1. Log in with your admin account.
1. Click `Applications & Resources`.
1. Click `Applications`.
1. Search for your identity service name and select it.
1. Make sure `Multitenant Application` is checked.
1. You can configure other settings of the default IdP.

### Step 4 Verify the IAS token from the identity service

I assume you have a real application (e.g., VDM E2E test application) with an app router.

#### Application deployment

Add the identity service created to the `manifest.yaml` for service binding.
Please note, as the identity service can be used without an XSUAA service, we don't have to bind the XSUAA service for now.

#### App Router deployment

##### Service binding

Similarly, add the same identity service to the `manifest.yaml`.

##### Configure `route` and `TENANT_HOST_PATTERN`

The `route` URL looks like below, where the `tenant id` part of the URL has to be the `tenant id` on the CF (with the GUID pattern).
Therefore, if you reuse a `manifest.yaml` from the current VDM e2e test, make sure the route uses `tenant id` instead of `subdomain` (string based value, used with XSUAA service).

```
route: <your-tenant-id>-router-abcd.xx.xx.xx.xx.ondemand.com
```

The `TENANT_HOST_PATTERN` regex then looks like below, so the `tenant id` info can be extracted.

```
TENANT_HOST_PATTERN: '^(.*)-router-abcd.xx.xx.xx.xx.ondemand.com'
```

Here is the [wiki page about why URL pattern looks differently in the case of XSUAA and IAS](https://wiki.wdf.sap.corp/wiki/pages/viewpage.action?spaceKey=CloudFront&title=IAS+Support+in+Approuter#IASSupportinApprouter-RuntimeURLPatternsandAuthenticationType).

#### Verify IAS token in the application

You can then use the code below as an endpoint to verify the IAS token:

```ts
import { retrieveJwt } from '@sap-cloud-sdk/core';
import { Request, Response } from 'express';

export function testJwt(req: Request, res: Response) {
  const jwt = retrieveJwt(req);
  res.status(200).send(jwt);
}
```

The payload of the decoded IAS (JWT) looks like below, where `user_uuid` (IdP `user uuid`) and `zone_id` (CF `tenant id`) are shown.

```json
{
  "aud": ["xxx", "xxx"],
  "sub": "xxx",
  "user_uuid": "xxx",
  "azp": "xxx",
  "iss": "https://xxx.ondemand.com",
  "zone_uuid": "xxx",
  "exp": 123,
  "given_name": "xxx",
  "iat": 123,
  "family_name": "xxx",
  "jti": "xxx",
  "email": "xxx"
}
```

#### Verify IAS token via HTTP request

You can use the client id/secret for getting the IAS token via the token endpoint, after creating the service key in step 2.

##### With client credentials grant

Use the `POST` request below and the basic auth (`username` = `client id` and `password` = `secret`) and the `Content-Type` with the value like below in the header.

```
POST https://ma.accounts400.ondemand.com/oauth2/token?grant_type=client_credentials&scope=openid,Application
```

```
Content-Type: application/x-www-form-urlencoded
```

The IAS token from this approach will not contain the user information like the `user_uuid`, because no user information is provided.
The `zone_uuid` can be found in the JWT.
This IAS token might be used in the case that only `zone_uuid` is needed like the destination service.

##### With user password grant

If you need the user information (e.g., `user_uuid`) as part of the IAS token, you should use the password grant like below, where `username`/`password` of a real user of the IdP should be provided as query parameters.

```
POST https://ma.accounts400.ondemand.com/oauth2/token?grant_type=password&username=<username>&password=<password>&scope=openid,Application
```

Use the same `Content-Type` value like the client credentials grant.
