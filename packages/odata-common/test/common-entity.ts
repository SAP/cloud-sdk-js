/* eslint-disable */
/* This entity was generated from the COMMON_SRV.edmx and the generate-test-service.ts script.
The idea behind this entity is to use only odata-common imports and use it in the tests for the odata-common functionality.*/
import BigNumber from 'bignumber.js';
import {
  AllFields,
  Constructable,
  EntityBuilderType,
  Field,
  OrderableEdmTypeField,
  CustomField,
  ComplexTypeField,
  ConstructorOrField,
  EdmTypeField,
  FieldBuilder,
  FieldOptions,
  FieldType,
  PropertyMetadata,
  EntityBase as Entity,
  DeSerializers,
  DefaultDeSerializers,
  DeserializedType,
  Time,
  EntityApi,
  RequestBuilder,
  defaultDeSerializers,
  mergeDefaultDeSerializersWith
} from '../src/internal';
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */

export interface CommonComplexType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  stringProperty: DeserializedType<DeSerializersT, 'Edm.String'>;
  booleanProperty?: boolean;
}

export class CommonComplexTypeField<
  EntityT extends Entity,
  DeSerializersT extends DeSerializers,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<
  EntityT,
  DeSerializersT,
  CommonComplexType,
  NullableT,
  SelectableT
> {
  private _fieldBuilder: FieldBuilder<this, DeSerializersT> = new FieldBuilder(
    this,
    this.deSerializers
  );
  stringProperty: EdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.String',
    false,
    false
  > = this._fieldBuilder.buildEdmTypeField(
    'StringProperty',
    'Edm.String',
    false
  );
  booleanProperty: EdmTypeField<
    EntityT,
    DeSerializersT,
    'Edm.Boolean',
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField(
    'BooleanProperty',
    'Edm.Boolean',
    true
  );

  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    deSerializers: DeSerializersT,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  ) {
    super(fieldName, fieldOf, deSerializers, CommonComplexType, fieldOptions);
  }
}

export namespace CommonComplexType {
  export const _propertyMetadata: PropertyMetadata<CommonComplexType>[] = [
    {
      originalName: 'StringProperty',
      name: 'stringProperty',
      type: 'Edm.String',
      isCollection: false
    },
    {
      originalName: 'BooleanProperty',
      name: 'booleanProperty',
      type: 'Edm.Boolean',
      isCollection: false
    }
  ];
}

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */

export class CommonEntity<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements CommonEntityType<DeSerializersT>
{
  static _entityName = 'A_CommonEntity';
  readonly _oDataVersion: any;
  static _defaultServicePath = '/sap/opu/odata/sap/API_COMMON_ENTITY_SRV/';
  static _keys = ['KeyPropertyGuid', 'KeyPropertyString'];
  keyPropertyGuid!: DeserializedType<DeSerializersT, 'Edm.Guid'>;
  keyPropertyString!: DeserializedType<DeSerializersT, 'Edm.String'>;
  stringProperty?: DeserializedType<DeSerializersT, 'Edm.String'>;
  int16Property?: DeserializedType<DeSerializersT, 'Edm.Int16'>;
  complexTypeProperty?: CommonComplexType;

  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface CommonEntityType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  keyPropertyGuid: DeserializedType<DeSerializersT, 'Edm.Guid'>;
  keyPropertyString: DeserializedType<DeSerializersT, 'Edm.String'>;
  stringProperty?: DeserializedType<DeSerializersT, 'Edm.String'> | null;
  int16Property?: DeserializedType<DeSerializersT, 'Edm.Int16'> | null;
  complexTypeProperty?: CommonComplexType | null;
}

export class CommonEntityApi<
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
  AnyT = any
> implements
    EntityApi<
      CommonEntity<
        DeSerializers<
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
          AnyT
        >
      >,
      DeSerializers<
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
        AnyT
      >
    >
{
  public deSerializers: DeSerializers<
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
    AnyT
  >;
  public schema;

  constructor(
    deSerializers: Partial<
      DeSerializers<
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
        AnyT
      >
    > = defaultDeSerializers as any
  ) {
    this.deSerializers = mergeDefaultDeSerializersWith(deSerializers);
    const fieldBuilder = new FieldBuilder(CommonEntity, this.deSerializers);

    this.schema = {
      KEY_PROPERTY_GUID: fieldBuilder.buildEdmTypeField(
        'KeyPropertyGuid',
        'Edm.Guid',
        false
      ),
      KEY_PROPERTY_STRING: fieldBuilder.buildEdmTypeField(
        'KeyPropertyString',
        'Edm.String',
        false
      ),
      STRING_PROPERTY: fieldBuilder.buildEdmTypeField(
        'StringProperty',
        'Edm.String',
        true
      ),
      INT_16_PROPERTY: fieldBuilder.buildEdmTypeField(
        'Int16Property',
        'Edm.Int16',
        true
      ),
      COMPLEX_TYPE_PROPERTY: fieldBuilder.buildComplexTypeField(
        'ComplexTypeProperty',
        CommonComplexTypeField,
        true
      ),
      ALL_FIELDS: new AllFields('*', CommonEntity) as AllFields<CommonEntity>
    };
  }

  requestBuilder(): RequestBuilder<CommonEntity<any>, any> {
    throw new Error('Method not implemented.');
  }

  entityBuilder(): EntityBuilderType<CommonEntity<any>> {
    throw new Error('Method not implemented.');
  }

  entityConstructor = CommonEntity;
}
