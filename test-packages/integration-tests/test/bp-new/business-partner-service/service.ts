/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { BigNumber } from 'bignumber.js';
import { Moment } from 'moment';
import { defaultDeSerializers, DeSerializers, DefaultDeSerializers, mergeDefaultDeSerializersWith, Time } from '@sap-cloud-sdk/odata-v2';
import { AddressEmailAddressApi } from './AddressEmailAddressApi';
import { AddressFaxNumberApi } from './AddressFaxNumberApi';
import { AddressHomePageUrlApi } from './AddressHomePageUrlApi';
import { AddressPhoneNumberApi } from './AddressPhoneNumberApi';
import { BpContactToAddressApi } from './BpContactToAddressApi';
import { BpContactToFuncAndDeptApi } from './BpContactToFuncAndDeptApi';
import { BuPaAddressUsageApi } from './BuPaAddressUsageApi';
import { BuPaIdentificationApi } from './BuPaIdentificationApi';
import { BuPaIndustryApi } from './BuPaIndustryApi';
import { BusinessPartnerApi } from './BusinessPartnerApi';
import { BusinessPartnerAddressApi } from './BusinessPartnerAddressApi';
import { BusinessPartnerBankApi } from './BusinessPartnerBankApi';
import { BusinessPartnerContactApi } from './BusinessPartnerContactApi';
import { BusinessPartnerRoleApi } from './BusinessPartnerRoleApi';
import { BusinessPartnerTaxNumberApi } from './BusinessPartnerTaxNumberApi';
import { CustomerApi } from './CustomerApi';
import { CustomerCompanyApi } from './CustomerCompanyApi';
import { CustomerCompanyTextApi } from './CustomerCompanyTextApi';
import { CustomerDunningApi } from './CustomerDunningApi';
import { CustomerSalesAreaApi } from './CustomerSalesAreaApi';
import { CustomerSalesAreaTaxApi } from './CustomerSalesAreaTaxApi';
import { CustomerSalesAreaTextApi } from './CustomerSalesAreaTextApi';
import { CustomerTaxGroupingApi } from './CustomerTaxGroupingApi';
import { CustomerTextApi } from './CustomerTextApi';
import { CustomerUnloadingPointApi } from './CustomerUnloadingPointApi';
import { CustomerWithHoldingTaxApi } from './CustomerWithHoldingTaxApi';
import { CustSalesPartnerFuncApi } from './CustSalesPartnerFuncApi';
import { SupplierApi } from './SupplierApi';
import { SupplierCompanyApi } from './SupplierCompanyApi';
import { SupplierCompanyTextApi } from './SupplierCompanyTextApi';
import { SupplierDunningApi } from './SupplierDunningApi';
import { SupplierPartnerFuncApi } from './SupplierPartnerFuncApi';
import { SupplierPurchasingOrgApi } from './SupplierPurchasingOrgApi';
import { SupplierPurchasingOrgTextApi } from './SupplierPurchasingOrgTextApi';
import { SupplierTextApi } from './SupplierTextApi';
import { SupplierWithHoldingTaxApi } from './SupplierWithHoldingTaxApi';
import { batch } from './BatchRequest';

  export function businessPartnerService<BinaryT = string,
BooleanT = boolean,
ByteT = number,
DecimalT = BigNumber,
DoubleT = number,
FloatT = number,
Int16T = number,
Int32T = number,
Int64T = BigNumber,
GuidT = string,
SByteT = number,
SingleT = number,
StringT = string,
AnyT = any,
DateTimeOffsetT = Moment,
DateTimeT = Moment,
TimeT = Time>(
  deSerializers: Partial<DeSerializers<BinaryT,
BooleanT,
ByteT,
DecimalT,
DoubleT,
FloatT,
Int16T,
Int32T,
Int64T,
GuidT,
SByteT,
SingleT,
StringT,
AnyT,
DateTimeOffsetT,
DateTimeT,
TimeT>> = defaultDeSerializers as any
  ): BusinessPartnerService<DeSerializers<BinaryT,
BooleanT,
ByteT,
DecimalT,
DoubleT,
FloatT,
Int16T,
Int32T,
Int64T,
GuidT,
SByteT,
SingleT,
StringT,
AnyT,
DateTimeOffsetT,
DateTimeT,
TimeT>>
  {
  return new BusinessPartnerService(mergeDefaultDeSerializersWith(deSerializers));
  }
export class BusinessPartnerService<DeSerializersT extends DeSerializers = DefaultDeSerializers> {
    private apis: Record<string, any> = {};
    private deSerializers: DeSerializersT;

    constructor(deSerializers: DeSerializersT) {
      this.deSerializers = deSerializers;
    }

    private initApi(key: string, ctor: new (...args: any[]) => any): any {
      if (!this.apis[key]) {
        this.apis[key] = new ctor(this.deSerializers);
      }
      return this.apis[key];
    }

    get addressEmailAddressApi(): AddressEmailAddressApi<DeSerializersT> {
        return this.initApi('addressEmailAddressApi', AddressEmailAddressApi);
      }

    get addressFaxNumberApi(): AddressFaxNumberApi<DeSerializersT> {
        return this.initApi('addressFaxNumberApi', AddressFaxNumberApi);
      }

    get addressHomePageUrlApi(): AddressHomePageUrlApi<DeSerializersT> {
        return this.initApi('addressHomePageUrlApi', AddressHomePageUrlApi);
      }

    get addressPhoneNumberApi(): AddressPhoneNumberApi<DeSerializersT> {
        return this.initApi('addressPhoneNumberApi', AddressPhoneNumberApi);
      }

    get bpContactToAddressApi(): BpContactToAddressApi<DeSerializersT> {
        const api = this.initApi('bpContactToAddressApi', BpContactToAddressApi);
          const linkedApis = [
            this.initApi('addressEmailAddressApi', AddressEmailAddressApi),
        this.initApi('addressFaxNumberApi', AddressFaxNumberApi),
        this.initApi('addressPhoneNumberApi', AddressPhoneNumberApi),
        this.initApi('addressPhoneNumberApi', AddressPhoneNumberApi),
        this.initApi('addressHomePageUrlApi', AddressHomePageUrlApi)
          ];
          api._addNavigationProperties(linkedApis);
          return api;
      }

    get bpContactToFuncAndDeptApi(): BpContactToFuncAndDeptApi<DeSerializersT> {
        return this.initApi('bpContactToFuncAndDeptApi', BpContactToFuncAndDeptApi);
      }

    get buPaAddressUsageApi(): BuPaAddressUsageApi<DeSerializersT> {
        return this.initApi('buPaAddressUsageApi', BuPaAddressUsageApi);
      }

    get buPaIdentificationApi(): BuPaIdentificationApi<DeSerializersT> {
        return this.initApi('buPaIdentificationApi', BuPaIdentificationApi);
      }

    get buPaIndustryApi(): BuPaIndustryApi<DeSerializersT> {
        return this.initApi('buPaIndustryApi', BuPaIndustryApi);
      }

    get businessPartnerApi(): BusinessPartnerApi<DeSerializersT> {
        const api = this.initApi('businessPartnerApi', BusinessPartnerApi);
          const linkedApis = [
            this.initApi('buPaIdentificationApi', BuPaIdentificationApi),
        this.initApi('buPaIndustryApi', BuPaIndustryApi),
        this.initApi('businessPartnerAddressApi', BusinessPartnerAddressApi),
        this.initApi('businessPartnerBankApi', BusinessPartnerBankApi),
        this.initApi('businessPartnerContactApi', BusinessPartnerContactApi),
        this.initApi('businessPartnerRoleApi', BusinessPartnerRoleApi),
        this.initApi('businessPartnerTaxNumberApi', BusinessPartnerTaxNumberApi),
        this.initApi('customerApi', CustomerApi),
        this.initApi('supplierApi', SupplierApi)
          ];
          api._addNavigationProperties(linkedApis);
          return api;
      }

    get businessPartnerAddressApi(): BusinessPartnerAddressApi<DeSerializersT> {
        const api = this.initApi('businessPartnerAddressApi', BusinessPartnerAddressApi);
          const linkedApis = [
            this.initApi('buPaAddressUsageApi', BuPaAddressUsageApi),
        this.initApi('addressEmailAddressApi', AddressEmailAddressApi),
        this.initApi('addressFaxNumberApi', AddressFaxNumberApi),
        this.initApi('addressPhoneNumberApi', AddressPhoneNumberApi),
        this.initApi('addressPhoneNumberApi', AddressPhoneNumberApi),
        this.initApi('addressHomePageUrlApi', AddressHomePageUrlApi)
          ];
          api._addNavigationProperties(linkedApis);
          return api;
      }

    get businessPartnerBankApi(): BusinessPartnerBankApi<DeSerializersT> {
        return this.initApi('businessPartnerBankApi', BusinessPartnerBankApi);
      }

    get businessPartnerContactApi(): BusinessPartnerContactApi<DeSerializersT> {
        const api = this.initApi('businessPartnerContactApi', BusinessPartnerContactApi);
          const linkedApis = [
            this.initApi('bpContactToAddressApi', BpContactToAddressApi),
        this.initApi('bpContactToFuncAndDeptApi', BpContactToFuncAndDeptApi)
          ];
          api._addNavigationProperties(linkedApis);
          return api;
      }

    get businessPartnerRoleApi(): BusinessPartnerRoleApi<DeSerializersT> {
        return this.initApi('businessPartnerRoleApi', BusinessPartnerRoleApi);
      }

    get businessPartnerTaxNumberApi(): BusinessPartnerTaxNumberApi<DeSerializersT> {
        return this.initApi('businessPartnerTaxNumberApi', BusinessPartnerTaxNumberApi);
      }

    get customerApi(): CustomerApi<DeSerializersT> {
        const api = this.initApi('customerApi', CustomerApi);
          const linkedApis = [
            this.initApi('customerCompanyApi', CustomerCompanyApi),
        this.initApi('customerSalesAreaApi', CustomerSalesAreaApi),
        this.initApi('customerTaxGroupingApi', CustomerTaxGroupingApi),
        this.initApi('customerTextApi', CustomerTextApi),
        this.initApi('customerUnloadingPointApi', CustomerUnloadingPointApi)
          ];
          api._addNavigationProperties(linkedApis);
          return api;
      }

    get customerCompanyApi(): CustomerCompanyApi<DeSerializersT> {
        const api = this.initApi('customerCompanyApi', CustomerCompanyApi);
          const linkedApis = [
            this.initApi('customerCompanyTextApi', CustomerCompanyTextApi),
        this.initApi('customerDunningApi', CustomerDunningApi),
        this.initApi('customerWithHoldingTaxApi', CustomerWithHoldingTaxApi)
          ];
          api._addNavigationProperties(linkedApis);
          return api;
      }

    get customerCompanyTextApi(): CustomerCompanyTextApi<DeSerializersT> {
        return this.initApi('customerCompanyTextApi', CustomerCompanyTextApi);
      }

    get customerDunningApi(): CustomerDunningApi<DeSerializersT> {
        return this.initApi('customerDunningApi', CustomerDunningApi);
      }

    get customerSalesAreaApi(): CustomerSalesAreaApi<DeSerializersT> {
        const api = this.initApi('customerSalesAreaApi', CustomerSalesAreaApi);
          const linkedApis = [
            this.initApi('custSalesPartnerFuncApi', CustSalesPartnerFuncApi),
        this.initApi('customerSalesAreaTaxApi', CustomerSalesAreaTaxApi),
        this.initApi('customerSalesAreaTextApi', CustomerSalesAreaTextApi)
          ];
          api._addNavigationProperties(linkedApis);
          return api;
      }

    get customerSalesAreaTaxApi(): CustomerSalesAreaTaxApi<DeSerializersT> {
        return this.initApi('customerSalesAreaTaxApi', CustomerSalesAreaTaxApi);
      }

    get customerSalesAreaTextApi(): CustomerSalesAreaTextApi<DeSerializersT> {
        return this.initApi('customerSalesAreaTextApi', CustomerSalesAreaTextApi);
      }

    get customerTaxGroupingApi(): CustomerTaxGroupingApi<DeSerializersT> {
        return this.initApi('customerTaxGroupingApi', CustomerTaxGroupingApi);
      }

    get customerTextApi(): CustomerTextApi<DeSerializersT> {
        return this.initApi('customerTextApi', CustomerTextApi);
      }

    get customerUnloadingPointApi(): CustomerUnloadingPointApi<DeSerializersT> {
        return this.initApi('customerUnloadingPointApi', CustomerUnloadingPointApi);
      }

    get customerWithHoldingTaxApi(): CustomerWithHoldingTaxApi<DeSerializersT> {
        return this.initApi('customerWithHoldingTaxApi', CustomerWithHoldingTaxApi);
      }

    get custSalesPartnerFuncApi(): CustSalesPartnerFuncApi<DeSerializersT> {
        return this.initApi('custSalesPartnerFuncApi', CustSalesPartnerFuncApi);
      }

    get supplierApi(): SupplierApi<DeSerializersT> {
        const api = this.initApi('supplierApi', SupplierApi);
          const linkedApis = [
            this.initApi('supplierCompanyApi', SupplierCompanyApi),
        this.initApi('supplierPurchasingOrgApi', SupplierPurchasingOrgApi),
        this.initApi('supplierTextApi', SupplierTextApi)
          ];
          api._addNavigationProperties(linkedApis);
          return api;
      }

    get supplierCompanyApi(): SupplierCompanyApi<DeSerializersT> {
        const api = this.initApi('supplierCompanyApi', SupplierCompanyApi);
          const linkedApis = [
            this.initApi('supplierCompanyTextApi', SupplierCompanyTextApi),
        this.initApi('supplierApi', SupplierApi),
        this.initApi('supplierDunningApi', SupplierDunningApi),
        this.initApi('supplierWithHoldingTaxApi', SupplierWithHoldingTaxApi)
          ];
          api._addNavigationProperties(linkedApis);
          return api;
      }

    get supplierCompanyTextApi(): SupplierCompanyTextApi<DeSerializersT> {
        return this.initApi('supplierCompanyTextApi', SupplierCompanyTextApi);
      }

    get supplierDunningApi(): SupplierDunningApi<DeSerializersT> {
        return this.initApi('supplierDunningApi', SupplierDunningApi);
      }

    get supplierPartnerFuncApi(): SupplierPartnerFuncApi<DeSerializersT> {
        return this.initApi('supplierPartnerFuncApi', SupplierPartnerFuncApi);
      }

    get supplierPurchasingOrgApi(): SupplierPurchasingOrgApi<DeSerializersT> {
        const api = this.initApi('supplierPurchasingOrgApi', SupplierPurchasingOrgApi);
          const linkedApis = [
            this.initApi('supplierPartnerFuncApi', SupplierPartnerFuncApi),
        this.initApi('supplierPurchasingOrgTextApi', SupplierPurchasingOrgTextApi)
          ];
          api._addNavigationProperties(linkedApis);
          return api;
      }

    get supplierPurchasingOrgTextApi(): SupplierPurchasingOrgTextApi<DeSerializersT> {
        return this.initApi('supplierPurchasingOrgTextApi', SupplierPurchasingOrgTextApi);
      }

    get supplierTextApi(): SupplierTextApi<DeSerializersT> {
        return this.initApi('supplierTextApi', SupplierTextApi);
      }

    get supplierWithHoldingTaxApi(): SupplierWithHoldingTaxApi<DeSerializersT> {
        return this.initApi('supplierWithHoldingTaxApi', SupplierWithHoldingTaxApi);
      }

      get batch(): typeof batch {
        return batch;
      }
  }
