/* eslint-disable */
/* This entity was generated from the COMMON_SRV.edmx and the generate-test-service.ts script.
The idea behind this entity is to use only odata-common imports and use it in the tests for the odata-common functionality.*/
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
  EntityBase as Entity
} from '../src/internal';
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */

export interface CommonComplexType {
  stringProperty: string;
  booleanProperty?: boolean;
  complexTypeProperty?: NestedComplexType;
}

export class CommonComplexTypeField<
  EntityT extends Entity,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeField<EntityT, CommonComplexType, NullableT, SelectableT> {
  private _fieldBuilder: FieldBuilder<this> = new FieldBuilder(this);
  stringProperty: EdmTypeField<EntityT, 'Edm.String', false, false> =
    this._fieldBuilder.buildEdmTypeField('StringProperty', 'Edm.String', false);
  booleanProperty: EdmTypeField<EntityT, 'Edm.Boolean', true, false> =
    this._fieldBuilder.buildEdmTypeField(
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
    fieldOptions?: FieldOptions<NullableT, SelectableT>
  ) {
    super(fieldName, fieldOf, CommonComplexType, fieldOptions);
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

export class CommonEntity extends Entity implements CommonEntityType {
  static _entityName = 'A_CommonEntity';
  readonly _oDataVersion: any;
  static _defaultServicePath = '/sap/opu/odata/sap/API_COMMON_SRV';
  keyPropertyGuid!: string;
  keyPropertyString!: string;
  stringProperty?: string;
  int16Property?: number;
  collectionProperty?: string[];
  complexTypeProperty?: CommonComplexType;
  toSingleLink?: CommonEntitySingleLink | null;

  static builder(): EntityBuilderType<CommonEntity, CommonEntityType> {
    return Entity.entityBuilder(CommonEntity);
  }

  static requestBuilder(): any {
    throw new Error('not implemented');
  }

  static customField(fieldName: string): CustomField<CommonEntity> {
    return new CustomField(fieldName, CommonEntity);
  }

  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface CommonEntityType {
  keyPropertyGuid: string;
  keyPropertyString: string;
  stringProperty?: string | null;
  int16Property?: number | null;
  collectionProperty?: string[] | null;
  complexTypeProperty?: CommonComplexType | null;
  toSingleLink?: CommonEntitySingleLinkType | null;
}

export namespace CommonEntity {
  const _fieldBuilder: FieldBuilder<Constructable<CommonEntity>> =
    new FieldBuilder(CommonEntity);
  export const KEY_PROPERTY_GUID = _fieldBuilder.buildEdmTypeField(
    'KeyPropertyGuid',
    'Edm.Guid',
    false
  );
  export const KEY_PROPERTY_STRING = _fieldBuilder.buildEdmTypeField(
    'KeyPropertyString',
    'Edm.String',
    false
  );
  export const STRING_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'StringProperty',
    'Edm.String',
    true
  );
  export const INT_16_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'Int16Property',
    'Edm.Int16',
    true
  );
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
  export const _allFields: Array<
    | EdmTypeField<CommonEntity, 'Edm.Guid', false, true>
    | EdmTypeField<CommonEntity, 'Edm.String', false, true>
    | EdmTypeField<CommonEntity, 'Edm.String', true, true>
    | OrderableEdmTypeField<CommonEntity, 'Edm.Int16', true, true>
    | CollectionField<CommonEntity, 'Edm.String', true, true>
    | CommonComplexTypeField<CommonEntity, true, true>
    | OneToOneLink<CommonEntity, CommonEntitySingleLink>
  > = [
    CommonEntity.KEY_PROPERTY_GUID,
    CommonEntity.KEY_PROPERTY_STRING,
    CommonEntity.STRING_PROPERTY,
    CommonEntity.INT_16_PROPERTY,
    CommonEntity.COLLECTION_PROPERTY,
    CommonEntity.COMPLEX_TYPE_PROPERTY,
    CommonEntity.TO_SINGLE_LINK
  ];
  export const ALL_FIELDS: AllFields<CommonEntity> = new AllFields(
    '*',
    CommonEntity
  );
  export const _keyFields: Array<Field<CommonEntity, boolean, boolean>> = [
    CommonEntity.KEY_PROPERTY_GUID,
    CommonEntity.KEY_PROPERTY_STRING
  ];
  export const _keys: {
    [keys: string]: Field<CommonEntity, boolean, boolean>;
  } = CommonEntity._keyFields.reduce(
    (
      acc: { [keys: string]: Field<CommonEntity, boolean, boolean> },
      field: Field<CommonEntity, boolean, boolean>
    ) => {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
}
