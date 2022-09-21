## Proxy Tests
This documentation contains the following topics:
- overview
- why we need the proxy tests
- how to prepare and run the tests

### Overview
This test scenario consists of the following components:
- A proxy server, that receives http requests with proxy configurations, and then forward the real legit requests to the target systems.
The proxy server is a mock server that does a similar job like connectivity service (on BTP) + the Cloud Connector.
- Some jest tests that send odata requests (by using SDK) against a destination object. 
The destination object is mocked like the response of the destination service (BTP), when fetching an On-Prem destination.
Therefore, the odata requests with proxy configurations will reach the proxy server.
Depending on the proxy authentication, 403 or successful odata response will be returned.

### Value of the proxy tests
- local e2e tests without deployment on the cloud
- using a real proxy server as e2e test infrastructure makes it more reliable than unit tests (e.g., axios behaviour is covered instead of checking request config)
- from the proxy server, the requests sent by SDK is visible, which is not the case when using the connectivity service + the Cloud Connector

### Steps for local tests
1. install dependencies via `yarn install`
1. go to `e2e-tests` directory by running e.g., `cd test-packages/e2e-tests`.
1. start the proxy server by executing `yarn run start:proxy-server`
1. run tests `yarn jest odata.spec.ts`
1. stop the proxy server by running `yarn run stop:proxy-server`


