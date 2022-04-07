/* eslint-disable */
/* This entity was generated from the COMMON_SRV.edmx and the generate-test-service.ts script.
The idea behind this entity is to use only odata-common imports and use it in the tests for the odata-common functionality.*/

import { Moment } from 'moment';
import { BigNumber } from 'bignumber.js';
import {
  AllFields,
  CollectionField,
  ComplexTypeField,
  Constructable,
  ConstructorOrField,
  CustomField,
  CustomDeSerializers,
  defaultDeSerializers,
  DefaultDeSerializers,
  DeserializedType,
  DeSerializers,
  EdmTypeField,
  EntityApi,
  EntityBase as Entity,
  entityBuilder,
  EntityBuilderType,
  Field,
  FieldBuilder,
  FieldOptions,
  mergeDefaultDeSerializersWith,
  OneToOneLink,
  OrderableEdmTypeField,
  PropertyMetadata,
  Time
} from '../src/internal';
import { customTestDeSerializers } from '../../../test-resources/test/test-util';

/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
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
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
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
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
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
  T extends DeSerializers = DefaultDeSerializers
> {
  keyProperty: DeserializedType<T, 'Edm.String'>;
  stringProperty?: DeserializedType<T, 'Edm.String'> | null;
}

/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */

export class CommonEntitySingleLinkApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<CommonEntitySingleLink<DeSerializersT>, DeSerializersT>
{
  public deSerializers: DeSerializersT;

  constructor(deSerializers: DeSerializersT = defaultDeSerializers as any) {
    this.deSerializers = deSerializers;
  }

  private navigationPropertyFields!: {};

  _addNavigationProperties(linkedApis: []): this {
    this.navigationPropertyFields = {};
    return this;
  }

  entityConstructor = CommonEntitySingleLink;

  requestBuilder(): any {
    throw new Error('Not implemented');
  }

  entityBuilder(): EntityBuilderType<
    CommonEntitySingleLink<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
    CommonEntitySingleLink<DeSerializersT>,
    DeSerializersT,
    NullableT
  > {
    return new CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    ) as any;
  }

  private _fieldBuilder?: FieldBuilder<
    typeof CommonEntitySingleLink,
    DeSerializersT
  >;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(
        CommonEntitySingleLink,
        this.deSerializers
      );
    }
    return this._fieldBuilder;
  }

  private _schema?: {
    KEY_PROPERTY: EdmTypeField<
      CommonEntitySingleLink<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    STRING_PROPERTY: EdmTypeField<
      CommonEntitySingleLink<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ALL_FIELDS: AllFields<CommonEntitySingleLink<DeSerializers>>;
  };

  get schema() {
    if (!this._schema) {
      const fieldBuilder = this.fieldBuilder;
      this._schema = {
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
        ...this.navigationPropertyFields,
        ALL_FIELDS: new AllFields('*', CommonEntitySingleLink)
      };
    }

    return this._schema;
  }
}

/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
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
  collectionProperty?: DeserializedType<T, 'Edm.String'>[] | null;
  complexTypeProperty?: CommonComplexType<T> | null;
  toSingleLink?: CommonEntitySingleLink<T> | null;
}

export interface CommonEntityType<
  T extends DeSerializers = DefaultDeSerializers
> {
  keyPropertyGuid: DeserializedType<T, 'Edm.Guid'>;
  keyPropertyString: DeserializedType<T, 'Edm.String'>;
  stringProperty?: DeserializedType<T, 'Edm.String'> | null;
  int16Property?: DeserializedType<T, 'Edm.Int16'> | null;
  collectionProperty?: DeserializedType<T, 'Edm.String'>[] | null;
  complexTypeProperty?: CommonComplexType<T> | null;
  toSingleLink?: CommonEntitySingleLinkType<T> | null;
}

/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */

export class CommonEntityApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<CommonEntity<DeSerializersT>, DeSerializersT>
{
  public deSerializers: DeSerializersT;

  constructor(deSerializers: DeSerializersT = defaultDeSerializers as any) {
    this.deSerializers = deSerializers;
  }

  private navigationPropertyFields!: {
    TO_SINGLE_LINK: OneToOneLink<
      CommonEntity<DeSerializersT>,
      DeSerializersT,
      CommonEntitySingleLinkApi<DeSerializersT>
    >;
  };

  _addNavigationProperties(
    linkedApis: [CommonEntitySingleLinkApi<DeSerializersT>]
  ): this {
    this.navigationPropertyFields = {
      TO_SINGLE_LINK: new OneToOneLink('to_SingleLink', this, linkedApis[0])
    };
    return this;
  }

  entityConstructor = CommonEntity;

  requestBuilder(): any {
    throw new Error('Not implemented');
  }

  entityBuilder(): EntityBuilderType<
    CommonEntity<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<CommonEntity<DeSerializersT>, DeSerializersT, NullableT> {
    return new CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    ) as any;
  }

  private _fieldBuilder?: FieldBuilder<typeof CommonEntity, DeSerializersT>;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(CommonEntity, this.deSerializers);
    }
    return this._fieldBuilder;
  }

  private _schema?: {
    KEY_PROPERTY_GUID: EdmTypeField<
      CommonEntity<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      false,
      true
    >;
    KEY_PROPERTY_STRING: EdmTypeField<
      CommonEntity<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    STRING_PROPERTY: EdmTypeField<
      CommonEntity<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    INT_16_PROPERTY: OrderableEdmTypeField<
      CommonEntity<DeSerializers>,
      DeSerializersT,
      'Edm.Int16',
      true,
      true
    >;
    COLLECTION_PROPERTY: CollectionField<
      CommonEntity<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    COMPLEX_TYPE_PROPERTY: CommonComplexTypeField<
      CommonEntity<DeSerializers>,
      DeSerializersT,
      true,
      true
    >;
    TO_SINGLE_LINK: OneToOneLink<
      CommonEntity<DeSerializersT>,
      DeSerializersT,
      CommonEntitySingleLinkApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<CommonEntity<DeSerializers>>;
  };

  get schema() {
    if (!this._schema) {
      const fieldBuilder = this.fieldBuilder;
      this._schema = {
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
        ...this.navigationPropertyFields,
        ALL_FIELDS: new AllFields('*', CommonEntity)
      };
    }

    return this._schema;
  }
}

/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */

export function commonService<
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
>(
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
): CommonService<
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
  return new CommonService(mergeDefaultDeSerializersWith(deSerializers));
}
class CommonService<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
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

  get commonEntityApi(): CommonEntityApi<DeSerializersT> {
    const api = this.initApi('commonEntityApi', CommonEntityApi);
    const linkedApis = [
      this.initApi('commonEntitySingleLinkApi', CommonEntitySingleLinkApi)
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }

  get commonEntitySingleLinkApi(): CommonEntitySingleLinkApi<DeSerializersT> {
    return this.initApi('commonEntitySingleLinkApi', CommonEntitySingleLinkApi);
  }
}

export const { commonEntityApi } = commonService();
export const { commonEntityApi: commonEntityApiCustom } = commonService(
  customTestDeSerializers
);
