import { Moment } from 'moment';
import { BigNumber } from 'bignumber.js';
import { TestNestedComplexType, TestNestedComplexTypeField } from './TestNestedComplexType';
import { ComplexTypeBigNumberPropertyField, ComplexTypeBooleanPropertyField, ComplexTypeDatePropertyField, ComplexTypeField, ComplexTypeNumberPropertyField, ComplexTypeStringPropertyField, ComplexTypeTimePropertyField, Entity, FieldType, Time } from '@sap-cloud-sdk/core';
/**
 * TestComplexType
 */
export interface TestComplexType {
    /**
     * String Property.
     * @nullable
     */
    stringProperty?: string;
    /**
     * Boolean Property.
     * @nullable
     */
    booleanProperty?: boolean;
    /**
     * Guid Property.
     * @nullable
     */
    guidProperty?: string;
    /**
     * Int 16 Property.
     * @nullable
     */
    int16Property?: number;
    /**
     * Int 32 Property.
     * @nullable
     */
    int32Property?: number;
    /**
     * Int 64 Property.
     * @nullable
     */
    int64Property?: BigNumber;
    /**
     * Decimal Property.
     * @nullable
     */
    decimalProperty?: BigNumber;
    /**
     * Single Property.
     * @nullable
     */
    singleProperty?: number;
    /**
     * Double Property.
     * @nullable
     */
    doubleProperty?: number;
    /**
     * Float Property.
     * @nullable
     */
    floatProperty?: number;
    /**
     * Time Property.
     * @nullable
     */
    timeProperty?: Time;
    /**
     * Date Time Property.
     * @nullable
     */
    dateTimeProperty?: Moment;
    /**
     * Date Time Off Set Property.
     * @nullable
     */
    dateTimeOffSetProperty?: Moment;
    /**
     * Byte Property.
     * @nullable
     */
    byteProperty?: number;
    /**
     * S Byte Property.
     * @nullable
     */
    sByteProperty?: number;
    /**
     * Complex Type Property.
     * @nullable
     */
    complexTypeProperty?: TestNestedComplexType;
}
/**
 * @deprecated Since v1.6.0. Use [[TestComplexType.build]] instead.
 */
export declare function createTestComplexType_1(json: any): TestComplexType;
/**
 * TestComplexTypeField
 * @typeparam EntityT - Type of the entity the complex type field belongs to.
 */
export declare class TestComplexTypeField<EntityT extends Entity> extends ComplexTypeField<EntityT> {
    /**
     * Representation of the [[TestComplexType.stringProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    stringProperty: ComplexTypeStringPropertyField<EntityT>;
    /**
     * Representation of the [[TestComplexType.booleanProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    booleanProperty: ComplexTypeBooleanPropertyField<EntityT>;
    /**
     * Representation of the [[TestComplexType.guidProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    guidProperty: ComplexTypeStringPropertyField<EntityT>;
    /**
     * Representation of the [[TestComplexType.int16Property]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    int16Property: ComplexTypeNumberPropertyField<EntityT>;
    /**
     * Representation of the [[TestComplexType.int32Property]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    int32Property: ComplexTypeNumberPropertyField<EntityT>;
    /**
     * Representation of the [[TestComplexType.int64Property]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    int64Property: ComplexTypeBigNumberPropertyField<EntityT>;
    /**
     * Representation of the [[TestComplexType.decimalProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    decimalProperty: ComplexTypeBigNumberPropertyField<EntityT>;
    /**
     * Representation of the [[TestComplexType.singleProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    singleProperty: ComplexTypeNumberPropertyField<EntityT>;
    /**
     * Representation of the [[TestComplexType.doubleProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    doubleProperty: ComplexTypeNumberPropertyField<EntityT>;
    /**
     * Representation of the [[TestComplexType.floatProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    floatProperty: ComplexTypeNumberPropertyField<EntityT>;
    /**
     * Representation of the [[TestComplexType.timeProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    timeProperty: ComplexTypeTimePropertyField<EntityT>;
    /**
     * Representation of the [[TestComplexType.dateTimeProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    dateTimeProperty: ComplexTypeDatePropertyField<EntityT>;
    /**
     * Representation of the [[TestComplexType.dateTimeOffSetProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    dateTimeOffSetProperty: ComplexTypeDatePropertyField<EntityT>;
    /**
     * Representation of the [[TestComplexType.byteProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    byteProperty: ComplexTypeNumberPropertyField<EntityT>;
    /**
     * Representation of the [[TestComplexType.sByteProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    sByteProperty: ComplexTypeNumberPropertyField<EntityT>;
    /**
     * Representation of the [[TestComplexType.complexTypeProperty]] property for query construction.
     * Use to reference this property in query operations such as 'filter' in the fluent request API.
     */
    complexTypeProperty: TestNestedComplexTypeField<EntityT>;
}
export declare namespace TestComplexType {
    function build(json: {
        [keys: string]: FieldType;
    }): TestComplexType;
}
//# sourceMappingURL=TestComplexType.d.ts.map