# SAP Cloud SDK for JavaScript Version 3 Upgrade Guide

The purpose of this document is to collect information on Cloud SDK version 2 to version 3 migration information.
It should include information on all steps a user needs to take when updating the SDK version from 2 to 3.

This document should be written in a style which addresses the consumer of the SDK.
It will eventually end up in the SDK docs portal and release notes for version 3.

Please add you items below when creating a change which will involve manual tasks for the user when performing the upgrade.
Add sections to the document as you see fit.

<!-- Everything below this line should be written in the style of enduser documentation. If you need to add hints for SDK developers, to that above. -->

## How to upgrade SAP Cloud SDK for JavaScript to Version 3

This document collects information on how to upgrade Cloud SDK version 2 to version 3.
If you encounter issues with the documentation or while upgrading, please [open an issue in our GitHub repository](https://github.com/SAP/cloud-sdk-js/issues/new/choose).

## Update your project dependencies

Search for occurrences of `@sap-cloud-sdk/[some module]` in your `package.json` files.
Replace the `2.x.y` version numbers with the [most recent `3.x.y` version number](https://github.com/SAP/cloud-sdk-js/releases).
Depending on if you're using `npm` or `yarn`, run `npm install` or `yarn` in the directories of your `package.json` files to update the `package-lock.json` or `yarn.lock` file.

Running your tests or deploying your application might fail at this point in time if you need to adapt to any breaking changes.
We recommend updating your applications in one commit or pull request and making sure everything still works using your existing test suite.

## Generator CLI

Be sure to check if you're using any removed CLI options in one of the generators and adapt to the new parameters.
