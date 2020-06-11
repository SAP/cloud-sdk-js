---
id: sdk-java-common-problems
title: Some common problems and how to address them
hide_title: true
hide_table_of_contents: false
sidebar_label: Frequently Debuged Problems
description: This article is a collection of frequently occuring symptoms and a short quidance on how to address them.
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

### Provider instead of Subscriber Account used

**Symptom:** Destinations are returned only for the provider account, but not for a subscriber account.

Possible causes:

- A subscriber based JWT is passed in but it's validation fails, causing the SDK to fall back to the provider account.
  
  See [JWT validation fails](#jwt-validation-fails).

- The destination is retrieved in an asynchronous manner without propagating the `ThreadContext`.
  
  See [Running Asynchronous Operations](docs/java/features/multi-tenancy/multi-tenancy-thread-context#running-asynchronous-operations).

### JWT Validation fails

**Symptom:** Logs show JWT validation errors, Tenant information is not available.

Possible causes:

- The SDK version might be outdated.
  Check with the [latest SDK version](https://search.maven.org/artifact/com.sap.cloud.sdk/sdk-bom).

### Tenant or Principal not available

**Symptom:** No Tenant and Principal information is available, the `ThreadContext` is empty.

Possible causes:

- The SDK components are not registered as listeners on incoming requests.
  
  See [Framework Support](../getting-started#framework-integration).

- There was no JWT in the authorization header.

### Connecting to an ERP System fails

**Symptom:** The SAP Client and Locale headers are missing.

Possible causes:

- The `Destination` is not an `ErpHttpDestination`.
  
  See [Connecting to S/4HANA](../features/connectivity/sdk-connectivity-destination-service#connect-to-on-premise-s4hana-system).

