import {
  CreateRequestBuilder,
  DeleteRequestBuilder,
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
export declare function batch(
  ...requests: Array<
    | ReadMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder
    | BatchChangeSet<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder>
  >
): ODataBatchRequestBuilder;
export declare function batch(
  requests: Array<
    | ReadMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder
    | BatchChangeSet<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder>
  >
): ODataBatchRequestBuilder;
/**
 * Change set constructor consists of write operations supported on the Microsoft O Data Service Sample Trippin In Memory Models Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export declare function changeset(
  ...requests: Array<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder>
): BatchChangeSet<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder>;
export declare function changeset(
  requests: Array<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder>
): BatchChangeSet<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder>;
export declare const defaultMicrosoftODataServiceSampleTrippinInMemoryModelsServicePath =
  'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/';
export declare type ReadMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder =

    | GetAllRequestBuilder<Photos>
    | GetAllRequestBuilder<People>
    | GetAllRequestBuilder<Airlines>
    | GetAllRequestBuilder<Airports>
    | GetByKeyRequestBuilder<Photos>
    | GetByKeyRequestBuilder<People>
    | GetByKeyRequestBuilder<Airlines>
    | GetByKeyRequestBuilder<Airports>;
export declare type WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder =

    | CreateRequestBuilder<Photos>
    | UpdateRequestBuilder<Photos>
    | DeleteRequestBuilder<Photos>
    | CreateRequestBuilder<People>
    | UpdateRequestBuilder<People>
    | DeleteRequestBuilder<People>
    | CreateRequestBuilder<Airlines>
    | UpdateRequestBuilder<Airlines>
    | DeleteRequestBuilder<Airlines>
    | CreateRequestBuilder<Airports>
    | UpdateRequestBuilder<Airports>
    | DeleteRequestBuilder<Airports>;
//# sourceMappingURL=BatchRequest.d.ts.map
