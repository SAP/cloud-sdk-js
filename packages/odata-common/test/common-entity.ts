/* eslint-disable */
/* This entity was generated from the COMMON_SRV.edmx and the generate-test-service.ts script.
The idea behind this entity is to use only odata-common imports and use it in the tests for the odata-common functionality.*/

import { Moment } from 'moment';
import { BigNumber } from 'bignumber.js';
import {
  AllFields,
  Constructable,
  EntityBuilderType,
  entityBuilder,
  OneToOneLink,
  defaultDeSerializers,
  mergeDefaultDeSerializersWith,
  Time,
  EntityApi,
  Field,
  DeSerializers,
  DefaultDeSerializers,
  DeserializedType,
  CollectionField,
  OrderableEdmTypeField,
  CustomField,
  ComplexTypeField,
  ConstructorOrField,
  EdmTypeField,
  FieldBuilder,
  FieldOptions,
  PropertyMetadata,
  EntityBase as Entity
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
  booleanProperty?: DeserializedType<DeSerializersT, 'Edm.Boolean'>;
  complexTypeProperty?: DeserializedType<
    DeSerializersT,
    'API_COMMON_SRV.A_NestedComplexType'
  >;
}

export class CommonComplexTypeField<
  EntityT extends Entity,
  DeSerializersT extends DeSerializers = DefaultDeSerializers,
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
  complexTypeProperty: NestedComplexTypeField<
    EntityT,
    DeSerializersT,
    true,
    false
  > = this._fieldBuilder.buildComplexTypeField(
    'ComplexTypeProperty',
    NestedComplexTypeField,
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
    },
    {
      originalName: 'ComplexTypeProperty',
      name: 'complexTypeProperty',
      type: NestedComplexType,
      isCollection: false
    }
  ];
}

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */

export interface NestedComplexType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  stringProperty?: DeserializedType<DeSerializersT, 'Edm.String'>;
}

export class NestedComplexTypeField<
  EntityT extends Entity,
  DeSerializersT extends DeSerializers = DefaultDeSerializers,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<
  EntityT,
  DeSerializersT,
  NestedComplexType,
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
    true,
    false
  > = this._fieldBuilder.buildEdmTypeField(
    'StringProperty',
    'Edm.String',
    true
  );

  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    deSerializers: DeSerializersT,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  ) {
    super(fieldName, fieldOf, deSerializers, NestedComplexType, fieldOptions);
  }
}

export namespace NestedComplexType {
  export const _propertyMetadata: PropertyMetadata<NestedComplexType>[] = [
    {
      originalName: 'StringProperty',
      name: 'stringProperty',
      type: 'Edm.String',
      isCollection: false
    }
  ];
}

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */

export class CommonEntitySingleLink<
    T extends DeSerializers = DefaultDeSerializers
  >
  extends Entity
  implements CommonEntitySingleLinkType<T>
{
  static _entityName = 'A_CommonEntitySingleLink';
  readonly _oDataVersion: any;
  static _defaultServicePath = '/sap/opu/odata/sap/API_COMMON_SRV';
  static _keys = ['KeyProperty'];
  keyProperty!: DeserializedType<T, 'Edm.String'>;
  stringProperty?: DeserializedType<T, 'Edm.String'> | null;
}

export interface CommonEntitySingleLinkType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  keyProperty: DeserializedType<DeSerializersT, 'Edm.String'>;
  stringProperty?: DeserializedType<DeSerializersT, 'Edm.String'> | null;
}

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */

export class CommonEntitySingleLinkApi<
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
  DateTimeT = Moment,
  DateTimeOffsetT = Moment,
  TimeT = Time
> implements
    EntityApi<
      CommonEntitySingleLink<
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
  public schema: Record<string, any>;

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
    const fieldBuilder = new FieldBuilder(
      CommonEntitySingleLink,
      this.deSerializers
    );
    this.schema = {
      KEY_PROPERTY: fieldBuilder.buildEdmTypeField(
        'KeyProperty',
        'Edm.String',
        false
      ),
      STRING_PROPERTY: fieldBuilder.buildEdmTypeField(
        'StringProperty',
        'Edm.String',
        true
      ),
      ALL_FIELDS: new AllFields('*', CommonEntitySingleLink)
    };
  }

  entityConstructor = CommonEntitySingleLink;

  requestBuilder(): any {
    throw new Error('Not implemented');
  }
  entityBuilder(): EntityBuilderType<
    CommonEntitySingleLink<
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
  > {
    return entityBuilder(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
    CommonEntitySingleLink<
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
    >,
    NullableT
  > {
    return new CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    );
  }
}

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */

export class CommonEntity<T extends DeSerializers = DefaultDeSerializers>
  extends Entity
  implements CommonEntityType<T>
{
  static _entityName = 'A_CommonEntity';
  readonly _oDataVersion: any;
  static _defaultServicePath = '/sap/opu/odata/sap/API_COMMON_SRV';
  static _keys = ['KeyPropertyGuid', 'KeyPropertyString'];
  keyPropertyGuid!: DeserializedType<T, 'Edm.Guid'>;
  keyPropertyString!: DeserializedType<T, 'Edm.String'>;
  stringProperty?: DeserializedType<T, 'Edm.String'> | null;
  int16Property?: DeserializedType<T, 'Edm.Int16'> | null;
  collectionProperty?: DeserializedType<T, 'Edm.String'> | null;
  complexTypeProperty?: CommonComplexType<T> | null;
  toSingleLink?: CommonEntitySingleLink<T> | null;
}

export interface CommonEntityType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  keyPropertyGuid: DeserializedType<DeSerializersT, 'Edm.Guid'>;
  keyPropertyString: DeserializedType<DeSerializersT, 'Edm.String'>;
  stringProperty?: DeserializedType<DeSerializersT, 'Edm.String'> | null;
  int16Property?: DeserializedType<DeSerializersT, 'Edm.Int16'> | null;
  collectionProperty?: DeserializedType<DeSerializersT, 'Edm.String'> | null;
  complexTypeProperty?: CommonComplexType<DeSerializersT> | null;
  toSingleLink?: CommonEntitySingleLinkType<DeSerializersT> | null;
}

/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */

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
  AnyT = any,
  DateTimeT = Moment,
  DateTimeOffsetT = Moment,
  TimeT = Time
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
  public schema: Record<string, any>;

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
      COLLECTION_PROPERTY: fieldBuilder.buildCollectionField(
        'CollectionProperty',
        'Edm.String',
        true
      ),
      COMPLEX_TYPE_PROPERTY: fieldBuilder.buildComplexTypeField(
        'ComplexTypeProperty',
        CommonComplexTypeField,
        true
      ),
      TO_SINGLE_LINK: new OneToOneLink(
        'to_SingleLink',
        this,
        new CommonEntitySingleLinkApi(deSerializers)
      ),
      ALL_FIELDS: new AllFields('*', CommonEntity)
    };
  }

  entityConstructor = CommonEntity;

  requestBuilder(): any {
    throw new Error('Not implemented');
  }
  entityBuilder(): EntityBuilderType<
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
  > {
    return entityBuilder(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
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
    >,
    NullableT
  > {
    return new CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    );
  }
}

export const commonEntityApi = new CommonEntityApi();
