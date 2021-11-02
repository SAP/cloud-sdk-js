import { Destination } from '@sap-cloud-sdk/connectivity';
import {
  EdmTypeShared,
  serializeChangeSet, UriConverter
} from '@sap-cloud-sdk/odata-common';

import {
  // buildTestEntity,
  // createChangeSetWithFakeId
} from '../../../../core/test/test-util/batch-test-util';
import {MethodRequestBuilder} from "../request-builder-base";
import {
  createBatchRequest,
  createByKeyRequest, createCreateRequest,
  createDeleteRequest,
  createGetAllRequest,
  createUpdateRequest
} from "../../header-builder.spec";
import {defaultDestination} from "../../../../core/test/test-util";
import {serializeBatchRequest, serializeRequest} from "./batch-request-serializer";
import {GetAllRequestBuilderBase} from "../get-all-request-builder-base";
import {batch} from "@sap-cloud-sdk/test-services/v2/test-service";
import {BatchRequestBuilder} from "@sap-cloud-sdk/odata-common/src/request-builder/batch/batch-request-builder";
import {ODataBatchChangeSet} from "@sap-cloud-sdk/odata-v2";
import {ODataGetAllRequestConfig} from "../../request/odata-get-all-request-config";
import {DummyEntity} from "../../dummy-entity.spec";
import {ODataUri} from "../../uri-conversion/odata-uri";
import {tsToEdm} from "@sap-cloud-sdk/odata-v2/dist/payload-value-converter";
import {uriConverters} from "@sap-cloud-sdk/odata-v2/dist/uri-conversion/uri-value-converter";
import {createGetFilter} from "../../uri-conversion/get-filter";
import {getOrderBy} from "../../uri-conversion/get-orderby";




export function createChangeSetWithFakeId(
    ...requests
): ODataBatchChangeSet<any> {
  return new ODataBatchChangeSet(requests, 'changeSet_boundary');
}


const getByKey:MethodRequestBuilder={
  requestConfig:createByKeyRequest(defaultDestination)
}as any

const updateRequest:MethodRequestBuilder={
  requestConfig:createUpdateRequest(defaultDestination)
}as any

const createRequest:MethodRequestBuilder={
  requestConfig:createCreateRequest(defaultDestination)
}as any

const deleteRequest:MethodRequestBuilder={
  requestConfig:createDeleteRequest(defaultDestination)
}as any


const batchRequest:BatchRequestBuilder={
  requestConfig:createBatchRequest(defaultDestination)
}as any

const partialODataUri:ODataUri={
  getSelect:(select)=>{if(select){
    throw new Error('Select is version specific not testable here.')
  }
  return},//versionspecific
  getExpand:(expand)=>{if(expand){
    throw new Error('Expand is version specific not testable here.')
  }
  return},//versionSpecific
  getOrderBy:()=>getOrderBy,
  getFilter:()=>({filter:createGetFilter(uriConverter)})
}as any

export const uriConverter: UriConverter = {
  convertToUriFormat(value: any, edmType: any): string {
   //perhaps put common converters here
    return JSON.stringify(value)
  }
};

function getAllRequestConfig():ODataGetAllRequestConfig<DummyEntity>{
  const requestConfig = new ODataGetAllRequestConfig(DummyEntity,partialODataUri );
  requestConfig.method = 'get';

  return requestConfig
}

const getAll:GetAllRequestBuilderBase<any>={
  requestConfig:getAllRequestConfig()
} as any

describe('batch request serializer', () => {
  // let testEntity: TestEntity;
  beforeEach(() => {
    // testEntity = buildTestEntity();
  });

  describe('serializeRequest', () => {
    it('serializes getAll request', () => {
      expect(
        serializeRequest(getAll)
      ).toMatchSnapshot();
    });

    it('serializes getAll request with filter', () => {
      expect(
        serializeRequest(
          getAll
          //  .filter(TestEntity.STRING_PROPERTY.equals('test'))
        )
      ).toMatchSnapshot();
    });

    it('encodes user provided filter parameters only once', () => {
      expect(
        serializeRequest(
          getAll
           // .filter(TestEntity.STRING_PROPERTY.equals('with EmptySpace'))
        )
      ).toMatch(/filter=\(StringProperty%20eq%20'with%20EmptySpace'\)/);
    });

    it('serializes getAll request with custom headers', () => {
      expect(
        serializeRequest(
getAll
   //         .addCustomHeaders({ 'Custom-Header': 'custom' })
        )
      ).toMatchSnapshot();
    });

    it('serializes getAll request with absolute sub request path', () => {
      expect(
        serializeRequest(getAll, {
          subRequestPathType: 'absolute',
          destination: { url: 'http://example.com' }
        })
      ).toMatchSnapshot();
    });

    it('serializes getAll request with entity relative sub request path', () => {
      expect(
        serializeRequest(getAll, {
          subRequestPathType: 'relativeToEntity',
          destination: { url: 'http://example.com' }
        })
      ).toMatchSnapshot();
    });

    it('serializes getByKey request', () => {
      // const getByKeyRequest = TestEntity.requestBuilder().getByKey(
      //   'testId',
      //   'test'
      // );
      expect(serializeRequest(getByKey)).toMatchSnapshot();
    });

    it('serializes create request', () => {
      // const createRequest = TestEntity.requestBuilder().create(testEntity);
      expect(serializeRequest(getAll)).toMatchSnapshot();
    });

    it('serializes update request', () => {
      // const updateRequest = TestEntity.requestBuilder().update(testEntity);
      expect(serializeRequest(updateRequest)).toMatchSnapshot();
    });

    it('serializes update request using put', () => {
      // const updateRequest = TestEntity.requestBuilder()
      //   .update(testEntity)
      //   .replaceWholeEntityWithPut();
      expect(serializeRequest(updateRequest)).toMatchSnapshot();
    });

    it('serializes delete request with entity', () => {
      // const deleteRequest = TestEntity.requestBuilder().delete(testEntity);
      expect(serializeRequest(deleteRequest)).toMatchSnapshot();
    });

    it('serializes delete request with id', () => {
      // const deleteRequest = TestEntity.requestBuilder().delete('test', 'test');
      expect(serializeRequest(deleteRequest)).toMatchSnapshot();
    });

    it('serializes delete request with eTag', () => {
      // const deleteRequest = TestEntity.requestBuilder().delete(
      //   testEntity.setVersionIdentifier('eTag')
      // );
      expect(serializeRequest(deleteRequest)).toMatchSnapshot();
    });
  });

  describe('serializeChangeSet', () => {
    it('serializes change set with one operation', () => {
      // const createRequest = TestEntity.requestBuilder().create(testEntity);
      expect(
        serializeChangeSet(createChangeSetWithFakeId(createRequest))
      ).toMatchSnapshot();
    });

    it('serializes change set with multiple operations', () => {
      // const updateRequest = TestEntity.requestBuilder().update(testEntity);
      // const createRequest = TestEntity.requestBuilder().create(testEntity);
      expect(
        serializeChangeSet(
          createChangeSetWithFakeId(updateRequest, createRequest)
        )
      ).toMatchSnapshot();
    });

    it('returns undefined for empty change set', () => {
      expect(serializeChangeSet(createChangeSetWithFakeId())).toBeUndefined();
    });
  });

  describe('serializeBatchRequest', () => {
    it('serializes payload for batch subequests', () => {
        // tslint:disable-next-line:member-access
        Object.defineProperty(batchRequest,'requests', [
        createChangeSetWithFakeId(
            createRequest
          // TestEntity.requestBuilder().create(testEntity)
        ),
        //TestEntity.requestBuilder().getAll(),
          getAll,
        createChangeSetWithFakeId(
            updateRequest,
          deleteRequest
          // TestEntity.requestBuilder().update(testEntity),
          // TestEntity.requestBuilder().delete(testEntity)
        ),
        // TestEntity.requestBuilder().getByKey('guidId', 'strId')
          getByKey
      ]);

      // request.requestConfig = {
      //   boundary: 'batch_boundary'
      // } as ODataBatchRequestConfig;

      expect(serializeBatchRequest(batchRequest)).toMatchSnapshot();
    });

    it("throws an error if the request option 'absolute' is with a destination without url.", () => {
      const batchRequestBuilder = batchRequest//batch().withSubRequestPathType('absolute');
      expect(() =>
        serializeBatchRequest(batchRequestBuilder, {
          subRequestPathType:
            batchRequestBuilder.requestConfig.subRequestPathType,
          destination: {} as Destination
        })
      ).toThrowErrorMatchingInlineSnapshot(
        '"Cannot serialize batch request. Invalid destination provided for sub request path type \'absolute\'"'
      );
    });
  });
});
