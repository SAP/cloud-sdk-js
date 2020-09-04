---
title: Connecting to external system from the business application studio (BAS) with the SAP Cloud SDK for JavaScript / TypeScript
hide_title: false
hide_table_of_contents: false
sidebar_label: From BAS to External Systems
description: This article describes how the SDK helps to connect to external systems from the business application studio.
keywords:
- sap
- cloud
- sdk
- proxy
- connectivity
- business application studio
- cloud-foundry
- JavaScript
- TypeScript
---

import useBaseUrl from '@docusaurus/useBaseUrl'

## What is the Business Application Studio (BAS)? ##

The business application studio (BAS) is a development environment offered as a service on Cloud Foundry (CF).
You can simply subscribe to the BAS and from there quickly start developing without installing node, git, Visual Studio Code or other tools.
From the look and feel it is very similar to Visual Studio Code, which is no surprise since it is based on [Eclipse Theia](https://theia-ide.org/), the open source version of Visual Studio Code.

However, SAP added a few useful features to the BAS. 
You can connect to your CF account and access environment variables and destinations of the destination service subscribed to your account.
This allows you to connect to external systems from your locally running BAS application without deploying to CF.
This is a very useful feature for developers because the cycle to test something is much quicker if you can do it locally.
We will also consider SAP S/4HANA On-Premise systems as relevant external system here, because for external systems reachable on the internet a connection is trivial.

<img alt="Connecting to external On-Premise systems" src={useBaseUrl('img/cloud-connector.png')} />

## Technical Background ##

Companies do not expose their onPremise S/4 systems to the internet.
They are only reachable via a cloud connector (CC) attached to a CF account.
In principle, you cannot reach these systems outside the CF account.    

However, due to the subscription between the BAS and the CF account there is a connection from the local application to the S/4 system.
On a high level the connection works the following way:
- The BAS includes an HTTP_PROXY running at http://localhost:8887 
- This proxy forwards all http requests to the CF account
- CF searches the existing destinations for one matching the URL of the request
- If a destination is present, an initial request is sent to this destination
- The proxy is a reverse proxy also piping back the response to the BAS

The SDK helps you to consider the HTTP_PROXY automatically and makes it easy to use the same code base locally and in production on CF.
As described in [the destination lookup](destination-js-sdk) the SDK has a destination lookup priority considering environment variables first.

The trick is to define a `destinations` environment variable when you run locally, which works like a switch under the hood when you execute:

```$xslt
executeHttpReques({destinationName:"myDestinationName",jwt:"myJWT"})
```

The code is the same for local execution and production. The two situation are:

**Case 1:** When you run locally the SDK reads the destination from the environment variables. The `jwt` is irrelevant.
The destination contains only name and url of the real CF destination. 
Since the destination has no proxy type specified the SDK takes per default the HTTP_PROXY into account.
From there the flow, described above, takes place.

**Case 2:** When you run on CF there is not environment variable present. 
The `jwt` is used to fetch the full destination from the service.
The proxy type is `onPremise` and the connectivity service provides all proxy information.


:::note
The `executeHttpRequest()` is used by all request builders provided of the SDK as well as by CAP applications connecting to an S/4 system.
:::

## Details on the Setup ##

### Prerequisite I: The Business Application Studio ###

You have a cloud foundry account and a subscription to the BAS. 
Start the BAS and connect your BAS workspace to the CF account. 
This is done via the little CF icon (<img src={useBaseUrl('img/cf-connect-button.jpg')} />) on the left of the BAS.
The connection enables the proxy connection from the BAS to your CF account.

### Prerequisite II: Cloud-Connector and Destination Setup ###

You have a working cloud-connector setup and in your account contains a destination pointing to an onPremise system you want to connect to.
Go to the destination in CF and add the following properties:

|Property|Value|
|---|---|
|WebIDEEnabled|true|
|HTML5.DynamicDestination|true|

This makes the destination available for usage from the BAS studio. 
Note  down the value of the `name` and `url` field of the destination.
We will need it later on.
  
### Local Application Setup

You use launch configs to run and debug applications locally.
Either you extend your existing `.vscode/launch.json` or you create a new one. 
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
In this document we use a simple Nest application but for any express or [CAP project](https://community.sap.com/topics/cloud-application-programming) it will look similar.
The entries are quite self-explanatory, the `program` and `preLaunchTask` will be of course different depending on your application.
The relevant thing will happen in the `.env` file which is read when starting the application.
If you do not have a `.env` file create one or adjust the existing one.
Just add the following entry to the `.env` file:

```
destinations="[{"name": "<destinationName>","url": "<destinationUrl>"}]"
```
Fill in the `name` and `url` you have noted down from the CF destination you want to connect to.
Once the request reaches the CF account via the proxy, it reads all authorization information from the real destination.
All requests done with the SDK will now reach the S/4 system. 
You can start your application via the launch button. 

:::note
The SDK also offers a `mockTestDestination()` method which reads destination information from a `system.json` and `credentials.json` file.
In the end, this only sets the `destinations` environment variables as the `.env` file does, but could become advantageous if you have many systems.
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

In case you have a cloud system like S/4 Hana cloud or any other system on the internet you can follow the same approach.
Just add values for `user` and `password` to the environment variables if the system requires authorization.
In case you use the `mockTestDestination()` add the login information to the `credentials.json`.

:::note
Via the connection between the BAS and CF it is also possible to import all environmentvariabless from the CF account to the BAS.
In particular the `VCAP_SERVICE` variable containing all service information.
If you import these you can do the real destination via the destination service in your locally deployed app.
This works for all destinations with a proxy type `internet` but not for the ones with `onPremise`. 
The reason for this is the interference of two proxies: (1) The web proxy of the BAS and (2) the connectivity proxy in CF.
If you load an On-Premise destination via the destination service it will contain the connectivity proxy of CF, although you would need the web proxy when you run locally in BAS.
:::
