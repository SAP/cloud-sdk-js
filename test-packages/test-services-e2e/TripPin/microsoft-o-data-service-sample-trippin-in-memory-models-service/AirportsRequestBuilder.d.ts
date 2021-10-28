import { RequestBuilder } from '@sap-cloud-sdk/odata-common';
import {
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  CreateRequestBuilder,
  UpdateRequestBuilder,
  DeleteRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import { Airports } from './Airports';
/**
 * Request builder class for operations supported on the [[Airports]] entity.
 */
export declare class AirportsRequestBuilder extends RequestBuilder<Airports> {
  /**
   * Returns a request builder for retrieving one `Airports` entity based on its keys.
   * @param icaoCode Key property. See [[Airports.icaoCode]].
   * @returns A request builder for creating requests to retrieve one `Airports` entity based on its keys.
   */
  getByKey(icaoCode: string): GetByKeyRequestBuilder<Airports>;
  /**
   * Returns a request builder for querying all `Airports` entities.
   * @returns A request builder for creating requests to retrieve all `Airports` entities.
   */
  getAll(): GetAllRequestBuilder<Airports>;
  /**
   * Returns a request builder for creating a `Airports` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `Airports`.
   */
  create(entity: Airports): CreateRequestBuilder<Airports>;
  /**
   * Returns a request builder for updating an entity of type `Airports`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `Airports`.
   */
  update(entity: Airports): UpdateRequestBuilder<Airports>;
  /**
   * Returns a request builder for deleting an entity of type `Airports`.
   * @param icaoCode Key property. See [[Airports.icaoCode]].
   * @returns A request builder for creating requests that delete an entity of type `Airports`.
   */
  delete(icaoCode: string): DeleteRequestBuilder<Airports>;
  /**
   * Returns a request builder for deleting an entity of type `Airports`.
   * @param entity Pass the entity to be deleted.
   * @returns A request builder for creating requests that delete an entity of type `Airports` by taking the entity as a parameter.
   */
  delete(entity: Airports): DeleteRequestBuilder<Airports>;
}
//# sourceMappingURL=AirportsRequestBuilder.d.ts.map
