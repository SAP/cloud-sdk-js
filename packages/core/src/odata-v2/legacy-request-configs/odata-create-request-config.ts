import {
  Entity as EntityBase,
  Constructable,
  ODataCreateRequestConfig as ODataCreateRequestConfigBase
} from '../../odata-common';
import { oDataUri } from '../uri-conversion';

/**
 * @deprecated Since v1.21.0. Use superclass instead.
 * OData create request configuration for an entity type.
 * @typeparam EntityT - Type of the entity to setup a request for
 */
class ODataCreateRequestConfig<
  EntityT extends EntityBase
> extends ODataCreateRequestConfigBase<EntityT> {
  /**
   * Creates an instance of ODataRequest.
   * @param _entityConstructor - Constructor type of the entity to create a configuration for
   */
  constructor(_entityConstructor: Constructable<EntityT>) {
    super(_entityConstructor, oDataUri);
  }
}

export { ODataCreateRequestConfig as ODataCreateRequestConfigLegacy };
