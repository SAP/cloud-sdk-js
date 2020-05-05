---
id: logging-overview
title: Logging with the SAP Cloud SDK for Java
hide_title: false
hide_table_of_contents: false
sidebar_label: Logging Overview
description: This document will give you an overview of the different ways to log information with your application.
---

There are three kinds of event logs the SAP Cloud SDK supports you with: Audit, Business, and Application Logging.

This document aims to give you an overview of what the differences between them are, when to use what, and how the SAP Cloud SDK supports you in leveraging them.

## Audit Logging

> Systems handling confidential data such as personal or financial information are often faced with additional audit requirements. In these cases, your logging needs should be reflected in a corresponding security concept. In some business areas, it is even required by law to log _who_ accessed or modified _what_ data and _when_. To make the application development experience delightful, the SDK provides AuditLogger which acts as an abstraction layer from the underlying cloud platform implementation (SCP Neo or Cloud Foundry).

[//]: # (Adopt remaining documentation from the blog post, probably testing the code snippets again)
For further details refer to this [blog post](https://blogs.sap.com/2017/09/19/logging-on-sap-s4hana-cloud-sdk/).

## Business Logging

> Business Logging is a Cloud business reuse service that records your cloud application’s business flow. It runs on Cloud Foundry – on SAP Cloud Platform.
>
> This service logs one or more records with success, information, warning, and error types within a message, depending on your business needs.
>
> The Business Logging service is primarily intended for use by process specialists who oversee the end-to-end business flow of Cloud applications. Our tenancy-aware logging service enables process specialists to troubleshoot errors and learn what went wrong or even review successes and see what went right.

[//]: # (Probably check back with Swati Nair from BusinessLogging whether this is okay. Also: probably provide some tested code snippets in here)
For further details refer to this [blog post](https://blogs.sap.com/2019/05/24/an-introduction-to-business-logging/).

## Application Logging

Whereas the previous logging types have business specific target groups (so people more or less actively working with the application), the application logging is directed at the application developers.
With these logs the developer should be able to understand how the system behaves and, in case of failures, why the system failed.

[//]: # (Add some points of the history of logging in Java)

[//]: # (Add a section on what SLF4J is)

### Set your Application log level

If you want to configure the log level of your application you have to know, which logging implementation your application uses.
Some libraries then allow you different ways on how to configure them.

For more detailed information on your specific setup, please refer to the documentation of your logging implementation.

The following tries to give a quick starting point for varying setups.

#### SAP Cloud SDK TomEE Archetype (Locally)

If you want to set the debug levels for your local running application (so when using the `mvn tomee:run` command) you have to configure the Logback library via the configuration file.

In the directory `src/main/resources` of your `application` module you'll find the file called `logback.xml`.
This is the configuration file for the Logback library.
To understand how Logback detects this file have a look at [their documentation](http://logback.qos.ch/manual/configuration.html#auto_configuration).

In this configuration file you will find a block like this:

```xml
<root level="INFO">
    <appender-ref ref="STDOUT"/>
</root>
```

This basically tells logback to log all messages with level `INFO` and higher to an appender with the reference `STDOUT`.
Valid values for the `level` property are: `TRACE`, `DEBUG`, `INFO`, `WARN`, and `ERROR`.
So, if you want to log all packages with level `DEBUG`, for example, you could set it the following way:

```xml
<root level="DEBUG">
    <appender-ref ref="STDOUT"/>
</root>
```

However, usually you want to set the logging level for certain packages (or classes) only.
For this you would add the following line to your `logback.xml`:

```xml
<logger name="package.to.log" level="INFO" />
```

So, in the case that you want to log all requests sent and responses received by the Apache HttpClient in your application locally you would have the following configuration block:

```xml
<logger name="org.apache.http" level="DEBUG" />
<logger name="org.apache.http.wire" level="ERROR" />
<root level="INFO">
    <appender-ref ref="STDOUT"/>
</root>
```

#### SAP Cloud SDK TomEE Archetype (Cloud Foundry)

If you want to set the debug levels of your application running on Cloud Foundry (using the SAP Java Buildpack) you have to set the `SET_LOGGING_LEVEL`.
This allows you to also change the log level at runtime, as we will see further down in this section.

To set the environment variable with every start of the application it is advised to use the `manifest.yml` file (found in the root of your project).
This file would then look something like this:

```yaml
---
applications:

- name: <your-application>
  some-properties: <some-values>
  env:
    OTHER_ENVIRONMENT_VARIABLE: 'and their values'
    SET_LOGGING_LEVEL: '{ROOT: INFO, com.sap.cloud.sdk: INFO, package.to.log: DEBUG}'
```

So, in the case that you want to log all requests sent and responses received by the Apache HttpClient in your application on Cloud Foundry you would set `SET_LOGGING_LEVEL` to the following value:

```bash
{ROOT: INFO, com.sap.cloud.sdk: INFO, org.apache.http: DEBUG, org.apache.http.wire: ERROR}
```

As mentioned earlier, it's possible to set environment variable via the Cloud Foundry CLI.
The SAP Java BuildPack should then be able to pickup these changes and propagate them to your application.

So, assuming that you have the initial configuration shown above and you want to start logging the Apache HttpClient, you would now issue the following command on your command line:

```bash
 cf set-env logging-documentation SET_LOGGING_LEVEL '{ROOT: INFO, com.sap.cloud.sdk: INFO, org.apache.http: DEBUG, org.apache.http.wire: ERROR}'
```

Don't forget to change the environment variable back to the previous state.
In this example case the command would be the following:

```bash
cf set-env logging-documentation SET_LOGGING_LEVEL '{ROOT: INFO, com.sap.cloud.sdk: INFO}'
```

[//]: # (Think of further usage scenarios. Spring? CAP?)

### Further Reading

- How to use SLF4J with "legacy" logging frameworks: <http://www.slf4j.org/legacy.html>
- Debug Logging of the Apache HttpClient: <https://hc.apache.org/httpcomponents-client-4.5.x/logging.html>
