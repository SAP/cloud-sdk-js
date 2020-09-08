---
id: extension-model-sap-cloud-sdk-for-javascript-typescript
title: Extension model
sidebar_label: Extension model
description:
keywords:
- sap
- cloud
- sdk
- cloud native
- cloud sdk
- sap cloud sdk
- extension
---

## Introduction

SAP Cloud SDK for JavaScript welcomes extensions that bring value to SDK users by simplifying and/or improving cloud application development within the SAP ecosystem. The contributed feature or API library becomes an extension of SDK and is released under the SAP Cloud SDK umbrella into the `@sap-cloud-sdk` scope in [npmjs.com](https://www.npmjs.com/).

The core modules of the SAP Cloud SDK for JavaScript are released under the Apache 2.0 open source license. SAP Cloud SDK extensions should also be open source with Apache 2.0. If this is not possible, e. g. for legal reasons, licensing has to be clarified in person.

## Roles

- **SDK team** - development team and Product Owner responsible for maintaining, developing, and releasing SAP Cloud SDK for JavaScript.
- **Contribution team** - development team responsible for developing and contributing a feature or an API library

### Stakeholders and contact points

- **SDK Team** assigns two main stakeholders as contact points for the contribution process.
- **Product owner**  for organizational topics, priorities, and practicalities
- **Developer** for engineering onboarding, alignment and consulting
- **Contribution team** assigns at least one contact point with an engineering background for regular collaboration and syncs.

Other stakeholders and/or contact points could be assigned if deemed necessary.

## Process outline

Below are generic steps for a successful contribution. The process can be adopted for the needs of particular contribution.

- Initial alignment and approvals
- Plan contribution collaboration.
- Prepare and configure required assets (repositories, configuration, pipelines, etc). The SAP Cloud SDK provides templates for those assets.
- Onboarding session with SDK team. Get to `Hello World!`
- Start of development by the contribution team
- SDK Team provides ongoing consulting
- Regular syncs on development and organizational topics
- Successful PoC
- Iterative development process with SDK team contributing to PR reviews
- Releasing the contribution as "Beta"
- Iterative development. Stabilizing the API.
- Release the contribution with "General Availability" (GA)
- Keep functional scope up to date with customer requirements
- Maintenance and support of the contribution by **Contribution Team** or their successors

## Development guidelines

These section establishes best engineering practices for contributing team.

### Contribution programming language

The contribution should happen in TypeScript and endorse type-safety whenever possible.

### API alignment

To maintain a consistent API strategy, contribution and SDK teams align on the API. Final approval is on the SDK team.

### Repository

- The repository is created on Github under SAP Organization by the contribution team
- SDK and contribution team co-own the repository and have full access rights to it
- SDK team provides a repository structure and initial content as needed. This helps the contribution team to kick-start their pipeline.
- SDK team can audit repository settings and require reasonable updates to the configuration

### Introducing dependencies

- Dependency audit should happen as a part of PR review
- SDK provides a guide on dependency choices to the contributing team

### Coding convention

- Contribution team should use coding convention of the SDK unless it's explicitly approved to be otherwise
- Most of the coding convention rules should be enforced by automated code checkers and linters like ESLint and Prettier
- Enforcement happens via continuous integration pipeline
- SDK team provides guidelines on coding conventions that can't be automatically enforced

### Pull requests

- Pull request should contain some logical and complete pile of work
- Pull request should be **small**  for easy review
- Preferably Pull request should contain a tangible incremental value
- Pull request are mandatorily reviewed by at least one of SDK team members

### Branching strategy

- `Main` branch has to be always **release ready**. In other words: up to date, tested, and documented

## Documentation

SAP Cloud SDK for JavaScript has two types of documentation:

- Documentation portal
- Generated API documentation

### Documentation portal

- After reaching `Beta`, feature or API library has to be documented by contribution team on SDK's documentation portal
- Documentation has to be kept up to date by the contribution team

### Generated API documentation

- API documentation has to be generated
- SDK team provides means to generate API documentation on the available codebase

### README

- Contribution team maintains `README` on the contribution repository according to development needs

## Releases

### Release process

- Every library released with SDK should use [semantic versioning](https://semver.org/
- Breaking API changes have to be avoided.
- If breaking change is introduced, the old API must be marked deprecated instead of removal. A grace period of 6 months to be observed before removal can be considered.
- The contribution team has to set on a regular release cycle. SDK uses 2 weeks released cycle and it's preferred regularity.
- All the new features have to be released as `Beta` first. `General availability` release is triggered when API is stabilized and no breaking changes are planned.
- If a new module is to be released, its naming has to be aligned with the SDK team
- Practicalities of releasing NPM module into SDK's namespace are provided by SDK team
- Release change-log has to be maintained by the contribution team


### License

- Open-source modules of Cloud SDK for Java are licensed under Apache 2.0
- The contribution must have the same license applied
- Other cases have to be explicitly discussed


## Support

- General support provided by both SDK and contribution teams.
- Bug-fixing and specific support related to the functional scope of the contributed library is done by the contribution team
- Contribution team should be deemed responsible to observe reasonable support SLA
- Initial reply within 2 days
- Critical bug fixing - 1 week
- Noncritical bugs- 2 weeks

## Maintenance

- Maintenance should be on the contributing team or its successor unless agreed otherwise.
