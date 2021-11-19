import { EntityBase, Constructable } from '@sap-cloud-sdk/odata-common';
import { DeSerializationMiddlewareV2BASE } from './de-serializers/de-serialization-middleware';
import { CustomField } from './selectable/custom-field';

/**
 * Super class for all representations of OData v2 entity types.
 */
export class Entity extends EntityBase {
  protected static customFieldSelector<
    EntityT extends Entity,
    T extends DeSerializationMiddlewareV2BASE,
    NullableT extends boolean = false
  >(
    fieldName: string,
    entityConstructor: Constructable<EntityT>,
    deSerializers: T,
    isNullable: NullableT = false as NullableT
  ): CustomField<EntityT, T, NullableT> {
    return new CustomField(
      fieldName,
      entityConstructor,
      deSerializers,
      isNullable
    );
  }

  readonly _oDataVersion: 'v2' = 'v2';
}
