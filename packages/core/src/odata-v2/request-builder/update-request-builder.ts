import { createLogger, isNullish } from '@sap-cloud-sdk/util';
import {
  Constructable,
  EntityIdentifiable,
  ODataRequest,
  ODataUpdateRequestConfig,
  UpdateRequestBuilder as UpdateRequestBuilderBase,
  isNavigationProperty,
  removePropertyOnCondition
} from '../../odata-common';
import { EntityV2 } from '../entity';
import { entitySerializerV2 } from '../entity-serializer';
import {
  Destination,
  DestinationNameAndJwt,
  DestinationOptions
} from '../../connectivity/scp-cf';
import { oDataUriV2 } from '../uri-conversion';
import { extractODataEtagV2 } from '../extract-odata-etag';

const logger = createLogger({
  package: 'core',
  messageContext: 'update-request-builder-v2'
});
/**
 * Create OData query to update an entity.
 *
 * @typeparam EntityT - Type of the entity to be updated
 */
export class UpdateRequestBuilderV2<EntityT extends EntityV2>
  extends UpdateRequestBuilderBase<EntityT>
  implements EntityIdentifiable<EntityT> {
  /**
   * Creates an instance of UpdateRequestBuilder.
   *
   * @param _entityConstructor - Constructor type of the entity to be updated
   * @param _entity - Entity to be updated
   */
  constructor(
    readonly _entityConstructor: Constructable<EntityT>,
    readonly _entity: EntityT
  ) {
    super(
      _entityConstructor,
      _entity,
      oDataUriV2,
      entitySerializerV2,
      extractODataEtagV2,
      removeNavPropsAndComplexTypes
    );
  }

  /**
   * Executes the query.
   *
   * @param destination - Destination to execute the request against
   * @param options - Options to employ when fetching destinations
   * @returns A promise resolving to the entity once it was updated
   */
  async execute(
    destination: Destination | DestinationNameAndJwt,
    options?: DestinationOptions
  ): Promise<EntityT> {
    if (this.isEmptyObject(this.requestConfig.payload)) {
      return this._entity;
    }

    const request = await this.build(destination, options);
    warnIfNavigation(request, this._entity, this._entityConstructor);

    return super.executeRequest(request);
  }
}

/*
 * In case the entity contains a navigation to a different entity a warning is printed.
 */
function warnIfNavigation<EntityT extends EntityV2>(
  request: ODataRequest<ODataUpdateRequestConfig<EntityT>>,
  entity: EntityT,
  entityConstructor: Constructable<EntityT>
): ODataRequest<ODataUpdateRequestConfig<EntityT>> {
  const setNavigationsProperties = Object.keys(entity).filter(
    key =>
      !isNullish(entity[key]) && isNavigationProperty(key, entityConstructor)
  );

  if (setNavigationsProperties.length) {
    logger.warn(
      `The navigation properties ${setNavigationsProperties} have been included in your update request. Update of navigation properties is not supported and will be ignored.`
    );
  }

  return request;
}

function removeNavPropsAndComplexTypes(
  body: Record<string, any>
): Record<string, any> {
  return removePropertyOnCondition(
    ([key, val]) => typeof val === 'object',
    body
  );
}

export { UpdateRequestBuilderV2 as UpdateRequestBuilder };
