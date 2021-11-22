/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
// import { CustomField, Entity } from '@sap-cloud-sdk/odata-v2';
// import { AllFields, Constructable, EdmTypeField, EntityBuilderType, Field, FieldBuilder, OrderableEdmTypeField } from '@sap-cloud-sdk/odata-common/internal';
import { AllFields, Constructable, EdmTypeField, EntityBuilderType, Field, FieldBuilder, OrderableEdmTypeField,CustomField, EntityBase as Entity } from '../src/internal';
import { TestComplexType, TestComplexTypeField } from './TestComplexType';

/**
 * This class represents the entity "A_CommonEntity" of service "API_COMMON_SRV".
 */
export class CommonEntity extends Entity implements CommonEntityType {
  //add any
  _oDataVersion: any;
  /**
   * Technical entity name for CommonEntity.
   */
  static _entityName = 'A_CommonEntity';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = 'VALUE_IS_UNDEFINED';
  /**
   * Key Property Guid.
   */
  keyPropertyGuid!: string;
  /**
   * Key Property String.
   */
  keyPropertyString!: string;
  /**
   * Strng Property.
   * Maximum length: 10.
   * @nullable
   */
  strngProperty?: string;
  /**
   * Int 16 Property.
   * @nullable
   */
  int16Property?: number;
  /**
   * Complex Type Property.
   * @nullable
   */
  complexTypeProperty?: TestComplexType;

  /**
   * Returns an entity builder to construct instances of `CommonEntity`.
   * @returns A builder that constructs instances of entity type `CommonEntity`.
   */
  static builder(): EntityBuilderType<CommonEntity, CommonEntityType> {
    return Entity.entityBuilder(CommonEntity);
  }

  /**
   * Returns a request builder to construct requests for operations on the `CommonEntity` entity type.
   * @returns A `CommonEntity` request builder.
   */
  static requestBuilder(): any {
    throw new Error('not implemented');
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `CommonEntity`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `CommonEntity`.
   */
  static customField(fieldName: string): CustomField<CommonEntity> {
    throw new Error('not implemented');
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

export interface CommonEntityType {
  keyPropertyGuid: string;
  keyPropertyString: string;
  strngProperty?: string | null;
  int16Property?: number | null;
  complexTypeProperty?: TestComplexType | null;
}

export namespace CommonEntity {
  const _fieldBuilder: FieldBuilder<Constructable<CommonEntity>> = new FieldBuilder(CommonEntity);
  /**
   * Static representation of the [[keyPropertyGuid]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY_GUID = _fieldBuilder.buildEdmTypeField('KeyPropertyGuid', 'Edm.Guid', false);
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const KEY_PROPERTY_STRING = _fieldBuilder.buildEdmTypeField('KeyPropertyString', 'Edm.String', false);
  /**
   * Static representation of the [[strngProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const STRNG_PROPERTY = _fieldBuilder.buildEdmTypeField('StrngProperty', 'Edm.String', true);
  /**
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const INT_16_PROPERTY = _fieldBuilder.buildEdmTypeField('Int16Property', 'Edm.Int16', true);
  /**
   * Static representation of the [[complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  export const COMPLEX_TYPE_PROPERTY = _fieldBuilder.buildComplexTypeField('ComplexTypeProperty', TestComplexTypeField, true);
  /**
   * All fields of the CommonEntity entity.
   */
  export const _allFields: (EdmTypeField<CommonEntity, 'Edm.Guid', false, true> | EdmTypeField<CommonEntity, 'Edm.String', false, true> | EdmTypeField<CommonEntity, 'Edm.String', true, true> | OrderableEdmTypeField<CommonEntity, 'Edm.Int16', true, true> | TestComplexTypeField<CommonEntity, true, true>)[] = [
    CommonEntity.KEY_PROPERTY_GUID,
    CommonEntity.KEY_PROPERTY_STRING,
    CommonEntity.STRNG_PROPERTY,
    CommonEntity.INT_16_PROPERTY,
    CommonEntity.COMPLEX_TYPE_PROPERTY
  ];
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<CommonEntity> = new AllFields('*', CommonEntity);
  /**
   * All key fields of the CommonEntity entity.
   */
  export const _keyFields: Field<CommonEntity, boolean, boolean>[] = [CommonEntity.KEY_PROPERTY_GUID, CommonEntity.KEY_PROPERTY_STRING];
  /**
   * Mapping of all key field names to the respective static field property CommonEntity.
   */
  export const _keys: { [keys: string]: Field<CommonEntity, boolean, boolean> } = CommonEntity._keyFields.reduce((acc: { [keys: string]: Field<CommonEntity, boolean, boolean> }, field: Field<CommonEntity, boolean, boolean>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
