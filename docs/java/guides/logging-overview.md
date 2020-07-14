---
id: logging-overview
title: Logging with the SAP Cloud SDK for Java
hide_title: false
hide_table_of_contents: false
sidebar_label: Logging
description: This document will give you an overview of the different ways to log information with your application.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This document aims to give you an overview of how you can write events of your application with the standard logging frameworks and how the SAP Cloud SDK integrates with that.
There are three parts to this document:
- How the SDK integrates with logging frameworks
- How to create log entries
- How to configure those entries

To better differentiate between different kinds of logging we will call the type of logs that are usually only relevant for developers to understand why the system behaves the way it did (for example during debugging) as _Application Logging_.
Other types of logs might be kept due to legislative requirements (audit trails or audit logging) or be part of the terms and conditions (business logging).
This document describes how to write and configure _Applications Logs_.

## Logging Overview

For creating log entries the SDK relies on the popular [Simple Logging Facade for Java (SLF4J)](http://www.slf4j.org/).
It serves as an interface to a variety of different logging frameworks (e.g. [Logback](http://logback.qos.ch/), [log4j](https://logging.apache.org/log4j/2.x/)).

That means there are two components involved:

- The _SLF4J API_
  
  The API is used to get a logger instance and create log entries:

  ```java
  Logger logger = LoggerFactory.getLogger(DummyClass.class);
  logger.debug("message");
  ```

- A _logging framework_ which provides the implementation of that API
  
  The framework is then responsible for writing such messages according to a configuration.
  Which configuration options are available depends on the framework.
  Typically one can configure a log level (Error, Warn, Debug, etc.) and the format of messages.

The SDK itself _only_ relies upon the SLF4J API, not on any specific logging framework.
This is good practice because otherwise all consumers would be forced to use the same logging framework that the SDK comes with, rendering the SDK unusable for many use cases.

That means that you have to _provide a logging framework_ in your application.
Otherwise you will not see any log entries the SDK attempts to put out.

:::tip
In case your project is based on one of the SDK archetypes you will already have Logback set up as the logging provider.
:::

### Providing a Logging Framework

In order to provide a logging framework you have to add it to the dependency tree.
Which artifacts are to be added exactly depends on the framework.

To take Logback as an example:

```xml
<dependency>
	<groupId>ch.qos.logback</groupId>
	<artifactId>logback-classic</artifactId>
	<version>latest-logback-version</version>
</dependency>
```

Also (again, depending on the framework) you might have to provide some sort of configuration file.
For our example of Logback we need a `logback.xml` within the `main/resources` directory of our application.

:::tip
When running on SCP CloudFoundry using the SAP Java Buildpack the logging implementation is provided at runtime by the container.
This means, if you only run the application on Cloud Foundry you don't need to provide any implementation.
Still, oftentimes logging is also important for local deployment and testing.
For that providing an implementation is required.
:::

## Writing Log Messages

To start writing your own log entires you also need to specify a dependency to the SLF4J API: `org.slf4j:slf4j-api`.
Depending on the chosen logging implementation you might not _need_ to specify the SLF4J API, but it's in general best practice to not rely on transitive dependencies and therefore reference the SLF4J API anyway.

### Simple SLF4J usage

Having these prerequisite out of the way, you can now start logging:

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DummyClass {
    private static final Logger logger = LoggerFactory.getLogger(DummyClass.class);

    public void doSomething() {
        logger.trace("doSomething was called");
    }
}
```

What do you see in this example?

- In the first line inside the class a new logger is created (once per class), with the class object as a reference. This class name will then be logged alongside the message in the logs.
- Inside the `doSomething` method this logger is now used to log the fact that the given method was called. The method you use for that depends on the level at which you want to see the message. Other options besides `trace` are `debug`, `info`, `warn`, and `error`.

As you can see, no reference to the actual logging implementation can be found in the code. This is the benefit of using SLF4J as a logging facade. This allows you to change the logging implementation without any changes to your application code.

### Advanced SLF4J usage

If you are logging more and more information you might find yourself in cases where you concatenate `String`s or log inside a loop. This might cause unnecessary load on your system if the runtime log level is higher than the messages you actually want to log. To make this more plastic have a look at the following example:

```java
public class DummyClass {
    private static final Logger logger = LoggerFactory.getLogger(DummyClass.class);

    public void doSomething() {
        List<String> someResults = retrieveSomeResults();

        logger.debug("Processing the following results:")
        for(String result : someResult) {
            logger.debug("- " + result);
        }
        consumeResults(someResults)
    }
}
```

Now assume that `someResults` contains hundreds or thousands of entries and the log level at runtime is set to `INFO`. This would mean that the loop is run without actually doing anything.

To prevent this kind of _empty_ loops you can use guards like `logger.isDebugEnabled()` in the following way:

```java
public class DummyClass {
    private static final Logger logger = LoggerFactory.getLogger(DummyClass.class);

    public void doSomething() {
        List<String> someResults = retrieveSomeResults();

        if( logger.isDebugEnabled() ) {
            logger.debug("Processing the following results:")
            for(String result : someResult) {
                logger.debug("- " + result);
            }
        }

        consumeResults(someResults)
    }
}
```

That way the loop is only executed if actually necessary.

## Logging Configuration

Logging frameworks offer different options to configure the behavior of the implementation.
Which options are available and how to configure them highly depends on the framework you are using.

Generally, all frameworks offer some way of configuring:

- The application _log level_
- The output format

Please refer to the documentation of the specific logging implementation you are using for detailed information on what is available and how to apply it.

The _SDK archetypes_ already come with Logback preconfigured as the logging implementation.
The following gives an overview of how to change these configurations and perform essential steps like changing the log level.

### Configuring Logback

General information about configuring Logback can be obtained from [the documentation](http://logback.qos.ch/manual/configuration.html).
This section only explains some basics.

Logback is configured via the configuration file located in the `src/main/resources` directory of your `application` module.
It is named `logback.xml` for TomEE and `logback-spring.xml` for Spring based projects.
To understand how Logback detects this file have a look at [their documentation](http://logback.qos.ch/manual/configuration.html#auto_configuration).

:::danger
This configuration file is not accounted for when running a TomEE based application on SCP Cloud Foundry!
To configure logging on Cloud Foundry refer to the [dedicated section](#on-cloud-foundry) below.
:::

#### Setting Log Levels

In this configuration file you will find a block like this:

```xml
<root level="INFO">
    <appender-ref ref="STDOUT"/>
</root>
```

This basically tells Logback to log all messages with level `INFO` and higher to an appender with the reference `STDOUT`.
Valid values for the `level` property are: `TRACE`, `DEBUG`, `INFO`, `WARN`, and `ERROR`.
So, if you want to log all packages with level `DEBUG`, for example, you could set it the following way:

```xml
<root level="DEBUG">
    <appender-ref ref="STDOUT"/>
</root>
```

However, usually you want to set the logging level for certain packages (or classes) only.
For this you would add the following line:

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

#### On Cloud Foundry

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

[//]: # (Think of further usage scenarios. CAP?)



### Further Reading

- How to use SLF4J with "legacy" logging frameworks: <http://www.slf4j.org/legacy.html>
- Debug Logging of the Apache HttpClient: <https://hc.apache.org/httpcomponents-client-4.5.x/logging.html>
