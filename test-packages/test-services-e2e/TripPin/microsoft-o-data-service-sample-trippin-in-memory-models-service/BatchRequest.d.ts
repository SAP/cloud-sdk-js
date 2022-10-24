import {
  CreateRequestBuilder,
  DeleteRequestBuilder,
  DeSerializers,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  ODataBatchRequestBuilder,
  UpdateRequestBuilder,
  FunctionImportRequestBuilder,
  ActionImportRequestBuilder,
  BatchChangeSet
} from '@sap-cloud-sdk/odata-v4';
import {
  Photos,
  People,
  Airlines,
  Airports,
  GetNearestAirportParameters,
  ResetDataSourceParameters
} from './index';
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
  | GetAllRequestBuilder<Photos<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<People<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<Airlines<DeSerializersT>, DeSerializersT>
  | GetAllRequestBuilder<Airports<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<Photos<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<People<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<Airlines<DeSerializersT>, DeSerializersT>
  | GetByKeyRequestBuilder<Airports<DeSerializersT>, DeSerializersT>
  | FunctionImportRequestBuilder<
      DeSerializersT,
      GetNearestAirportParameters<DeSerializersT>,
      Airports
    >;
export declare type WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder<
  DeSerializersT extends DeSerializers
> =
  | CreateRequestBuilder<Photos<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<Photos<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<Photos<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<People<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<People<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<People<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<Airlines<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<Airlines<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<Airlines<DeSerializersT>, DeSerializersT>
  | CreateRequestBuilder<Airports<DeSerializersT>, DeSerializersT>
  | UpdateRequestBuilder<Airports<DeSerializersT>, DeSerializersT>
  | DeleteRequestBuilder<Airports<DeSerializersT>, DeSerializersT>
  | ActionImportRequestBuilder<
      DeSerializersT,
      ResetDataSourceParameters<DeSerializersT>,
      undefined
    >;
//# sourceMappingURL=BatchRequest.d.ts.map
