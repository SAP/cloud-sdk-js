## Mail Tests
This documentation contains the following topics:
- overview
- why we need the mail tests
- how to prepare and run the tests
- the potential capability of the mail server
- alternatives - use online mail service

### Overview
This test scenario consists of the following components:
- A mail server, that receives incoming mail requests then writes the mail info to the local file system.
- Some jest tests that send mails to the mail server and verify the messages are correctly processed. 
In real life, IMAP/POP3 protocol should be used for receiving mails, but make it simple for now.
Currently, sending emails are done without SDK, which should be updated once the mail functions are implemented.

### Value of the mail tests
- local e2e tests without deployment on the cloud
- using a real SMTP server as e2e test infrastructure makes it more reliable than unit tests
- the mail server is configurable to fit more complicated requirements (e.g., TLS/authentication)

### Steps for local tests
1. install dependencies via `yarn install`
1. go to `e2e-tests` directory by running e.g., `cd test-packages/e2e-tests`.
1. start the mail server by executing `yarn run start:mail-server`
1. run tests `yarn jest mail.spec.ts`
1. stop the mail server by running `yarn run stop:mail-server`

### About the mail server
The node module [smtp-server](https://www.npmjs.com/package/smtp-server) is used for building the mail server, where you can configure:
- TLS (certificates, private keys)
- authentication (basic + OAuth)
- validating client connection (e.g., having an allow-list)
- validating sender address (e.g., having a block-list)
- validating recipient address (e.g., only local domain is possible)
- processing incoming messages (e.g., DB operation/file system operation/console output)
- server port

Find more docs [here](https://nodemailer.com/extras/smtp-server/).

### Online mail service -- Ethereal
[Ethereal](https://ethereal.email) is a fake SMTP online service, for testing purposes.

#### Pros
- free service
- support sending/receiving emails via APIs
- support reading emails via UI
- support creating users on the fly
- test data is deleted automatically (hours?)

#### Cons
- no server side configuration
  - use TLS configurations as it is
  - no OAuth support 
  - no server side validation
- 3rd party service can be flaky

