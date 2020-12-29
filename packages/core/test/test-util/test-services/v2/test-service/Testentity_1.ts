/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Testentity_1RequestBuilder } from './Testentity_1RequestBuilder';
import { Moment } from 'moment';
import { BigNumber } from 'bignumber.js';
import { TestComplexType, TestComplexTypeField } from './TestComplexType';
import { AllFields, AnyField, BigNumberField, BooleanField, CustomFieldV2, DateField, EntityBuilderType, EntityV2, Field, Link, NumberField, OneToOneLink, StringField, Time, TimeField } from '../../../../../src';

/**
 * This class represents the entity "A_Testentity" of service "API_TEST_SRV".
 */
export class Testentity_1 extends EntityV2 implements Testentity_1Type {
  /**
   * Technical entity name for Testentity_1.
   */
  static _entityName = 'A_Testentity';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  /**
   * Key Property Guid.
   */
  keyPropertyGuid!: string;
  /**
   * Key Property String.
   */
  keyPropertyString!: string;
  /**
   * String Property.
   * Maximum length: 10.
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
   * Something The Sdk Does Not Support.
   * @nullable
   */
  somethingTheSdkDoesNotSupport?: any;
  /**
   * Complex Type Property.
   * @nullable
   */
  complexTypeProperty?: TestComplexType;
  /**
   * One-to-many navigation property to the [[TestEntityMultiLink]] entity.
   */
  toMultiLink!: TestEntityMultiLink[];
  /**
   * One-to-many navigation property to the [[TestEntityOtherMultiLink]] entity.
   */
  toOtherMultiLink!: TestEntityOtherMultiLink[];
  /**
   * One-to-one navigation property to the [[TestEntitySingleLink]] entity.
   */
  toSingleLink!: TestEntitySingleLink;

  /**
   * Returns an entity builder to construct instances of `Testentity_1`.
   * @returns A builder that constructs instances of entity type `Testentity_1`.
   */
  static builder(): EntityBuilderType<Testentity_1, Testentity_1Type> {
    return EntityV2.entityBuilder(Testentity_1);
  }

  /**
   * Returns a request builder to construct requests for operations on the `Testentity_1` entity type.
   * @returns A `Testentity_1` request builder.
   */
  static requestBuilder(): Testentity_1RequestBuilder {
    return new Testentity_1RequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `Testentity_1`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `Testentity_1`.
   */
  static customField(fieldName: string): CustomFieldV2<Testentity_1> {
    return EntityV2.customFieldSelector(fieldName, Testentity_1);
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

import { TestEntityMultiLink, TestEntityMultiLinkType } from './TestEntityMultiLink';
import { TestEntityOtherMultiLink, TestEntityOtherMultiLinkType } from './TestEntityOtherMultiLink';
import { TestEntitySingleLink, TestEntitySingleLinkType } from './TestEntitySingleLink';

export interface Testentity_1Type {
  keyPropertyGuid: string;
  keyPropertyString: string;
  stringProperty?: string | null;
  booleanProperty?: boolean | null;
  guidProperty?: string | null;
  int16Property?: number | null;
  int32Property?: number | null;
  int64Property?: BigNumber | null;
  decimalProperty?: BigNumber | null;
  singleProperty?: number | null;
  doubleProperty?: number | null;
  floatProperty?: number | null;
  timeProperty?: Time | null;
  dateTimeProperty?: Moment | null;
  dateTimeOffSetProperty?: Moment | null;
  byteProperty?: number | null;
  sByteProperty?: number | null;
  somethingTheSdkDoesNotSupport?: any | null;
  complexTypeProperty?: TestComplexType | null;
  toMultiLink: TestEntityMultiLinkType[];
  toOtherMultiLink: TestEntityOtherMultiLinkType[];
  toSingleLink: TestEntitySingleLinkType;
}

export namespace Testentity_1 {
  /**
   * Static representation of the [[keyPropertyGuid]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY_GUID: StringField<Testentity_1> = new StringField('KeyPropertyGuid', Testentity_1, 'Edm.Guid');
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY_STRING: StringField<Testentity_1> = new StringField('KeyPropertyString', Testentity_1, 'Edm.String');
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const STRING_PROPERTY: StringField<Testentity_1> = new StringField('StringProperty', Testentity_1, 'Edm.String');
  /**
   * Static representation of the [[booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BOOLEAN_PROPERTY: BooleanField<Testentity_1> = new BooleanField('BooleanProperty', Testentity_1, 'Edm.Boolean');
  /**
   * Static representation of the [[guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const GUID_PROPERTY: StringField<Testentity_1> = new StringField('GuidProperty', Testentity_1, 'Edm.Guid');
  /**
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const INT_16_PROPERTY: NumberField<Testentity_1> = new NumberField('Int16Property', Testentity_1, 'Edm.Int16');
  /**
   * Static representation of the [[int32Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const INT_32_PROPERTY: NumberField<Testentity_1> = new NumberField('Int32Property', Testentity_1, 'Edm.Int32');
  /**
   * Static representation of the [[int64Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const INT_64_PROPERTY: BigNumberField<Testentity_1> = new BigNumberField('Int64Property', Testentity_1, 'Edm.Int64');
  /**
   * Static representation of the [[decimalProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DECIMAL_PROPERTY: BigNumberField<Testentity_1> = new BigNumberField('DecimalProperty', Testentity_1, 'Edm.Decimal');
  /**
   * Static representation of the [[singleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SINGLE_PROPERTY: NumberField<Testentity_1> = new NumberField('SingleProperty', Testentity_1, 'Edm.Single');
  /**
   * Static representation of the [[doubleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DOUBLE_PROPERTY: NumberField<Testentity_1> = new NumberField('DoubleProperty', Testentity_1, 'Edm.Double');
  /**
   * Static representation of the [[floatProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const FLOAT_PROPERTY: NumberField<Testentity_1> = new NumberField('FloatProperty', Testentity_1, 'Edm.Float');
  /**
   * Static representation of the [[timeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TIME_PROPERTY: TimeField<Testentity_1> = new TimeField('TimeProperty', Testentity_1, 'Edm.Time');
  /**
   * Static representation of the [[dateTimeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DATE_TIME_PROPERTY: DateField<Testentity_1> = new DateField('DateTimeProperty', Testentity_1, 'Edm.DateTime');
  /**
   * Static representation of the [[dateTimeOffSetProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const DATE_TIME_OFF_SET_PROPERTY: DateField<Testentity_1> = new DateField('DateTimeOffSetProperty', Testentity_1, 'Edm.DateTimeOffset');
  /**
   * Static representation of the [[byteProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const BYTE_PROPERTY: NumberField<Testentity_1> = new NumberField('ByteProperty', Testentity_1, 'Edm.Byte');
  /**
   * Static representation of the [[sByteProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const S_BYTE_PROPERTY: NumberField<Testentity_1> = new NumberField('SByteProperty', Testentity_1, 'Edm.SByte');
  /**
   * Static representation of the [[somethingTheSdkDoesNotSupport]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const SOMETHING_THE_SDK_DOES_NOT_SUPPORT: AnyField<Testentity_1> = new AnyField('SomethingTheSDKDoesNotSupport', Testentity_1, 'Edm.Any');
  /**
   * Static representation of the [[complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const COMPLEX_TYPE_PROPERTY: TestComplexTypeField<Testentity_1> = new TestComplexTypeField('ComplexTypeProperty', Testentity_1);
  /**
   * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TO_MULTI_LINK: Link<Testentity_1, TestEntityMultiLink> = new Link('to_MultiLink', Testentity_1, TestEntityMultiLink);
  /**
   * Static representation of the one-to-many navigation property [[toOtherMultiLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TO_OTHER_MULTI_LINK: Link<Testentity_1, TestEntityOtherMultiLink> = new Link('to_OtherMultiLink', Testentity_1, TestEntityOtherMultiLink);
  /**
   * Static representation of the one-to-one navigation property [[toSingleLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const TO_SINGLE_LINK: OneToOneLink<Testentity_1, TestEntitySingleLink> = new OneToOneLink('to_SingleLink', Testentity_1, TestEntitySingleLink);
  /**
   * All fields of the Testentity_1 entity.
   */
  export const _allFields: Array<StringField<Testentity_1> | BooleanField<Testentity_1> | NumberField<Testentity_1> | BigNumberField<Testentity_1> | TimeField<Testentity_1> | DateField<Testentity_1> | AnyField<Testentity_1> | TestComplexTypeField<Testentity_1> | Link<Testentity_1, TestEntityMultiLink> | Link<Testentity_1, TestEntityOtherMultiLink> | OneToOneLink<Testentity_1, TestEntitySingleLink>> = [
    Testentity_1.KEY_PROPERTY_GUID,
    Testentity_1.KEY_PROPERTY_STRING,
    Testentity_1.STRING_PROPERTY,
    Testentity_1.BOOLEAN_PROPERTY,
    Testentity_1.GUID_PROPERTY,
    Testentity_1.INT_16_PROPERTY,
    Testentity_1.INT_32_PROPERTY,
    Testentity_1.INT_64_PROPERTY,
    Testentity_1.DECIMAL_PROPERTY,
    Testentity_1.SINGLE_PROPERTY,
    Testentity_1.DOUBLE_PROPERTY,
    Testentity_1.FLOAT_PROPERTY,
    Testentity_1.TIME_PROPERTY,
    Testentity_1.DATE_TIME_PROPERTY,
    Testentity_1.DATE_TIME_OFF_SET_PROPERTY,
    Testentity_1.BYTE_PROPERTY,
    Testentity_1.S_BYTE_PROPERTY,
    Testentity_1.SOMETHING_THE_SDK_DOES_NOT_SUPPORT,
    Testentity_1.COMPLEX_TYPE_PROPERTY,
    Testentity_1.TO_MULTI_LINK,
    Testentity_1.TO_OTHER_MULTI_LINK,
    Testentity_1.TO_SINGLE_LINK
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<Testentity_1> = new AllFields('*', Testentity_1);
  /**
   * All key fields of the Testentity_1 entity.
   */
  export const _keyFields: Array<Field<Testentity_1>> = [Testentity_1.KEY_PROPERTY_GUID, Testentity_1.KEY_PROPERTY_STRING];
  /**
   * Mapping of all key field names to the respective static field property Testentity_1.
   */
  export const _keys: { [keys: string]: Field<Testentity_1> } = Testentity_1._keyFields.reduce((acc: { [keys: string]: Field<Testentity_1> }, field: Field<Testentity_1>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
