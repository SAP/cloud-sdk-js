import {
  ComplexTypeField as ComplexTypeFieldCommon,
  EntityBase
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers } from '..';

export class ComplexTypeField<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  ComplexT = any,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends ComplexTypeFieldCommon<
  EntityT,
  DeSerializersT,
  ComplexT,
  NullableT,
  SelectableT
> {}
