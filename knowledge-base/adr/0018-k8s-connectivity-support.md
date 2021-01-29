# ADR template by Michael Nygard

This is the template in [Documenting architecture decisions - Michael Nygard](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions).
You can use [adr-tools](https://github.com/npryce/adr-tools) for managing the ADR files.

In each ADR file, write these sections:

# K8s Connectivity Support

## Status

What is the status, such as proposed, accepted, rejected, deprecated, superseded, etc.?

## Context

In order to achieve connectivity to onPremises systems SAP has introduced the cloud connector (CC) and connectivity service.
For classic CF all relevant information are availible at runtime for the application (VCAP_SERVICES).
For K8s a alignment is necessary between K8s and SDK. 

### How it works for Cloud Foundry

You create a binding to the connectivity service which adds `connectivity` to the VCAP_SERVICE variables.
Then there are four players:
- Application on SCP
- Connectivity Proxy (middleware between app and CC)
- Cloud Connector (CC)
- onPremises Target System

When the application wants to reach the target system the following flow takes places:
- Fetches the proxy information (host,port) from the `connectivity` VCAP_SERVICES.
- It fetches a clientCredGrant JWT using the clientID and secret of the `connectivity` VCAP_SERVICES.
- The JWT is used for authentication against the connectivity proxy 
- The other side of the proxy is connected to the CC which pipes the request to the target system

Remark Multi Tenant: The cloud connectors are in the subscriber accounts.
So the [connectivity service is multi tenant](https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/313b215066a8400db461b311e01bd99b.html)
and the JWT issued contains the information the proxy needs to pipe the data to the right cloud connector side.

### What does not work on K8s

On k8s cluster the connectivity proxy is independently setup so the SCP does not know the infrastructure details (host,port)
The reason is that the coupling between service binding (SCP) and runtime is much weaker.

So we need a way to pass the infrastructure details to the application.

## Decision

The requirement was initiated by the business application factory (BAF) colleagues but the issue is general to K8s.

We will simply use environment variables to pass the host and port information.
Proposal still pending but it will go in here [proxyHostAndPort()](../../packages/core/src/connectivity/scp-cf/connectivity-service.ts)

We will collect the K8s related changes for a while and then come up with a proper abstraction layer.
Also here we are interested to get some feedback from the colleagues to distinguish runtimes. 

## ToDos

- Align with the other K8s stakeholder kyma and gardener how they plan to handle the onPrem connectivity.
- Setup a K8s test application (doable) for the connectivity proxy setup we would need support 
- Inclue the applicaiton in E2E test pipeline

## Questions:

- which runtime should we use for the E2E test? Kyma possible or gardener because we need the freedom


## Consequences

OnPremise connectivity works on K8s based runtimes. 

