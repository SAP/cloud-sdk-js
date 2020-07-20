---
id: bapi-and-rfc-overview
title: Call a BAPI/RFC Module with SAP Cloud SDK for Java
sidebar_label: BAPI/RFC
description: Call a BAPI/RFC Module with SAP Cloud SDK for Java
keywords:
- sap
- cloud
- sdk
- cloud native
- cloud sdk
- sap cloud sdk
- bapi
- rfc
---

## What is a BAPI/an RFC Module?

As per the [official SAP documentation](https://help.sap.com/saphelp_46c/helpdata/en/a5/3ec8464ac011d1894e0000e829fbbd/content.htm?no_cache=true), a BAPI (Business Application Programming Interface) is a *precisely defined interface providing access to processes and data in business application systems*. BAPIs allow external systems to integrate with SAP S/4HANA by reading and writing business data through the BAPI as an interface. By contrast, an RFC module can also be used for such integrations. However, the recommended approach is to leverage BAPIs wherever possible as BAPIs guarantee more stable and intuitive interfaces.

On the technical level, both BAPIs and RFC modules allow for invocation from external systems through the [RFC protocol](https://help.sap.com/doc/saphelp_nw73/7.3.16/en-US/48/88068ad9134076e10000000a42189d/content.htm) (Remote Function Call). As opposed to HTTP, RFC is a binary protocol highly-optimized for fast data transfer between enterprise systems.

You can find more differences between BAPI and RFC module on the programming model. Here is a brief overview:
- BAPIs have names that **always** start with "BAPI". RFC modules have more flexible naming conventions.
- BAPIs do not throw exceptions, but leverage return tables to transfer messages to the caller. 
- BAPIs do not use changing parameters, while RFC modules may do.

:::info
To improve readability, we use the term *BAPI* in the remainder only but always refer to both BAPIs and RFC modules.
:::

## Technical Overview

SAP offers the [SAP Java Connector](https://support.sap.com/en/product/connectors/jco.html) library, hereafter referred to as *JCo* in short, that allows native access to BAPIs inside SAP systems. That means, one can also invoke BAPIs without using the SAP Cloud SDK by solely leveraging JCo.

SAP Cloud SDK offers a convenient Java API on top of JCo that integrates with other SDK core concepts, such as the destination retrieval on SCP, as well as a nice way to mapping Java entity classes to BAPI input parameters and result sets.

:::caution JCo is not packaged with SAP Cloud SDK
SAP Cloud SDK does *not* package JCo as library with its dependencies. The SDK assumes that JCo is available on the JVM classpath. 
:::

On the SCP Neo landscape, JCo is automatically provided by the infrastructure, on the SCP Cloud Foundry landscape one must use the SAP Java Build Pack during app deployment. There are other edge cases that we'll cover later.
## Call a BAPI in SAP S/4HANA

:::tip Generate SDK project
If you're starting from scratch, generate a `Tomee` project following the steps in the [Getting started](https://sap.github.io/cloud-sdk/docs/java/getting-started#generating-a-project-from-a-maven-archetype) guide.
:::

### Implement an Example BAPI Call

#### Example Scenario
We build an app that we deploy to SCP Cloud Foundry. This app exposes a servlet which invokes a BAPI to retrieve cost center information from SAP S/4HANA. The servlet has two input parameters which we supply in the query string:
- *destinationName*: Defines which SCP destination to use for connecting to SAP S/4HANA.
- *controllingArea*: Defines the controlling area for the cost center retrieval.

The app retrieves the SCP destination with SDK core capabilities, creates a BAPI request and issues that to SAP S/4HANA through the SAP Cloud Connector. We use the SAP Cloud Connector in order to access an SAP S/4HANA On-Premise system. 

The BAPI result contains cost center information which we print to the servlet response.


#### Implementation
##### Create Cost Center Abstraction
Firstly, we create an abstraction for the cost center as business entity. Thereby we gain type-safe access to the cost center information. 

Create a new class `CostCenter` and implement it as follows:
```java
@Value
public class CostCenter {
    @ElementName("CO_AREA")
    String controllingArea;

    @ElementName("COSTCENTER")
    String id;

    @ElementName("NAME")
    String name;

    @ElementName("DESCRIPT")
    String description;
}
```
The annotation `@Value` is a class-level annotation that comes from [Lombok](https://projectlombok.org/), check outs its [documentation](https://projectlombok.org/features/Value) when curious. 

We annotate every class member with `@ElementName` declaring the respective ABAP field name. The SDK uses this meta data to map the ABAP field to the Java field. You can look up the ABAP field name in S/4HANA transaction SE37 by opening the BAPI parameter list.

To make that compile, we add Lombok to our application pom as dependency. Open `application/pom.xml` and add that dependency:
```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <scope>provided</scope>
</dependency>
```
Run `mvn clean install` to verify that everything goes well.

##### Implement the Servlet
Open the `HelloWorldSerlvet` and delete its current implementation, we'll replace that with the BAPI call in the following.

Firstly, we read out the two mentioned servlet parameters from the query string.
```java
@Override
protected void doGet(final HttpServletRequest request, final HttpServletResponse response )
        throws IOException
{
    final String destinationName = request.getParameter("destinationName");
    final String controllingArea = request.getParameter("controllingArea");
...
```
Thereafter we instruct the SAP Cloud SDK to retrieve the SCP destination as per the provided name.
```java
final Destination destination = DestinationAccessor.getDestination(destinationName);
```

Now follows the actual BAPI invocation.
```java
final BapiRequestResult result = new BapiRequest("BAPI_COSTCENTER_GETLIST1")
```
We use the BAPI `BAPI_COSTCENTER_GETLIST1` to fetch cost center details from SAP S/4HANA. We call it with these parameters:
- *Importing*: `CONTROLLINGAREA` is supplied with the controlling area the servlet received
- *Tables*: `COSTCENTERLIST` provides us a list of cost centers that belong to the controlling area along with some cost center master data
- *Tables*: `RETURN` is the BAPI return table which contains the result messages after BAPI processing 

Here is how you code that with the SAP Cloud SDK.
```java
.withExporting("CONTROLLINGAREA", "BAPI0012_GEN-CO_AREA", controllingArea)
.withTable("COSTCENTERLIST", "BAPI0012_CCLIST").end()
.withTableAsReturn("BAPIRET2")
```
We call `withExporting` with the parameter name as first argument. The second argument `BAPI0012_GEN-CO_AREA` represents the ABAP data type of the BAPI parameter. You can look that up in transaction SE37 under the respective BAPI name. Thirdly, we pass the actual controlling area to the method.

Using `withTable` allows us accessing the table parameter result after BAPI processing. If we would not call this method, the SDK would not ignore this tables parameter from the BAPI response, even though it contains some data. The second parameter is again the ABAP data type.

The invocation of method `withTableAsReturn` instructs the SAP Cloud SDK to treat the tables parameter with name `BAPIRET2` as BAPI result table. We'll see later how that helps us accessing the BAPI result in Java.

The BAPI invocation gets finished with a call to `.execute(destination)`.

Here is the full method call chain:
```java
final BapiRequestResult result = new BapiRequest("BAPI_COSTCENTER_GETLIST1")
                    .withExporting("CONTROLLINGAREA", "BAPI0012_GEN-CO_AREA", controllingArea)
                    .withTable("COSTCENTERLIST", "BAPI0012_CCLIST").end()
                    .withTableAsReturn("BAPIRET2")
                    .execute(destination);
````
We receive an instance of `BapiRequestResult`. Let's look at how to access the BAPI result in detail.

As mentioned above, we're interested in the cost center list and its content. Therefore, we access the `COSTCENTERLIST` tables parameter.
```java
final List<CostCenter> costCenterList = result
                .get("COSTCENTERLIST")
                .getAsCollection()
                .asList(CostCenter.class);
```
This helps you automatically retrieve `List<CostCenter>` and can access the output in a type-safe way. On the return type of `result.get("COSTCENTERLIST")` you call `getAsCollection()` to treat this parameter as a collection and then you instruct the SDK to transfer the contained entries into individual `CostCenter` instances with `asList(...)`.

Further processing depends on the use case. For example, we could simply print the cost centers to the servlet response.
```java
for (final CostCenter costCenter : costCenterList) {
    response.getWriter().write(costCenter.toString());
}
```

Before deploying the app, let's point out more possibilites to access the BAPI result. The class `BapiRequestResult` allows you to access the return table as follows:
- Use `getErrorMessages()`, `getSuccessMessages()`, `getWarningMessages()` and `getInformationMessages` to access the returned messages.
- Use `hasFailed()` to figure out if the BAPI call was in it self working. Note that this is a convenient method for checking if `getErrorMessages()` is empty. That is, the intepretation whether the BAPI call was successful highly depends on the business context and you could implement your own logic for that purpose.

You might notice that the `execute` method declares to throw a `RequestExecutionException` in case of a failure at runtime. That requires encapsulating the BAPI call in a try-catch block.

```java
try {
    final BapiRequestResult result = new BapiRequest("BAPI_COSTCENTER_GETLIST1")
            .withExporting("CONTROLLINGAREA", "BAPI0012_GEN-CO_AREA", controllingArea)
            .withTable("COSTCENTERLIST", "BAPI0012_CCLIST").end()
            .withTableAsReturn("BAPIRET2")
            .execute(destination);

    final List<CostCenter> costCenterList = result
            .get("COSTCENTERLIST")
            .getAsCollection()
            .asList(CostCenter.class);

    for (final CostCenter costCenter : costCenterList) {
        response.getWriter().write(costCenter.toString());
    }
} catch (final RequestExecutionException e) {
    e.printStackTrace(response.getWriter());
}
```

Run `mvn clean install` to verify that your app compiles and to assemble it to a deployable artifact.

#### Difference for RFC Module
The presented code works for RFC modules too. The only difference is to use alternative classes:
- `RfmRequest` instead of `BapiRequest`
- `RfmRequestResult` instead of `BapiRequestResult`

### Deploy to SAP Cloud Platform - Cloud Foundry
Invoke `cf push` from the directory root to deploy the app to your SAP Cloud Foundry space.

### Configure SAP Cloud Platform - Cloud Foundry

#### Prerequisites
Here is what you'll need to make progress throughout the next steps.
- Node installed on your own machine
- User in SAP S/4HANA target system
- SCP Cloud Foundry subaccount with entitlements for XSUAA, destination and connectivity service
- SAP Cloud Connector connected to the SAP Cloud Foundry subaccount

Another full tutorial for setting up this scenario can be found [here](https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/fa4adc9bd40e45dbac573fd616695446.html).

#### Setup App Router
JCo requires that the app is invoked with a JWT that contains the user context. Therefore, securing the backend with an app router is required. Follow [this tutorial](https://developers.sap.com/tutorials/s4sdk-secure-cloudfoundry.html) to setup the app router.

#### Setup Cloud Connector
Expose the S/4HANA system in the SAP Cloud Connector as described in the [official documentation](https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/ca5868997e48468395cf0ca4882f5783.html).

#### Setup Destination
Open the SCP cockpit on the subaccount level. Navigate to `Connectivity` -> `Destinations` and create a new RFC destination with these properties.
- *Name*: BAPI-TEST (you can choose your own name of course)
- *Type*: RFC
- *ProxyType*: On-Premise
- *User*: Enter the SAP S/4HANA user name
- *Password*: Enter the SAP S/4HANA password
- *Additional properties*:
  - `jco.client.ashost`: Enter the SAP S/4HANA host name
  - `jco.client.client`: Enter the SAP S/4HANA client
  - `jco.client.sysnr`: Enter the SAP S/4HANA instance number

For performance improvements of your app please consider using optional properties additionally such as `jco.client.serialization_format` (see further in [JCo documentation](https://support.sap.com/en/product/connectors/jco.html)).

:::info
This destination setup is exemplary for accessing an On-Premise SAP S/4HANA system directly, if you want to access it e.g. via message server logon or you want to access a cloud system via WebSocketRFC, please adapt the properties as described in the [official documentation](https://help.sap.com/viewer/cca91383641e40ffbe03bdc78f00f681/Cloud/en-US/ab6eac92978f469e9eabe3d477ca2411.html).
:::

### Call the Test App
Our test app has the two servlet parameters `destinationName` and `controllingArea`. Suppose our destination has the name `BAPI-TEST` and we intend to read cost centers from controlling area `0001`, we'd call the test app with the relative path `hello?destinationName=BAPI-TEST&controllingArea=0001`.

Access the test app through your browser with the address comprising of the full host name plus the relative path. You should see the login prompt of the protected backend. After authentication, the servlet is invoked and you should see the servlet response printing the cost center details.


## Boundary Conditions and Edge Cases

### JCo Classes not found at Runtime
The JCo classes are available on the JVM classpath at runtime. If not, the exception in such cases reads like `java.lang.NoClassDefFoundError: com/sap/conn/jco/JCoException`.

Possible reasons and resolutions:
- There have been issues with finding JCo classes in a Spring Boot project. In such cases using the "traditional deployment" of Spring solved the problem. Thereby you deploy a war file instead of a jar file and you use Tomcat as the servlet container.
- On SCP Cloud Foundry, the SAP Java Build Pack brings JCo as a dependency. The problem arises when the build pack is not used. That is, you must declare its usage in your deployment descriptor `manifest.yml` as such:
```yaml
- name: testapp
...
  buildpacks:
    - sap_java_buildpack
...
```

### JCo requires User Information to be set	
JCo throws an `java.lang.IllegalStateException: User information is not set` if the application is not protected. That is, the incoming request must contain a JWT that identifies the user. As a solution, protect your backend with an app router to let the app user login.

### Decoration of RFC Destinations
In the realm of HTTP, destinations allow decoration to add further features to them. For instance, an `ErpHttpDestination` can decorate an `HttpDestination` which introduces the enhancement of request headers with S/4HANA-specific destination properties (e.g., `sap-client`).
```java
final HttpDestination httpDestination = DestinationAccessor.getDestination(destinationName).asHttp();
final DefaultErpHttpDestination erpHttpDestination = httpDestination.decorate(DefaultErpHttpDestination::new);
```
Simply speaking, for RFC destinations such decorations do not exist.

### Local Deployment
It is possible to execute BAPI calls from a Java app that runs on `localhost`. That requires a few configuration steps.

#### Download and Install JCo Library
- Download the JCO library from the official [product page](https://support.sap.com/en/product/connectors/jco.html).
- Extract the downloaded archive and note the JCo version (e.g., `3.1.2`) from the `Readme.txt` file.
- Install the JAR file to your local Maven cache by running the following command:
:::tip 
Before running the command, replace `<sapjco-version>` with the JCo version you downloaded.
:::
`mvn install:install-file -Dfile=sapjco3.jar -DgroupId=com.sap.conn.jco -DartifactId=com.sap.conn.jco.sapjco3 -Dversion=<sapjco-version> -Dpackaging=jar`
- Now Maven uses the JCo JAR file when declaring the dependency in your pom file.

#### Add Dependency to you POM
- Add this new dependency to your `pom.xml` in the `application` folder:
```xml
<dependency>
    <groupId>com.sap.conn.jco</groupId>
    <artifactId>com.sap.conn.jco.sapjco3</artifactId>
    <version>${sapjco-version}</version>
</dependency>
```
:::tip 
Replace the placeholder `${sapjco-version}` with the JCo version you downloaded.
:::

#### Add JCo Library to System Path
- Add the directory which contains the downloaded JCo archive to the system environment variable `Path`.

#### Create a Destination
- Create a file `<destination-name>.jcoDestination` where you replace `<destination-name>` with the name of the destination.
- Add the following properties to the file:
```
jco.client.ashost=<hostname>
jco.client.client=<sap-client>
jco.client.sysnr=<instance-number>
jco.client.user=<user>
jco.client.passwd=<password>
```
:::tip
Replace every `<placeholder>` with the respective value.
:::

#### Point JCo to your Destination
JCo considers the system property `jco.destinations.dir` to look for destination files. The property value must be the directory where the destination file resides.

You can set the property in your Java code like so:
```java
System.setProperty("jco.destinations.dir", "here-comes-the-directory-with-destination");
```
Alternatively, you can pass the system property to the JVM via the Maven plugin configuration.
```xml
<plugin>
    <groupId>org.apache.tomee.maven</groupId>
    <artifactId>tomee-maven-plugin</artifactId>
    <configuration>
        <args>-Djco.destinations.dir=here-comes-the-directory-with-the-destination</args>
...
```
