"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerUnloadingPointApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const CustomerUnloadingPoint_1 = require("./CustomerUnloadingPoint");
const CustomerUnloadingPointRequestBuilder_1 = require("./CustomerUnloadingPointRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class CustomerUnloadingPointApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = CustomerUnloadingPoint_1.CustomerUnloadingPoint;
        this.deSerializers = deSerializers;
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {};
        return this;
    }
    requestBuilder() {
        return new CustomerUnloadingPointRequestBuilder_1.CustomerUnloadingPointRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get schema() {
        const fieldBuilder = new odata_v2_1.FieldBuilder(CustomerUnloadingPoint_1.CustomerUnloadingPoint, this.deSerializers);
        return {
            /**
         * Static representation of the [[customer]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
            CUSTOMER: fieldBuilder.buildEdmTypeField('Customer', 'Edm.String', false),
            /**
             * Static representation of the [[unloadingPointName]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            UNLOADING_POINT_NAME: fieldBuilder.buildEdmTypeField('UnloadingPointName', 'Edm.String', false),
            /**
             * Static representation of the [[customerFactoryCalenderCode]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            CUSTOMER_FACTORY_CALENDER_CODE: fieldBuilder.buildEdmTypeField('CustomerFactoryCalenderCode', 'Edm.String', true),
            /**
             * Static representation of the [[bpGoodsReceivingHoursCode]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            BP_GOODS_RECEIVING_HOURS_CODE: fieldBuilder.buildEdmTypeField('BPGoodsReceivingHoursCode', 'Edm.String', true),
            /**
             * Static representation of the [[isDfltBpUnloadingPoint]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            IS_DFLT_BP_UNLOADING_POINT: fieldBuilder.buildEdmTypeField('IsDfltBPUnloadingPoint', 'Edm.Boolean', true),
            /**
             * Static representation of the [[mondayMorningOpeningTime]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            MONDAY_MORNING_OPENING_TIME: fieldBuilder.buildEdmTypeField('MondayMorningOpeningTime', 'Edm.Time', true),
            /**
             * Static representation of the [[mondayMorningClosingTime]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            MONDAY_MORNING_CLOSING_TIME: fieldBuilder.buildEdmTypeField('MondayMorningClosingTime', 'Edm.Time', true),
            /**
             * Static representation of the [[mondayAfternoonOpeningTime]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            MONDAY_AFTERNOON_OPENING_TIME: fieldBuilder.buildEdmTypeField('MondayAfternoonOpeningTime', 'Edm.Time', true),
            /**
             * Static representation of the [[mondayAfternoonClosingTime]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            MONDAY_AFTERNOON_CLOSING_TIME: fieldBuilder.buildEdmTypeField('MondayAfternoonClosingTime', 'Edm.Time', true),
            /**
             * Static representation of the [[tuesdayMorningOpeningTime]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            TUESDAY_MORNING_OPENING_TIME: fieldBuilder.buildEdmTypeField('TuesdayMorningOpeningTime', 'Edm.Time', true),
            /**
             * Static representation of the [[tuesdayMorningClosingTime]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            TUESDAY_MORNING_CLOSING_TIME: fieldBuilder.buildEdmTypeField('TuesdayMorningClosingTime', 'Edm.Time', true),
            /**
             * Static representation of the [[tuesdayAfternoonOpeningTime]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            TUESDAY_AFTERNOON_OPENING_TIME: fieldBuilder.buildEdmTypeField('TuesdayAfternoonOpeningTime', 'Edm.Time', true),
            /**
             * Static representation of the [[tuesdayAfternoonClosingTime]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            TUESDAY_AFTERNOON_CLOSING_TIME: fieldBuilder.buildEdmTypeField('TuesdayAfternoonClosingTime', 'Edm.Time', true),
            /**
             * Static representation of the [[wednesdayMorningOpeningTime]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            WEDNESDAY_MORNING_OPENING_TIME: fieldBuilder.buildEdmTypeField('WednesdayMorningOpeningTime', 'Edm.Time', true),
            /**
             * Static representation of the [[wednesdayMorningClosingTime]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            WEDNESDAY_MORNING_CLOSING_TIME: fieldBuilder.buildEdmTypeField('WednesdayMorningClosingTime', 'Edm.Time', true),
            /**
             * Static representation of the [[wednesdayAfternoonOpeningTime]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            WEDNESDAY_AFTERNOON_OPENING_TIME: fieldBuilder.buildEdmTypeField('WednesdayAfternoonOpeningTime', 'Edm.Time', true),
            /**
             * Static representation of the [[wednesdayAfternoonClosingTime]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            WEDNESDAY_AFTERNOON_CLOSING_TIME: fieldBuilder.buildEdmTypeField('WednesdayAfternoonClosingTime', 'Edm.Time', true),
            /**
             * Static representation of the [[thursdayMorningOpeningTime]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            THURSDAY_MORNING_OPENING_TIME: fieldBuilder.buildEdmTypeField('ThursdayMorningOpeningTime', 'Edm.Time', true),
            /**
             * Static representation of the [[thursdayMorningClosingTime]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            THURSDAY_MORNING_CLOSING_TIME: fieldBuilder.buildEdmTypeField('ThursdayMorningClosingTime', 'Edm.Time', true),
            /**
             * Static representation of the [[thursdayAfternoonOpeningTime]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            THURSDAY_AFTERNOON_OPENING_TIME: fieldBuilder.buildEdmTypeField('ThursdayAfternoonOpeningTime', 'Edm.Time', true),
            /**
             * Static representation of the [[thursdayAfternoonClosingTime]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            THURSDAY_AFTERNOON_CLOSING_TIME: fieldBuilder.buildEdmTypeField('ThursdayAfternoonClosingTime', 'Edm.Time', true),
            /**
             * Static representation of the [[fridayMorningOpeningTime]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            FRIDAY_MORNING_OPENING_TIME: fieldBuilder.buildEdmTypeField('FridayMorningOpeningTime', 'Edm.Time', true),
            /**
             * Static representation of the [[fridayMorningClosingTime]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            FRIDAY_MORNING_CLOSING_TIME: fieldBuilder.buildEdmTypeField('FridayMorningClosingTime', 'Edm.Time', true),
            /**
             * Static representation of the [[fridayAfternoonOpeningTime]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            FRIDAY_AFTERNOON_OPENING_TIME: fieldBuilder.buildEdmTypeField('FridayAfternoonOpeningTime', 'Edm.Time', true),
            /**
             * Static representation of the [[fridayAfternoonClosingTime]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            FRIDAY_AFTERNOON_CLOSING_TIME: fieldBuilder.buildEdmTypeField('FridayAfternoonClosingTime', 'Edm.Time', true),
            /**
             * Static representation of the [[saturdayMorningOpeningTime]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            SATURDAY_MORNING_OPENING_TIME: fieldBuilder.buildEdmTypeField('SaturdayMorningOpeningTime', 'Edm.Time', true),
            /**
             * Static representation of the [[saturdayMorningClosingTime]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            SATURDAY_MORNING_CLOSING_TIME: fieldBuilder.buildEdmTypeField('SaturdayMorningClosingTime', 'Edm.Time', true),
            /**
             * Static representation of the [[saturdayAfternoonOpeningTime]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            SATURDAY_AFTERNOON_OPENING_TIME: fieldBuilder.buildEdmTypeField('SaturdayAfternoonOpeningTime', 'Edm.Time', true),
            /**
             * Static representation of the [[saturdayAfternoonClosingTime]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            SATURDAY_AFTERNOON_CLOSING_TIME: fieldBuilder.buildEdmTypeField('SaturdayAfternoonClosingTime', 'Edm.Time', true),
            /**
             * Static representation of the [[sundayMorningOpeningTime]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            SUNDAY_MORNING_OPENING_TIME: fieldBuilder.buildEdmTypeField('SundayMorningOpeningTime', 'Edm.Time', true),
            /**
             * Static representation of the [[sundayMorningClosingTime]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            SUNDAY_MORNING_CLOSING_TIME: fieldBuilder.buildEdmTypeField('SundayMorningClosingTime', 'Edm.Time', true),
            /**
             * Static representation of the [[sundayAfternoonOpeningTime]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            SUNDAY_AFTERNOON_OPENING_TIME: fieldBuilder.buildEdmTypeField('SundayAfternoonOpeningTime', 'Edm.Time', true),
            /**
             * Static representation of the [[sundayAfternoonClosingTime]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            SUNDAY_AFTERNOON_CLOSING_TIME: fieldBuilder.buildEdmTypeField('SundayAfternoonClosingTime', 'Edm.Time', true),
            ...this.navigationPropertyFields,
            /**
             *
             * All fields selector.
             */
            ALL_FIELDS: new odata_v2_1.AllFields('*', CustomerUnloadingPoint_1.CustomerUnloadingPoint)
        };
    }
}
exports.CustomerUnloadingPointApi = CustomerUnloadingPointApi;
//# sourceMappingURL=CustomerUnloadingPointApi.js.map