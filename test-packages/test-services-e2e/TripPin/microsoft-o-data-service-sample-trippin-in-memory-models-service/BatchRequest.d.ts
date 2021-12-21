import {
  CreateRequestBuilder,
  DeleteRequestBuilder,
  DeSerializers,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  ODataBatchRequestBuilder,
  UpdateRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import { Photos, People, Airlines, Airports } from './index';
import { BatchChangeSet } from '@sap-cloud-sdk/odata-common/internal';
/**
 * Batch builder for operations supported on the Microsoft O Data Service Sample Trippin In Memory Models Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export declare function batch<DeSerializersT extends DeSerializers>(
  ...requests: Array<
    | ReadMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT>;
export declare function batch<DeSerializersT extends DeSerializers>(
  requests: Array<
    | ReadMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder<DeSerializersT>
    | BatchChangeSet<DeSerializersT>
  >
): ODataBatchRequestBuilder<DeSerializersT>;
/**
 * Change set constructor consists of write operations supported on the Microsoft O Data Service Sample Trippin In Memory Models Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export declare function changeset<DeSerializersT extends DeSerializers>(
  ...requests: Array<
    WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder<DeSerializersT>
  >
): BatchChangeSet<DeSerializersT>;
export declare function changeset<DeSerializersT extends DeSerializers>(
  requests: Array<
    WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder<DeSerializersT>
  >
): BatchChangeSet<DeSerializersT>;
export declare const defaultMicrosoftODataServiceSampleTrippinInMemoryModelsServicePath =
  'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/';
export declare type ReadMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | GetAllRequestBuilder<Photos, DeSerializersT>
  | GetAllRequestBuilder<People, DeSerializersT>
  | GetAllRequestBuilder<Airlines, DeSerializersT>
  | GetAllRequestBuilder<Airports, DeSerializersT>
  | GetByKeyRequestBuilder<Photos, DeSerializersT>
  | GetByKeyRequestBuilder<People, DeSerializersT>
  | GetByKeyRequestBuilder<Airlines, DeSerializersT>
  | GetByKeyRequestBuilder<Airports, DeSerializersT>;
export declare type WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | CreateRequestBuilder<Photos, DeSerializersT>
  | UpdateRequestBuilder<Photos, DeSerializersT>
  | DeleteRequestBuilder<Photos, DeSerializersT>
  | CreateRequestBuilder<People, DeSerializersT>
  | UpdateRequestBuilder<People, DeSerializersT>
  | DeleteRequestBuilder<People, DeSerializersT>
  | CreateRequestBuilder<Airlines, DeSerializersT>
  | UpdateRequestBuilder<Airlines, DeSerializersT>
  | DeleteRequestBuilder<Airlines, DeSerializersT>
  | CreateRequestBuilder<Airports, DeSerializersT>
  | UpdateRequestBuilder<Airports, DeSerializersT>
  | DeleteRequestBuilder<Airports, DeSerializersT>;
//# sourceMappingURL=BatchRequest.d.ts.map
