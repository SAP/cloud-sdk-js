import {
  ComplexTypeField,
  ComplexTypeStringPropertyField,
  createComplexType,
  edmToTs,
  Entity,
  FieldType
} from '@sap-cloud-sdk/core/src/odata/v4';


export interface LocationType {
  address?: string
}

export function createLocationType(json: any): LocationType {
  return LocationType.build(json);
}

export class LocationTypeField<EntityT extends Entity> extends ComplexTypeField<EntityT> {
  address: ComplexTypeStringPropertyField<EntityT> = new ComplexTypeStringPropertyField('Address', this, 'Edm.String');
}

export namespace LocationType {
  export function build(json: { [keys: string]: FieldType }): LocationType {
    return createComplexType(json, {
      StringProperty: (address: string) => ({ address: edmToTs(address, 'Edm.String') })
    });
  }
}
