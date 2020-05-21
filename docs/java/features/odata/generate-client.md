---
id: java-generate-odata-vmd-v2-v4
title: OData VDM Generator for Java
hide_title: false
hide_table_of_contents: false
sidebar_label: Generate a VDM for OData
description: This article describes how to leverage the OData Generator to obtain Java classes from a service definition. These classes can then be used to build type-safe OData requests.
keywords:
- sap
- cloud
- sdk
- odata
- java
- VDM
- generate
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Generate a Virtual Data Model with the OData Generator ##

The OData Generator allows for generating Java classes from the metadata of an OData service. These classes which are referred to as Virtual Data Model (VDM) provide type-safe access to the service.

In general there are three ways to use the generator:
- Via the dedicated maven plugin
- Via the CLI
- By instantiating and invoking it at runtime

The maven plugin is usually the recommended way as it integrates nicely with most project setups and makes configuration easy. However, the other two approaches are available and all are documented below.

For all three the required input is an `EDMX` file holding the service metadata.

:::note
Please be aware that OData v2 and OData v4 service definitions are not interchangeable. There is a dedicated generator for each protocol version and it only accepts service definitions for that version.
:::

## Using the OData Generator ##

Regardless of how the generator is invoked the generated code requires some dependencies to be present. Therefore it is required to ensure the following dependencies are present in your project:

<Tabs 
groupId="odataVersion"
defaultValue="v4" values={[
{ label: 'OData v2', value: 'v2', },
{ label: 'OData v4', value: 'v4', }]}>
<TabItem value="v4">

```xml
<dependency>
    <groupId>com.sap.cloud.sdk.datamodel</groupId>
    <artifactId>odata-v4-core</artifactId>
</dependency>
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

</TabItem>
<TabItem value="v2">

```xml
<dependency>
    <groupId>com.sap.cloud.sdk.datamodel</groupId>
    <artifactId>odata-core</artifactId>
</dependency>
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

</TabItem>
</Tabs>

Lombok and dependency injections are used by the generated VDM classes, that is why they are needed but only with the scope _provided_.


### Using the OData Generator Maven Plugin ###

<Tabs
groupId="odataVersion"
defaultValue="v4" values={[
{ label: 'OData v2', value: 'v2', },
{ label: 'OData v4', value: 'v4', }]}>

<TabItem value="v4">

1. Update your `application/pom.xml` file by adding the generator plugin under the `<plugin>` section.

    ```xml
    <plugin>
        <groupId>com.sap.cloud.sdk.datamodel</groupId>
        <artifactId>odata-v4-generator-maven-plugin</artifactId>
        <!-- Please use the latest version here-->
        <version>3.18.0</version>
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

</TabItem>
<TabItem value="v2">

1. Update your `application/pom.xml` file by adding the generator plugin under the `<plugin>` section.

    ```xml
    <plugin>
        <groupId>com.sap.cloud.sdk.datamodel</groupId>
        <artifactId>odata-generator-maven-plugin</artifactId>
        <!-- Please use the latest version here-->
        <version>3.18.0</version>
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

</TabItem>
</Tabs>

2. Adapt the `<inputDirectory>` to point to the location of your service definitions. A full list of parameters is [available here](#available-parameters).

1. In case the target directory should be automatically added as a source folder by maven you can leverage the build helper plugin:
    ```xml
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

Now maven will run the generator within the `process-sources` phase which is executed before compile.

:::note
Please note that if you use the generator for services other than SAP S/4HANA services, you need to add the parameter `defaultBasePath` to the configuration section, which should provide the base path to the exposed API (e.g _odata/v4/_).
:::

### Using the CLI

<Tabs 
groupId="odataVersion"
defaultValue="v4" values={[
{ label: 'OData v2', value: 'v2', },
{ label: 'OData v4', value: 'v4', }]}>
<TabItem value="v4">

1. Download the latest command line interface (CLI) of the generator from [maven central](https://search.maven.org/artifact/com.sap.cloud.sdk.datamodel/odata-v4-generator-cli). Rename it to `odata-generator-cli.jar` and put it in a directory of your choice.

</TabItem>
<TabItem value="v2">

1. Download the latest command line interface (CLI) of the generator from [maven central](https://search.maven.org/artifact/com.sap.cloud.sdk.datamodel/odata-generator-cli). Rename it to `odata-generator-cli.jar` and put it in a directory of your choice.

</TabItem>
</Tabs>

1. Run `java -jar odata-generator-cli.jar -i /path/to/input/folder -o /path/to/output/folder`. You can also specify the parameter `-p "my.package.name"` to choose the package name and `-b "/my/path"` to choose the base path. A full list of parameters is [available here](#available-parameters).

1. Put the generated Java source files from the output folder into your project that is using the SAP Cloud SDK so that they are picked up by Java. For example, move them to the `application/src/main/java` folder.


### Invoke the generator programmatically

<Tabs
groupId="odataVersion"
defaultValue="v4" values={[
{ label: 'OData v2', value: 'v2', },
{ label: 'OData v4', value: 'v4', }]}>
<TabItem value="v4">

1.  Please include the `odata-v4-generator` artifact as a dependency in a your project. Choose a module and location from which you intend to invoke the generator and add the following dependency to the appropriate `pom.xml`.
    ```xml
     <dependency>
        <groupId>com.sap.cloud.sdk.datamodel</groupId>
        <artifactId>odata-v4-generator</artifactId>
      </dependency>
    ```

</TabItem>
<TabItem value="v2">

1.  Please include the `odata-generator` artifact as a dependency in a your project. Choose a module and location from which you intend to invoke the generator and add the following dependency to the appropriate `pom.xml`.
    ```xml
     <dependency>
        <groupId>com.sap.cloud.sdk.datamodel</groupId>
        <artifactId>odata-generator</artifactId>
      </dependency>
    ```

</TabItem>
</Tabs>

2. Copy the following code which will later invoke the generator:

    ```java
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

3. Adapt the input & output directory as well as the package name according to your setup. A full list of parameters is [available here](#available-parameters). Place your EDMX file within the input folder and run the generator.

This should give you the generated classes in the desired folder. You can now proceed with using them to build requests.

In case you run into issues with the above process: Double check your service and file names, check that the folders are setup correctly and that the service name mappings meet your expectations.

## Available Parameters

The following parameters are available on the generator for both OData protocol versions:

<Tabs defaultValue="maven" values={[
{ label: 'Maven Plugin', value: 'maven', },
{ label: 'CLI', value: 'cli', },
{ label: 'Java', value: 'java', }]}>
<TabItem value="maven">

|   Parameter       | Default |   Description |
|:------------------|:-------:|:--------------|
|`<deleteOutputDirectory>`| `False` | Target directory is deleted before code generation |
|`<defaultBasePath>`| - | Base path of the exposed API |
|`<includeEntitySets>`| - | Only generate classes for specific entity sets |
|`<includeFunctionImports>`| - | Only generate classes for specific function imports |
|`<inputDirectory>`| `input` | Location of the metadata files |
|`<namingStrategy>`| - <!--`com.sap.cloud.sdk.datamodel.odata.generator.DefaultNamingStrategy`--> | Fully-qualified Java class to be used as the naming strategy |
|`<outputDirectory>`| `output` | Output directory for generated sources |
|`<overwriteFiles>`| `False` | Overwrite existing files |
|`<packageName>`| - <!-- `com.sap.cloud.sdk.s4hana.datamodel.odata` --> | Package name for the generated sources |
|`<serviceNameMappingFile>`| - <!--`serviceNameMappings.properties`--> | Determine service names from a given mapping file |

More information is also available in the Javadoc of the generator implementation ([OData v2](https://help.sap.com/doc/b579bf8578954412aea2b458e8452201/1.0/en-US/index.html?com/sap/cloud/sdk/datamodel/odata/generator/DataModelGenerator.html), [OData v4](https://help.sap.com/doc/b579bf8578954412aea2b458e8452201/1.0/en-US/index.html?com/sap/cloud/sdk/datamodel/odatav4/generator/DataModelGenerator.html)).

</TabItem>
<TabItem value="cli">

|   Parameter       | Alias | Default |   Description |
|:------------------|:-----:|:----  -:|:--------------|
|`--default-base-path <arg>`|`-b`| - | Base path of the exposed API |
|`--delete-output-dir`|`-d`| `False` | Target directory is deleted before code generation |
|`--help`|`-h`| - | Print a help message. |
|`--input-dir <arg>`|`-i`| `input` | Location of the metadata files |
|`--include-entity-sets <arg>`|`-ies`| - | Only generate classes for specific entity sets |
|`--include-function-imports <arg>`|`-ifn`| - | Only generate classes for specific function imports |
|`--name-mapping-file <arg>`|`-m`| - <!--`serviceNameMappings.properties`--> | Determine service names from a given mapping file |
|`--name-strategy-class <arg>`|`-n`| - <!--`com.sap.cloud.sdk.datamodel.odata.generator.DefaultNamingStrategy`--> | Fully-qualified Java class to be used as the naming strategy |
|`--output-dir <arg>`|`-o`| `output` | Output directory for generated sources |
|`--overwrite-files`|`-f`| `False` | Overwrite existing files |
|`--package-name-prefix <arg>`|`-p`| - <!-- `com.sap.cloud.sdk.s4hana.datamodel.odata` --> | Package name for the generated sources |

For details leverage the `--help` option. More information is also available in the Javadoc of the generator implementation ([OData v2](https://help.sap.com/doc/b579bf8578954412aea2b458e8452201/1.0/en-US/index.html?com/sap/cloud/sdk/datamodel/odata/generator/DataModelGenerator.html), [OData v4](https://help.sap.com/doc/b579bf8578954412aea2b458e8452201/1.0/en-US/index.html?com/sap/cloud/sdk/datamodel/odatav4/generator/DataModelGenerator.html)).

</TabItem>
<TabItem value="java">

|   Parameter       | Default |   Description |
|:------------------|:-------:|:--------------|
|`deleteOutputDirectory()`| `False` | Target directory is deleted before code generation |
|`overwriteFiles()`| `False` | Overwrite existing files |
|`withDefaultBasePath(String)`| - | Base path of the exposed API |
|`withIncludedEntitySets(Set<String>)`| - | Only generate classes for specific entity sets |
|`withIncludedFunctionImports(Set<String>)`| - | Only generate classes for specific function imports |
|`withInputDirectory(String)`| `input` | Location of the metadata files |
|`withNamingStrategy(NamingStrategy)`| - <!--`com.sap.cloud.sdk.datamodel.odata.generator.DefaultNamingStrategy`--> | Fully-qualified Java class to be used as the naming strategy |
|`withOutputDirectory(String)`| `output` | Output directory for generated sources |
|`withPackageName(String)`| - <!-- `com.sap.cloud.sdk.s4hana.datamodel.odata` --> | Package name for the generated sources |
|`withServiceNameMapping(String)`| - <!--`serviceNameMappings.properties`--> | Determine service names from a given mapping file |

More details can be found on the Javadoc ([OData v2](https://help.sap.com/doc/b579bf8578954412aea2b458e8452201/1.0/en-US/index.html?com/sap/cloud/sdk/datamodel/odata/generator/DataModelGenerator.html), [OData v4](https://help.sap.com/doc/b579bf8578954412aea2b458e8452201/1.0/en-US/index.html?com/sap/cloud/sdk/datamodel/odatav4/generator/DataModelGenerator.html)).

</TabItem>
</Tabs>
