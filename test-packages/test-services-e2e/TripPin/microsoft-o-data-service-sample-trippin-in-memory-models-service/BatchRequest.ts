/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CreateRequestBuilder, DeleteRequestBuilder, GetAllRequestBuilder, GetByKeyRequestBuilder, ODataBatchChangeSet, ODataBatchRequestBuilder, UpdateRequestBuilder } from '@sap-cloud-sdk/core';
import { People, Airlines, Airports, NewComePeople } from './index';

/**
 * Batch builder for operations supported on the Microsoft O Data Service Sample Trippin In Memory Models Service.
 * @param requests The requests of the batch
 * @returns A request builder for batch.
 */
export function batch(...requests: Array<ReadMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder | ODataBatchChangeSet<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder>>): ODataBatchRequestBuilder {
  return new ODataBatchRequestBuilder(defaultMicrosoftODataServiceSampleTrippinInMemoryModelsServicePath, requests, map);
}

/**
 * Change set constructor consists of write operations supported on the Microsoft O Data Service Sample Trippin In Memory Models Service.
 * @param requests The requests of the change set
 * @returns A change set for batch.
 */
export function changeset(...requests: WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder[]): ODataBatchChangeSet<WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder> {
  return new ODataBatchChangeSet(requests);
}

export const defaultMicrosoftODataServiceSampleTrippinInMemoryModelsServicePath = '/sap/opu/odata/sap/Microsoft.OData.Service.Sample.TrippinInMemory.Models';
const map = { 'People': People, 'Airlines': Airlines, 'Airports': Airports, 'NewComePeople': NewComePeople };
export type ReadMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder = GetAllRequestBuilder<People> | GetAllRequestBuilder<Airlines> | GetAllRequestBuilder<Airports> | GetAllRequestBuilder<NewComePeople> | GetByKeyRequestBuilder<People> | GetByKeyRequestBuilder<Airlines> | GetByKeyRequestBuilder<Airports> | GetByKeyRequestBuilder<NewComePeople>;
export type WriteMicrosoftODataServiceSampleTrippinInMemoryModelsServiceRequestBuilder = CreateRequestBuilder<People> | UpdateRequestBuilder<People> | DeleteRequestBuilder<People> | CreateRequestBuilder<Airlines> | UpdateRequestBuilder<Airlines> | DeleteRequestBuilder<Airlines> | CreateRequestBuilder<Airports> | UpdateRequestBuilder<Airports> | DeleteRequestBuilder<Airports> | CreateRequestBuilder<NewComePeople> | UpdateRequestBuilder<NewComePeople> | DeleteRequestBuilder<NewComePeople>;
