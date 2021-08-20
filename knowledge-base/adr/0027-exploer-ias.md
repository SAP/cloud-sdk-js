# Title Explore IAS compatibility with the SDK

## Status

accepted

## Context

We want to expand the scope of the SDK, so users can leverage the IAS features.
IAS, as authentication layer, cannot be used without authorization layer.

## Decision

For the time being, using IAS (authentication) and XSUAA (authorization) together (hybrid mode) is a common SAP solution.
This [doc](https://github.wdf.sap.corp/CPSecurity/Knowledge-Base/blob/master/03_ApplicationSecurity/IAS-XSUAA-token-xchange.md) shows how to exchange IAS token to XSUAA token, where we delegate the task to `@sap/xssec`.

In addition, we have to consider/test the scenarios like:

- when both IAS and XSUAA are enabled (for IAS users)
- when only XSUAA is enabled (for current users)
- when only IAS is enabled (error handling as this should not work)
  ![](../img/ias-xsuaa-token-xchange.png)
  The flowchart of the token exchange. [1]

## Background

### SAP Kernel Services

[SAP Kernel Services](https://pages.github.tools.sap/kernelservices/) are foundational services used by all LoBs to ensure consistent integration across all SAP cloud solutions.

### Identity Service

[Identity Service](https://pages.github.tools.sap/kernelservices/services/identity-service) is part of the SAP Kernel Services.
The Identity Service consists of IAS(Identity Authentication Service) and IPS(Identity Provisioning Service).

### Why Identity Service

The [roadmap](https://pages.github.tools.sap/kernelservices/services/identity-service) should give you a big picture about new features of the Identity Service.
You'll find some potential use cases below.

#### Identity provisioning

Customers using multiple cloud solutions can provision user from e.g., SFSF to Concur.
REST Services are available on the [api hub](https://api.sap.com/package/SCPIdentityServices?section=Artifacts).
User endpoint, for example, supports CRUD operations.

#### Flexible identity authentication

Customers can enable the end users, so they can choose the following authentication:

- basic auth
- 2FA auth like RSA token and/or SMS
- Microsoft Azure or other 3rd Party IdP
- on-prem IdP

#### IAS vs. XSUAA

The table below also shows some major differences between IAS and XSUAA.

|                       | IAS                                         | XSUAA                 |
| --------------------- | ------------------------------------------- | --------------------- |
| Standard              | OIDC (on the top of OAuth + authentication) | OAuth (authorization) |
| Support 3rd party IdP | yes                                         | no                    |
| Runtime               | CF + Neo                                    | CF                    |

## Very useful links:

- [Identity service of Kernel service docl](https://pages.github.tools.sap/kernelservices/services/identity-service)
- [IAS jam page](https://jam4.sapjam.com/groups/e7Wsy6rTJQSe6qS2A26jlj/overview_page/K0FQBkDvdDMPfxV1bjvaLb) and [IPS jam page](https://jam4.sapjam.com/groups/e7Wsy6rTJQSe6qS2A26jlj/overview_page/GKDYX75hk506URGH2NcCRu)
- [IAS Xsuaa Token exchange by CPSecurity](https://github.wdf.sap.corp/CPSecurity/Knowledge-Base/blob/master/03_ApplicationSecurity/IAS-XSUAA-token-xchange.md)

## Useful links:

- [ IAS Xsuaa Token exchange by Workforce availability service](https://github.wdf.sap.corp/WorkforceAvailabilityService/wars/blob/main/docs/development/Ias-xsuaa-token-exchange.md)
- [IAS with XSUAA service by Chris](https://github.wdf.sap.corp/MA/sdk/blob/develop/docs/proof-of-concept/ias-subscription-with-xsuaa-service.md)
- [CF based sample application by Kernel service doc](https://pages.github.tools.sap/KernelServices/adoption-guide/cf-sample-app#overview-of-the-hands-on)
- [Create identity service and service key by Alex](https://github.wdf.sap.corp/D069462/cf-spring-ias)
- [Demystifying XSUAA in SAP Cloud Foundry](https://blogs.sap.com/2020/08/20/demystifying-xsuaa-in-sap-cloud-foundry/)
- [Administration Guide | PUBLIC SAP Cloud Identity Services - Identity Authentication](https://help.sap.com/doc/a7f50a08218845019a5eb5d0ba826691/Cloud/en-US/Identity_Authentication_en.pdf)

## Reference:

[1]: [Original link](https://github.wdf.sap.corp/CPSecurity/Knowledge-Base/blob/master/03_ApplicationSecurity/images/token-xchange.png)
