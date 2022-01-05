import {
  EntityBase,
  EnumField as EnumFieldCommon
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers } from '..';

export class EnumField<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  EnumT extends string = string,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends EnumFieldCommon<
  EntityT,
  DeSerializersT,
  EnumT,
  NullableT,
  SelectableT
> {}
