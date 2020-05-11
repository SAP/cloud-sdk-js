---
id: frequently-asked-questions
title:  Frequently asked questions
hide_title: false
hide_table_of_contents: false
sidebar_label: FAQ
description: You asked! We Answered! We collected here the most frequent question about SAP Cloud SDK for Java.
keywords:
- sap
- cloud
- sdk
- cloud native
- cloud sdk
- sap cloud sdk
---

## Generic questions ##

- **How often do you release a new SDK version?**

We release bi-weekly. Every release contains all the features that are _Generally Available_ or _in Beta_ for the upcoming
release. You'll find the latest SDK version and the list of previous releases [here](api-reference-java )

- **Should I update with every release?**

The general recommendation is _YES_. This way you'll reduce an effort to keep up with the fast pace of cloud development. We
try to keep stable functionality consistent and explicitly notify about breaking changes. Be cautious about using
features annotated as _Beta_ because their API can change with every release.

- **Can I use features annotated as Beta in production**

We do not explicitly recommend it. We do not guarantee any API consistency or inheritance behind features in _Beta_. You
can use these features to test cutting edge functionality, provide us feedback and plan migration steps when _Beta_
features are releases as _General Availability_.

- **I found a bug in SDK, what should I do?**

Please, report it to us via any available channel. The preferred support channel is [Stack
Overflow](https://stackoverflow.com/questions/tagged/sap-cloud-sdk ). You can also create an issue on Cloud SDK external
GitHub repository or use internal one if you're SAP employee.

## OData related questions ##

- **What versions of OData protocol do you support?**

We support OData v2 and OData v4 services. You can use pre-generated client libraries supplied with SDK or generate your
own client from SDK specification. [Find more details here.](features/odata/overview )

- **Do you support ALL OData features?**

We support most of the OData features that are exposed by SAP services. However, the [OData
specification](https://www.odata.org/documentation/) is huge and contains many features that would see rare to no use. If
you found a feature that you need but not yet supported by Cloud SDK for Java, please, make a feature request via email
cloudsdk[at]sap.com or create an issue towards one of our repositories.

- **I receive an OData error/exception when using Cloud SDK for Java**

This is highly possible you'll see some errors while developing. These errors are not always caused by flaws in the SDK
as we often see inconsistent OData protocol handling by different services. Some of them even have known flaws for which
we have workarounds. If you can't solve your issue via debugging and experimenting, please, report your incident via [Stack
Overflow](https://stackoverflow.com/questions/tagged/sap-cloud-sdk ) or our GitHub repositories.

## REST related questions ##

- **Do you support REST client libraries?**

Yes, we do. We do not release a public REST client generator as of yet. We have a set of libraries supplied together
with Cloud SDK for Java. Some of them are available only for SAP internal use, others like Workflow service on Cloud
Foundry is released publicly. Check our [REST capabilities](rest/overview ) and let us know if you need a library for an
SAP service that you use and know to be providing REST API.
