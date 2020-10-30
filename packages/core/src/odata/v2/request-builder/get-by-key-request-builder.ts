import { errorWithCause } from '@sap-cloud-sdk/util';
import {
  Constructable,
  EntityIdentifiable,
  FieldType,
  Selectable
} from '../../common';
import { EntityV2 } from '../entity';
import { deserializeEntityV2 } from '../entity-deserializer';
import { DestinationOptions } from '../../../scp-cf';
import {
  Destination,
  DestinationNameAndJwt
} from '../../../scp-cf/destination/destination-service-types';
import { MethodRequestBuilderBase } from '../../common/request-builder/request-builder-base';
import { ODataGetByKeyRequestConfig } from '../../common/request/odata-get-by-key-request-config';
import { oDataUriV2 } from '../uri-conversion';
import { getSingleResult } from './response-data-accessor';
/**
 * Create an OData request to get a single entity based on its key properties.
 * The properties available in the response can be restricted by creating a [[GetAllRequestBuilderV2.select selection]], where no selection is equal to selecting all fields.
 * Note that navigational properties are automatically expanded if they included in a  select.
 *
 * @typeparam EntityT - Type of the entity to be requested
 */
export class GetByKeyRequestBuilderV2<EntityT extends EntityV2>
  extends MethodRequestBuilderBase<ODataGetByKeyRequestConfig<EntityT>>
  implements EntityIdentifiable<EntityT> {
  readonly _entity: EntityT;

  /**
   * Creates an instance of GetByKeyRequestBuilder.
   *
   * @param _entityConstructor - Constructor of the entity to create the request for
   * @param keys - Key-value pairs where the key is the name of a key property of the given entity and the value is the respective value
   */
  constructor(
    readonly _entityConstructor: Constructable<EntityT>,
    keys: Record<string, FieldType>
  ) {
    super(new ODataGetByKeyRequestConfig(_entityConstructor, oDataUriV2));
    this.requestConfig.keys = keys;
  }

  /**
   * Restrict the response to the given selection of properties in the request.
   *
   * @param selects - Fields to select in the request
   * @returns The request builder itself, to facilitate method chaining
   */
  select(...selects: Selectable<EntityT>[]): this {
    this.requestConfig.selects = selects;
    return this;
  }

  /**
   * Execute request.
   *
   * @param destination - Destination to execute the request against
   * @param options - Options to employ when fetching destinations
   * @returns A promise resolving to the requested entity
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
        Promise.reject(
          errorWithCause('OData get by key request failed!', error)
        )
      );
  }
}

export { GetByKeyRequestBuilderV2 as GetByKeyRequestBuilder };
