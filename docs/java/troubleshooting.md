---
id: sdk-java-troubleshooting-frequent-problems
title: Troubleshooting Frequent Problems
hide_title: true
hide_table_of_contents: false
sidebar_label: Troubleshooting
description: This article is a collection of frequently occurring symptoms and a short guidance on how to address them.
keywords:
- sap
- cloud
- sdk
- debugging
- FAQ
- common mistakes
- problems
image:
---

## Troubleshooting Frequent Problems

This article lists common problems that can be encountered when using the SDK for Java.
The linked resources provide more information on the subject.

If not covered here also search for any issue you might face on [Stack Overflow](https://stackoverflow.com/questions/tagged/sap-cloud-sdk).
There you can also reach out to us by [asking a question](https://stackoverflow.com/questions/ask) (be sure to tag it with `sap-cloud-sdk`).

### Tenant or Principal not available

:::info **Symptoms**
Tenant or principal information is not available or an incorrect tenant is used.
:::

**Possible causes:**

- A subscriber based JWT is passed in but its validation fails, causing the SDK to fall back to the provider account.
  See [JWT validation fails](#jwt-validation-fails).

- An operation is performed in an asynchronous manner without propagating the `ThreadContext`.
  See [Running Asynchronous Operations](../features/multi-tenancy/multi-tenancy-thread-context#running-asynchronous-operations).

- The SDK components are not registered as listeners on incoming requests.
  See [Framework Support](../getting-started#framework-integration).

- There was no JWT in the authorization header.

### Provider instead of Subscriber Account used

:::info **Symptoms**
Destinations are returned only for the provider account, but not for a subscriber account.
:::

**Possible causes:**
- The SDK defaults back to the provider account if no tenant information is available. See the above section on [Tenant or Principal not available](#tenant-or-principal-not-available).

### JWT validation fails

:::info **Symptoms:**
Logs show JWT validation exceptions, Tenant information is not available.
:::

**Possible causes:**

- The SDK version might be outdated.
  Check with the [latest SDK version](https://search.maven.org/artifact/com.sap.cloud.sdk/sdk-bom).

### Connecting to an ERP System fails

:::info **Symptoms:**
The ERP system unexpectedly responds with _401: Unauthorized_ or _403: Forbidden_.
:::

**Possible causes:**

- The SAP Client and Locale headers will be missing if the `Destination` is not an `ErpHttpDestination`.
  See [Connecting to S/4HANA](../features/connectivity/sdk-connectivity-destination-service#connect-to-on-premise-s4hana-system).

### Compilation failures in generated OData VDM classes

:::info **Symptoms:**
Compilation fails due to missing _Getters_ and _Setters_ on entity objects.
:::

**Possible causes:**

- Getters and Setters will be missing if [Lombok](https://projectlombok.org/) is not present in the dependency tree of your project.
  See [Using the OData Generator](http://localhost:3000/cloud-sdk/docs/java/features/odata/generate-typed-odata-v2-and-v4-client-for-java#using-the-odata-generator).
- Getters and Setters will be shown red if your IDE does not support Lombok. Hence, install the Lombok plugin for your IDE.
  - For IntelliJ, install [the Lombok plugin](https://plugins.jetbrains.com/plugin/6317-lombok).
  - For Eclipse, follow [this guide](https://projectlombok.org/setup/eclipse).

### Compilation or runtime failures after updating the SDK version

:::info  **Symptoms:**
`MethodNotFound`, `ClassDefNotFound` or similar exceptions occur.
:::

**Possible causes:**

- Conflicting dependency versions may cause such issues.
  See the section on [Managing Dependencies](guides/dependencies.md#dealing-with-dependency-conflicts).

### Java App has good performance on your local machine but utilizes 100% CPU on SCP Cloud Foundry

:::info **Symptoms:**
- Java App executes multiple threads and runs with good performance on a powerful local machine.
- Performance significantly drops after App is deployed to SAP Cloud Platform - Cloud Foundry and CPU utilization is always around 100%.
:::

**Possible causes:**

- A powerful developer's machine usually has much better CPU and Memory capacity than a standard Cloud instance.
- SCP Cloud Foundry provides 1/4 of CPU unit per every GB of memory. With maximum memory per instance of 8 GB you can get maximum of 2 CPU cores.
- All the limitations are subject to change. Please check latest details about [SCP Cloud Foundry quotas and limitation](https://help.sap.com/viewer/3504ec5ef16548778610c7e89cc0eac3/Cloud/en-US/9c7092c7b7ae4d49bc8ae35fdd0e0b18.html#loio9809fa4f02cb4696baea5c23d6eaac94)
- If even after achieving maximum vertical scale of your instance your App doesn't reach desired performance level, try to optimize it, consider scaling it horizontally or different custom solutions to boost performance where it lags.
