import {
  EdmTypeShared,
  EntityBase,
  OrderableEdmTypeField as OrderableEdmTypeFieldCommon
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers } from '..';

export class OrderableEdmTypeField<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  EdmT extends EdmTypeShared<'any'>,
  NullableT extends boolean = false,
  SelectableT extends boolean = false
> extends OrderableEdmTypeFieldCommon<
  EntityT,
  DeSerializersT,
  EdmT,
  NullableT,
  SelectableT
> {}
