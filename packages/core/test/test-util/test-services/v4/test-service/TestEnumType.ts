import { EnumField } from '../../../../../src/odata/common/selectable/enum-field';
import { Constructable, EntityBase } from '../../../../../src/odata/common';

export class TestEnumTypeField<EntityT extends EntityBase> extends EnumField<EntityT>{
  constructor(fieldName: string, fieldOf: Constructable<EntityT>){
    super(fieldName, fieldOf);
  }
}

export enum TestEnumType{
  Enum1 = 'Enum1', Enum2 = 'Enum2'
}
