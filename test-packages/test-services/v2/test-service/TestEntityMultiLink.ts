/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityMultiLinkRequestBuilder } from './TestEntityMultiLinkRequestBuilder';
import {
  CustomField,
  defaultDeSerializers,
  DeSerializationMiddleware,
  Entity
} from '@sap-cloud-sdk/odata-v2';
import {
  AllFields,
  Constructable,
  EdmTypeField,
  EntityBuilderType,
  Field,
  FieldBuilder,
  Link,
  OneToOneLink,
  OrderableEdmTypeField,
  Time
} from '@sap-cloud-sdk/odata-common';
import {
  CustomDeSerializer,
  getDeSerializers
} from '@sap-cloud-sdk/odata-v2/dist/de-serializers/get-de-serializers';

/**
 * This class represents the entity "A_TestEntityMultiLink" of service "API_TEST_SRV".
 */
export class TestEntityMultiLink<
    T extends DeSerializationMiddlewareV2BASE = DeSerializationMiddleware
  >
  extends Entity
  implements TestEntityMultiLinkType<T>
{
  /**
   * Technical entity name for TestEntityMultiLink.
   */
  static _entityName = 'A_TestEntityMultiLink';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';

  static _keys = ['KeyProperty'];
  /**
   * Key Property.
   * Maximum length: 10.
   */
  keyProperty!: DeserializedType<T, 'Edm.String'>;
  /**
   * String Property.
   * Maximum length: 10.
   * @nullable
   */
  stringProperty?: DeserializedType<T, 'Edm.String'>;
  /**
   * Boolean Property.
   * @nullable
   */
  booleanProperty?: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Guid Property.
   * @nullable
   */
  guidProperty?: DeserializedType<T, 'Edm.Guid'>;
  /**
   * Int 16 Property.
   * @nullable
   */
  int16Property?: DeserializedType<T, 'Edm.Int16'>;
  /**
   * One-to-many navigation property to the [[TestEntityLvl2MultiLink]] entity.
   */
  toMultiLink!: TestEntityLvl2MultiLink[];
  /**
   * One-to-one navigation property to the [[TestEntityLvl2SingleLink]] entity.
   */
  toSingleLink?: TestEntityLvl2SingleLink | null;

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityMultiLink`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityMultiLink`.
   */
  // static customField(fieldName: string): CustomField<TestEntityMultiLink> {
  //   return Entity.customFieldSelector(fieldName, TestEntityMultiLink);
  // }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

import {
  TestEntityLvl2MultiLink,
  TestEntityLvl2MultiLinkType
} from './TestEntityLvl2MultiLink';
import {
  TestEntityLvl2SingleLink,
  TestEntityLvl2SingleLinkType
} from './TestEntityLvl2SingleLink';
import { DeSerializationMiddlewareV2BASE } from '@sap-cloud-sdk/odata-v2/dist/de-serializers/de-serialization-middleware';
import { DeserializedType } from '@sap-cloud-sdk/odata-common/dist/de-serializers/de-serialization-middleware';
import { NewFieldBuilder } from '@sap-cloud-sdk/odata-common/dist/selectable/field-builder-new';
import { ConstructableBASE } from '@sap-cloud-sdk/odata-common/dist/entity-base';
import BigNumber from 'bignumber.js';

export interface TestEntityMultiLinkType<
  T extends DeSerializationMiddlewareV2BASE = DeSerializationMiddleware
> {
  keyProperty: DeserializedType<T, 'Edm.String'>;
  stringProperty?: DeserializedType<T, 'Edm.String'> | null;
  booleanProperty?: DeserializedType<T, 'Edm.Boolean'> | null;
  guidProperty?: DeserializedType<T, 'Edm.Guid'> | null;
  int16Property?: DeserializedType<T, 'Edm.Int16'> | null;
  toMultiLink: TestEntityLvl2MultiLinkType[];
  toSingleLink?: TestEntityLvl2SingleLinkType | null;
}

export class TestEntityMultiLinkApi<
  BinaryT = string,
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
  DateTimeT = moment.Moment,
  DateTimeOffsetT = moment.Moment,
  TimeT = Time
> implements
    ConstructableBASE<
      TestEntityMultiLink<
        DeSerializationMiddleware<
          BinaryT,
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
          DateTimeT,
          DateTimeOffsetT,
          TimeT
        >
      >,
      DeSerializationMiddleware<
        BinaryT,
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
        DateTimeT,
        DateTimeOffsetT,
        TimeT
      >,
      TestEntityMultiLinkType<
        DeSerializationMiddleware<
          BinaryT,
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
          DateTimeT,
          DateTimeOffsetT,
          TimeT
        >
      >
    >
{
  public deSerializers: DeSerializationMiddleware<
    BinaryT,
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
    DateTimeT,
    DateTimeOffsetT,
    TimeT
  >;
  constructor(
    deSerializers: Partial<
      DeSerializationMiddleware<
        BinaryT,
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
        DateTimeT,
        DateTimeOffsetT,
        TimeT
      >
    > = defaultDeSerializers as any
  ) {
    this.deSerializers = getDeSerializers(deSerializers);
  }

  schema() {
    const _fieldBuilder = new NewFieldBuilder(
      TestEntityMultiLink,
      this.deSerializers
    );

    return {
      /**
       * Static representation of the [[keyProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      KEY_PROPERTY: _fieldBuilder.buildEdmTypeField(
        'KeyProperty',
        'Edm.String',
        false
      ),
      /**
       * Static representation of the [[stringProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      STRING_PROPERTY: _fieldBuilder.buildEdmTypeField(
        'StringProperty',
        'Edm.String',
        true
      ),
      /**
       * Static representation of the [[booleanProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      BOOLEAN_PROPERTY: _fieldBuilder.buildEdmTypeField(
        'BooleanProperty',
        'Edm.Boolean',
        true
      ),
      /**
       * Static representation of the [[guidProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      GUID_PROPERTY: _fieldBuilder.buildEdmTypeField(
        'GuidProperty',
        'Edm.Guid',
        true
      ),
      /**
       * Static representation of the [[int16Property]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      INT_16_PROPERTY: _fieldBuilder.buildEdmTypeField(
        'Int16Property',
        'Edm.Int16',
        true
      )
    };
  }

  requestBuilder(): TestEntityMultiLinkRequestBuilder<
    typeof this.deSerializers
  > {
    return new TestEntityMultiLinkRequestBuilder(
      this.deSerializers,
      this.schema()
    );
  }

  entityBuilder(): EntityBuilderType<
    TestEntityMultiLink<typeof this.deSerializers>,
    TestEntityMultiLinkType<typeof this.deSerializers>
  > {
    return Entity.entityBuilder(
      TestEntityMultiLink as any,
      this.deSerializers,
      this.schema()
    ) as any;
  }
}
