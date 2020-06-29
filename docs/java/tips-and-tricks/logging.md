---
id: change-log-level
title: Change log level
hide_title: false
hide_table_of_contents: false
sidebar_label: Increase log level
description: Change log levels for your Cloud SDK application for efficient debugging
keywords:
- sap
- cloud
- sdk
- cloud native
- cloud sdk
- sap cloud sdk
image:
---

## When running app/debugging on localhost ##

For applications that run on localhost you can influence the log level settings via Maven.

### Change Default Log Level

To change the default log level, add this argument to your `mvn` run command:
```makefile
-Dorg.slf4j.simpleLogger.defaultLogLevel=debug
```


### Change Log Level for specific Package
To change the log level for a specific package and all its sub packages, add this argument to your `mvn` run command:

```makefile
-Dorg.slf4j.simpleLogger.log.package.to.change.log.level.for=debug
```


## After deploying to Cloud Foundry ##

For applications deployed on [SAP CF](https://developers.sap.com/tutorials/cp-cf-fundamentals.html) you have to
configure individual log levels for specific packages of your application and third-party dependencies, e.g. _SAP Cloud
SDK_ or _SAP Cloud Platform SDK for Service Development_ or _Apache HTTP components_. Here is how you do it for different Java Frameworks.

### **TomEE** based application ###

- Edit the `manifest.yml` to include the following `env` entry for the `SET_LOGGING_LEVEL` environment variable:

```makefile
SET_LOGGING_LEVEL: '{ROOT: INFO, com.sap.cloud.sdk: INFO, org.apache.http.wire: DEBUG}'
```
You can customize the `logging level` to reflect you debugging needs.

## **Spring Boot** based application ##

:::info
- We assume the `logback` framework is used
:::
- Edit or create a file: `application/src/main/resources/logback-spring.xml`
```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <configuration>
        <springProfile name="!cloud">
            <include resource="org/springframework/boot/logging/logback/base.xml"/>
            <root level="INFO"/>
            <logger name="org.springframework.web" level="INFO"/>
        </springProfile>

        <springProfile name="cloud">
            <appender name="STDOUT-JSON" class="ch.qos.logback.core.ConsoleAppender">
                <encoder class="com.sap.hcp.cf.logback.encoder.JsonEncoder"/>
            </appender>
            <logger name="org.springframework.web" level="INFO"/>
            <logger name="com.sap.cloud.sdk" level="INFO"/>
            <logger name="org.apache.http.wire" level="DEBUG"/>
            <root level="INFO">
                <appender-ref ref="STDOUT-JSON"/>
            </root>
        </springProfile>
    </configuration>
```
You can customize the `logging level` to reflect you debugging needs.

:::caution  Pay attention to the different profile settings.
Make sure the `cloud` profile is active for deployed applications. Edit the `manifest.yml` to include the following `env` entry for the `SPRING_PROFILES_ACTIVE` environment variable:
```makefile
SPRING_PROFILES_ACTIVE: 'cloud'
```
:::
