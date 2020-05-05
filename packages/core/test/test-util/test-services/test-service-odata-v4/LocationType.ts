import {
  ComplexTypeField, ComplexTypeFieldODataV4,
  ComplexTypeStringPropertyField, ComplexTypeStringPropertyFieldODataV4,
  createComplexType, edmToTs,
  Entity, EntityODataV4,
  FieldType
} from '../../../../src';

export interface LocationType {
  address?: string
}

export function createLocationType(json: any): LocationType {
  return LocationType.build(json);
}

export class LocationTypeField<EntityT extends EntityODataV4> extends ComplexTypeFieldODataV4<EntityT> {
  address: ComplexTypeStringPropertyFieldODataV4<EntityT> = new ComplexTypeStringPropertyFieldODataV4('Address', this, 'Edm.String');
}

export namespace LocationType {
  export function build(json: { [keys: string]: FieldType }): LocationType {
    return createComplexType(json, {
      StringProperty: (address: string) => ({ address: edmToTs(address, 'Edm.String') })
    });
  }
}
