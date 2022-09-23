# The ts type/interface of `Destination` 

## Status

Proposal: Use alternative A as an easy solution that works for the major use cases.

## Context
The `Destination` ts type is used in the following scenario:
1. [connectivity] The return type of the `getDestination`.
2. [http-client] A parameter of the `executeHttpRequest`.

The definition of the `Destination` looks like:
```ts
interface Destination {
  // This is a mandatory key
  url: string;
  name?: string | null;
  type?: 'HTTP' | 'LDAP' | 'MAIL' | 'RFC';
  ...
}
```

However, when supporting destinations with type `MAIL`, the mandatory `url` key becomes a problem, as mail destination saves the host url in the properties of the destination.

## Alternatives

### A: Make `url` optional
This is an obvious solution that works.

#### Pros and Cons
- [+] Relatively low complexity
- [+] Non breaking
- [+] The `Destination` was designed as a common destination with different types, so `url` should not be mandatory in theory. Therefore, this is a proper fix.
- [+] Seamless updates for productive use cases, as the destination object (with the `url` key) is only passed for testing.
- [-] The missing `url` will not be detected during compile time. For runtime, we have a validation already.

### B: Having `HttpDestination` and `MailDestination`
The `Destination` is only used in the `connectivity` package, as it's a common destination.
Specific destinations like `HttpDestination` and `MailDestination` will be created.
```ts
// used as the return type of `getDestination` (connectivity)
interface Destination {
  url?: string;
  originalProperties?: { [key: string]: any };
  type?: 'HTTP' | 'LDAP' | 'MAIL' | 'RFC';
}
// used as a parameter of `executeHttpRequest` (http-client)
interface HttpDestination extends Destination {
  url: string;
  type?: 'HTTP'
}
// used as a parameter of `sendMail` (mail-client)
interface MailDestination extends Destination {
  originalProperties: { [key: string]: any } & {'mail.smtp.host': string};
  type?: 'MAIL';
}
// valid
const d1: Destination = {};
// error: missing url key
const hd1: HttpDestination = {};
// error: wrong type
const hd2: HttpDestination = { url: '', type: 'MAIL'};
// vallid
const hd3: HttpDestination = { url: ''};
// error: missing originalProperties key
const md1: MailDestination = { }
// error: missing 'mail.smtp.host' key
const md2: MailDestination = { originalProperties: {'other': ''}}
// error: wrong type
const md3: MailDestination = { originalProperties: {'mail.smtp.host': ''}, type: 'HTTP'}
// valid
const md4: MailDestination = { originalProperties: {'mail.smtp.host': ''}}
```
#### Pros and Cons
- [+] When calling `executeHttpRequest` with a destination object, compile time behaviour stays the same that `url` is checked.
- [+] The same for `sendMail` and the key `mail.smtp.host`.
- [-] Breaking change
- [-] The code `executeHttpReqeust(getDestination(...), ...)` is not possible, as `getDestination()` does not know the type (`HTTP`/`MAIL`) in compile time.
- [-] At least medium complexity, as all the `Destination`s in the `http-client` are affected.

### C: Only create a new `MailDestination`
We can also keep the `Destination` for both `connectivity` and `http-client` packages and only create a new `MailDestination`.
The `url` of the `MailDestination` will be optional and `mail.smtp.host` will be mandatory.
```ts
// do not touch Destination
interface Destination {
  url: string;
  originalProperties?: { [key: string]: any };
}
// make url optional and 'mail.smtp.host' mandatory
interface MailDestination extends Omit<Destination, 'url'> {
  url?: string;
  originalProperties: { [key: string]: any } & {'mail.smtp.host': string};
}
// error: missing originalProperties key
const md1: MailDestination = { }
// error: missing 'mail.smtp.host' key
const md2: MailDestination = { originalProperties: {'other': ''}}
// valid
const md3: MailDestination = { originalProperties: {'mail.smtp.host': ''}}
```

#### Pros and Cons
- [+] When calling `sendMail` with a `MailDestination` object, the key `mail.smtp.host` is checked.
- [+] The `Destination` used in the `connectivity` and `http-client` packages stay untouched.
- [+] Non breaking change
- [-] The `getDestination` returns a `Destination` that cannot be used for `sendMail`, as it needs a `MailDestination`.
- [-] The common `Destination` (with different types) is actually an `HttpDestination`, as it requires a `url`.
