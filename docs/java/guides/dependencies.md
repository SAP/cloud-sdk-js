---
id: manage-dependencies
title: Managing Dependencies
hide_title: false
hide_table_of_contents: false
sidebar_label: Dependency Management
description: How to manage dependencies, detect and resolve conflicts 
keywords:
- sap
- cloud
- sdk
- cloud native
- cloud sdk
- dependency
- dependency conflicts
- manage dependencies
- how-to
image:
---

## General Information

The SAP Cloud SDK for Java is a set of libraries that itself depend on other libraries.
To manage these relationships it relies on the [dependency management functionality](https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html) of [Maven](https://maven.apache.org/index.html).

This article provides guidance on how to manage dependencies to the Cloud SDK for Java specifically.
For general information on how to deal with dependencies refer to the resources linked above and throughout this page.

### The SDK Bill of Material

The SDK provides a [Bill of Material](https://dzone.com/articles/the-bill-of-materials-in-maven).
It comprises all dependencies and their specific version that the SDK relies upon.

It can be used in the dependency management as follows:

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

It helps in various ways:
- minimizing the effort for updating SDK versions
- ensuring all SDK components are used consistently with the same version
- compatibility with some other key SAP libraries or frameworks like [XSUAA](https://github.com/SAP/cloud-security-xsuaa-integration) and [CAP](https://cap.cloud.sap/docs/).
- avoiding some potential dependency conflicts
- checking which components & their respective version the SDK depends upon

For these reasons we highly recommend using the `sdk-bom` in your project.

## Dealing with Dependency Conflicts

When using multiple libraries you will probably run into conflicts at some point.
This lies in the nature of how dependencies work.
If you are using two libraries `A` and `B` where both depend on a different version of `C` you encounter a conflict.

This conflict can only be solved by you as the consumer be explicitly stating which version of `C` should be used.

[This guide](https://dzone.com/articles/solving-dependency-conflicts-in-maven) outlines this problem in more detail and provides general guidance on how to find and resolve such problems.

### Updating the SDK Version

You may run into dependency related problems when updating SDK versions since it's dependencies are frequently updated.
Here are some recommendations from our experience that should help mitigating any problems:

We recommend increasing the SDK version in a dedicated change e.g. a pull request.
- This isolates the change and makes finding problems easier.

Look out for `MethodNotFound` and `ClassDefNotFound` exceptions.
- They are very typical when a library is provided with an unexpected version.

Check out our [release notes](../release-notes.md).
- Under improvements you will see all dependency changes.

Use `mvn dependency:tree` to analyze the dependency tree.
- It shows where dependencies are used and in which version.

Google the error message.
- Usually you will at least get an idea which library is causing the problems.

Update the SDK version frequently.
- This mitigates the risk per update and ensures you are up to date.

### Overriding Dependency Versions of the SDK BOM

Sometimes you may want to override the version of a specific dependency the SDK is using.
You can achieve this by listing it in the dependency management _before the SDK BOM_.

For example to override the version of SLF4J:
```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>your-slf4j-version</version>
        </dependency>
        <dependency>
            <groupId>com.sap.cloud.sdk</groupId>
            <artifactId>sdk-bom</artifactId>
            <version>latest-sdk-version</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

:::note
Remember that including a dependency in the `<dependencyManagement>` section only enforces its version.
It does not yet include it as a dependency into your project.
:::
