import { CustomField, DefaultDeSerializers, DeSerializers, AllFields, EntityBuilderType, EntityApi, EdmTypeField, OrderableEdmTypeField } from '@sap-cloud-sdk/odata-v2';
import { CustomerUnloadingPoint } from './CustomerUnloadingPoint';
import { CustomerUnloadingPointRequestBuilder } from './CustomerUnloadingPointRequestBuilder';
export declare class CustomerUnloadingPointApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements EntityApi<CustomerUnloadingPoint<DeSerializersT>, DeSerializersT> {
    deSerializers: DeSerializersT;
    constructor(deSerializers?: DeSerializersT);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
    ]): this;
    entityConstructor: typeof CustomerUnloadingPoint;
    requestBuilder(): CustomerUnloadingPointRequestBuilder<DeSerializersT>;
    entityBuilder(): EntityBuilderType<CustomerUnloadingPoint<DeSerializersT>, DeSerializersT>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<CustomerUnloadingPoint<DeSerializersT>, DeSerializersT, NullableT>;
    get schema(): {
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: AllFields<CustomerUnloadingPoint<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
        /**
     * Static representation of the [[customer]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
        CUSTOMER: EdmTypeField<CustomerUnloadingPoint<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[unloadingPointName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        UNLOADING_POINT_NAME: EdmTypeField<CustomerUnloadingPoint<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[customerFactoryCalenderCode]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CUSTOMER_FACTORY_CALENDER_CODE: EdmTypeField<CustomerUnloadingPoint<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[bpGoodsReceivingHoursCode]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BP_GOODS_RECEIVING_HOURS_CODE: EdmTypeField<CustomerUnloadingPoint<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[isDfltBpUnloadingPoint]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IS_DFLT_BP_UNLOADING_POINT: EdmTypeField<CustomerUnloadingPoint<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[mondayMorningOpeningTime]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        MONDAY_MORNING_OPENING_TIME: OrderableEdmTypeField<CustomerUnloadingPoint<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Time', true, true>;
        /**
         * Static representation of the [[mondayMorningClosingTime]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        MONDAY_MORNING_CLOSING_TIME: OrderableEdmTypeField<CustomerUnloadingPoint<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Time', true, true>;
        /**
         * Static representation of the [[mondayAfternoonOpeningTime]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        MONDAY_AFTERNOON_OPENING_TIME: OrderableEdmTypeField<CustomerUnloadingPoint<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Time', true, true>;
        /**
         * Static representation of the [[mondayAfternoonClosingTime]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        MONDAY_AFTERNOON_CLOSING_TIME: OrderableEdmTypeField<CustomerUnloadingPoint<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Time', true, true>;
        /**
         * Static representation of the [[tuesdayMorningOpeningTime]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TUESDAY_MORNING_OPENING_TIME: OrderableEdmTypeField<CustomerUnloadingPoint<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Time', true, true>;
        /**
         * Static representation of the [[tuesdayMorningClosingTime]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TUESDAY_MORNING_CLOSING_TIME: OrderableEdmTypeField<CustomerUnloadingPoint<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Time', true, true>;
        /**
         * Static representation of the [[tuesdayAfternoonOpeningTime]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TUESDAY_AFTERNOON_OPENING_TIME: OrderableEdmTypeField<CustomerUnloadingPoint<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Time', true, true>;
        /**
         * Static representation of the [[tuesdayAfternoonClosingTime]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TUESDAY_AFTERNOON_CLOSING_TIME: OrderableEdmTypeField<CustomerUnloadingPoint<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Time', true, true>;
        /**
         * Static representation of the [[wednesdayMorningOpeningTime]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        WEDNESDAY_MORNING_OPENING_TIME: OrderableEdmTypeField<CustomerUnloadingPoint<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Time', true, true>;
        /**
         * Static representation of the [[wednesdayMorningClosingTime]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        WEDNESDAY_MORNING_CLOSING_TIME: OrderableEdmTypeField<CustomerUnloadingPoint<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Time', true, true>;
        /**
         * Static representation of the [[wednesdayAfternoonOpeningTime]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        WEDNESDAY_AFTERNOON_OPENING_TIME: OrderableEdmTypeField<CustomerUnloadingPoint<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Time', true, true>;
        /**
         * Static representation of the [[wednesdayAfternoonClosingTime]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        WEDNESDAY_AFTERNOON_CLOSING_TIME: OrderableEdmTypeField<CustomerUnloadingPoint<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Time', true, true>;
        /**
         * Static representation of the [[thursdayMorningOpeningTime]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        THURSDAY_MORNING_OPENING_TIME: OrderableEdmTypeField<CustomerUnloadingPoint<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Time', true, true>;
        /**
         * Static representation of the [[thursdayMorningClosingTime]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        THURSDAY_MORNING_CLOSING_TIME: OrderableEdmTypeField<CustomerUnloadingPoint<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Time', true, true>;
        /**
         * Static representation of the [[thursdayAfternoonOpeningTime]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        THURSDAY_AFTERNOON_OPENING_TIME: OrderableEdmTypeField<CustomerUnloadingPoint<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Time', true, true>;
        /**
         * Static representation of the [[thursdayAfternoonClosingTime]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        THURSDAY_AFTERNOON_CLOSING_TIME: OrderableEdmTypeField<CustomerUnloadingPoint<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Time', true, true>;
        /**
         * Static representation of the [[fridayMorningOpeningTime]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FRIDAY_MORNING_OPENING_TIME: OrderableEdmTypeField<CustomerUnloadingPoint<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Time', true, true>;
        /**
         * Static representation of the [[fridayMorningClosingTime]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FRIDAY_MORNING_CLOSING_TIME: OrderableEdmTypeField<CustomerUnloadingPoint<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Time', true, true>;
        /**
         * Static representation of the [[fridayAfternoonOpeningTime]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FRIDAY_AFTERNOON_OPENING_TIME: OrderableEdmTypeField<CustomerUnloadingPoint<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Time', true, true>;
        /**
         * Static representation of the [[fridayAfternoonClosingTime]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FRIDAY_AFTERNOON_CLOSING_TIME: OrderableEdmTypeField<CustomerUnloadingPoint<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Time', true, true>;
        /**
         * Static representation of the [[saturdayMorningOpeningTime]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SATURDAY_MORNING_OPENING_TIME: OrderableEdmTypeField<CustomerUnloadingPoint<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Time', true, true>;
        /**
         * Static representation of the [[saturdayMorningClosingTime]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SATURDAY_MORNING_CLOSING_TIME: OrderableEdmTypeField<CustomerUnloadingPoint<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Time', true, true>;
        /**
         * Static representation of the [[saturdayAfternoonOpeningTime]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SATURDAY_AFTERNOON_OPENING_TIME: OrderableEdmTypeField<CustomerUnloadingPoint<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Time', true, true>;
        /**
         * Static representation of the [[saturdayAfternoonClosingTime]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SATURDAY_AFTERNOON_CLOSING_TIME: OrderableEdmTypeField<CustomerUnloadingPoint<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Time', true, true>;
        /**
         * Static representation of the [[sundayMorningOpeningTime]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUNDAY_MORNING_OPENING_TIME: OrderableEdmTypeField<CustomerUnloadingPoint<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Time', true, true>;
        /**
         * Static representation of the [[sundayMorningClosingTime]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUNDAY_MORNING_CLOSING_TIME: OrderableEdmTypeField<CustomerUnloadingPoint<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Time', true, true>;
        /**
         * Static representation of the [[sundayAfternoonOpeningTime]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUNDAY_AFTERNOON_OPENING_TIME: OrderableEdmTypeField<CustomerUnloadingPoint<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Time', true, true>;
        /**
         * Static representation of the [[sundayAfternoonClosingTime]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUNDAY_AFTERNOON_CLOSING_TIME: OrderableEdmTypeField<CustomerUnloadingPoint<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Time', true, true>;
    };
}
// # sourceMappingURL=CustomerUnloadingPointApi.d.ts.map
