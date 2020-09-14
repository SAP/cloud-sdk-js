---
id: sap-currency-conversion-glossary
title: Currency conversion glossary
sidebar_label: Glossary
description: Let's look at some terms and main concepts used in Currency Conversion library
keywords:
- sap
- cloud
- sdk
- cloud native
- cloud sdk
- sap cloud sdk
---


## Data Adapter

The **data adapter** provides the conversion library with access to relevant exchange rates and configurations.

You can either use a **default**  implementation of the data adapter or provide a custom one to connect to your exchange rates source and configurations.

You can use data adapter to call the Conversion API. The conversion library calls a relevant data adapter methods to provide the information you need for conversion. If you use a **default** implementation of the data adapter, the library can access the persisted data and use it to perform conversions.

:::note
The default implementation is only available is used together with integration objects.
:::

## Integration Objects
Integration objects are reusable artifacts consisting of data models and applications (UIs) that send the required information to the library, and services that operate on the data models. These artifacts are shipped with Currency Conversion and can be used in addition to the library.

As an application developer who gets currency exchange rates from your own data sources, you would typically have to create database artifacts that store your currency exchange rate information, and then create mechanisms to access these rates in your applications. The reusable artifacts shipped by Currency Conversion eliminate these steps and provide data models that can persist your currency exchange rates. You also get services that can perform create, update, and delete operations on these data models, out of the box. In addition to this, there are three application UIs you can use to perform the same tasks. The data models and services constitute the Currency Conversion integration objects.

For more information, see Using the Manage Exchange RatesApplication, Using the Manage Default Configurations Application, and Using the Manage Exchange Rate Type Details Application.

## Direct Conversions

Direct conversions happen between a source currency and a target currency, by using the exact, direct rate for the source to the target currency. If you opt for conversion by using a direct currency, a conversion request with USD as the source currency and EUR as the target currency is performed using only if the the exchange rate from USD to EUR is available. The conversion fails if this direct rate is not available to the library.

## Indirect Conversions By Using an Inverse Rate
You can request for a conversion from INR to USD even if the rates available are from USD to INR. You (or your consumers) enable the inverse rates setting for each exchange rate type. You can then provide the rate type information by using the data adapter. Note that inverse rates are only used if no direct rates are available. For example, if you have enabled the inverse rate type for INR to USD and if a direct rate is available for this currency pair, it will still be given precedence over the inverse rate. If a direct rate from INR to USD is not found, the library looks for the USD to INR rate.

## Indirect Conversions By Using a Reference Rate
A currency conversion can be performed by using a reference or intermediate currency outside of your desired currency pair. A conversion from INR to USD can be performed by using a reference currency, say EUR, with the currency exchange rates for INR to EUR and USD to EUR. Note that this can be done only if a reference currency for these rates is specified in the `<toCurrency>` field.


:::note
If a reference currency is provided, it takes precedence over direct rates. The conversion will be performed based on the reference currency specified. Inverse rates are not considered in this scenario.
:::

## Fixed Rate
The exact exchange rate provided at run-time. The library uses the run-time rates to perform the conversion.

## Non-Fixed Rate
A set of exchange rates you provide to the library. The library picks the "best rate" from the list and uses it to perform each conversion. You must implement the data adapter to enable the library to read the exchange rates from your data source.

## Default and Overwriting Tenant
By default, the conversion library operates in the context of the calling tenant, that is, the customer that uses your application to initiate a Currency Conversion call. This is a "default tenant". You can choose to override this tenant by using the TenantAccessor class to perform conversions for them.

## Default and Overwriting Tenant Setting
By default, the conversion library works with the default tenant settings you provide as part of the data adapter implementation. These settings can include the default data provider and default data provider source for your application's consumers'. However, if your business case requires you to provide exchange rates to your consumers, instead of them providing their own rates, you can use the OverrideTenantSetting class to provide a different default provider and source while calling the conversion API.

For more information, see Setting Up Tenant Context Detection in Initial Setup.

## Big Decimal
The library uses the Big DecimalInformation published on non-SAP site class, which allows you to control the precision and scale of your currency exchange rates. For direct conversions, the scale of the result is calculated by adding the scale of the amount and the exchange rate. For example, if you have two exchange rates: 13.74 and 1.32, the result would be 15.0600. For indirect conversions, the scales are added as well, with the rounding rule of "half upInformation published on non-SAP site" applied.

The library returns the converted amount both as a string and a big decimal. You can work with the big decimal object and specify a scale of your choice.

## Rounding Off
Rounded off values represent the usable currency amounts in relation to your business case. This means that the amounts are rounded off to a precision and value which makes sense in a business. The conversion library provides you with a rounded off amount that can be used in businesses.

This is done by using an exponent value of the converted amount. An exponent represents the relationship between a major and minor currency unit. For example, 100 cents make one US Dollar (USD). An exponent value represents this relationship with a base of 10. So, in this example, the exponent of the US Dollar is 2. Similarly, exponents for all currencies are published by ISO and this information is also available in the CurrencyInformation published on non-SAP site class.

This rounding off logic is applied to all conversion amounts.

:::note
The library provides both the unrounded and rounded-off amounts in the result set. You can choose which one to use, based on your use case.
:::
