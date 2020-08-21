---
id: troubleshooting-and-faq
title: Troubleshooting & FAQ
sidebar_label: Troubleshooting & FAQ
description: How to solve problems when using Currency Conversion library
keywords:
- sap
- cloud
- sdk
- cloud native
- cloud sdk
- sap cloud sdk
---

## Currency conversion

### Do you provide currency exchange rates from a data provider?

No. The library requires you to provide your own exchange rates. It facilitates direct currency conversions for both fixed and non-fixed rates based on your exchange rate set.

### Are your conversion results consistent with those provided by SAP S/4HANA?

No. We do not use the configuration tables based on SAP S/4HANA.

### What languages do you support?

The primary language used is English. However, if you consume the application UIs, those artifacts are available in English and German.

### Why are my conversion requests failing?

Conversion requests fail due to several reasons, including but not limited to the following:

- The library could not determine the exchange rate record for your conversion request: If this happens, check your Data Adapter settings and the exchange rate list you have provided.

- The library found multiple exchange rates for the same conversion request, and there was no default exchange rate provider specified. If this happens, set a default exchange rate provider.

- The library found duplicate exchange rate records from the same exchange rates provider.

You can handle the individual status of a success or failure exception. To learn more, see Code Example.

### Can the library only be used with the integration objects?

No. The integration objects are only intended to assist your use of the library. You can choose to only use the library, and provide the relevant rates and configurations by using your own custom data adapter.

## Integration objects

### The OData service is not performing any business validation. Is this standard behavior?

No, there are business validations performed. If you find that this is not happening, perform the following checks:

- Check for the logs as described in Verifying Your Setup to ensure that the the OData services and event handlers associated with them are included in your application during startup.

- If you use any other dynamic source generation plugins like Open API, the target folder where the integration model’s extension class files are placed may get overwritten. You can configure the plugin associated with unpacking the integration object to place the class files in other locations like src/main/java.

### I get the 'Maven Dependencies Not Found' Error. How do I fix this?

The library and the integration models are for SAP-internal applications only and hence the artifacts are only available on internal Nexus repositories. Ensure that your Maven settings point to the SAP-internal Nexus as the repository source. If you use the SAP Business Application Studio to connect to SAP Nexus, the Accessing On Premise SystemsInformation published on non-SAP site tutorial may help.

### Can the library be used without the integration objects?

Yes. You can consume the library by providing your custom configurations by using the data adapter.
