---
id: sap-currency-conversion-extension-library-for-cloud-sdk-for-java
title: Currency Conversion
sidebar_label: Currency Conversion
description: The Currency Conversion library that allows you to perform currency exchange rate conversions in your Cloud applications. You provide the market data from your own data sources, and the library handles the conversion. You can make bulk or single conversions based on direct or indirect rates. You can also perform conversions using inverse rates or a reference currency.
keywords:
- sap
- cloud
- sdk
- cloud native
- cloud sdk
- sap cloud sdk
- currency conversion
- extension
---
import useBaseUrl from '@docusaurus/useBaseUrl'
import MvnBadge from './MvnBadge'
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<MvnBadge />

## Overview

Currency Conversion is an extension library built on SAP Cloud SDK. You can use this library to facilitate currency exchange rate conversions.

:::note
The library does not provide any market data out-of-the-box. You must provide the currency exchange rates to the library from your own data provider sources.
:::

You can use the library for the following functions:

- Direct one-to-one conversions, from a source currency to a target currency.
- Indirect conversions by using inverse rates or a "reference currency".
- Fixed rate conversions, for when you have the exact currency exchange rate that you want to use in your conversion operations.
- Non-fixed rate conversions, for when you have a set of exchange rates, as opposed to the exact rate. The library will pick the "best rate" from the set depending on [various factors](#non-fixed-rate).

## Getting Started

Adding the Currency Conversion library to your list of dependencies will allow you to perform the following tasks:

- Convert a single or list of amounts from one currency to another by using a fixed rate.
- Convert a single or list of amounts from one currency to another by using exchange rates provided at runtime.
- Convert a single or list of amounts from one currency to another by using tenant-specific rates provided at runtime.
- Configure the conversion process for users or tenants accessing your application.

Add the dependency in your pom.xml file under the existing *dependencies* tag as follows:

```xml
<dependency>
   <groupId>com.sap.cloud.sdk.services</groupId>
   <artifactId>currency-conversion-core</artifactId>
   <!-- Please use the latest version of the dependency -->
   <version>3.X.X</version>
</dependency>
```
The library works within the tenant context, therefore, depending on the landscape you operate in, add one of the following dependencies in your pom.xml file, in addition to that of the library's. Adding this additional dependency helps the library detect your tenants automatically. Without it, you would have to manually pass this information. Therefore, we recommend adding one or more of the following dependencies, based on your landscape.

If you want to run the library in the Cloud Foundry environment, use the following:

```xml
<dependency>
  <groupId>com.sap.cloud.sdk.cloudplatform</groupId>
  <artifactId>tenant-scp-cf</artifactId>
  <version>{{The latest version ID from NexusInformation published on non-SAP site}}</version>
</dependency>
```

If you want to run the library in the Neo environment, use the following:

```xml
<dependency>
  <groupId>com.sap.cloud.sdk.cloudplatform</groupId>
  <artifactId>tenant-scp-neo</artifactId>
  <version>{{The latest version ID from Nexus}}</version>
</dependency>  
```

If your IDE haven't resolved the dependencies, run `mvn clean install` in the root directory of you project.

## Concepts

### Currency Conversion
Currency Conversion is a Java library that you can use to convert currency exchange rates. You can perform conversions either with one currency pair or perform multiple conversions through a single API call. You can use a data adapter to provide exchange rates, configuration settings, and so on.

### Data Adapter
The data adapter provides the library with access to relevant exchange rates and configurations. You use the data adapter to send currency exchange rates to the library.

At runtime, the conversion library interacts with the data adapter by calling the relevant methods to provide the information you request.

### Direct Conversions
Direct conversions happen between a source currency and a target currency, by using the exact rate from the source to the target currency. So, a conversion request with USD as the source currency and EUR as the target currency is performed only if an exchange rate from USD to EUR is available. Conversions will fail if, say, only the rate from EUR to USD is available.

Unless you use...

### Indirect Conversions By Using an Inverse Rate
You can request for a conversion from INR to USD even if the rates available are from USD to INR. You (or your consumers) enable the inverse rates setting for each exchange rate type. You can then provide the rate type information by using the data adapter. Note that inverse rates are only used if no direct rates are available. For example, if you have enabled the inverse rate type for INR to USD and if a direct rate is available for this currency pair, it will still be given precedence over the inverse rate. If a direct rate from INR to USD is not found, the library looks for the USD to INR rate.

### Indirect Conversions By Using a Reference Rate
A currency conversion can be performed by using a reference or intermediate currency outside of your desired currency pair. A conversion from INR to USD can be performed by using a reference currency, say EUR, with the currency exchange rates for INR to EUR and USD to EUR. Note that this can be done only if a reference currency for these rates is specified in when you define these exchange rate pairs, in the 'toCurrency' field.

:::note
If a reference currency is provided, it takes precedence over direct rates. The conversion will be performed based on the reference currency specified. Inverse rates are not considered in this scenario.
:::

### Fixed Rate
The exact exchange rate provided at run-time. The library uses the run-time rates to perform the conversion.

### Non-fixed rate
A set of exchange rates you provide to the library. The library picks the "best rate" from the list and uses it to perform each conversion. This "best rate" is determined by using various factors such as the from currency, to currency, the date time for which the conversion is requested and the exchange rate type. If provided, the provider and source are also taken into consideration. The inversion and reference currency settings, if set, are considered to decide which rate to use.

You must implement the data adapter to enable the library to read the exchange rates from your data source.

### Default and Overwriting Tenant
By default, the conversion library operates in the context of the calling tenant, that is, the customer that uses your application to initiate a Currency Conversion call. This is a "default tenant". You can choose to override this tenant by using the TenantAccessor class to perform conversions for them.

### Default and Overwriting Tenant Setting
By default, the conversion library works with the default tenant settings you provide as part of the data adapter implementation. These settings can include the default data provider and default data provider source for your application's consumers'. However, if your business case requires you to provide exchange rates to your consumers, instead of them providing their own rates, you can use the OverrideTenantSetting class to provide a different default provider and source while calling the conversion API.

### Big Decimal
The library uses the [Big Decimal](https://docs.oracle.com/javase/7/docs/api/java/math/BigDecimal.html) class, which allows you to control the precision and scale of your currency exchange rates. For direct conversions, the scale of the result is calculated by adding the scale of the amount and the exchange rate. For example, if you have two exchange rates: 13.74 and 1.32, the result would be 15.0600. For indirect conversions, the scales are added as well, with the rounding rule of "[half up](https://docs.oracle.com/javase/7/docs/api/java/math/RoundingMode.html#HALF_UP)" applied.

The library returns the converted amount both as a string and a big decimal. You can work with the big decimal object and specify a scale of your choice.

### Rounding Off
Rounded off values represent the usable currency amounts in relation to your business case. This means that the amounts are rounded off to a precision and value which make sense in a business.

This is done by using an exponent value of the target currency. An exponent represents the relationship between a major and minor currency unit as a mathematical function. For example, 100 cents make one US Dollar (USD). We can represent this relationship by using a "base value" and an "exponent value". For all rounding off calculations, the base value is fixed as 10. Therefore, in this example, the exponent will be 2.

Additionally, converted amounts in the library response are rounded off to a "scale" equal to the exponent of the target currency. This means that if the source currency's exponent value is 2 (as is the case in our example), there will be two digits after the decimal in the rounded off amount.

Exponents for all currencies are published by ISO and this information is also available in the [Currency](https://docs.oracle.com/javase/7/docs/api/java/util/Currency.html) class.

This rounding off logic is applied to all conversion amounts.

:::note
The library provides both the unrounded and rounded-off amounts in the result set. You can choose which one to opt for, based on your use case.
:::

## Features

### Convert Currencies
Get currency exchange rates converted from a base currency to a target currency by using the Currency Conversion library.

#### Get Bulk Conversions
Get multiple currency pairs converted through a single call. You can use the library methods to get more than one currency pair converted at the same time.

#### Get Direct and Indirect Conversions
Get direct and indirect currency conversions for your currency pairs. Direct conversions are one-to-one conversions between a source and a target currency. Indirect conversions are performed by using inverse rates or a reference currency.

### Multi-tenancy with Currency Conversion
Based on the dependency added to pom.xml, the library identifies the environment you are operating on and the tenant context. The library automatically derives the tenant context by using the [Tenant abstraction](https://help.sap.com/doc/19838225037e4e52ba36d2bb95176126/1.0/en-US/com/sap/cloud/sdk/cloudplatform/tenant/Tenant.html) provided by the SAP Cloud SDK. To override the default conversion configuration, manually add an exchange rate provider and an exchange rate provider code to the API request, as follows. If you do this, the default configuration settings are not taken into consideration.

```java
TenantAccessor.executeWithTenant(providerTenant, CallableWhichPerformsCurrencyConversion);

TenantAccessor.executeWithTenant(() -> MyProviderTenant, () -> {
  // Call the Currency Conversion library here.
});
```
## Code Example
The code example that follows, shows the end-to-end process flow in using the Currency Conversion library.

```java
// Initialize the Currency Conversion Library.
CurrencyConverter currConverter = new CurrencyConverter();

// Initialize the Data Adapter implementation you would like to use.
DataAdapter dataAdapter = new DataAdapterImpl();

// Prepare the parameter for your conversion request.
ConversionParametersForNonFixedRate parameter =
    ConversionParametersForNonFixedRate.builder()
      .fromAmount(new CurrencyAmount("500.123"))
      .fromCurrency(Currency.getInstance("EUR"))
      .toCurrency(Currency.getInstance("USD"))
      .exchangeRateType(new RateType("MID"))
      .build();

// Call the conversion library for a single conversion.

try {
      SingleNonFixedRateConversionResult singleConversionresult =
        currConverter.convertCurrencyWithNonFixedRate(param, dataAdapter);
      convertedAmount =
        singleConversionresult.getConvertedAmount().getDecimalValue();
} catch(ConversionException ex){
      slfLogger.error("Conversion exception with message as " + ex.getMessage());
      throw new Exception(ex.getMessage());
}

// Or... if you would like to perform bulk conversions, use the following...

List<ConversionParametersForNonFixedRate> paramList = new ArrayList<>();

paramList.add(parameter);

ConversionParametersForNonFixedRate parameter2 =
    ConversionParametersForNonFixedRate.builder()
      .fromAmount(new CurrencyAmount("485.324"))
      .fromCurrency(Currency.getInstance("JPY"))
      .toCurrency(Currency.getInstance("USD"))
      .exchangeRateType(new RateType("MID"))
      .build();

paramList.add(parameter2);

// ...and so on.

// Call the conversion library for bulk conversion.

BulkNonFixedRateConversionResult bulkConversionresult = null;

try {
  bulkConversionresult =
    currConverter.convertCurrenciesWithNonFixedRate(paramList, dataAdapter);
} catch (ConversionException ex){
    slfLogger.error("Conversion exception with message as " + ex.getMessage());
    throw new Exception(ex.getMessage());
}

// Process the results.

for(ConversionParametersForNonFixedRate param: paramList) {
    if(bulkConversionresult.get(param).isSuccess()) {
      convertedAmount =
        bulkConversionresult.get(param).get().getConvertedAmount().getDecimalValue();
    } else {
      // Handle specific failures.
      bulkConversionresult.get(param).getCause().getMessage();
    }
}

```

## Troubleshooting and FAQ

### Getting Support

You can report a BCP incident or error through the SAP Support Portal Information published on SAP site. Use `XX-S4C-SDK-CC` as the component.

### Frequently asked questions

Q: Do you provide currency exchange rates from a data provider?

A: No. The library requires you to provide your own exchange rates. It facilitates direct currency conversions for both fixed and non-fixed rates based on your exchange rate set.

Q: Are your conversion results consistent with those provided by SAP S/4HANA?

A: No. We do not use the configuration tables based on SAP S/4HANA.

Q: Why are my conversion requests failing?

A: Conversion requests fail due to several reasons, including but not limited to the following:
- The library could not determine the exchange rate record for your conversion request: If this happens, check your Data Adapter settings and the exchange rate list you have provided.

- The library found multiple exchange rates for the same conversion request, and there was no default exchange rate provider specified. If this happens, set a default exchange rate provider.

- The library found duplicate exchange rate records from the same exchange rates provider.

You can handle the individual status of a success or failure exception. To learn more, see [Code Example](#code-example).
