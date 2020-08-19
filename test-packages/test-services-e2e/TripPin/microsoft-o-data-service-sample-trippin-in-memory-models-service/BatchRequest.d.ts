import { CreateRequestBuilderV4, DeleteRequestBuilderV4, GetAllRequestBuilderV4, GetByKeyRequestBuilderV4, ODataBatchChangeSetV4, ODataBatchRequestBuilderV4, UpdateRequestBuilderV4 } from '@sap-cloud-sdk/core';
import { People, Airlines, Airports, NewComePeople } from './index';
/**
 * Batch builder for operations supported on the Microsoft O Data Service Sample Trippin In Memory Models Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export declare function batch(...requests: Array<ReadMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder | ODataBatchChangeSetV4<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder>>): ODataBatchRequestBuilderV4;
/**
 * Change set constructor consists of write operations supported on the Microsoft O Data Service Sample Trippin In Memory Models Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export declare function changeset(...requests: WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder[]): ODataBatchChangeSetV4<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder>;
export declare const defaultMicrosoftODataServiceSampleTrippinInMemoryModelsServicePath = "/sap/opu/odata/sap/Microsoft.OData.Service.Sample.TrippinInMemory.Models";
export declare type ReadMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder = GetAllRequestBuilderV4<People> | GetAllRequestBuilderV4<Airlines> | GetAllRequestBuilderV4<Airports> | GetAllRequestBuilderV4<NewComePeople> | GetByKeyRequestBuilderV4<People> | GetByKeyRequestBuilderV4<Airlines> | GetByKeyRequestBuilderV4<Airports> | GetByKeyRequestBuilderV4<NewComePeople>;
export declare type WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder = CreateRequestBuilderV4<People> | UpdateRequestBuilderV4<People> | DeleteRequestBuilderV4<People> | CreateRequestBuilderV4<Airlines> | UpdateRequestBuilderV4<Airlines> | DeleteRequestBuilderV4<Airlines> | CreateRequestBuilderV4<Airports> | UpdateRequestBuilderV4<Airports> | DeleteRequestBuilderV4<Airports> | CreateRequestBuilderV4<NewComePeople> | UpdateRequestBuilderV4<NewComePeople> | DeleteRequestBuilderV4<NewComePeople>;
//# sourceMappingURL=BatchRequest.d.ts.map