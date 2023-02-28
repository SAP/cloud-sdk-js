# @sap-cloud-sdk/connectivity

## 2.15.0

### Minor Changes

- 5bad86c70: [Fixed Issue] Stop adding certificates when sending requests to a destination, if the authentication type does not require a certificate.
- 5bad86c70: [Compatibility Note] When making a request to a destination that has a certificate in its defintion, the certificate is only added, if it is needed for the according authentication type. That way, `ClientCertificateAuthentication` will have a certificate in the request, while `OAuth2SAMLBearerAssertion` does not. Previously, the certificate would be added regardless.

### Patch Changes

- @sap-cloud-sdk/util@2.15.0

## 2.14.0

### Minor Changes

- 20f550efd: [Fixed Issue] Fix the combination of providing the `iss` together with `OnPremise` basic destinations.

### Patch Changes

- @sap-cloud-sdk/util@2.14.0

## 2.13.0

### Patch Changes

- @sap-cloud-sdk/util@2.13.0

## 2.12.1

### Patch Changes

- 466cbec36: [Improvement] Update `jsonwebtoken` to 9.0.0 due to several security vulnerabilities:

  - [CVE-2022-23529 (CVSS 9.8)](https://github.com/advisories/GHSA-27h2-hvpr-p74q)
  - [CVE-2022-23539 (CVSS 8.1)](https://github.com/advisories/GHSA-8cf7-32gw-wr33)
  - [CVE-2022-23540 (CVSS 9.8)](https://github.com/advisories/GHSA-qwph-4952-7xr6)
  - [CVE-2022-23541 (CVSS 9.8)](https://github.com/advisories/GHSA-hjrf-2m68-5959)
  - @sap-cloud-sdk/util@2.12.1

## 2.12.0

### Patch Changes

- @sap-cloud-sdk/util@2.12.0

## 2.11.0

### Patch Changes

- @sap-cloud-sdk/util@2.11.0

## 2.10.0

### Patch Changes

- @sap-cloud-sdk/util@2.10.0

## 2.9.0

### Minor Changes

- 24029503: [New Functionality] Support fetching all subaccount- and service instance destinations from the destination service simultaneously.

### Patch Changes

- Updated dependencies [4c51d3dc]
  - @sap-cloud-sdk/util@2.9.0

## 2.8.0

### Minor Changes

- 15e9ef4b: [Fixed Issue] Remove last explicit references to 'VCAP_SERVICES' and replace them with '@sap/xsenv'.
- 15e9ef4b: [Fixed Issue] Fix that unparsable destinations in the subaccount prevent other destinations from beeing fetched.

### Patch Changes

- 15e9ef4b: [Improvement] Reduce default logs for failing requests in @sap-cloud-sdk/http-client.
  - @sap-cloud-sdk/util@2.8.0

## 2.7.1

### Patch Changes

- @sap-cloud-sdk/util@2.7.1

## 2.7.0

### Minor Changes

- 3bff42e1: [Fixed Issue] Fix a breaking change of `serviceToken` introduced in 2.0, so it accepts `XsuaaServiceCredentials` again as an option.
- 010a46fa: [Improvement] Support consumption of the XSUAA API via destinations.

### Patch Changes

- @sap-cloud-sdk/util@2.7.0

## 2.6.0

### Minor Changes

- cb598c16: [New Functionality] Support JWTs without a `JKU` property.
- 09094607: [New Functionality] Add interface `DestinationCacheInterface` and method `setDestinationCache` to support implementation of custom destination cache.
- 93d41281: [New Functionality] Fetch client credential token for destinations created by service bindings.
- 8fdfebd6: [Fixed Issue] Fix `getDestination()` to allow passing an async transform function `serviceBindingTransformFn` in `options`. The transform function can also be passed by `execute()`, `executeHttpRequest()`, `executeRaw()`, etc.
  [Compatibility Note] Rename `transformationFn` into `serviceBindingTransformFn` in `DestinationForServiceBindingsOptions` to avoid ambiguity and make the function async.

### Patch Changes

- @sap-cloud-sdk/util@2.6.0

## 2.5.0

### Patch Changes

- Updated dependencies [89f1c423]
  - @sap-cloud-sdk/util@2.5.0

## 2.4.0

### Minor Changes

- 04726a35: [Improvement] Reduce default log output on the `info` level significantly.
- 04726a35: [Compatibility Note] Only log the successful retrieval of destinations on the`info` log level, log everything else is on the `debug` or `warn` level.
- 0a008674: [Compatibility Note] Mark the function `noDestinationErrorMessage` as internal API.
- 0a008674: [New Functionality] Support self-signed certificate using the `trustStore` property of the destination object.

### Patch Changes

- Updated dependencies [0a008674]
  - @sap-cloud-sdk/util@2.4.0
