---
id: contribution-model-sap-cloud-sdk-for-javascript-typescript
title: Contribution model
sidebar_label: Contribution model
description:
keywords:
- sap
- cloud
- sdk
- cloud native
- cloud sdk
- sap cloud sdk
---

## Introduction

SAP Cloud SDK for JavaScript welcomes contributions that bring value to SDK users by simplifying and/or improving cloud application development within SAP ecosystem. The contributed feature or API library becomes a part of SDK and is released under SAP Cloud SDK umbrella into `@sap-cloud-sdk` to the [npmjs.com](https://www.npmjs.com/).

Most modules of the SAP Cloud SDK for JavaScript are Open Source released under Apache 2.0 license. It's preferred, but not mandatory that contribution happens under same conditions.

## Roles

    - **SDK team** - development team and Product Owner responsible for maintaining, developing and releasing SAP Cloud SDK for JavaScript.
    - **Contribution team** - development team responsible for developing and contributing a feature or an API library

### Stakeholders and contact points

    - **SDK Team** assigns two main stakeholders as contact points for the contribution process.
      - **Prodact owner**  for organisational topics, priorities and practicalities
      - **Developer** for engineering onboarding, alignment and consulting
    - **Contribution team** assigns at least one contact point with engineering background for regular collaboration and syncs.

Other stakeholders and/or contact points could be assigned if deemed necessary.

## Process outline

Below are generic steps for a successful contribution. The process can be adopted for the needs of specific contribution.

    - Initial alignment and approvals
    - Plan conribution collaboration
    - Prepare and configure required assests (repositories, configuration, piplines, etc)
    - Onboarding session with SDK team. Get to `Hello World!`
    - Start of development by contribution team
    - SDK Team provides ongoing consulting
    - Regular syncs on development and organisational topics
    - Successful PoC
    - Iterative development process with SDK team contributing to PR reviews
    - Releasing the contribution as `Beta`
    - Iterative development. Stabilizing the API.
    - Release the contribution as GA aka `General Availability`
    - Keep functional scope up to date with customer requirements
    - Maintanance and support of the contribution by **Contribution Team** or their successors

## Responsibilities

### SDK Team

#### On-boarding

  - Providing repository structure
  - ESlint rules (so that compliant with SDK)
  - Inherit our pipeline (Github actions)
  - Testing framework
  - NPM audit (vulnerability checks)
  - License check tool


### What's on them?

#### Delivery plan
  - What features
  - Oder of feature delivery (so that we can anticipate PR sizes... else?)
  - Basic architecture - some diagram and involved services
  - Modules structure (CC, re-use module artifacts)


- Setting up OS process?
  - Coding and testing the feature?
  - Aligning on release strategy?

## Coding convention

### Contribution programming language

Contribution should happen in Typescript and endorse type-safety whenever possible.

### API alignment

To maintain a consistent API strategy, contribution and SDK teams align on the API. Final approval is on the SDK team.

### Repository

    - Repository is created on Github under SAP Organization by contribution team
    - SDK and contribution team co-own the repository and have full access rights to it
    - SDK team provides repository structure if needed. It's preferable in most cased.
    - SDK team can audit repository settings and require reasonable updates to configuration

### Introducing dependencies

    - Dependency audit should happen as a part of PR review
    - SDK provides a guide on dependency choices to the contributing team

### Coding convention

    - Contribution team should use coding convention of the SDK unless it's explicitly approved to be otherwise
    - Most of coding convention rules should be enforced by automated code checkers and linters like ESLint and Prettier
    - Enforcement happens via continuous integration pipeline
    - SDK team provides guidelines on coding conventions that can't be automatically enforced
    - SDK team shares documentation on standard patterns chosen by SDK for ... (what patterns do we use?)

### Pull requests

    - Pull request should contain some logical and complet pile of work
    - Pull request should be **small**  for easy review
    - Preferably Pull request should contain tangible incremental value
    - Pull request are mandatorily reviewed by at least one of SDK team members

### Branching strategy

  - `Main` branch has to be always **release ready**. In other words: up to date, tested, and documented

## Documentation

SAP Cloud SDK for JavaScript has two types of documentation:

    - Documentation portal
    - Generated API documentation

### Documentation portal

    - After reaching `Beta`, feature or API library has to be documented by contribution team on SDK's documentation portal
    - Documentation has to be kept up to date by contribution team

### Generated API documentation

    - API documentation has to be generated
    - SDK team provides means to generate API documentation on the available code base

### README

    - Contribution team maintains `README` on the contribution repository according to development needs

## Releases

### Release process
  - How versioning happens with SDK (semver)
  - Deprecation instead of removing code out of the blue.
  - Release cycle is on contributing team. They can have their own cycle, but has to be regular most of the time.
  - We avoid breaking changes in the main release branch
  - Beta? GA? - what would be the rules, milestones? Reflect in versioning 0.0.1
  - Naming? We have to align together
  - NPM release practicalities are provide by SDK to become a part of our namespace
  - Change log has to be maintained by contribution team

- Preferred release cycle is to follow SDK release cycle with every 2 weeks

  - How we release?
    - With our repo it's more or less straightforward
    - With separate repo I'm not clear
  - Module naming?

### License
  - OS?
  - What if not only OS?

### Open Source validation
  - Maybe a brief guide on OS process if we don't accept smth into our repo?

## Support


## Maintenance
  - Maintenance should be on the contributing team unless agreed otherwise.
