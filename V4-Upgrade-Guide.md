# SAP Cloud SDK for JavaScript Version 4 Upgrade Guide <!-- omit from toc -->

The purpose of this document is to collect information on the Cloud SDK version 3 to version 4 migration.
It should include information on all steps a user needs to take when updating the SDK version from 3 to 4.

This document should be written in a style which addresses the consumer of the SDK.
It will eventually end up in the SDK docs portal and release notes for version 4.

Please add your items below when creating a change which will involve manual tasks for the user when performing the upgrade.
Add sections to the document as you see fit.

<!-- Everything below this line should be written in the style of end user documentation. If you need to add hints for SDK developers, to that above. -->

# How to Upgrade to Version 4 of the SAP Cloud SDK for JavaScript <!-- omit from toc -->

This document will guide you through the steps necessary to upgrade to version 4 of the SAP Cloud SDK.
Depending on your project, some steps might not be applicable. The To-Do list is:

- [Update Your Project Dependencies](#update-your-project-dependencies)
- [Update to Node 22 or Newer](#update-to-node-22-or-newer)

## Update Your Project Dependencies

Search for occurrences of `@sap-cloud-sdk/[some module]` in your `package.json` files.
Replace the version numbers with `^4`.
Depending on if you're using `npm` or `yarn`, run `npm install` or `yarn` in the directories of your `package.json` files to update the `package-lock.json` or `yarn.lock` file.

Running your tests or deploying your application might fail at this point in time if you need to adapt to any breaking changes.
We recommend updating your applications in one commit or pull request and making sure everything still works using your existing test suite.

## Update to Node 22 or Newer

All SAP Cloud SDK for JavaScript libraries now support node 22 (LTS) as the **minimum** node version.
If you are using a node version older than 22, update your runtime environment to a newer version.
On Cloud Foundry you can do this by [setting the node engine in your `package.json`](https://docs.cloudfoundry.org/buildpacks/node/index.html#runtime).
