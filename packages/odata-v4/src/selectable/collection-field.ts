import {
  CollectionField as CollectionFieldCommon,
  EdmTypeShared,
  EntityBase
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers } from '..';

export class CollectionField<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  CollectionFieldT extends EdmTypeShared<'any'> | Record<string, any> = any,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends CollectionFieldCommon<
  EntityT,
  DeSerializersT,
  CollectionFieldT,
  NullableT,
  SelectableT
> {}
