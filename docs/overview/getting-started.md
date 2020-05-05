---
id: getting-started
title: Getting started
hide_title: false
hide_table_of_contents: false
sidebar_label: Getting started
description: SAP Cloud SDK is the simplest and fastest way to extend SAP services and applications in the cloud.
keywords:
- sap
- cloud
- sdk
- cloud native
- cloud sdk
- sap cloud sdk
image:
k---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Create your first App ##
You can choose between `JavaScript` and `Java` when developing with SAP Cloud SDK.
Check these two examples to initialize an application for your favorite development environment.

<Tabs
defaultValue="js"
values={[
{ label: 'JavaScript', value: 'js', },
{ label: 'Java', value: 'java', },
]
}>

<TabItem value="js">

:::note
Make sure you have the latest stable version of [Node.js](https://nodejs.org/en/download/ ) and `npm` installed.
This example assumes you're running Mac or Linux. [Check detailed getting started guide for your platform](../js/getting-started )
:::

```bash
npm install -g @sap-cloud-sdk/cli

sap-cloud-sdk init my-sdk-project

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


</TabItem>

<TabItem value="java">

:::note
Make sure your have [Java 8](https://adoptopenjdk.net/ ) and [maven](https://maven.apache.org/install.html )  installed.
This example assumes you're running Mac or Linux. [Check detailed getting started guide for your platform](../java/getting-started )
:::

```bash
mvn archetype:generate "-DarchetypeGroupId=com.sap.cloud.sdk.archetypes"\
"-DarchetypeArtifactId=scp-cf-tomee" "-DarchetypeVersion=RELEASE"
```

</TabItem>
</Tabs>

## Hello World ##
This example is not a classical `Hello World` of course. There is much more to it than just bootstrapping a starter
application. Cloud SDK is a complex and flexible library addressing a vast range of use-cases. Each of them would
require a `Hello World` of its own, and we have them!

To continue discovering SDK for your favorite programming language check respective getting started
guides and comprehensive tutorials for multiple use cases.

:::caution
There is no full feature parity between [JavaScript](../js/features )  and [Java](../java/features ) libraries.
Please, review respective documentation sections to find out more.
:::

### Getting started - JavaScript ###

- [A comprehensive getting started guide for JavaScript developers](../js/getting-started )
- [Tutorials covering Cloud SDK for JavaScript on SAP Developers portal](https://developers.sap.com/tutorial-navigator.html?tag=products:technology-platform/sap-cloud-sdk/sap-cloud-sdk&tag=topic:javascript )

### Getting started - Java ###
- [A comprehensive getting started guide for Java developers](../java/getting-started )
- [Tutorials covering Cloud SDK for Java on SAP Developers portal](https://developers.sap.com/tutorial-navigator.html?tag=products:technology-platform/sap-cloud-sdk/sap-cloud-sdk&tag=topic:java )
