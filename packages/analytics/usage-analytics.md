# SAP Cloud SDK - Usage Analytics

In order to improve your experience with the SAP Cloud SDK for JavaScript, we have recently introduced the possibility to send anonymized usage data about a project.
We want to better understand how users are working with the SAP Cloud SDK for JavaScript and in what kind of projects it is used.
Some questions we are trying to answer, are:

- Which versions of Node.js and npm are used?
- Which versions of the SDK are used?
- Which packages of the SDK are used?
- Which other frameworks and libraries are used (e.g. Express.js)?

However, given that we do not know all of our users, we are not able to answer these questions.
By integrating usage analytics into our offering, we hope to gain more insight here.

Since we know that collecting usage data is a very sensitive topic, this document aims to provide full transparency on how we collect which kind of data.

At SAP, we respect your privacy and intellectual property.
Therefore, we only collect non-sensitive data about the use of the SAP Cloud SDK for JavaScript.
We do not collect any personal information or data about the inner workings of your project.
Any remotely sensitive values like your project’s name are obfuscated so that no one except you and your team knows or can infer details about your project.

By default, usage analytics is disabled.
To send usage data, you have to explicitly **opt-in**.

## Anonymization

Any data that is sent during the analytics process is anonymized.
This means that neither your project's name nor other personally identifiable information is collected.
Instead, we create a pseudonym _p_ for every project, by concatenating the project's name and a randomly generated salt value, and hashing this value using a cryptographic hash function (currently SHA-256).
Neither the project name nor the salt itself will be transmitted, only the resulting pseudonym.
However, should you host your project publicly, e.g. on GitHub, and make both your project's name and your salt value publicly available, it would technically possible for us to recreate the corresponding pseudonym.

## What data is collected?

We're collecting the following data:

- Project pseudonym
- Node.js version
- npm version
- Operating system information
- SDK dependencies
- Third-party dependencies
- Whether TypeScript is used

## Opt-in

When you initialize your project with the CLI, you will be asked if you want to provide analytics.
This will create `sap-cloud-sdk-analytics.json`:

```json
{
  "enabled": true
}
```

When usage analytics is performed for the first time, a new salt value will be generated and written to this file.
The result will then look something like this:

```json
{
  "enabled": true,
  "salt": "7e5eb0e845e73b72310436f29252bf4ad0ef3d0d8c0ae189dec3d5ff2531e6a0"
}
```

Please make sure not make up your own value, as this may lessen the guarantees a randomly generated value of a certain length will give.

## Opt-out

Should you ever decide to opt-out again, you can either set the value for `"enabled"` to `false`, or delete the configuration file altogether.
Usage data will be sent if and only if there's a file with the name `sap-cloud-sdk-analytics.json` in the root of the given project and `enabled` is set to true.
If any of these conditions are not met, no data will be sent.
