---
id: sdk-java-common-problems
title: Some common problems and how to address them
hide_title: true
hide_table_of_contents: false
sidebar_label: Frequently Debugged Problems
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

### Tenant or Principal not available

**Symptom:** Tenant or principal information is not available or an incorrect tenant is used.

Possible causes:

- A subscriber based JWT is passed in but its validation fails, causing the SDK to fall back to the provider account.
  See [JWT validation fails](#jwt-validation-fails).

- An operation is performed in an asynchronous manner without propagating the `ThreadContext`.
  See [Running Asynchronous Operations](../features/multi-tenancy/multi-tenancy-thread-context#running-asynchronous-operations).

- The SDK components are not registered as listeners on incoming requests.
  See [Framework Support](../getting-started#framework-integration).

- There was no JWT in the authorization header.

### Provider instead of Subscriber Account used

**Symptom:** Destinations are returned only for the provider account, but not for a subscriber account.

Possible causes:
- The SDK defaults back to the provider account if no tenant information is available. See the above section on [Tenant or Principal not available](#tenant-or-principal-not-available).

### JWT Validation fails

**Symptom:** Logs show JWT validation errors, Tenant information is not available.

Possible causes:

- The SDK version might be outdated.
  Check with the [latest SDK version](https://search.maven.org/artifact/com.sap.cloud.sdk/sdk-bom).

### Connecting to an ERP System fails

**Symptom:** The SAP Client and Locale headers are missing.

Possible causes:

- The `Destination` is not an `ErpHttpDestination`.
  See [Connecting to S/4HANA](../features/connectivity/sdk-connectivity-destination-service#connect-to-on-premise-s4hana-system).
