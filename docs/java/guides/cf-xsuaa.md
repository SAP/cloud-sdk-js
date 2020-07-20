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

## XSUAA Usage on Cloud Foundry

When implementing and deploying an application it quickly becomes important to understand how authentication and authorizations works on SCP Cloud Foundry.
In our tutorials and documentation pages we recommend using "approuter" as proxy service to handle authentication management to your implemented application.
The following steps will show what happens behind the scenes. The requests can be manually reproduced by a REST client of your choice, e.g. Postman or Insomnia.

The [official UAA documentation](https://docs.cloudfoundry.org/api/uaa/) is highly recommended if there are questions.

**Please note:** The following paragraphs only describe a subset of features of the XSUAA Service on Cloud Foundry.
The Cloud SDK is not participating in the active development of this software and cannot give in-depth support.
Some information may already be outdated.


These are use cases`described below:
- User Login: `Authorization Code Grant`
- SCP Service Usage on behalf of User: `JWT Bearer Token Grant`
- SCP Service Usage on behalf of service: `Client Credentials Grant`
- Resolve User Access Token: `Refresh Token Grant`

### Read the Application Properties  

In order to create a request, we need to parse the XSUAA connection data.

1. First, take note of your "_application route_", that's the URL for which an authorization request will be constructed.

1. Open the **system-provided** environment variables of your application on Cloud Foundry.

1. In the JSON value, locate the object `VCAP_SERVICES.xsuaa[0].credentials`.
   
   *Note:* Depending on the scenario, the "xsuaa" array may have more than one entry. Your application can be bound to multiple instances, e.g. through different service plans.

1. Extract values "_url_", "_clientid_", "_clientsecret_".

## Authorization Code Grant

Since we start without previous access token, we begin our journey with the browser flow of [Authorization Code Grant](https://docs.cloudfoundry.org/api/uaa/version/74.23.0/index.html#authorization-code-grant).

The following action is split into two steps:
- Get authorization code on behalf of single-sign-on login form.
- Get personal access token from authorization code.

### Get Authorization Code

You will likely need to run the following request in your browser and monitor the HTTP response.

1. Request:
    ```
    GET https://[xsuaa.url]/oauth/authorize
    
    Query parameters:
    
    client_id=[xsuaa.clientid]
    redirect_uri=[application.route]
    response_type=code
    ```
    (optional values can be set for "scope" and "login_hint")
1. Submit login form via browser.
2. Read HTTP response:
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
1. Extract `[code]` from `Location` header.

### Get OAuth2 Access Token

With the authorization code we can now request a real access token from the OAuth2 service endpoint:

1. Request:
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
1. Response:
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
   Congratulation, you have a valid `access_token`.
   It can be further evaluated and forwarded.
   
   Some applications like _approuter_ will save the `refresh_token` to the user session.
   This leverages the automatic retrieval of new access tokens, if the previous ones have expired during the active session.

## JWT Bearer Token Grant

Several services on SCP Cloud Foundry require a dedicated OAuth2 access token, e.g. _Connectivity Service_ and _Destination Service_.

1. Open the **system-provided** environment variables of your application.

1. In the JSON value, locate the object `VCAP_SERVICES.destination[0].credentials`.

1. Read "clientid", "clientsecret", "uri".
   
1. Request:
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
1. Response:
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

1. Request:
    ```
    POST https://[xsuaa.url]/oauth/token
    
    Headers
    Accept: application/json
    Content-Type: application/x-www-form-urlencoded
   
    client_id=[destination.clientid]
    client_secret=[destination.clientsecret]
    grant_type=client_credentials
    ```
1. Response:
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
   It can be used to query the `destination.uri` linked destination service on behalf of the service binding itself.

   
   
## Refresh Token Grant

If the current access token is expired, a new one can be requested with the [Refresh Token](https://docs.cloudfoundry.org/api/uaa/version/74.23.0/index.html#refresh-token).
   
1. Request:
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
1. Response:
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
   Congratulation, you have a refreshed `access_token`.
