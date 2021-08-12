import {
  Entity as EntityBase,
  Constructable,
  ODataGetByKeyRequestConfig as ODataGetByKeyRequestConfigBase
} from '../../odata-common';
import { oDataUri } from '../uri-conversion';

/**
 * @deprecated Since v1.21.0. Use superclass instead.
 * OData delete request configuration for an entity type.
 * @typeparam EntityT - Type of the entity to setup a request for
 */
class ODataGetByKeyRequestConfig<
  EntityT extends EntityBase
> extends ODataGetByKeyRequestConfigBase<EntityT> {
  /**
   * Creates an instance of ODataGetByKeyRequestConfig.
   * @param _entityConstructor - Constructor type of the entity to create a configuration for
   */
  constructor(_entityConstructor: Constructable<EntityT>) {
    super(_entityConstructor, oDataUri);
  }
}

export { ODataGetByKeyRequestConfig as ODataGetByKeyRequestConfigLegacy };
