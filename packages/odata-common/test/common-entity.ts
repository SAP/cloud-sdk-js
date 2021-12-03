/* eslint-disable */
/* This entity was generated from the COMMON_SRV.edmx and the generate-test-service.ts script.
The idea behind this entity is to use only odata-common imports and use it in the tests for the odata-common functionality.*/
import BigNumber from 'bignumber.js';
import {
  AllFields,
  Constructable,
  EntityBuilderType,
  OneToOneLink,
  Field,
  CollectionField,
  OrderableEdmTypeField,
  CustomField,
  ComplexTypeField,
  ConstructorOrField,
  EdmTypeField,
  FieldBuilder,
  FieldOptions,
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
  complexTypeProperty?: NestedComplexType;
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
  complexTypeProperty: NestedComplexTypeField<EntityT, true, false> =
    this._fieldBuilder.buildComplexTypeField(
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

export interface NestedComplexType {
  stringProperty?: string;
}

export class NestedComplexTypeField<
  EntityT extends Entity,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<EntityT, NestedComplexType, NullableT, SelectableT> {
  private _fieldBuilder: FieldBuilder<this> = new FieldBuilder(this);
  stringProperty: EdmTypeField<EntityT, 'Edm.String', true, false> =
    this._fieldBuilder.buildEdmTypeField('StringProperty', 'Edm.String', true);

  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  ) {
    super(fieldName, fieldOf, NestedComplexType, fieldOptions);
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

export class CommonEntitySingleLink
  extends Entity
  implements CommonEntitySingleLinkType
{
  static _entityName = 'A_CommonEntitySingleLink';
  readonly _oDataVersion: any;
  static _defaultServicePath = '/sap/opu/odata/sap/API_COMMON_SRV';
  keyProperty!: string;
  stringProperty?: string;

  static builder(): EntityBuilderType<
    CommonEntitySingleLink,
    CommonEntitySingleLinkType
  > {
    return Entity.entityBuilder(CommonEntitySingleLink);
  }

  static requestBuilder(): any {
    throw new Error('not implemented');
  }

  static customField(fieldName: string): CustomField<CommonEntitySingleLink> {
    return new CustomField(fieldName, CommonEntitySingleLink);
  }

  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface CommonEntitySingleLinkType {
  keyProperty: string;
  stringProperty?: string | null;
}

export namespace CommonEntitySingleLink {
  const _fieldBuilder: FieldBuilder<Constructable<CommonEntitySingleLink>> =
    new FieldBuilder(CommonEntitySingleLink);
  export const KEY_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'KeyProperty',
    'Edm.String',
    false
  );
  export const STRING_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'StringProperty',
    'Edm.String',
    true
  );
  export const _allFields: Array<
    | EdmTypeField<CommonEntitySingleLink, 'Edm.String', false, true>
    | EdmTypeField<CommonEntitySingleLink, 'Edm.String', true, true>
  > = [
    CommonEntitySingleLink.KEY_PROPERTY,
    CommonEntitySingleLink.STRING_PROPERTY
  ];
  export const ALL_FIELDS: AllFields<CommonEntitySingleLink> = new AllFields(
    '*',
    CommonEntitySingleLink
  );
  export const _keyFields: Array<
    Field<CommonEntitySingleLink, boolean, boolean>
  > = [CommonEntitySingleLink.KEY_PROPERTY];
  export const _keys: {
    [keys: string]: Field<CommonEntitySingleLink, boolean, boolean>;
  } = CommonEntitySingleLink._keyFields.reduce(
    (
      acc: { [keys: string]: Field<CommonEntitySingleLink, boolean, boolean> },
      field: Field<CommonEntitySingleLink, boolean, boolean>
    ) => {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
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
implements CommonEntityType<DeSerializersT> {

  static _entityName = 'A_CommonEntity';
  readonly _oDataVersion: any;
  static _defaultServicePath = '/sap/opu/odata/sap/API_COMMON_SRV';
  static _keys = ['KeyPropertyGuid', 'KeyPropertyString'];
  keyPropertyGuid!: DeserializedType<DeSerializersT, 'Edm.Guid'>;
  keyPropertyString!: DeserializedType<DeSerializersT, 'Edm.String'>;
  stringProperty?: DeserializedType<DeSerializersT, 'Edm.String'>;
  int16Property?: DeserializedType<DeSerializersT, 'Edm.Int16'>;
  collectionProperty?: string[];
  complexTypeProperty?: CommonComplexType;
  toSingleLink?: CommonEntitySingleLink | null;

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
collectionProperty?: string[] | null;
  complexTypeProperty?: CommonComplexType | null;
  toSingleLink?: CommonEntitySingleLinkType | null;
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
		export const COLLECTION_PROPERTY = _fieldBuilder.buildCollectionField(
    'CollectionProperty',
    'Edm.String',
    true
  );
  export const COMPLEX_TYPE_PROPERTY = _fieldBuilder.buildComplexTypeField(
    'ComplexTypeProperty',
    CommonComplexTypeField,
    true
  );
  export const TO_SINGLE_LINK: OneToOneLink<
    CommonEntity,
    CommonEntitySingleLink
  > = new OneToOneLink('to_SingleLink', CommonEntity, CommonEntitySingleLink);
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
