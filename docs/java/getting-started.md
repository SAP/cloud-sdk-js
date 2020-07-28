---
id: getting-started
title: Getting started - SDK for Java
hide_title: false
hide_table_of_contents: false
sidebar_label: Getting started
description: Get up to speed with SAP Cloud SDK for Java in no time
keywords:
- sap
- cloud
- sdk
- cloud native
- cloud sdk
- sap cloud sdk
image:
---
import MvnBadge from '../../src/sap/sdk-java/MvnBadge'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<MvnBadge />

To get started with the SAP Cloud SDK for Java you can either create a new project or integrate the SDK into your existing one.

To start of with a clean, new project you can select [one of our archetypes](https://search.maven.org/artifact/com.sap.cloud.sdk.archetypes/archetypes-parent) and build upon it. Alternatively you can follow [these instructions](#integrate-the-cloud-sdk-for-java-into-your-project) to integrate the SDK into your existing setup.

## Generating a project from a maven Archetype ##


<Tabs groupId="frameworks" defaultValue="spring" values={[
{ label: 'Spring', value: 'spring', },
{ label: 'TomEE', value: 'tomee', }]}>

The SDK provides archetypes based on Spring and TomEE, so select whatever suits you best.
To generate your project from a `maven` archetype you have to provide:

- `groupId` - usually serves as your organization identifier, i.e. `foo.bar.cloud.app`
- `artifactId` - it's your application's name, i.e. `mydreamapp`
- `version` - we recommend keeping `1.0-SNAPSHOT` if you're just starting
- `package` - by default this equals to `groupId`. Change it only if you know what you're doing

Now run:

<TabItem value="spring">

```bash
mvn archetype:generate "-DarchetypeGroupId=com.sap.cloud.sdk.archetypes" "-DarchetypeArtifactId=scp-cf-spring" "-DarchetypeVersion=RELEASE"
```

</TabItem>
<TabItem value="tomee">

```bash
mvn archetype:generate "-DarchetypeGroupId=com.sap.cloud.sdk.archetypes" "-DarchetypeArtifactId=scp-cf-tomee" "-DarchetypeVersion=RELEASE"
```

</TabItem>
</Tabs>

After providing all the interactive values to the CLI it will generate you first Cloud SDK application

```bash
[INFO] Scanning for projects...
[INFO]
[INFO] ------------------< org.apache.maven:standalone-pom >-------------------
[INFO] Building Maven Stub Project (No POM) 1
[INFO] --------------------------------[ pom ]---------------------------------
[INFO]
[INFO] >>> maven-archetype-plugin:3.1.2:generate (default-cli) > generate-sources @ standalone-pom >>>
[INFO]
[INFO] <<< maven-archetype-plugin:3.1.2:generate (default-cli) < generate-sources @ standalone-pom <<<
[INFO]
[INFO]
[INFO] --- maven-archetype-plugin:3.1.2:generate (default-cli) @ standalone-pom ---
[INFO] Generating project in Interactive mode
[INFO] ....
[INFO] ....
Define value for property 'groupId': foo.bar.cloud.app
Define value for property 'artifactId' (should match expression '[^_]+'): mydreamapp
[INFO] Using property: artifactId = mydreamapp
Define value for property 'version' 1.0-SNAPSHOT: :
Define value for property 'package' foo.bar.cloud.app: :
[INFO] Using property: gitignore = .gitignore
[INFO] Using property: skipUsageAnalytics = false
Confirm properties configuration:
groupId: foo.bar.cloud.app
artifactId: mydreamapp
artifactId: mydreamapp
version: 1.0-SNAPSHOT
package: foo.bar.cloud.app
gitignore: .gitignore
skipUsageAnalytics: false
 Y: :
[INFO] ----------------------------------------------------------------------------
[INFO] Using following parameters for creating project from Archetype: scp-cf-tomee:RELEASE
[INFO] ----------------------------------------------------------------------------
[INFO] Parameter: groupId, Value: foo.bar.cloud.app
[INFO] Parameter: artifactId, Value: mydreamapp
[INFO] Parameter: version, Value: 1.0-SNAPSHOT
[INFO] Parameter: package, Value: foo.bar.cloud.app
[INFO] Parameter: packageInPathFormat, Value: foo/bar/cloud/app
[INFO] Parameter: package, Value: foo.bar.cloud.app
[INFO] Parameter: version, Value: 1.0-SNAPSHOT
[INFO] Parameter: groupId, Value: foo.bar.cloud.app
[INFO] Parameter: skipUsageAnalytics, Value: false
[INFO] Parameter: gitignore, Value: .gitignore
[INFO] Parameter: artifactId, Value: mydreamapp
[INFO] Project created from Archetype in dir: /home/i531196/dev/temp/mydreamapp
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  02:28 min
[INFO] Finished at: 2020-04-19T19:25:33+02:00
[INFO] ------------------------------------------------------------------------
```

Change to you `mydreamapp` root directory by:
```bash
cd mydreamapp/

ls
application  cx-server  integration-tests  Jenkinsfile  manifest.yml  pom.xml  unit-tests

```

**Congratulations! You've just configured your application with Cloud SDK for Java.**

## Integrate the Cloud SDK for Java into your Project

To get started include the _SDK BOM_ in the _dependency management_ of your project:

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>com.sap.cloud.sdk</groupId>
            <artifactId>sdk-bom</artifactId>
            <version>use-latest-version-here</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>        
</dependencyManagement>
```

If your application is running on SAP Cloud Platform please also include either:

```xml
<dependency>
    <groupId>com.sap.cloud.sdk.cloudplatform</groupId>
    <artifactId>scp-cf</artifactId>
</dependency>
```

or:

```xml
<dependency>
    <groupId>com.sap.cloud.sdk.cloudplatform</groupId>
    <artifactId>scp-neo</artifactId>
</dependency>
```

If you want to connect to an S/4HANA system via the OData protocol you should also add a dependency to the client library of the SDK:

```xml
<dependency>
    <groupId>com.sap.cloud.sdk.s4hana</groupId>
    <artifactId>s4hana-all</artifactId>
</dependency>
```

Last but not least we recommend that you include the following plugin:

```xml
<plugin>
    <groupId>com.sap.cloud.sdk.plugins</groupId>
    <artifactId>usage-analytics-maven-plugin</artifactId>
    <version>use-latest-version-here</version>
    <executions>
        <execution>
            <goals>
                <goal>usage-analytics</goal>
            </goals>
            <configuration>
                <skipUsageAnalytics>false</skipUsageAnalytics>
                <generateSalt>true</generateSalt>
            </configuration>
        </execution>
    </executions>
</plugin>
```

It sends _[anonymized usage data](https://blogs.sap.com/2018/10/23/usage-analytics-s4sdk/)_ such as the SDK version used and helps us with improving the SDK.
Furthermore the plugin is capable of generating a report with useful information about the project setup. 
Invoking `diagnosis-report` will print out the SDK modules used and their version but also other information like the Java and Maven version.
This is helpful when you are facing an issue and are reaching out to us for help.

### Framework integration

In general, the Cloud SDK for Java integrates natively into the [Spring Boot](https://spring.io/projects/spring-boot) and [TomEE](https://tomee.apache.org/) frameworks.

In particular the [SDK provides listeners](features/multi-tenancy/thread-context.md) that can extract tenant and principal information from an incoming request. To ensure these listeners are present please configure your project accordingly.

<Tabs groupId="frameworks" defaultValue="spring" values={[
{ label: 'Spring', value: 'spring', },
{ label: 'TomEE', value: 'tomee', }]}>

<TabItem value="spring">

For a Spring based project please ensure that the application is annotated to scan for components of the SDK:

```java
@ComponentScan({"com.sap.cloud.sdk", "your.own.package"})
@ServletComponentScan({"com.sap.cloud.sdk", "your.own.package"})
```

Check the logs on application startup to ensure the listeners got registered. Also please check [the Spring version](https://mvnrepository.com/artifact/com.sap.cloud.sdk/sdk-bom/latest) declared in the SDK BOM doesn't clash with your version of Spring.

</TabItem>
<TabItem value="tomee">

For a TomEE based project the filters should be registered automatically. They are part of the `servlet` module which comes into the dependency tree through `scp-cf` or `scp-neo` automatically. Check the logs on application startup to ensure the listeners are being registered.

</TabItem>
</Tabs>


## Next steps ##
- [Configure you IDE](../guides/recommended-ide )
- [Get and bind SAP Cloud Foundry CLI](../guides/cf-cli )
- [Check tutorials for Cloud SDK for Java](https://developers.sap.com/tutorial-navigator.html?tag=products:technology-platform/sap-cloud-sdk/sap-cloud-sdk&tag=topic:java )
- Check out key **Features** and **Guides** sections
- Review [JavaDoc](api-documentation )
- Check [what's new](../../overview/what-is-new ) and [release notes](https://help.sap.com/doc/6c02295dfa8f47cf9c08a19f2e172901/1.0/en-US/index.html )
