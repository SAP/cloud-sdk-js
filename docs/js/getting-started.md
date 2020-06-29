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

## CLI Usage

The CLI can initialize a nest-based project or (the more common case) add everything you need to develop for SAP Cloud Platform to an existing project no matter what backend framework you use.
If there are any incompatibilities, please let us know in the [issues](https://github.com/SAP/cloud-sdk-cli/issues/new/choose)!

### Installation

First run this command to install the CLI

```shell
npm install -g @sap-cloud-sdk/cli
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

To create a new project run the CLI's init command in the project folder.

```shell
$ sap-cloud-sdk init
```

It will guide you through the initialization, create the necessary files and add necessary dependencies.
If you run it in an empty folder, it will ask if you want to initialize a project using [@nest/cli](https://github.com/nestjs/nest-cli).

The CLI will already install all the necessary dependencies for the project, so this might take a minute. If everything worked correctly, you should see output like this:

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

- **`package.json`**: Specifies dependencies, metadata and user-defined scripts. The application comes with some predefined scripts and dependencies, that will be explained in detail in the course of this group of tutorials.
- **`.npmrc`**: The **`npm`** configuration file. The SAP Cloud SDK consists of some generic libraries, that are available as Open Source Software and service libraries for the whitelisted SAP S/4HANA APIs, referred to as the Virtual Data Model (VDM). In the scaffolding we specify the registry for the `@sap` scope, where the VDM libraries are published.

#### TypeScript

- **`tsconfig.json`**: Configuration file for `TypeScript`. This is not needed in the plain `JavaScript` version.
- **`tslint.json`**: Configuration file for `tslint`, the de facto default linter for `TypeScript`.

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

Go to `http://localhost:3000` and you should get a `Hello, World!` in response. Open `src/main.ts` and switch the port from `3000` to `8080`. The corresponding line should then look like this:

```ts
await app.listen(process.env.PORT || 8080);
```

Since `nest` was started in watch mode, it should detect this change and restart the server.

## Deploy the project on Cloud Foundry

### Installation

You will need the `Cloud Foundry` command line interface (`cf` CLI) to later deploy your application to SAP Cloud Platform. To see whether it is already installed, you can run `cf -v` on your command line. If the command fails, you will need to install it.

You can find installation instructions for all common platforms in the [`Cloud Foundry documentation`](https://docs.cloudfoundry.org/cf-cli/install-go-cli.html). Again, we recommend to use a `package manager` for that. If you are using `chocolatey` on Windows, please find the instructions [here](https://chocolatey.org/packages/cloudfoundry-cli).

### Login
<!--Do i need to explain this with more detail?-->
```shell
cf api https://api.cf.<region>.hana.ondemand.com
cf login
```

### Before deploying
- Make sure that your app listens to port 8080
- Build your app if necessary

<!--I don't understand this command, it wqs in the original doc but is not in the tutorial-->
Then run:
```shell
sap-cloud-sdk package
```

### Deployment
Push to Cloud Foundry:
```ts
cf push
```

<!--TODO:
Destination
Bind destination
XSUAA
-->
Do i need to go more in depth about xsuaa?
like this:
### Configure destination

Now that we have deployed our application, we need to configure a destination in the Cloud Cockpit so that it can be used by our application.

Start by opening the [Cloud Cockpit](https://account.hana.ondemand.com) in your browser and logging in.

Next, navigate to your respective subaccount (in case of a trial account it should be called **trial**). In the menu bar on the left, there should be a section **Connectivity** with an entry called **Destinations**. Click **Destinations**. On the page that opens, click **New Destination** and fill in the details below.

![SAP_Cloud_Platform_Cockpit](sap_cloud_platform_cockpit.png)

For **Name**, choose a name that describes your system. For the tutorial, we will go with **`MockServer`**.

If you use the Business Partner mock server, enter for **URL** the URL that you have saved from the previous step and use **`NoAuthentication`** for **Authentication**. If you use an SAP S/4HANA Cloud system, enter the systems URL in the **URL** field and choose **`BasicAuthentication`** as authentication type. This will make the fields **User** and **Password** appear. Enter here the credentials of a technical user for your SAP S/4HANA Cloud system.

### Bind destination service

In order to allow the application to use the destination you have just configured, you will need to bind an instance of the destination service and an instance of the `XSUAA service` to your application.

To create an instance of the destination service, execute the following command in your terminal:

```shell
cf create-service destination lite my-destination
```

This tells `Cloud Foundry in SAP Cloud Platform` to create an instance of the destination service with service plan **lite** and make it accessible under the name **my-destination**. We can now use the name to bind this service to our application. To do this, open your `manifest.yml` and add a section called `services`, under which you can then add the name of the just created service.

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

Finally, we need to adapt the `getAllBusinessPartners` function in `business-partner.controller.ts` to use the destination defined in the Cloud Platform Cockpit.

The new function now looks like this:

```ts
function getAllBusinessPartners(): Promise<BusinessPartner[]> {
  return BusinessPartner.requestBuilder()
    .getAll()
    .execute({
      destinationName: 'MockServer'
    });
}
```

We replaced the parameter of `execute` with an object whose key `destinationName` refers to the name of the destination we defined earlier. If you chose a different name than `MockServer`, make sure to use it here accordingly.

Now we can recompile and redeploy the application. In your command line, run:
```shell
npm run deploy
```

## TEST
For productive use, your app should implement user authentication and authorization.
For SAP Cloud Foundry, this is usually done by using the approuter and xsuaa service.
Start by running [`sap-cloud-sdk add-approuter`](#sap-cloud-sdk-add-approuter) and configure the xsuaa service accordingly.
