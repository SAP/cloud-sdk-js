---
id: generate-odata-v4-client-with-cloud-sdk-for-java-how-to
title: OData V4 client for Java
hide_title: false
hide_table_of_contents: false
sidebar_label: Generate Odata V4 client
description: You'll learn how to convert your service definition into a Java project containing type-safe Odata V4 lient to consume it
keywords:
- sap
- cloud
- sdk
- cloud native
- cloud sdk
- sap cloud sdk
---

## OData v4 Generator & Client
This document outlines the necessary steps to:
1. Generate a VDM for an OData v4 service based on an EDMX file
2. Use the VDM to perform OData requests against that service

The OData v4 implementation is currently in beta. Not all functionality is available in that state and the APIs are subject to change.

The functionality is internally available as of version `3.13.0`. The following steps assume that your dependency management includes the following dependency:

```XML
<dependency>
    <groupId>com.sap.cloud.sdk</groupId>
    <artifactId>sdk-bom</artifactId>
    <version>3.13.0</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>
```

## Steps for generating the VDM

The VDM generation can be performed using either of the following options:
1. Using the cli
2. Invoke the generator programmatically
3. Using the maven plugin

### Using the cli
1. Download the command line interface (cli) of the generator from [internal nexus](http://nexus.wdf.sap.corp:8081/nexus/) (search for `odata-v4-generator-cli`), rename it to `odata-v4-generator-cli.jar` and put it in a folder of your choice.

2. Run `java -jar odata-v4-generator-cli.jar -i /path/to/input/folder -o /path/to/output/folder`.You can also specify the parameter `-p "my.package.name"` to choose the package name and `-b "/my/path"` to choose the base path.

3. Wait for the generator to finish with a success message.

4. Put the generated Java source files from the output folder into your project that is using the SAP Cloud SDK so that they are picked up by Java. For example, move them to the `application/src/main/java` folder.

5. Add the `lombok` dependency in your `application/pom.xml` file:
    ```xml
        <dependency>
           <groupId>org.projectlombok</groupId>
           <artifactId>lombok</artifactId>
           <scope>provided</scope>
        </dependency>
    ```
    The generated classes can now be used to build OData requests.

### Invoke the generator programmatically
1.  Please include the odata-v4-generator artifact as a dependency in a your project. Choose a module and location from which you intend to invoke the generator and add the following dependency to the appropriate `pom.xml`.
    ```XML
     <dependency>
        <groupId>com.sap.cloud.sdk.datamodel</groupId>
        <artifactId>odata-v4-generator</artifactId>
      </dependency>
    ```

2. Copy the following code which will later invoke the generator:
    ```Java
    final Path inputDirectory = Paths.get("application/src/main/resources/");
    final Path outputDirectory = Paths.get("application/src/main/java/");
    final Path serviceNameMapping = inputDirectory.resolve("serviceNameMappings.properties");

    new DataModelGenerator()
        .withInputDirectory(inputDirectory.toFile())
        .withOutputDirectory(outputDirectory.toFile())
        .withServiceNameMapping(serviceNameMapping.toFile())
        .pojosOnly(false)
        .withNameSource(DefaultNamingStrategy.NameSource.NAME)
        .withPackageName("org.example")
        .withDefaultBasePath("/my/path/")
        .execute();
    ```
3. Adapt the input & output directory as well as the package name according to your setup. For the module that the output directory is located in, make sure that you include `lombok` as a provided dependency:
    ```XML
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <scope>provided</scope>
    </dependency>
    ```
4. Place your EDMX file within the input folder and run the generator.

This should give you the generated classes in the desired folder. You can now proceed with using them to build requests.

In case you run into issues with the above process: Double check your service and file names, check that the folders are setup correctly and that the service name mappings meet your expectations.

### Using the maven plugin
1. Create an edmx folder inside your application folder and place your service EDMX file inside this.

2. Update your `application/pom.xml` file by adding generator plugin under the `<build>` `<plugin>` section. Please note that if you use the generator for services other then SAP S/4HANA services, you need to add the parameter defaultBasePath to the configuration section, which should provide the base path to the exposed API (e.g odata/v4/).
    ```XML
    <plugin>
        <groupId>com.sap.cloud.sdk.datamodel</groupId>
        <artifactId>odata-v4-generator-maven-plugin</artifactId>
        <!-- Please use the latest version here-->
        <version>3.13.1-SNAPSHOT</version>
        <executions>
            <execution>
                <id>generate-consumption</id>
                <phase>generate-sources</phase>
                <goals>
                    <goal>generate</goal>
                </goals>
                <configuration>
                    <inputDirectory>${project.basedir}/edmx</inputDirectory>
                    <outputDirectory>${project.build.directory}/vdm</outputDirectory>
                    <deleteOutputDirectory>true</deleteOutputDirectory>
                    <packageName>com.mycompany.vdm</packageName>
                    <defaultBasePath>odata/v4/</defaultBasePath>
                </configuration>
            </execution>
        </executions>
    </plugin>
    ```

3. Use the following parameters to configure the generator:

    |   Parameter Value |   Explanation |
    |-------------------|---------------|
    |<inputDirectory>${project.basedir}/edmx</inputDirectory>|Location of the metadata .edmx file.
    |<outputDirectory>${project.build.directory}/vdm</outputDirectory>|Location of the output directory for generated sources.
    |<deleteOutputDirectory>true</deleteOutputDirectory>|Target directory is deleted before every execution of the generator
    |<packageName>com.mycompany.vdm</packageName>|Package name for the generated sources
    |<defaultBasePath>odata/v4/</defaultBasePath>|Base path of the exposed API

4. Additionally, also add the following plugin to specify that the VDM target folder should be considered as a source folder by maven:
    ```XML
    <plugin>
        <groupId>org.codehaus.mojo</groupId>
        <artifactId>build-helper-maven-plugin</artifactId>
        <version>3.0.0</version>
        <executions>
            <execution>
                <phase>generate-sources</phase>
                <goals>
                    <goal>add-source</goal>
                </goals>
                <configuration>
                    <sources>
                        <source>${project.build.directory}/vdm</source>
                    </sources>
                </configuration>
            </execution>
        </executions>
    </plugin>
    ```
5. As lombok and dependency injections are used by the generated VDM classes, we also add the following dependencies if they are not included into the project yet:
    ```XML
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <scope>provided</scope>
    </dependency>
    <dependency>
        <groupId>javax.inject</groupId>
        <artifactId>javax.inject</artifactId>
        <scope>provided</scope>
    </dependency>
    ```
6. Run the maven command `maven clean install` to build the project. This would also trigger the VDM sources generation.

7. After the generation and the build is through, you can find the generated files in the `<outputDirectory>..</outputDirectory>` folder you specified in the maven-plugin configuration.

## Steps for using the VDM

### Building up requests

The below example demonstrates how the VDM would be used. If you are familiar with some of the VDMs for existing S4/HANA services you will find the following code very much familiar:

```Java
private static final HttpDestination destination = DefaultHttpDestination.builder("https://my.service.url").build();
private static final MyService service = new DefaultMyService().withServicePath("/my/base/path");

@Test
public void testGetAll() {
    service.getAllItem()
            .select(Item.ID,
                    Item.DESCRIPTION,
                    Item.TO_SUB_ITEMS
                            .select(SubItem.DESCRIPTION))
            .filter(Item.ID.lessThan(10), Item.DESCRIPTION.length().greaterThan(20))
            .top(5)
            .skip(5)
            .execute(destination);
}
```

In summary we generated service and datamodel classes. The service classes expose the methods that the service API offers and the datamodel classes are used to provide type safe access to those APIs.

### Using OData v4 features in queries

The VDM offers a fluent API so you can discover the service API through the VDM.

Below are a few more examples that were build for one of the [OData reference services](https://www.odata.org/odata-services/).

Assuming that `destination` points towards the `TripPin` reference service the following requests could be performed:
* To fetch all Persons:
  ```java
  final List<Persons> persons = new DefaultPersonService().getPersons().execute(destination);
  ```
* To fetch a paticular person by key:
    ```java
    final Person person = new DefaultPersonService().getPersonsByKey("userName").execute(destination);
    ```
* Using `select` and `filter` query options:
    ```java
    final List<Persons> personList = new DefaultPersonService()
        .getPersons()
        .select(Person.GENDER, Person.USER_NAME)
        .select(Person.TRIPS.select(Trip.NAME),
            Person.FRIENDS.top(2).skip(1))
        .filter(Person.EMAILS.contains(Collections.singletonList("ASD")))
        .execute(destination);
    ```
  The above query also shows how to perform nested operations on navigation properties `Person.TRIPS` and `Person.FRIENDS`.
  This is a new functionality introduced as part of supporting OData v4. In addition we aslo see new type-sensitive filter expressions on entity fields.

### Handling and debugging failures

Sometimes requests fail and the SDK provides a flexible way to deal with such failures on multiple levels. All `execute` methods may throw a runtime exception (extending) `ODataException`. This will always contain the request which was (attempted to be) sent out as well as the cause of the exception. To handle all kind of failures consider the following code:

```java
try { ... }
 catch( final ODataException e ) {
    logger.error("Failed to execute OData query.", e);
    ODataQueryGeneric query = e.getQuery();
    logger.debug("The following query failed: {}", query);
    // do something else
}
```

This handling is very generic and does not really give a lot of information, except for the request that was (to be) sent out. For more specific information there are dedicated exceptions. Please tend to the documentation of `ODataException` for all the exception types. The following code presents one example which deals with the case that the OData service responded with an HTTP status code indicating an error:

 ```java
try { ... }
catch( final ODataServiceException e ) {
    // ODataQueryGeneric query = e.getQuery();
    int httpCode = e.getHttpCode();
    Header[] httpHeaders = e.getHttpHeaders():
    // react based on the response code
 }
 ```

Finally, the OData service might also include an OData error in the payload of the response:

```java
    try { ... }
    catch( ODataErrorResponseException e ) {
      // ODataQueryGeneric query = e.getQuery();
      // int httpCode = e.getHttpCode();
      // Header[] httpHeaders = e.getHttpHeaders():
      String oDataCode = e.getError().getODataCode();
      String oDataMessage = e.getError().getODataMessage();
      String target = e.getError().getTarget();
      List<ODataServiceError> details = e.getError().getDetails();
      Map<String, Object> innerError = e.getError().getInnerError();
    }
```

You can also list multiple catch clauses to cover different levels or cases that might occur, e.g.:

```java
try { ... }
catch( ODataErrorResponseException e ) {
    // ...
} catch( ODataRequestException e ) {
    // ...
} catch( ODataDeserializationException e ) {
    // ...
}
```

Note that instead of applying `try/catch` you can also make use of `tryExecute` on the request builders.


## The following features are not yet supported in the implementation of the OData v4 standard:
* Error handling for failed OData requests
* Complex Type properties are not available in query builders
* Order By parameter must be set manually
* Functions & Actions are both unavailable
* Batch Requests are not available
* Media entities are not available
* Stream properties are not available
