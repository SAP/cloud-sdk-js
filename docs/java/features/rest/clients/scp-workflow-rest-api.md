---
id: scp-workflow-rest-api
title: Typesafe client for SAP Cloud Platform Workflow REST API
hide_title: false
hide_table_of_contents: false
sidebar_label: SCP Workflow API
description: Learn how to access the SCP Workflow REST API with the typesafe client from the SAP Cloud SDK for Java
keywords:
- sap
- cloud
- sdk
- rest
- scp
- workflow
---

import MvnBadge from '../../../../../src/sap/sdk-java/MvnBadge'

<MvnBadge />

## Overview
The [SAP Cloud Platform (SCP) Workflow service](https://help.sap.com/viewer/product/WORKFLOW_SERVICE/Cloud/en-US) is available on the Cloud Foundry environment [since April 2019](https://blogs.sap.com/2019/04/03/workflow-and-business-rules-now-available-in-cloud-foundry-environment-of-sap-cloud-platform/). It helps you build, run and manage workflows to model processes that span from simple approval steps to complex business scenarios with several involved parties.

Imagine a business scenario involving multiple parties, complex validation logic, and parallel execution flows. **SCP Workflow service** solves exactly this problem. To benefit from features offered by REST API of the SCP Workflow service you can leverage type-safe client library provided by **SAP Cloud SDK** and discover it via your IDE or [manually integrate it into your application](https://help.sap.com/viewer/e157c391253b4ecd93647bf232d18a83/Cloud/en-US/df943e71122448caaf3c49f5ffd80627.html).

Refer to [this blog post](https://blogs.sap.com/2018/01/09/sap-cloud-platform-workflow-developer-center/) for an overview of all resources about the SCP Workflow Service.

## Example Use Case for this guide

### Problem
We need to model a business workflow involving multiple parties, complex validation logic, and parallel flows execution together with other business logic in your App hosted on the SAP Cloud Platform.

### Solution
Use SAP Cloud Platform Workflow service and its REST API. You can do workflows modeling using a convenient visual editor and call SCP Workflow REST API via type-safe client library module provided by SAP Cloud SDK for Java. Additionally, you'll get other benefits off SAP Cloud SDK like destinations and authentication handling, complete type-safety, multi-tenancy, easy resilience, and caching configuration.

## Consume the SCP Workflow REST API

### Prerequisites
Add the latest version of [SAP Cloud SDK](https://search.maven.org/artifact/com.sap.cloud.sdk/sdk-bom) to your Java application dependencies or [generate a new one from archetypes that we provide](../../../getting-started).

After we have an SAP Cloud SDK-based Java App, we can invoke the SCP Workflow REST API in our business logic. More specifically, we are interested in retrieving a list of all workflow definitions that exist in the connected SCP Workflow service instance which corresponds to the API endpoint `/v1/workflow-definitions`. You can find it under the section `Workflow Definitions` on the left-hand side of your CF cockpit.

### Cloud Foundry configuration
Let's look in detail at all necessary steps of Cloud Foundry configuration to run this scenario.

#### Bind App to SCP Workflow Service instance

Refer to the documentation on [help.sap.com](https://help.sap.com/viewer/e157c391253b4ecd93647bf232d18a83/Cloud/en-US/e8d88dd056f14c75af59e68d6b20345f.html) for the full picture. We'll outline essentials with the assumption that you understand or have all of the following:

- Which Cloud Foundry subaccount and space you want to use
- You have access to the SCP Workflow Service feature
- You possess all necessary authorizations on Cloud Foundry
- [You have installed the Cloud Foundry Command Line Interface (CLI) on your machine](../../../guides/cf-cli).

##### Identifying necessary OAuth Scopes
:::tip
The SCP Workflow REST API is protected and requires authenticating with an OAuth 2.0 access token. Each particular API endpoint requires the client to provide an access token valid for the respective endpoint. The token must be issued for the respective OAuth scope that corresponds to the desired API endpoint.
:::

Let's figure out which OAuth scope is relevant for our application. For that, we have to check [SCP Workflow API documentation](https://api.sap.com/api/SAP_CP_Workflow_CF/resource) to find out that the endpoint `/v1/workflow-definitions` is assigned to the scope `WORKFLOW_DEFINITION_GET`.

##### Create Service Instance Configuration

Open a text editor and create a JSON file with the following content:

```json
{
  "authorities": ["WORKFLOW_DEFINITION_GET"]
}
```

Remember where you've saved the file, you'll need it later.

##### Create service instance

Open the command line and authenticate at your Cloud Foundry organization by invoking `cf login`.

Consider specifying the respective __subaccount__, __organization__, and __space__ with `cf target` if necessary.

Use `cd` to navigate to the directory that contains `JSON` configuration file we created before and run the following to create the service instance:

```bash
cf create-service workflow standard my-workflow-service -c <path-to-json-file>
```

This command creates an instance of the SCP Workflow Service in the CF space that your CLI points to. More specifically, it uses the service plan "standard" and takes the `JSON` configuration into account. Note that we named the service instance `my-workflow`. If you have chosen a different name, please, remember the name as you'll need it for your deployment descriptor `manifest.yml` later on.

Once the service instance creation is finished, you can see the service instance in your CF space under `Services` and `Service Instances` in the left-hand side menu.

##### Bind your App to Service Instance

Open the file `manifest.yml` in your project and mention your service instance under `services` as follows:

```yaml
applications:
- name: awesome-app
  memory: 1024M
  timeout: 600
  random-route: false
  path: application/target/awesome-app-application.war
  buildpacks:
  - sap_java_buildpack
  env:
    TARGET_RUNTIME: tomee7
    SET_LOGGING_LEVEL: '{ROOT: INFO, com.sap.cloud.sdk: INFO}'
    JBP_CONFIG_SAPJVM_MEMORY_SIZES: metaspace:128m..
  services:
  - my-destination
  - my-workflow
  routes:
  - route: <omitted-on-purpose>
```

Now, redeploy your app with `cf push`.

##### Take Note of API endpoint and OAuth Credentials
After app deployment has finished, go to your CF space and navigate to `Services\Service Instances`. You should see the service instance you created along with the information that is bound to your application.

Click on the service instance name, for instance `my-workflow`, in the upcoming screen you should see the headline `Service Instance: my-workflow - Referencing Apps`. Make sure that the entry belongs to your app is selected in the table below, given that multiple apps are bound to the same service instance.

Consider the `JSON` content below the table. For your convenience, we recommend copying that `JSON` to a text editor. Here is a quick example:

```json
{
    "endpoints": {
        "workflow_odata_url": "foo",
        "workflow_rest_url": "bar"
    },
    "html5-apps-repo": {
        "app_host_id": "foo"
    },
    "uaa": {
        "uaadomain": "bar",
        "tenantmode": "dedicated",
        "sburl": "bar",
        "clientid": "foo",
        "verificationkey": "bar",
        "apiurl": "foo",
        "xsappname": "bar",
        "identityzone": "foo",
        "identityzoneid": "bar",
        "clientsecret": "foo",
        "tenantid": "bar",
        "url": "foo"
    },
    "sap.cloud.service": "com.sap.bpm.workflow",
    "saasregistryappname": "workflow",
    "content_endpoint": "foo"
}
```

Next look carefully at the `JSON` content and collect the values for the following `JSON` keys:

- `workflow_rest_url`
- `url`
- `clientid`
- `clientsecret`

You'll need these values in the next step.

#### Create HTTP Destination

Go to your CF subaccount, navigate to `Connectivity\Destinations` in the left-hand side menu, and create a new HTTP destination with the following properties:

- Name: Workflow-Api
- Type: HTTP
- URL: The value of `workflow_rest_url`
- Proxy Type: Internet
- Authentication: OAuth2ClientCredentials
- Client ID: The value of `clientid`
- Client Secret: The value of `clientsecret`
- Token Service URL: The value of `url` appended by `/oauth/token?grant_type=client_credentials`

Click save. Restart your app by navigating to `Spaces\<you-space-name>\Applications`. Chose your App from the list by clicking on the link with its name and find restart button on the page that loads.

### Develop your App

#### Dependency assumptions
We assume that you have a Java project using the SAP Cloud SDK. If not, we recommend going ahead and [creating one from one of the Maven archetypes](https://sap.github.io/cloud-sdk/docs/java/getting-started). You should also have [Apache Maven](https://maven.apache.org/download.cgi) installed and be able to successfully run `mvn clean install` from the root of your project.

Make sure that you have the SAP Cloud SDK Bill-of-Material (BOM) in your `dependencyManagement` section of your `pom.xml` structure like on the example below.
:::caution Always use the latest version of SAP Cloud SDK
Current version is: <MvnBadge />
:::

```xml  title="pom.xml"
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>com.sap.cloud.sdk</groupId>
      <artifactId>sdk-bom</artifactId>
      <!-- WF API is supported in ver 3.19.1 of the SDK and above. Please, always use the latest version -->
      <version>3.XX.X</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  </dependencies>
</dependencyManagement>
```

#### Add SCP Workflow library dependency to your project

You can refer to the Java client library for the SCP Workflow service with the following Maven dependency:

```xml title="pom.xml"
<dependency>
    <groupId>com.sap.cloud.sdk.services</groupId>
    <artifactId>scp-workflow-cf</artifactId>
</dependency>
```
After adding the dependency to your `pom.xml` file run `mvn clean install` to let `Maven` install it.

### Invoke the Java Client Library

The name of the HTTP destination that we configured in the SCP cockpit is `Workflow-API`. Let's create a Java representation of this destination.

```java
final String destinationName = "Workflow-Api";
final HttpDestination httpDestination = DestinationAccessor.getDestination(destinationName).asHttp();
```

Now we can make the first call to SCP Workflow API by invoking the method to get the list of all existing workflow definitions. For that, we pass the HTTP destination as an argument to the constructor of the API class.

```java
final List<WorkflowDefinition> workflowDefinitions =
        new WorkflowDefinitionsApi(httpDestination).queryDefinitions();
```

This is how we call the SCP Workflow REST API in a type-safe manner and benefit from type-safe access to the resulting response objects. For instance, we can read particular details about each workflow definition. We'll log them for demonstration purposes.

```java
workflowDefinitions.forEach(workflowDefinition -> {
    log.info(workflowDefinition.getName());
    log.info(workflowDefinition.getVersion());
    log.info(workflowDefinition.getCreatedAt().toString());
});
```

Another benefit is that the SCP Workflow API library allows us to inspect all jobs related to a particular workflow definition together with many other properties. You can check the SCP Workflow API's model definition on the [SAP API Hub](https://api.sap.com/package/SAPCPWorkflowAPIs?section=Artifacts) or simply use your IDE to discover available properties via its auto-complete function.

```java
final WorkflowDefinition workflowDefinition = workflowDefinitions.get(0);
workflowDefinition.getJobs().forEach(job -> {
    log.info(job.getId());
    log.info(job.getPurpose().toString());
});
```

## Capabilities and limitations

### Capabilities and benefits
The Java client library for SCP Workflow enables the developer to:

 - invoke the REST API in a type-safe and convenient manner
 - provides Java abstractions for all REST API endpoints along with the respective model classes
 - relieves the developer from all the `HTTP-related` development work like interpreting `status codes`, `JSON de-/serialization`, etc
 - it lets the developer focus on the business logic instead of coding low-level API calls
 - we keep the library up to date with the latest Workflow API specification which simplifies maintainability of your App's code
 - we integrate the SCP Workflow library with other valuable SAP Cloud SDK capabilities, such as the tenant-aware destination retrieval and many more

### Known Limitations

- The library is currently released as Beta. We'll communicate in the [release notes](../../../release-notes-sap-cloud-sdk-for-java) about production General Availability release.
- We support SCP Workflow API only on SCP Cloud Foundry. The SCP Neo landscape in **Not supported!**
- In the current state, it is required to create a destination manually instead of letting the library resolve it for you via VCAP_SERVICES binding available on SCP Cloud Foundry.

## Video tutorial
This video tutorial by the developer advocate team of SAP Cloud Platform will help you get up to speed with SAP Cloud SDK for Java and Workflow API in 60 minutes.

<div class="sdk-video-container">
<iframe class='sdk-video' src="https://www.youtube.com/embed/ug2UcXK2lH4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
