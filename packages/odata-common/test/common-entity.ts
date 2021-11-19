/* eslint-disable max-classes-per-file */
import {
  Constructable,
  EntityBase,
  EntityBuilderType,
  CustomField,
  FieldBuilder,
  Field,
  FieldOptions,
  EdmTypeField,
  ComplexTypeField,
  ConstructorOrField,
  PropertyMetadata,
  AllFields
} from '../src/internal';

export interface CommonEntityComplexType {
  stringProperty: string;
  booleanProperty?: boolean;
}
export class CommonEntityComplexTypeField<
  EntityT extends EntityBase
> extends ComplexTypeField<EntityT, CommonEntityComplexType, true, true> {
  _fieldBuilder: FieldBuilder<this> = new FieldBuilder(this);
  stringProperty: EdmTypeField<EntityT, 'Edm.String', false, false> =
    this._fieldBuilder.buildEdmTypeField('StringProperty', 'Edm.String', false);

  booleanProperty: EdmTypeField<EntityT, 'Edm.Boolean', true, false> =
    this._fieldBuilder.buildEdmTypeField(
      'BooleanProperty',
      'Edm.Boolean',
      true
    );
  constructor(
    fieldName: string,
    fieldOf: ConstructorOrField<EntityT>,
    fieldOptions?: FieldOptions<true, true>
  ) {
    super(fieldName, fieldOf, CommonEntityComplexType, fieldOptions);
  }
}
export namespace CommonEntityComplexType {
  export const _propertyMetadata: PropertyMetadata<CommonEntityComplexType>[] =
    [
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

// eslint-disable-next-line import/export
export class CommonEntity extends EntityBase {
  static _entityName = 'A_CommonEntity';
  static _defaultServicePath = '/sap/opu/odata/sap/API_COMMON_ENTITY_SRV';

  static requestBuilder(): any {
    throw new Error('not implemented');
  }

  static customField(): CustomField<CommonEntity> {
    throw new Error('not implemented');
  }
  static builder(): EntityBuilderType<CommonEntity, CommonEntityType> {
    return EntityBase.entityBuilder(CommonEntity);
  }
  readonly _oDataVersion: any;
  keyPropertyGuid!: string;
  keyPropertyString!: string;
  stringProperty: string;
  int16Property: number;
}
export interface CommonEntityType {
  keyPropertyGuid: string;
  keyPropertyString: string;
  stringProperty: string;
  int16Property: number;
}
// eslint-disable-next-line import/export
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
  export const COMPLEX_TYPE_PROPERTY = _fieldBuilder.buildComplexTypeField(
    'ComplexTypeProperty',
    CommonEntityComplexTypeField,
    true
  );

  export const _keyFields: Field<CommonEntity, boolean, boolean>[] = [
    CommonEntity.KEY_PROPERTY_GUID,
    CommonEntity.KEY_PROPERTY_STRING
  ];

  export const _keys: {
    [keys: string]: Field<CommonEntity, boolean, boolean>;
  } = {
    KeyPropertyGuid: CommonEntity.KEY_PROPERTY_GUID,
    KeyPropertyString: CommonEntity.KEY_PROPERTY_STRING
  };

  export const ALL_FIELDS: AllFields<CommonEntity> = new AllFields(
    '*',
    CommonEntity
  );

  export const _allFields: (
    | EdmTypeField<CommonEntity, 'Edm.Guid', false, true>
    | EdmTypeField<CommonEntity, 'Edm.String', false, true>
    | EdmTypeField<CommonEntity, 'Edm.String', true, true>
    | EdmTypeField<CommonEntity, 'Edm.Int16', true, true>
    | CommonEntityComplexTypeField<CommonEntity>
  )[] = [
    CommonEntity.KEY_PROPERTY_GUID,
    CommonEntity.KEY_PROPERTY_STRING,
    CommonEntity.STRING_PROPERTY,
    CommonEntity.INT_16_PROPERTY,
    CommonEntity.COMPLEX_TYPE_PROPERTY
  ];
}
