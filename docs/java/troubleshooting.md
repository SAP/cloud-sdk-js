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

### JWT validation fails

**Symptom:** Logs show JWT validation exceptions, Tenant information is not available.

Possible causes:

- The SDK version might be outdated.
  Check with the [latest SDK version](https://search.maven.org/artifact/com.sap.cloud.sdk/sdk-bom).

### Connecting to an ERP System fails

**Symptom:** The ERP system unexpectedly responds with _401: Unauthorized_.

Possible causes:

- The SAP Client and Locale headers will be missing if the `Destination` is not an `ErpHttpDestination`.
  See [Connecting to S/4HANA](../features/connectivity/sdk-connectivity-destination-service#connect-to-on-premise-s4hana-system).

### A generated VDM for an OData Service doesn't compile

**Symptom:** Compilation fails due to missing _Getters_ and _Setters_ on entity objects.

Possible causes:

- Getters and Setters will be missing if [Lombok](https://projectlombok.org/) is not present in the dependency tree of your project.
  See [Using the OData Generator](http://localhost:3000/cloud-sdk/docs/java/features/odata/generate-typed-odata-v2-and-v4-client-for-java#using-the-odata-generator).
