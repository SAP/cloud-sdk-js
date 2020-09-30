import { EntityBase, Constructable } from '../../common';
import { ODataCreateRequestConfig as Base } from '../../common/request/odata-create-request-config';
import { oDataUriV2 } from '../uri-conversion';

/**
 * @deprecated Since v1.21.0. Use superclass instead.
 * OData create request configuration for an entity type.
 *
 * @typeparam EntityT - Type of the entity to setup a request for
 */
export class ODataCreateRequestConfig<EntityT extends EntityBase> extends Base<
  EntityT
> {
  /**
   * Creates an instance of ODataRequest.
   * @param _entityConstructor - Constructor type of the entity to create a configuration for
   */
  constructor(_entityConstructor: Constructable<EntityT>) {
    super(_entityConstructor, oDataUriV2);
  }
}
