import { errorWithCause } from '@sap-cloud-sdk/util';
import {
  Constructable,
  EntityBase,
  EntityDeserializer,
  EntityIdentifiable,
  Link,
  MethodRequestBuilderBase,
  ODataCreateRequestConfig,
  ODataUri,
  ResponseDataAccessor
} from '../../odata-common';
import {
  DestinationOptions,
  Destination,
  DestinationNameAndJwt
} from '../../connectivity/scp-cf';
import { EntitySerializer } from '../entity-serializer';
import { oDataUri } from '../../odata-v2/uri-conversion';
/**
 * Create OData request to create an entity.
 *
 * @typeparam EntityT - Type of the entity to be created
 */
export abstract class CreateRequestBuilderBase<EntityT extends EntityBase>
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
    readonly _entity: EntityT,
    readonly odataUri: ODataUri,
    readonly serializer: EntitySerializer<EntityT>,
    readonly deserializer: EntityDeserializer<EntityT>,
    readonly responseDataAccessor: ResponseDataAccessor
  ) {
    super(new ODataCreateRequestConfig(_entityConstructor, odataUri));
    this.requestConfig.payload = serializer.serializeEntity(
      this._entity,
      this._entityConstructor
    );
  }

  get entity(): EntityT {
    return this._entity;
  }

  /**
   * Specifies the parent of the entity to create.
   *
   * @param parentEntity - Parent of the entity to create
   * @param linkField - Static representation of the navigation property that navigates from the parent entity to the child entity
   * @returns The entity itself, to facilitate method chaining
   */
  asChildOf<ParentEntityT extends EntityBase>(
    parentEntity: ParentEntityT,
    linkField: Link<ParentEntityT, EntityT>
  ): this {
    this.requestConfig.parentKeys = oDataUri.getEntityKeys(
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
        this.deserializer.deserializeEntity(
          this.responseDataAccessor.getSingleResult(response.data),
          this._entityConstructor,
          response.headers
        )
      )
      .catch(error =>
        Promise.reject(errorWithCause('Create request failed!', error))
      );
  }
}
