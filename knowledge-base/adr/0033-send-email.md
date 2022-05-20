# Title
Send email by using destination service on BTP

## Status

proposed

## Context

BTP destination service supports a type `MAIL`, so application on the cloud can send mails with a given mail server.
See the type of the `Destination` object [in our code](https://github.com/SAP/cloud-sdk-js/blob/main/packages/connectivity/src/scp-cf/destination/destination-service-types.ts#L95).

However, the type `MAIL` is not supported by the SDK for the time being.

The scope of this documentation covers the following proxy type:
- `Internet`
- `OnPremise`

## Decision
### API
#### public API
As no Node native mail interface was found, we can bind our implementation to a common lib like `nodemailer` for the initial version.
```ts
export function sendMail<T extends MailOptions>(
  destination: DestinationOrFetchOptions,
  mailOptions: T
): Promise<MailResponse>
```

#### types
```ts
// make it compatible with the `Mail.Options` of `nodemailer`
interface MailOptions {
        from?: string | Address | undefined;
        sender?: string | Address | undefined;
        to?: string | Address | Array<string | Address> | undefined;
        cc?: string | Address | Array<string | Address> | undefined;
        bcc?: string | Address | Array<string | Address> | undefined;
        replyTo?: string | Address | undefined;
        subject?: string | undefined;
        text?: string | Buffer | Readable | AttachmentLike | undefined;
        headers?: Headers | undefined;
        attachments?: Attachment[] | undefined;
        date?: Date | string | undefined;
        encoding?: string | undefined;/** if set to true then fails with an error when a node tries to load content from URL */
        priority?: "high"|"normal"|"low" | undefined;
    }
```

```ts
// make it comatible with the `SMTPTransport.SentMessageInfo` of `nodemailer`
interface MailResponse {
        envelope?: MimeNode.Envelope;
        accepted?: Array<string | Mail.Address>;
        rejected?: Array<string | Mail.Address>;
        pending?: Array<string | Mail.Address>;
        response?: string;
    }
```

### Implementation
#### Proxy type: Internet and OnPremise
- The [auth-flow.spec.ts](test-packages/integration-tests/test/auth-flows/auth-flow.spec.ts) contains a test, that detects missing `username` and `password` from the destination object, which needs to be fixed.
- The [mail.spec.ts](test-packages/e2e-tests/test/mail/mail.spec.ts) is a PoC for sending emails in general, which can be used for the aligned API.
#### Proxy type: OnPremise
- The [auth-flow.spec.ts](test-packages/integration-tests/test/auth-flows/auth-flow.spec.ts) contains a test, that is related to the wrong port for sending emails, which should be fixed.

### Test strategy
The following tests should be added:
- unit tests
- nightly internal e2e tests (like our vdm e2e tests)
- OS e2e tests (like our cap e2e tests)

#### OS e2e tests
Once the implementation is done, the os e2e tests should contain:
- the [mail.spec.ts](test-packages/e2e-tests/test/mail/mail.spec.ts) should be adjusted to use SDK code.
- add a similar test like [odata.spec.ts](test-packages/e2e-tests/test/on-prem/odata.spec.ts) for OnPrem coverage

Check more details about these two tests via the links below:
- [mail tests README](test-packages/e2e-tests/test/mail/README.md)
- [proxy tests README](test-packages/e2e-tests/test/on-prem/README.md)

## Consequences

Applications on BTP can send mails with `MAIL` destinations to cloud/On-Prem mail servers.

## Other topics
`Private link` proxy type?
