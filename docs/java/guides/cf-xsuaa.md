---
id: cf-xsuaa
title: SAP Cloud Foundry
hide_title: false
hide_table_of_contents: false
sidebar_label: Cloud Foundry XSUAA Usage
custom_edit_url: https://github.com
description: Configure you Cloud Foundry CLI and bind it to SAP Cloud Platform
keywords:
- sap
- cloud
- sdk
- cloud native
- cloud sdk
- sap cloud sdk
- xsuaa
- destination
- connectivity
image:
---

## XSUAA Usage on SCP Cloud Foundry

When developing and deploying an application it quickly becomes important to understand how authentication and authorizations work on SCP Cloud Foundry.
In our tutorials and documentation, we recommend using "approuter" as a proxy service to handle authentication management to your implemented application.
The following steps will show what happens behind the scenes. The requests can be manually reproduced by a REST client of your choice, e.g. Postman or Insomnia.

We highly recommend checking the [official UAA documentation](https://docs.cloudfoundry.org/api/uaa/) for any questions and comprehensive documentation on the topic.

:::note XSUAA service is developed independently of SAP Cloud SDK
The following documentation only touches a subset of features of the XSUAA Service on Cloud Foundry.
The Cloud SDK and XSUAA are developed independently. We do not provide in-depth support on XSUAA topics beyond Cloud SDK use cases. Mind, if some information seems outdated - get in touch with us and refer to [official XSUAA docs]((https://docs.cloudfoundry.org/api/uaa/)).
:::


These are use cases described below:
- User Login: `Authorization Code Grant`
- SCP Service Usage on behalf of a User: `JWT Bearer Token Grant`
- SCP Service Usage on behalf of a service: `Client Credentials Grant`
- Resolve User Access Token: `Refresh Token Grant`

### Read the Application Properties  

In order to create a request, we need to parse the XSUAA connection data.

1. Take note of your "_application route_". That's the URL for which an authorization request will be built.

1. Open the **system-provided** environment variables of your application on Cloud Foundry.

1. Extract values "_url_", "_clientid_", "_clientsecret_" from the JSON value, located in the object `VCAP_SERVICES.xsuaa[0].credentials`.
   
:::tip
Depending on your setup, the `xsuaa` array may have more than one entry. Because your application can be bound to multiple instances, e.g. through different service plans.
:::

## Authorization Code Grant

Since we start without an existing access token, our journey begins with the browser flow of [Authorization Code Grant](https://docs.cloudfoundry.org/api/uaa/version/74.23.0/index.html#authorization-code-grant).

This flow is split into two steps: 
- Get authorization code on behalf of a single-sign-on login form.
- Get personal access token from authorization code.

### Get Authorization Code

You will likely need to run the following HTTP request in your browser and check the HTTP response.

1. Make the following request:
    ```
    GET https://[xsuaa.url]/oauth/authorize
    
    Query parameters:
    
    client_id=[xsuaa.clientid]
    redirect_uri=[application.route]
    response_type=code
    ```
:::tip
Optional values can be set for "scope" and "login_hint"
:::
1. Submit login form via browser.
1. Check the HTTP response and extract `[code]` from `Location` header.
    ```
    HTTP/1.1 302 Found
    Strict-Transport-Security: max-age=31536000
    Set-Cookie: X-Uaa-Csrf=[...]; Path=/; Max-Age=86400; Expires=[...]; HttpOnly
    Cache-Control: no-store
    Content-Language: en
    Location: [application.route]?code=[code]
    X-XSS-Protection: 1; mode=block
    X-Frame-Options: DENY
    X-Content-Type-Options: nosniff
    ```

### Get OAuth2 Access Token

With the authorization code we can now request a real access token from the OAuth2 service endpoint:

1. Make the following request:
    ```
    POST https://[xsuaa.url]/oauth/token
    
    Headers
    Accept: application/json
    Content-Type: application/x-www-form-urlencoded
   
    client_id=[xsuaa.clientid]
    client_secret=[xsuaa.clientsecret]
    redirect_uri=[application.route]
    code=[code]
    grant_type=authorization_code
    ```
1. Check the response:
    ```
    {
      "access_token": [access_token],
      "token_type": "bearer",
      "id_token": [...],
      "refresh_token": [refresh_token],
      "expires_in": [...],
      "scope": [...],
      "jti": [...]
    }
    ```
   Congratulation, now you've fetched a valid `access_token`.
   It can be further evaluated and forwarded.
   
:::tip
   Some applications like _approuter_ will save the `refresh_token` to the user session for you.
   This enables automatic retrieval of new access tokens after the existing one has expired during the active session.
:::
## JWT Bearer Token Grant

Several services on SCP Cloud Foundry require a dedicated OAuth2 access token, e.g. _Connectivity Service_ and _Destination Service_.

1. Open the **system-provided** environment variables of your application.

1. In the JSON value, locate the object `VCAP_SERVICES.destination[0].credentials`. Make note of `clientid`, `clientsecret`, `uri`

   
1. Make the following request:
    ```
    POST https://[xsuaa.url]/oauth/token
    
    Headers
    Accept: application/json
    Content-Type: application/x-www-form-urlencoded
   
    client_id=[destination.clientid]
    client_secret=[destination.clientsecret]
    assertion=[access_token]
    grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer
    response_type=token
    ```
1. Check the response:
    ```
    {
      "access_token": [destination_access_token],
      "token_type": "bearer",
      "expires_in": [...],
      "scope": [...],
      "jti": [...]
    }
   ```
   Congratulation, you have a valid `destination_access_token`.
   It can be used to query the `destination.uri` linked destination service on behalf of the current user.

## Client Credentials Grant

Some applications require access to a platform service without an active user sessions, with _technical user_ credentials.
For example, reading a list of destinations does not require a user access token.
Instead we can request an access token on behalf of the service binding itself.
Here we use the [Client Credentials Grant](https://docs.cloudfoundry.org/api/uaa/version/74.23.0/index.html#without-authorization).

1. Make a request:
    ```
    POST https://[xsuaa.url]/oauth/token
    
    Headers
    Accept: application/json
    Content-Type: application/x-www-form-urlencoded
   
    client_id=[destination.clientid]
    client_secret=[destination.clientsecret]
    grant_type=client_credentials
    ```
1. Check the response:
    ```
    {
      "access_token": [destination_access_token],
      "token_type": "bearer",
      "expires_in": [...],
      "scope": [...],
      "jti": [...]
    }
    ```
   Congratulation, you have a valid `destination_access_token`.
   It can be used to query the `destination.uri` linked destination service on behalf of the service binding.

   
   
## Refresh Token Grant

If the current access token is expired, a new one can be requested with the [Refresh Token](https://docs.cloudfoundry.org/api/uaa/version/74.23.0/index.html#refresh-token).
   
1. Make a request:
    ```
    POST https://[xsuaa.url]/oauth/token
    
    Headers
    Accept: application/json
    Content-Type: application/x-www-form-urlencoded
   
    client_id=[xsuaa.clientid]
    client_secret=[xsuaa.clientsecret]
    refresh_token=[refresh_token]
    grant_type=refresh_token
    ```
1. Check the response:
    ```
    {
      "access_token": [access_token],
      "token_type": "bearer",
      "id_token": [...],
      "refresh_token": [refresh_token],
      "expires_in": [...],
      "scope": [...],
      "jti": [...]
    }
    ```
   Congratulation, you now have a refreshed `access_token`.
