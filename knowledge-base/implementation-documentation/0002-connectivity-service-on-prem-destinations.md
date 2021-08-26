# Supporting the Connectivity Service / On-Premise Destinations

_Date:_ 2019-04-11  
_Status:_ Proposal

## Context: What is the Connectivity Service?

There are two versions of S/4HANA, Cloud and On-Premise.
Cloud is publicly reachable, on-premise may not be.
Cloud Foundry allows you to use your on-premise system with a Cloud Connector.
The Cloud Connector acts as a proxy that allows users to securely tunnel traffic from Cloud Foundry to the on-premise system.
It has to be running and be configured for the subaccount the destinations are defined in.
The connectivity service is the "missing link" that allows you to connect to the cloud connector.

Binding the connectivity service to your app gives you an entry in the environment variables like this:

```json
{
 "VCAP_SERVICES": {
  "connectivity": [
   {
    "binding_name": null,
    "credentials": {
     "clientid": "clientid",
     "clientsecret": "clientsecret",
     "identityzone": "identityzone",
     "onpremise_proxy_host": "connectivityproxy.cf.sap.hana.ondemand.com",
     "onpremise_proxy_port": "20003",
     "onpremise_proxy_rfc_port": "20001",
     "onpremise_socks5_proxy_port": "20004",
     "tenantid": "abcdefg-1234-5678-hijk-7890lmnop",
     "tenantmode": "dedicated",
     "uaadomain": "authentication.sap.hana.ondemand.com",
     "url": "https://s4sdk.authentication.sap.hana.ondemand.com",
     "verificationkey": "-----BEGIN PUBLIC KEY-----the public key-----END PUBLIC KEY-----",
     "xsappname": "xsappname"
    },
    "instance_name": "my-connectivity",
    "label": "connectivity",
    "name": "my-connectivity",
    "plan": "lite",
    "provider": null,
    "syslog_drain_url": null,
    "tags": [
     "connectivity",
     "conn",
     "connsvc"
    ],
    "volume_mounts": []
   }
  ],
 },
 ...
}
```

`onpremise_proxy_host` and `onpremise_proxy_port` give you the URI that a request has to be tunneled through, in this case `http://connectivityproxy.internal.cf.sap.hana.ondemand.com:20003`.

**NOTE:** It's HTTP, not HTTPS.

**NOTE:** This URL can only be reached from Cloud Foundry. If you try connecting there from your machine, the request will simply timeout.

Additionally, there two headers that need to be added to the request:

`Proxy-Authentication: Bearer <Client Credentials Grant with the connectivity service's ID+Secret>`  
`SAP-Connectivity-Authentication: Bearer <The requesting user's JWT>`

The second is probably only necessary when the destination originated from a subscriber subaccount?!

## Implementation

The easiest solution would be to check in the destination accessor whether a ProxyConfiguration is necessary.
This would include "pre-building" the headers and simply putting everything on the destination, like this:

```
destination = {
  stuff: ...,
  proxyConfiguration: {
    proxyHost: string;
    proxyPort: number;
    headers: MapType<string>
  }
}
```

Then in the `ODataRequest.execute` we could check for proxy configuration and select the agent accordingly and in `ODataRequest.headers` simply include the proxyheaders into the request headers.

Not sure if this the best separation of concerns, but we might need the JWT to build the headers, and for principal propagation we also store authTokens on the destination, so I guess it's fair.

## Caveats

Using a proxy with axios is... difficult.
The only way I got it to work is by setting a custom `agent` on the axios request.
For this I use the `http-proxy-agent` lib.
This is problematic, since we also use an agent to support `TrustAll` on destinations, and these two agents don't mix.

In the spirit of getting shit done I suggest we simply don't support mixing it (given that `TrustAll` is intended as a non-production feature), i.e. proxy > `TrustAll`.

However, should this ever become a significant issue or should another requirement arise for which we'd need an `agent`, we should seriously consider implementing our own.
[This article](https://www.vanamco.com/2014/06/24/proxy-requests-in-node-js/) might provide a good starting point.
