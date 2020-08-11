---
id: getting-started
title: Getting started - SDK for JavaScript
hide_title: false
hide_table_of_contents: false
sidebar_label: Getting started
description: Get up to speed with SAP Cloud SDK for JavaScript in no time
keywords:
- sap
- cloud
- sdk
- cloud native
- cloud sdk
- sap cloud sdk
image:
---
import BuildBadge from '../../src/sap/sdk-js/BuildBadge'
import LicenseBadge from '../../src/sap/sdk-js/LicenseBadge'

<> <BuildBadge /> { } <LicenseBadge /> </>

## Introduction

### What is the SDK

The SAP Cloud SDK supports you end-to-end when developing applications that communicate with SAP solutions and services such as SAP S/4HANA Cloud, SAP SuccessFactors, and many others.

Using the SDK, you can reduce your effort when developing an application on SAP Cloud Platform by building on best practices delivered by the SDK. The SDK can provide JavaScript libraries and project templates.

To create such an application we provide a command line interface, that allows you to scaffold or enhance an application with the missing parts to use the SDK.

### What is the CLI.

The CLI (command line interface) can initialize a nest-based project or (the more common case) add everything you need to develop for SAP Cloud Platform to an existing project no matter what backend framework you use.
If there are any incompatibilities, please let us know in the [issues](https://github.com/SAP/cloud-sdk-cli/issues/new/choose)!

## Installation

To install the CLI globally, run:

```shell
$ npm install -g @sap-cloud-sdk/cli
```

### Update

As long as the CLI version is less than `1.0.0`, run the following to update to the latest version. Please keep in mind, that these updates can have breaking changes as per the [semver spec](https://semver.org/#spec-item-4).

```shell
$ npm install -g @sap-cloud-sdk/cli@latest
```

### Usage

```shell
sap-cloud-sdk [COMMAND]
```
To get the CLI's version, run:
```shell
sap-cloud-sdk (-v|--version|version)
```
To get a list of all commands, run:
```shell
$ sap-cloud-sdk --help
```

### Create a new project

To create a new project run the CLI's `init` command in the project folder.

```shell
$ sap-cloud-sdk init
```

It will guide you through the initialization, create the necessary files and add necessary dependencies.
If you run it in an empty folder, it will ask if you want to initialize a project using [@nest/cli](https://github.com/nestjs/nest-cli).

The CLI will already install all the necessary dependencies for the project, so this might take a minute. If everything worked correctly, you should see the following output:

```shell
+---------------------------------------------------------------+
| ✅ Init finished successfully.                                |
|                                                               |
| 🚀 Next steps:                                                |
| - Run the application locally (`npm run start:dev`)           |
| - Deploy your application (`npm run deploy`)                  |
|                                                               |
| 🔨 Consider setting up Jenkins to continuously build your app |
| Use `sap-cloud-sdk add-cx-server` to create the setup script  |
+---------------------------------------------------------------+
```

## Project files and folders
<!--not sure about this part-->

The project contains the following files and folders, among others, to get you started with the SAP Cloud SDK for JavaScript:

#### NPM / Project

- **`package.json`**: Specifies dependencies, metadata and user-defined scripts. The application comes with some predefined scripts and dependencies.
- **`.npmrc`**: The **`npm`** configuration file. The SAP Cloud SDK consists of some generic libraries, that are available as Open Source Software and service libraries for the whitelisted SAP S/4HANA APIs, referred to as the Virtual Data Model (VDM). In the scaffolding we specify the registry for the `@sap` scope, where the VDM libraries are published.

#### TypeScript

- **`tsconfig.json`**: Configuration file for `TypeScript`. This is not needed in the plain `JavaScript` version.
- **`tslint.json`**: Configuration file for `tslint`.

#### Continuous Delivery

- **`Jenkinsfile`**: Jenkins pipeline definition file for quality assurance. It uses the [SAP Cloud SDK's Continuous Delivery Toolkit](https://github.com/SAP/cloud-s4-sdk-pipeline).
- **`pipeline_config.yml`**: Pipeline configuration file for the Jenkins pipeline.

#### Cloud Foundry

- **`manifest.yml`**: The deployment descriptor file for `Cloud Foundry in SAP Cloud Platform`.

#### Local development

- **`src/`**: Source code for the initial application.

#### SDK specific

- **`systems.json`+`credentials.json`**: Allows you to maintain destinations for testing purposes.
- **`sap-cloud-sdk-analytics.json`**: Only if you have agreed to usage analytics during the initialization of your project. You can find more information about anonymous usage analytics [in the CLI's repository](https://github.com/SAP/cloud-sdk-cli/blob/master/usage-analytics.md).


## Run the project

To run the application locally, simply run the following command:

```shell
npm run start:dev
```
This will start a local server in watch mode, so that subsequent changes will automatically trigger a restart of the server.
Go to `http://localhost:3000` and you should get a `Hello, World!` in response.

## Deploy the project on Cloud Foundry

### Prerequisites

The Cloud Foundry CLI comes in handy when you want to deploy your application to SAP Cloud Platform. You can find installation instructions for all common platforms in the [`Cloud Foundry documentation`](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html). We recommend to use a package manager for that. If you are using `chocolatey` on Windows, please find the instructions [here](https://chocolatey.org/packages/cloudfoundry-cli).

### Login

:::note
If you don't have an [SAP Cloud Platform](https://account.hana.ondemand.com/) account you need to create one.
:::

In order to deploy our application, we first need to login to Cloud Foundry in SAP Cloud Platform using the `cf` CLI. First we need to set an `API endpoint`. The exact URL of this API endpoint depends on the region your subaccount is in. Open the [SAP Cloud Platform Cockpit](https://account.hana.ondemand.com/) and navigate to the subaccount you are planning to deploy your application to. Click on “Overview” on the left and you can see the URL of the API endpoint.

Copy the URL and paste it into the following command in your command line:

```shell
cf api https://api.cf.<region>.hana.ondemand.com
cf login
```

### Before deploying

Build your app if necessary.

### Deployment

To deploy your app, run:
```Shell
npm run deploy
```

<!--This step consists of:

- In productive environments:
  - Transpile the application from TypeScript to JavaScript using the `ci-build` script
  - Package the deployment using the `ci-package` script.
  - Push to Cloud Foundry:
```ts
cf push
```-->

This command will use your local sources for transpiling, packaging and deployment, but will omit packaging your local `node_modules` as those can be system dependent. Dependencies will instead be installed automatically when deploying to `Cloud Foundry`.

The Cloud Foundry CLI will automatically pick up the `manifest.yml` of the project when deploying your application. The file should look like this (where `<YOUR-APPLICATION-NAME>` is replaced by the name you specified when initializing the project):

```YAML
applications:
  - name: <YOUR-APPLICATION-NAME>
    path: deployment/
    buildpacks:
      - nodejs_buildpack
    memory: 256M
    command: npm run start:prod
    random-route: true
```

- The specified `path` instructs Cloud Foundry to upload all the files from the `deployment/` folder.
- The command specified under the `command` attribute tells the `buildpack` what command to issue to start the application.

When everything works as expected, you should get output that looks something like this:

```shell
Waiting for app to start...

name:              <YOUR-APPLICATION-NAME>
requested state:   started
routes:            <YOUR-APPLICATION-NAME>.cfapps.eu10.hana.ondemand.com
last uploaded:     Thu 21 Mar 14:05:32 CET 2019
stack:             cflinuxfs3
buildpacks:        nodejs

type:            web
instances:       1/1
memory usage:    256M
start command:   node index.js
     state     since                  cpu    memory        disk           details
#0   running   2019-03-21T13:05:47Z   0.0%   16M of 256M   126.8M of 1G
```

The application will be running at the `routes` URL, you can also make sure that the application works correctly by running the start command, this command can be different than the one shown above.

Should the application not work for whatever reason, you can call the following command to access the logs:

```Shell
cf logs <YOUR-APPLICATION-NAME> --recent
```

## Additional features

For productive use, your app should be linked to one or more databases and implement user authentication and authorization.

### Configure destination

Login the [Cloud Cockpit](https://account.hana.ondemand.com), navigate to your respective subaccount (in case of a trial account it should be called `trial`). In the menu bar on the left, there should be a section `Connectivity` with an entry called `Destinations`. Click `Destinations`. On the page that opens, click `New Destination` and fill in the details below.

For `Name`, choose a name that describes your system. For the exemple, we will go with `S4_SYSTEM`.

If you use the Business Partner mock server, enter for `URL` the URL that you have saved from the [previous step](#deployment) and use `NoAuthentication` for `Authentication`. If you use an SAP S/4HANA Cloud system, enter the systems URL in the `URL` field and choose `BasicAuthentication` as authentication type. This will make the fields `User` and `Password` appear. Enter here the credentials of a technical user for your SAP S/4HANA Cloud system.

### Bind destination service

In order to allow the application to use the destination you have just configured, you will need to bind an instance of the destination service and an instance of the `XSUAA service` to your application.

To create an instance of the destination service, execute the following command in your terminal:

```shell
cf create-service destination lite my-destination
```

This tells `Cloud Foundry in SAP Cloud Platform` to create an instance of the destination service with service plan `lite` and make it accessible under the name `my-destination`. We can now use the name to bind this service to our application. To do this, open your `manifest.yml` and add a section called `services`, under which you can then add the name of the just created service.

The resulting `manifest.yml` should look like this:

```YAML
applications:
  - name: <YOUR-APPLICATION-NAME>
    path: deployment/
    buildpacks:
      - nodejs_buildpack
    memory: 256M
    command: node index.js
    random-route: true
    services:
      - my-destination
```

#### XSUAA Service

Secondly, we need an instance of the `XSUAA service`. The `XSUAA service` is responsible for issuing access tokens that are necessary to talk to other services, like the destination service. For this service, we will need a bit of extra configuration in the form of a configuration file. Create a file called `xs-security.json` with the following content:

```JSON
{
  "xsappname": "<YOUR-APPLICATION-NAME>",
  "tenant-mode": "shared"
}
```

The value for `xsappname` again has to be unique across the whole of `Cloud Foundry in SAP Cloud Platform`, so make sure to choose a unique name or prefix.

Now, execute the following command:

```shell
cf create-service xsuaa application my-xsuaa -c xs-security.json
```

And, as before, add the newly created services to the services section of your `manifest.yml`.

The final `manifest.yml` should look like this:

```YAML
applications:
  - name: <YOUR-APPLICATION-NAME>
    path: deployment/
    buildpacks:
      - nodejs_buildpack
    memory: 256M
    command: node index.js
    random-route: true
    services:
      - my-destination
      - my-xsuaa
```

Finally, we can replace the parameter of `execute` with an object whose key `destinationName` refers to the name of the destination we defined earlier. If you chose a different name than `S4_SYSTEM`, make sure to use it here accordingly.

The new function now looks like this:

```ts
.execute({
  destinationName: 'Server'
});
```
