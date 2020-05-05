# Consume the SAP Cloud Platform Workflow Service

## Goal of this Documentation
In the following documentation we cover the SAP Cloud SDK Java client library (Beta) for the SCP Workflow REST API. After a brief introduction in the SCP Workflow service, we explain in detail how the developer can use this client library. Thereby we touch in particular upon all necessary configuration steps and the app development.

## Introduction to the SCP Workflow Service and its REST API
The [SAP Cloud Platform (SCP) Workflow service](https://help.sap.com/viewer/product/WORKFLOW_SERVICE/Cloud/en-US) is available on the Cloud Foundry environment [since April 2019](https://blogs.sap.com/2019/04/03/workflow-and-business-rules-now-available-in-cloud-foundry-environment-of-sap-cloud-platform/). It helps you build, run and manage workflows to model processes that span from simple approval steps to complex business scenarios with several involved parties.

The SCP Workflow service provides a web editor for visual workflow modeling as well as an [REST API](https://api.sap.com/api/SAP_CP_Workflow_CF/resource). For example, the REST API allows for interaction with your workflow definitions and task definitions from a loosely-coupled REST client. On its [section within the SAP API Business Hub](https://api.sap.com/api/SAP_CP_Workflow_CF/resource) we can discover all API endpoints along with their payloads and status codes. 

Refer to [this blog post](https://blogs.sap.com/2018/01/09/sap-cloud-platform-workflow-developer-center/) for an overview of all resources in the realm of the SCP Workflow Service.

## An Example Use Case
Let us sketch an example use case to gain better understanding when we would want to use this client library.

Imagine a use case comprising a business scenario with multiple involved parties, complex validation logic and parallel execution flows. These requirements can be met with the SCP Workflow service. It allows to model the workflows in a visual editor. In addition, you develop a cloud application leveraging the SAP Cloud SDK that covers the main part of the business logic and orchestrates the workflow processing in the background. For this purpose, your app communicates with the SCP Workflow service through its REST API. To make your life easier when it comes to developing against the REST API, you utilize the respective client library.
 

## Consume the SCP Workflow REST API
### Application Use Case
As described earlier, we have an existing SAP Cloud SDK-based Java app and we want to invoke the SCP Workflow REST API in our business logic. More specifically, we are interested in retrieving a list of all workflow definitions that exist in the connected SCP Workflow service instance. That requirement corresponds to the API endpoint `/v1/workflow-definitions` which you find under the section `Workflow Definitions` on the left-hand side.

### Configuration Steps
There are some configuration steps on Cloud Foundry necessary to run this scenario. Let's look at each of them in detail.

#### Bind App to SCP Workflow Service Instance

Refer to the documentation on [help.sap.com](https://help.sap.com/viewer/e157c391253b4ecd93647bf232d18a83/Cloud/en-US/e8d88dd056f14c75af59e68d6b20345f.html) for the full picture. We will outline the essential pieces in the following. Also we assume that you are sure about:
- Which Cloud Foundry subaccount and space you want to use,
- That the entitlement for the SCP Workflow Service is in place,
- That you possess all necessary authorizations on Cloud Foundry to perform the following procedures and that
- You have installed the Cloud Foundry Command Line Interface (CLI) on your machine.

##### Identify necessary OAuth Scopes
The REST API is protected and requires authenticating with an OAuth 2.0 access token. Each particular API endpoint requires the calling REST client to provide an access token valid for the respective endpoint. That is, the token must be issued for the respective OAuth scope that corresponds to the desired API endpoint.

Let us figure out which OAuth scope is relevant for our application use case. We see on the [API documentation](https://api.sap.com/api/SAP_CP_Workflow_CF/resource) that the endpoint ``/v1/workflow-definitions`` is assigned to the scope `WORKFLOW_DEFINITION_GET`.

##### Create Service Instance JSON Configuration
Open a text editor of your choice and save a JSON file on your system with the following content:
```
{
  "authorities": ["WORKFLOW_DEFINITION_GET"]
}
```
Remember where you've saved the file, you'll need it later.

##### Create Service Instance

Open the command line and authenticate at your Cloud Foundry organization by invoking ``cf login``.

Consider specifying the respective subaccount, organization and space with ``cf target`` if necessary.

Use ``cd`` to navigate to the directory that contains the JSON file created beforehand.
Being in that directory, create the service instance as follows:
```
cf create-service workflow standard my-workflow-service -c <path-to-json-file>
```
This command creates an instance of the SCP Workflow Service in the CF space that your CLI points to. More specifically, it uses the service plan "standard" and takes the JSON configuration into account. Note that we named the service instance ``my-workflow``. You can name it as you want, it is just important to remember the name as you need it in your deployment descriptor `manifest.yml` later on.

Once the service instance creation is finished, you can see the service instance in your CF space under ``Services`` and `Service Instances` in the left-hand side menu.


##### Bind your App to Service Instance
Open the file ``manifest.yml`` in your project and mention your service instance under `services`. Refer to this example:
```
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
Redeploy your app with ``cf push``.

##### Take Note of API endpoint and OAuth Credentials
After the deployment of the app happened, go to your CF space and navigate to ``Services`` and thereafter to `Service Instances`. You should see the service instance you created along with the information that is is bound to your application.

Click on the service instance name, for instance ``my-workflow``, in the upcoming screen you should see the headline `Service Instance: my-workflow - Referencing Apps`. Make sure that the entry belong to your app is selected in the table below, given that multiple apps are bound to the same service instance.

Consider the JSON content below the table. For your convenience we recommend copying that JSON to a text editor. Here is one example for your reference:
```
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

At next, carefully look at the JSON content and collect the values for the following JSON keys:
- `workflow_rest_url`
- `url`
- `clientid`
- `clientsecret`

You'll need the values in the next step.

#### Maintain HTTP Destination 
Go to your CF subaccount, navigate to ``Connectivity`` and `Destinations` in the left-hand side menu and create a new HTTP destination with the following properties:
- Name: Workflow-Api
- Type: HTTP
- URL: The value of `workflow_rest_url`
- Proxy Type: Internet
- Authentication: OAuth2ClientCredentials
- Client ID: The value of `clientid`
- Client Secret: The value of `clientsecret`
- Token Service URL: The value of `url` appended by `/oauth/token?grant_type=client_credentials`

Restart your app thereafter.

### Develop your App
#### Assumptions
We assume that you have a Java project that uses the SAP Cloud SDK at hand. If not, we recommend going ahead [creating one from one of the Maven archetypes](https://sap.github.io/cloud-sdk/docs/java/getting-started). Moreover, we assume your system is configured so that you can successfully invoke ``mvn clean install`` from your project's root directory.

In addition, we assume that your have the SAP Cloud SDK Bill-of-Material (BOM) in your ``dependencyManagement`` section in your pom structure. Example:
```
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>com.sap.cloud.sdk</groupId>
      <artifactId>sdk-bom</artifactId>
      <!-- use at least version 3.19.1 -->
      <version>3.19.1</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>
  </dependencies>
</dependencyManagement>
``` 
If you use the SAP Cloud SDK Maven archetypes, this will be automatically the case.

Note that the presented client library is released as of version `3.19.1`.

#### Add Maven Dependency 

You can refer to the Java client library for the SCP Workflow service with the following Maven dependency:
```
<dependency>
    <groupId>com.sap.cloud.sdk.services</groupId>
    <artifactId>scp-workflow-cf</artifactId>
</dependency>
```
Add that dependency into your pom file and invoke ``mvn clean install`` to check if Maven is able to pick that dependency up.

### Invoke the Java Client Library
We know the name of the HTTP destination that we configured in the SCP cockpit.
At first, we obtain a Java representation of that destination.
```
final String destinationName = "Workflow-Api";
final HttpDestination httpDestination = DestinationAccessor.getDestination(destinationName).asHttp();
```
Secondly, we go ahead and invoke the Java API class for the workflow definitions. More specifically, we invoke the method to obtain the list of all existing workflow definitions. We pass the HTTP destination as argument to the constructor of the API class.
```
final List<WorkflowDefinition> workflowDefinitions =
        new WorkflowDefinitionsApi(httpDestination).getWorkflowDefinitions();
```
We have now invoked the REST API in a type-safe manner and furthermore gain type-safe access to the resulting objects. For instance, we can read particular details about each worklow definition (printed to the log here for demonstration purposes).
```
workflowDefinitions.forEach(workflowDefinition -> {
    log.info(workflowDefinition.getName());
    log.info(workflowDefinition.getVersion());
    log.info(workflowDefinition.getCreatedAt().toString());
});
```
Going even further, the library allows us to inspect all jobs related to a particular workflow definitions. Check out the model definition on the API Hub for this model relationship.
```
final WorkflowDefinition workflowDefinition = workflowDefinitions.get(0);
workflowDefinition.getJobs().forEach(job -> {
    log.info(job.getId());
    log.info(job.getPurpose().toString());
});
```
After this demo of the client library we'll cover its general capabilities and limitations in the next sections.
### Client Library Capabilities 
The Java client library for SCP Workflow enables the developer to invoke the REST API in a type-safe and convenient manner. It provides Java abstractions for all REST API endpoints along with the respective model classes. Essentially, the library relieves the developer from all the HTTP-related development work (e.g., interpreting status codec, JSON de-/serialization) and lets him/her focus on the real business logic.

Moreover, we integrated the library with the SAP Cloud SDK capabilities, such as the tenant-aware destination retrieval.

### Client Library Limitations
We have published the client library in a Beta state. That is, we verified its functional correctness to the best of our knowledge, but you should still not use the library for productive use cases. Once the library is mature enough we will announce that explicitly.

Henceforth, the library supports the SCP Workflow service on Cloud Foundry, while it does not cover the SCP Workflow service on the Neo landscape on SCP. 

Related to Cloud Foundry, you might know that environment variable VCAP_SERVICES contains information about your bound service instances. In the current state, it is required to create a destination manually instead of letting the library consume VCAP_SERVICES directly.


