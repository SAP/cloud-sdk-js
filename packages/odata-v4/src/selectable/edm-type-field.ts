import {
  EdmTypeShared,
  EntityBase,
  EdmTypeField as EdmTypeFieldCommon
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers } from '..';

export class EdmTypeField<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  EdmT extends EdmTypeShared<'any'>,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends EdmTypeFieldCommon<
  EntityT,
  DeSerializersT,
  EdmT,
  NullableT,
  SelectableT
> {}
