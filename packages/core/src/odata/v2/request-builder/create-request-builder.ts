import { errorWithCause } from '@sap-cloud-sdk/util';
import { Constructable, EntityIdentifiable, Link } from '../../common';
import { MethodRequestBuilderBase } from '../../common/request-builder/request-builder-base';
import { ODataCreateRequestConfig } from '../../common/request/odata-create-request-config';
import { EntityV2 } from '../entity';
import { deserializeEntityV2 } from '../entity-deserializer';
import { serializeEntityV2 } from '../entity-serializer';
import { DestinationOptions } from '../../../scp-cf';
import {
  Destination,
  DestinationNameAndJwt
} from '../../../scp-cf/destination-service-types';
import { oDataUriV2 } from '../uri-conversion';
import { getSingleResult } from './response-data-accessor';
/**
 * Create OData request to create an entity.
 *
 * @typeparam EntityT - Type of the entity to be created
 */
export class CreateRequestBuilderV2<EntityT extends EntityV2>
  extends MethodRequestBuilderBase<ODataCreateRequestConfig<EntityT>>
  implements EntityIdentifiable<EntityT> {
  /**
   * Creates an instance of CreateRequestBuilder.
   *
   * @param _entityConstructor - Constructor type of the entity to be created
   * @param _entity - Entity to be created
   */
  constructor(
    readonly _entityConstructor: Constructable<EntityT>,
    readonly _entity: EntityT
  ) {
    super(new ODataCreateRequestConfig(_entityConstructor, oDataUriV2));
    this.requestConfig.payload = serializeEntityV2(
      this._entity,
      this._entityConstructor
    );
  }

  get entity(): EntityT {
    return this._entity;
  }

  /**
   * @deprecated Since v1.29.0. This method should never be called, it has severe side effects.   * Builds the payload of the query.
   * @returns the builder itself
   */
  prepare(): this {
    this.requestConfig.payload = serializeEntityV2(
      this._entity,
      this._entityConstructor
    );
    return this;
  }

  /**
   * Specifies the parent of the entity to create.
   *
   * @param parentEntity - Parent of the entity to create
   * @param linkField - Static representation of the navigation property that navigates from the parent entity to the child entity
   * @returns The entity itself, to facilitate method chaining
   */
  asChildOf<ParentEntityT extends EntityV2>(
    parentEntity: ParentEntityT,
    linkField: Link<ParentEntityT, EntityT>
  ): this {
    this.requestConfig.parentKeys = oDataUriV2.getEntityKeys(
      parentEntity,
      linkField._entityConstructor
    );
    this.requestConfig.childField = linkField;
    return this;
  }

  /**
   * Execute query.
   *
   * @param destination - Destination to execute the request against
   * @param options - Options to employ when fetching destinations
   * @returns A promise resolving to the created entity
   */
  async execute(
    destination: Destination | DestinationNameAndJwt,
    options?: DestinationOptions
  ): Promise<EntityT> {
    return this.build(destination, options)
      .then(request => request.execute())
      .then(response =>
        deserializeEntityV2(
          getSingleResult(response.data),
          this._entityConstructor,
          response.headers
        )
      )
      .catch(error =>
        Promise.reject(errorWithCause('Create request failed!', error))
      );
  }
}

export { CreateRequestBuilderV2 as CreateRequestBuilder };
