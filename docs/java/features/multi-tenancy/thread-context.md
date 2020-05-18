---
id: multi-tenancy-thread-context
title: Multi Tenancy with the Thread Context
hide_title: false
hide_table_of_contents: false
sidebar_label: Thread Context
custom_edit_url: https://github.com
description: This article describes how the SAP Cloud SDK for Java provides an application context that is stored in a thread-safe manner and enables cloud native features to be used out of the box.
keywords:
- sap
- cloud
- sdk
- thread context
- multi tenancy
- cloud native
- tenant
- user
- principal
- JWT
- AuthToken
image:
---

## What is a Thread Context?

The SAP Cloud SDK for Java provides a so called `ThreadContext`. 
It serves as thread-safe storage for potentially sensitive information. 
Specifically the following three objects are stored:

- The current _Tenant_
- The current _Principal_ (User)
- The [Jason Web Token](https://jwt.io) (JWT)

This information is used throughout the SDK to provide features like tenant and principal isolation, JWT verification and authorization against other systems and services.
To ensure different tenants and users are properly isolated in an application this information is always limited to the Thread it was created on, unless it is explicitly passed on by the application (see [Propagating the Thread Context](#running-asynchronous-operations)).

## How is a Thread Context created?

The SDK provides a [RequestFilter](https://help.sap.com/doc/b579bf8578954412aea2b458e8452201/1.0/en-US/com/sap/cloud/sdk/cloudplatform/servlet/RequestAccessorFilter.html) that will listen on incoming HTTP requests. 
If the `Authorization` header contains a `JWT` from the [AppRouter](https://blogs.sap.com/2020/04/03/sap-application-router/) the filter will:

- Verify this token
- Store it in the `ThreadContext` and
- Pull the _Tenant_ and _Principal_ information from it

## How can the Thread Context be used?

### Accessing Information

The Thread context can be accessed via the static [ThreadContextAccessor](https://help.sap.com/doc/b579bf8578954412aea2b458e8452201/1.0/en-US/com/sap/cloud/sdk/cloudplatform/thread/ThreadContextAccessor.html). 

For the frequently needed _Tenant_, _Principal_ and _JWT_ there are also dedicated accessors: [TenantAccessor](https://help.sap.com/doc/b579bf8578954412aea2b458e8452201/1.0/en-US/com/sap/cloud/sdk/cloudplatform/tenant/TenantAccessor.html), [PrincipalAccessor](https://help.sap.com/doc/b579bf8578954412aea2b458e8452201/1.0/en-US/com/sap/cloud/sdk/cloudplatform/security/principal/PrincipalAccessor.html), [AuthTokenAccessor](https://help.sap.com/doc/b579bf8578954412aea2b458e8452201/1.0/en-US/com/sap/cloud/sdk/cloudplatform/security/AuthTokenAccessor.html).

### Storing Information

The [ThreadContext](https://help.sap.com/doc/b579bf8578954412aea2b458e8452201/1.0/en-US/com/sap/cloud/sdk/cloudplatform/thread/ThreadContext.html) allows for some manipulation by the application.
However, oftentimes it is more convenient to leverage the `executeWith...()` functionality offered by the dedicated accessors.

Consider a scenario where some part of the code should run on behalf of a specific tenant.
In that case you can override the current tenant explicitly:

```java
TenantAccessor.executeWithTenant(customTenant, () -> doStuff());
```

### Running asynchronous operations

As the name suggests the `ThreadContext` is bound to a Thread, more specifically to the one it was created.
If asynchronous operations need to access the information it has to be propagated to the new Threads.

The following code achieves this:

```java
ThreadContextExecutor executor = new ThreadContextExecutor();
Callable operationWithContext = () -> executor.execute(operation);

invokeAsynchronously(operationWithContext);
```

Take note that the `ThreadContextExecutor` is created _before_ performing the asynchronous operation.
This is important because only at that time the context is available and will be propagated.

A similar approach can be applied with the _Tenant_, _Principal_ and _AuthToken_ accessors.
This code runs an asynchronous operation with a dedicated tenant:

```java
Callable operationWithTenant = TenantAccessor.executeWithTenant(customTenant, () -> operation);

invokeAsynchronously(operationWithContext);
```


For the Thread context there is also a dedicated decorator class which performs this exact task, so the following code is equivalent:

```java
Callable operationWithContext = new DefaultThreadContextProvider().decorate(operation);

invokeAsynchronously(operationWithContext);
```

:::note
Be cautious with long running, asynchronous operations. A propagated Thread context will only persist as long as the Thread lives that it was created on. So when the parent Thread dies the context will seize to exist and no longer be available in any of the Threads.
:::
