# Title

Send email by using destination service on BTP

## Status

approved

## Context

BTP destination service supports a type `MAIL`, so application on the cloud can send mails with a given mail server.
See the type of the `Destination` object [in our code](https://github.com/SAP/cloud-sdk-js/blob/main/packages/connectivity/src/scp-cf/destination/destination-service-types.ts#L95).

However, the type `MAIL` is not supported by the SDK for the time being.

The scope of this documentation covers the following proxy type:

- `Internet`
- `OnPremise`

## Decision

### Package management

We assume, the mail function will not be used by everybody.
Therefore, we'll create a new package called `mail-client`, which has the following dependencies:

- `@sap-cloud-sdk/connectivity`
- `nodemailer`: 473 KB
- `socks`: 320 KB

### API

#### Public API

As no Node native mail interface was found, we can bind our implementation to a common lib like `nodemailer` for the initial version.

```ts
export function sendMail<T extends MailOptions>(
  destination: DestinationOrFetchOptions,
  // as initial implemenation for handling multiple emails
  ...mailOptions: T[]
): Promise<MailResponse>;
```

#### Types

As a rule, the SDK will not use interfaces from the lib directly.
Instead, we create new interfaces by picking some keys of interfaces, because:

- This makes our public API stable, and the potential breaking changes of a lib can be handled by us instead of the users.
- To make our interface simple, we don't need the whole interface of the original lib.

```ts
// make it compatible with the `Mail.Options` of `nodemailer`
interface MailOptions {
  from: string | Address | undefined;
  sender?: string | Address | undefined;
  to: string | Address | Array<string | Address> | undefined;
  cc?: string | Address | Array<string | Address> | undefined;
  bcc?: string | Address | Array<string | Address> | undefined;
  replyTo?: string | Address | undefined;
  subject?: string | undefined;
  text?: string | Buffer | Readable | AttachmentLike | undefined;
  headers?: Headers | undefined;
  attachments?: Attachment[] | undefined;
  date?: Date | string | undefined;
  encoding?:
    | string
    | undefined /** if set to true then fails with an error when a node tries to load content from URL */;
  priority?: 'high' | 'normal' | 'low' | undefined;
}
```

```ts
// make it comatible with the `SMTPTransport.SentMessageInfo` of `nodemailer`
interface MailResponse {
  envelope?: MainEnvelop;
  accepted?: Array<string | MailAddress>;
  rejected?: Array<string | MailAddress>;
  pending?: Array<string | MailAddress>;
  response?: string;
}
interface MainEnvelop {
  from: string;
  to: string[];
}
interface MailAddress {
  name: string;
  address: string;
}
```

### Implementation

#### Proxy type: Internet

- The [auth-flow.spec.ts](test-packages/integration-tests/test/auth-flows/auth-flow.spec.ts) contains a test, that detects missing `username` and `password` from the destination object, which needs to be fixed.
- The [mail.spec.ts](test-packages/e2e-tests/test/mail/mail.spec.ts) is a PoC for sending emails in general, which can be used for the aligned API.

#### Proxy type: OnPremise

- We only support using "socket" as the proxy protocol and do "http" proxy later as both of them need cumbersome deep layer (e.g., Ox08) implementation.
- The [auth-flow.spec.ts](test-packages/integration-tests/test/auth-flows/auth-flow.spec.ts) contains a test, that is related to the wrong port for sending emails, which should be fixed.

#### Protocol of the Proxy

- When proxy type is `OnPremise`, use `http` protocol, being the same as `http-client`.
- When proxy type is `Internet` and `http(s)_proxy` is set in the environment, use `http` protocol, being the same as `http-client`.
- When proxy type is `Internet` and `no_proxy` is set in the environment, do not use proxies, being the same as `http-client`.

### Test strategy

The following tests should be added:

- unit tests
  - `executeHttpRequest` should fail, when the [`type`](https://github.com/SAP/cloud-sdk-js/blob/main/packages/connectivity/src/scp-cf/destination/destination-service-types.ts#L95) of a destination is not `HTTP`.
  - `sendMail` should fail, when the [`type`](https://github.com/SAP/cloud-sdk-js/blob/main/packages/connectivity/src/scp-cf/destination/destination-service-types.ts#L95) of a destination is not `MAIL`.
- nightly internal e2e tests (like our vdm e2e tests)
- OS (Open Source) e2e tests (like our cap e2e tests)

#### OS e2e tests

Once the implementation is done, the OS e2e tests should contain:

- the [mail.spec.ts](test-packages/e2e-tests/test/mail/mail.spec.ts) should be adjusted to use SDK code.
- add a similar test like [odata.spec.ts](test-packages/e2e-tests/test/on-prem/odata.spec.ts) for OnPrem coverage

Check more details about these two tests via the links below:

- [mail tests README](test-packages/e2e-tests/test/mail/README.md)
- [proxy tests README](test-packages/e2e-tests/test/on-prem/README.md)

## Consequences

Applications on BTP can send mails with `MAIL` destinations to cloud/On-Prem mail servers.

## Appendix

### Extensions in the future

- `location id` (can be configured for OnPrem destinations)
- `Private link` (destination proxy type)
- `http_proxy` (like `socket_proxy` in the environment)

### Useful links

- [Using socks proxy with nodemailer](https://nodemailer.com/smtp/proxies/#2-using-socks-proxy)

### PoC notes
#### Protocol for sending emails
- using SMTP protocol
  Working with `nodemailer` + basic auth
- using socket protocol
  Our PoC tried `WS.WebSocket`, but as socket protocol without knowing SMTP, it did not support email related APIs.
  E.g, authentication + email properties (from/to...) cannot be configured
#### OnPrem Proxy
- support socket proxy for now
  It uses custom auth handler with JWT.
- http proxy (later)
  Below is one example with `node-http-proxy-agent`, that is not tested, and has cumbersome implementation.
  [Useful example](https://github.com/TooTallNate/node-http-proxy-agent/blob/master/src/agent.ts#L83)
