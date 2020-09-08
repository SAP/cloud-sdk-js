---
title: Connecting to external systems from the Business Application Studio (BAS) with the SAP Cloud SDK for JavaScript / TypeScript
sidebar_label: Connecting to External system form BAS
description: This article describes how the SDK helps to connect to external systems from the Business Application Studio.
keywords:
- sap
- cloud
- sdk
- proxy
- connectivity
- Business Application Studio
- cloud-foundry
- JavaScript
- TypeScript
---

import useBaseUrl from '@docusaurus/useBaseUrl'

## What is the Business Application Studio (BAS)? ##

The Business Application Studio (BAS) is a development environment offered as a service on Cloud Foundry (CF).
You can simply subscribe to the BAS and from there quickly start developing without installing node, git, Visual Studio Code or other tools.
From the look and feel it is very similar to Visual Studio Code, which is no surprise since it is based on [Eclipse Theia](https://theia-ide.org/), the open source version of Visual Studio Code.

However, SAP added a few useful features to the BAS. 
You can connect the BAS to your CF account.
This allows you to reach behind a Cloud Connector from your locally running BAS application without deploying to CF.
This is a very useful feature for developers because the cycle to test something is much quicker if you can do it locally.

<img alt="Connecting to external On-Premise systems" src={useBaseUrl('img/cloud-connector.png')} />

## Technical Background <a name="background"></a> ##

Companies do not expose their On-Premise SAP S/4HANA systems to the internet.
They are only reachable via a Cloud Connector (CC) attached to a CF account.
In principle, you cannot reach these systems outside the CF account.    

However, due to the subscription between the BAS and the CF account there is a connection from the local application to the SAP S/4HANA system.
On a high level the connection works the following way:
- The BAS includes an HTTP_PROXY running at http://localhost:8887 
- This proxy forwards all http requests to the CF account
- CF searches the existing destinations for one matching the URL of the request
- If a destination is present, an initial request is sent to this destination
- The proxy is a reverse proxy also piping back the response to the BAS

The SDK helps you to consider the HTTP_PROXY automatically and makes it easy to use the same code base locally and in production on CF.
As described in [the destination lookup](../features/connectivity/destination-js-sdk) the SDK has a destination lookup priority considering environment variables first.

The trick is to define a `destinations` environment variable when you run locally, which works like a switch under the hood when you execute:

```$xslt
executeHttpRequest({ destinationName: "myDestinationName", jwt: "myJWT" });
```

The code is the same for local execution and production. The two situation are:

**Case 1:** When run locally, the SDK reads the destination from the environment variables. The `jwt` is irrelevant.
The destination contains only the name and URL of the real CF destination. 
Since the destination has no proxy type specified, the SDK takes the HTTP_PROXY into account, as is the default.
From there the flow described above takes place.

**Case 2:** When run on CF there is no environment variable present. 
The `jwt` is used to fetch the full destination from the service.
The proxy type is `OnPremise` and the connectivity service provides all proxy information.


:::note
The `executeHttpRequest()` function is used by all request builders provided of the SDK as well as by CAP applications connecting to an SAP S/4HANA system.
:::

## Setup ##

### Prerequisite I: The Business Application Studio ###

You have a Cloud Foundry account and a subscription to the BAS. 
Start the BAS and connect your BAS workspace to the CF account. 
This is done via the little CF icon (<img src={useBaseUrl('img/cf-connect-button.jpg')} />) on the left of the BAS.
The connection enables the proxy connection from the BAS to your CF account.

### Prerequisite II: Cloud Connector and Destination Setup  <a name="CCandDestSetup"></a> ###

You have a working Cloud Connector setup and in your account contains a destination pointing to an On-Premise system you want to connect to.
Per default, destinations are not usable by a connected BAS. 
You need to set two properties `WebIDEEnabled` and `HTML5.DynamicDestination` to enable that feature for a specific destination.
Go to the destination configuration in CF and add the properties:

|Property|Value|
|---|---|
|WebIDEEnabled|true|
|HTML5.DynamicDestination|true|
  
### Local Application Setup

You use [launch configurations](https://code.visualstudio.com/docs/editor/debugging#_launchjson-attributes) to run and debug applications locally.
Either extend your existing `.vscode/launch.json` or create a new one. 
```JSON
{"configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug my application",
      "program": "${workspaceFolder}/dist/main.js",
      "envFile": "${workspaceFolder}/.env",
      "preLaunchTask": "npm: build",
      "outFiles": [
        "${workspaceFolder}/dist/**/*.js"
      ]
    }
  ]
}
```
In this example we use a simple Nest.js application. 
The code will look very similar for express or [CAP](https://community.sap.com/topics/cloud-application-programming) applications.
The property `program` defines the script file executed when you run the configuration. 
In our case the `main.js` script will start up the Nest server.
The `preLaunchTask` executes the build before each run which compiles the TypeScript files to JavaScript. 
The `outFiles` properties defines where the compiled files will be located.

As discussed [in the beginning](#background) we need to set an environment variable.
The easiest way to do that is via a `.env` file which is read when starting the application.
If you do not have a `.env` file create one or adjust the existing one.
Just add the following entry to the `.env` file:

```
destinations="[{"name": "<destinationName>","url": "<destinationUrl>"}]"
```
Fill in the `name` and `url` of the destination you [configured in CF](#CCandDestSetup).
Once the request reaches the CF account via the proxy, it reads all authorization information from the real destination.
All requests done with the SDK will now reach the SAP S/4HANA system. 
You can start your application via the launch button. 

:::note
The SDK also offers a `mockTestDestination()` method which reads destination information from a `system.json` and `credentials.json` file.
In the end, this only sets the `destinations` environment variables as stored in the `.env` file, but could become advantageous if you have many systems.
You can also set the `credentials.json` to your git ignore list so that they are not checked in by accident and share the systems with your colleagues.
:::

For the simple case you would add `mockTestDestination(<destinationName>)` to your local startup script and have a `systems.json` in your project root:
```JSON
{
    "systems": [
        {
            "alias": "your CF destination name",
            "uri": "your CF destination url "
        }
    ]
}
```

## Closing Remarks for Cloud Systems

In case you have a cloud system like SAP S/4HANA Cloud or any other system on the internet you can follow the same approach.
Just add values for `user` and `password` to the environment variables if the system requires authorization.
In case you use the `mockTestDestination()` add the login information to the `credentials.json`.

:::note
Via the connection between the BAS and CF it is also possible to import all environment variables from the CF account to the BAS.
In particular, you can mirror `VCAP_SERVICE` variable containing all service information.
If you import these you can use the real destination via the destination service in your locally deployed app.
This works for all destinations with a proxy type `Internet` but not for the ones with `OnPremise`. 
The reason for this is the interference of two proxies: (1) The web proxy of the BAS and (2) the connectivity proxy in CF.
If you load an On-Premise destination via the destination service it will contain the connectivity proxy of CF, although you would need the web proxy when you run locally in BAS.
:::
