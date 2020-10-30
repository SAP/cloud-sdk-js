import { errorWithCause, variableArgumentToArray } from '@sap-cloud-sdk/util';
import {
  Constructable,
  EntityIdentifiable,
  FieldType,
  Selectable
} from '../../common';
import { EntityV4 } from '../entity';
import { deserializeEntityV4 } from '../entity-deserializer';
import { DestinationOptions } from '../../../scp-cf';
import {
  Destination,
  DestinationNameAndJwt
} from '../../../scp-cf/destination/destination-service-types';
import { MethodRequestBuilderBase } from '../../common/request-builder/request-builder-base';
import { ODataGetByKeyRequestConfig } from '../../common/request/odata-get-by-key-request-config';
import { Expandable } from '../../common/expandable';
import { oDataUriV4 } from '../uri-conversion';
import { HttpReponse } from '../../../http-client';
import { getSingleResult } from './response-data-accessor';
/**
 * Create an OData request to get a single entity based on its key properties.
 * The properties available in the response can be restricted by creating a [[GetByKeyRequestBuilderV4.select selection]], where no selection is equal to selecting all fields of the entity.
 * Navigational properties need to expanded explicitly by [[GetAllRequestBuilderV4.expand]].
 * where no selection is equal to selecting all fields.
 *
 * @typeparam EntityT - Type of the entity to be requested
 */
export class GetByKeyRequestBuilderV4<EntityT extends EntityV4>
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
    super(new ODataGetByKeyRequestConfig(_entityConstructor, oDataUriV4));
    this.requestConfig.keys = keys;
  }

  /**
   * Restrict the response to the given selection of properties in the request.
   *
   * @param selects - Fields to select in the request
   * @returns The request builder itself, to facilitate method chaining
   */
  select(...selects: Selectable<EntityT>[]): this;
  select(selects: Selectable<EntityT>[]): this;
  select(
    first: undefined | Selectable<EntityT> | Selectable<EntityT>[],
    ...rest: Selectable<EntityT>[]
  ): this {
    this.requestConfig.selects = variableArgumentToArray(first, rest);
    return this;
  }

  expand(expands: Expandable<EntityT>[]): this;
  expand(...expands: Expandable<EntityT>[]): this;
  expand(
    first: undefined | Expandable<EntityT> | Expandable<EntityT>[],
    ...rest: Expandable<EntityT>[]
  ): this {
    this.requestConfig.expands = variableArgumentToArray(first, rest);
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
        deserializeEntityV4(
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

function extractData(response: HttpReponse): Record<string, any> {
  return response.data;
}
