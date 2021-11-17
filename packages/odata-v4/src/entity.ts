import { EntityBase, Constructable } from '@sap-cloud-sdk/odata-common/internal';
import { CustomField } from './selectable/custom-field';

/**
 * Super class for all representations of OData v4 entity types.
 */
export abstract class Entity extends EntityBase {
  protected static customFieldSelector<
    EntityT extends Entity,
    NullableT extends boolean = false
  >(
    fieldName: string,
    entityConstructor: Constructable<EntityT>,
    isNullable: NullableT = false as NullableT
  ): CustomField<EntityT, NullableT> {
    return new CustomField(fieldName, entityConstructor, isNullable);
  }

  readonly _oDataVersion: 'v4' = 'v4';
}
