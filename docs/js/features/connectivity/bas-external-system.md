---
id: bas-external-system-js-sdk
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

## Introduction ##

The business application studio (BAS) is a development environment offered as a serivce on cloud foundry (CF).
You can simple subscripte to the BSA and from there start developing quickly without installing node, git, visual studio vode... .
From the look and feel it is very similar to visual studio code, which is no sunrise since it is base on the [Eclipse Theia](https://theia-ide.org/) the open source version of visula studio code.

However, SAP added a few useful features to the BAS. 
You can connect to your CF account and access environment variables and destinations of the destination service subscribed to your acount.
This connection is also the focus of this document. 
How to reach external systems from your locally running BAS application without deploying to CF.
This is a very useful feature for developers because the cycle to test something is much quicker if you can do it locally.

<img alt="Reaching external onPremise" src={useBaseUrl('img/cloud-connector.png')} />

## Technical Background ##

We will focus on connectivity to onPremise S/4 system, because companies do not expose their onPremise S/4 systems to the internet.
They are only reachable via a cloud connector (CC) attached to a CF account.
In principle, you cannot reach these systems from outside of the CF account.    

However, due to the subscription between the BAS and the CF account there is a connection from the local application to the S/4 system.
The connection works on a high level in the following way:
- Within the BAS there is a HTTP_PROXY running at http://localhost:8887 
- This proxy forwards all http requests to the CF account
- In the CF account it is checked if a destination with the URL is found
- If a destination is found the initial request is send to destination
- The proxy is a reverse proxy also piping back the request to the BAS

The SDK helps you to consider the HTTP_PROXY automatically and also makes it easy to use the same code base locally and in production on CF.
As described in [the destination lookup](destination-js-sdk) the SDK has a destination lookup prority considering envorment variables first.

The trick is to define a `destinations` environment variable when you run locally, which works like a switch under the hood when you execute:

```$xslt
executeHttpReques({destinationName:<name Value from the destination>,jwt:<your JWT>})
```

The code is the same for local execution and produciton. 
The two situation are:

- Case 1: When you run locally the SDK reads the destination from the environment variables. The `jwt` is irrelevant.
The destination contains only name and url of the real CF destination. 
Since the destination has no proxy type specified the SDK takes per default the HTTP_PROXY into account.
From there the flow, described above, takes place.
- Case 2: When you run on CF there is not environment variable present. 
The `jwt` is used to fetch the full destination from the service.
The proxy type is `onPremise` and the connectivity service provides all proxy information.


:::note
The `executeHttpRequest()` is used by all request builders provided by the SDK as well as by CAP/CDS datasources connecting to an S/4 system.
:::

## Details on the Setup ##

### Prerequisite I: The Business Application Studio ###

You have a cloud foundry account and a subscription to the BAS. 
Start the BAS and connect your BAS workspace to the CF account. 
This is done via the little CF icon <img src={useBaseUrl('img/cf-connect-button.jpg')} /> on the left of the BAS.
The connection enables the proxy connection from the BAS to your CF account.

### Prerequisite II: Cloud-Connector and Destination Setup ###

You have a working cloud-connector setup and in your account contains a destination pointing to an onPremise system you want to connect to.
Go to the destination in CF and add the following properties:
```
Property	                Value
WebIDEEnabled           	true
HTML5.DynamicDestination	true
``` 
This makes the destination availible for usage from the BAS studio. 
Also note the value of the `name` and `url` field of the destination.
We will need it later on.
  
### Local Application Setup

In the BAS studio you use launch configs to run and debug applications locally.
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
In this document we use a simple Nest application but for any express or [CAP project](https://community.sap.com/topics/cloud-application-programming) it will be similar.
The entries are quiet self-explanatory, the `program` and `preLaunchTask` will be of course different depending on your application.
The relevant thing will happen in the `.env` file which is read when starting the application.
If you do not have a `.env` file already create one or adjust the existing one.
Just add the following entry to the `.env` file:

```
destinations="[{"name": "your CF destination name","url": "your CF destination url"}]"
```
and fill in the `name` and `url` you have noted down from the CF destination you want to connect to.
All authorization information and properties are used from the real destination in cloud foundry.
All request done with the SDK will now reach the S/4 system.

You can start your application via the launch button. 
A pop-up will appear via with a link to access your locally running application.

:::note
The SDK also offers a `mockTestDestination()` method which reads destination information from a `system.json` and `credentials.json` file.
In the end, this only sets the `destinations` environment variables as the `.env` file does, but could become advantageous if you have many systems.
You can also set the `systems.json` and `credentials.json` to your git ignore list so that they are not checked in by accident.
:::

For the simple case you would add a call to your local start-up script `mockTestDestination('your CF destination name')` and have a `systems.json` in your project root:
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

In case you have a cloud system like S/4 Hana cloud or any other system in the internet you can follow the same approach.
Just add values for `user` and `password` to the environment variables if the system needs authorization.
In case you use the `mockTestDestination()` add them to the `credentials.json`.

:::note
Via the connection between the BAS and CF it is also possible to import all enviorment varialbes from the CF account to the BAS.
In particular the `VCAP_SERVICE` variable containing the service information.
If you import these you can do the real lookup flow of the destination in your locally deployed app.
This works for all real cloud destination.
However, if you need a cloud connector this approach does not work and you must use the way described above.
:::

