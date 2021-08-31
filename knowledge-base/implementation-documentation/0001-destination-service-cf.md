# Destination Service on Cloud Foundry

This document aims to give a concise but complete overview of the communication flows necessary to retrieve destinations from the Cloud Foundry destination service.
The listed steps are implemented by the SDK.

For this document, consider the setup of a multi-tenant application, i.e. one _provider_ application (and its corresponding tenant) and n _subscriber_ tenants.
We will call provider tenant `prov` and the exemplary subscriber tenant `sub`.

In general, both the provider and the subscriber are able to define destinations.
So when retrieving destinations, we have to differentiate between provider and subscriber destinations.

Additionally, the destination service itself differentiates between instance and subaccount destinations.

Instance destinations are destinations defined for a specific instance of the destination service.
We do not recommend customers to use them (and haven't found a use for them yet), but still need to support them.
Subaccount destinations are destinations defined for a whole subaccount, i.e. every application that belongs to the respective subaccount can access them.
The destination service itself will give preference to instance destinations over subaccount destinations.

Accessing the destination service requires an access token.
Such a token can be retrieved from the XSUAA service.
Depending on the use case, one of two flows has to be used.
For simply retrieving a list of destinations, the client credentials flow is sufficient.
For triggering the OAuth2SAMLBearerFlow between SAP BTP and the destination (e.g. an S/4 system), the user token + refresh token flow is needed.

All in all, when an SDK user wants to access a specific destination, we need to consider the cross product of (subscriber,provider) and (instance,subaccount).
So for each of these possibilities, we need to get an access token and then retrieve the necessary destinations.

Let's consider provider + subaccount first, as a "sensible default".

1. Get an access token:

- get the URI of the XSUAA service from env.VCAP_SERVICES
- get the client_id and client_secret of the destination service from env.VCAP_SERVICES
- execute a clientCredentialsGrant request

```
curl -X POST \
  https://prov.authentication.sap.hana.ondemand.com/oauth/token \
  -H 'Accept: application/json' \
  -H 'Authorization: <CLIENT_ID:CLIENT_SECRET>' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'client_id=CLIENT_ID&grant_type=client_credentials'
```

- this will return something like:

```
{
  "access_token": "some.token.value",
  "token_type": "bearer",
  "expires_in": 43199,
  "scope": "uaa.resource destination-xsappname!b433.Read destination-xsappname!b433.Modify",
  "jti": "somestring"
}
```

2. Get destinations using the retrieved token:

- The destination service has three endpoints for retrieving destinations: `instanceDestinations`, `subaccountDestinations`, and `destinations/{name}`. We obviously choose `subaccountDestinations`.
- Execute the following call:

```
curl -X GET \
https://destination-configuration.cfapps.sap.hana.ondemand.com/destination-configuration/v1/subaccountDestinations \
-H 'Authorization: Bearer some.token.value' \
-H 'Cache-Control: no-cache'
```

That's the basic flow!
For instanceDestinations, simply use the other endpoint.

In order to retrieve subscriber destinations, we can do the same with only a little change to how we get an access token.
Instead of talking to the XSUAA via `https://prov.authentication.sap.hana.ondemand.com/oauth/token`, we simply substitute the tenant-specific subdomain (`prov`) by the respective subscriber tenant, in this case `sub`.
This gives us the final URL `https://sub.authentication.sap.hana.ondemand.com/oauth/token`.
This gives us an access token that, when used for the destination service, will give us the subscriber's instance and subaccount destinations.

Finally, there's one more relevant case for us.
Suppose you have a destination with authentication type Basic.
Then you will get the username and password directly when retrieving it as instance/subaccount destination.
For destinations with authentication type OAuth2SAMLBearerAssertion (aka destinations that are S/4 system and for which principal propagation should be used), we need to trigger the propagation of the principal.
We do this by calling the destination service's `destination/{name}` endpoint for the given destination.
However, since we want to propagate the principal (i.e. the user on whose behalf we are retrieving the destination), we need some kind of access token that reflects this user.
We do this by first executing a user token grant request with the user's JWT and the client_id of the destination service:

```
curl -X POST \
  https://prov.authentication.sap.hana.ondemand.com/oauth/token \
  -H 'Authorization: Bearer the.users.jwt' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'client_id=CLIENT_ID&grant_type=user_token&response_type=token'
```

This will give us a response with `access_token=null` and `refresh_token=somevalue`.
Now we can take that refresh token to get a new access token with the client credentials of the destination service like this:

```
curl -X POST \
  https://s4sdk.authentication.sap.hana.ondemand.com/oauth/token \
  -H 'Authorization: Basic <CLIENT_ID:CLIENT_SECRET>' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=refresh_token&refresh_token=somevalue'
```

This will now give us an access_token that we use to call the `destination/{name}` endpoint of the destination service, and that, if the original user can be propagated to the S/4 system, will give us an access token that we can use to authenticate against the S/4 system.
