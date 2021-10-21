import { Destination } from '@sap-cloud-sdk/connectivity';
import {
  batch,
  TestEntity
} from '@sap-cloud-sdk/core/test/test-util/test-services/v2/test-service';
import {
  buildTestEntity,
  createChangeSetWithFakeId
} from '@sap-cloud-sdk/core/test/test-util/batch-test-util';
import { ODataBatchRequestConfig } from '../../request';
import {
  serializeBatchRequest,
  serializeChangeSet,
  serializeRequest
} from './batch-request-serializer';

describe('batch request serializer', () => {
  let testEntity: TestEntity;
  beforeEach(() => {
    testEntity = buildTestEntity();
  });

  describe('serializeRequest', () => {
    it('serializes getAll request', () => {
      expect(
        serializeRequest(TestEntity.requestBuilder().getAll())
      ).toMatchSnapshot();
    });

    it('serializes getAll request with filter', () => {
      expect(
        serializeRequest(
          TestEntity.requestBuilder()
            .getAll()
            .filter(TestEntity.STRING_PROPERTY.equals('test'))
        )
      ).toMatchSnapshot();
    });

    it('encodes user provided filter parameters only once', () => {
      expect(
        serializeRequest(
          TestEntity.requestBuilder()
            .getAll()
            .filter(TestEntity.STRING_PROPERTY.equals('with EmptySpace'))
        )
      ).toMatch(/filter=\(StringProperty%20eq%20'with%20EmptySpace'\)/);
    });

    it('serializes getAll request with custom headers', () => {
      expect(
        serializeRequest(
          TestEntity.requestBuilder()
            .getAll()
            .addCustomHeaders({ 'Custom-Header': 'custom' })
        )
      ).toMatchSnapshot();
    });

    it('serializes getAll request with absolute sub request path', () => {
      expect(
        serializeRequest(TestEntity.requestBuilder().getAll(), {
          subRequestPathType: 'absolute',
          destination: { url: 'http://example.com' }
        })
      ).toMatchSnapshot();
    });

    it('serializes getAll request with entity relative sub request path', () => {
      expect(
        serializeRequest(TestEntity.requestBuilder().getAll(), {
          subRequestPathType: 'relativeToEntity',
          destination: { url: 'http://example.com' }
        })
      ).toMatchSnapshot();
    });

    it('serializes getByKey request', () => {
      const getByKeyRequest = TestEntity.requestBuilder().getByKey(
        'testId',
        'test'
      );
      expect(serializeRequest(getByKeyRequest)).toMatchSnapshot();
    });

    it('serializes create request', () => {
      const createRequest = TestEntity.requestBuilder().create(testEntity);
      expect(serializeRequest(createRequest)).toMatchSnapshot();
    });

    it('serializes update request', () => {
      const updateRequest = TestEntity.requestBuilder().update(testEntity);
      expect(serializeRequest(updateRequest)).toMatchSnapshot();
    });

    it('serializes update request using put', () => {
      const updateRequest = TestEntity.requestBuilder()
        .update(testEntity)
        .replaceWholeEntityWithPut();
      expect(serializeRequest(updateRequest)).toMatchSnapshot();
    });

    it('serializes delete request with entity', () => {
      const deleteRequest = TestEntity.requestBuilder().delete(testEntity);
      expect(serializeRequest(deleteRequest)).toMatchSnapshot();
    });

    it('serializes delete request with id', () => {
      const deleteRequest = TestEntity.requestBuilder().delete('test', 'test');
      expect(serializeRequest(deleteRequest)).toMatchSnapshot();
    });

    it('serializes delete request with eTag', () => {
      const deleteRequest = TestEntity.requestBuilder().delete(
        testEntity.setVersionIdentifier('eTag')
      );
      expect(serializeRequest(deleteRequest)).toMatchSnapshot();
    });
  });

  describe('serializeChangeSet', () => {
    it('serializes change set with one operation', () => {
      const createRequest = TestEntity.requestBuilder().create(testEntity);
      expect(
        serializeChangeSet(createChangeSetWithFakeId(createRequest))
      ).toMatchSnapshot();
    });

    it('serializes change set with multiple operations', () => {
      const updateRequest = TestEntity.requestBuilder().update(testEntity);
      const createRequest = TestEntity.requestBuilder().create(testEntity);
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
    it('serializes payload for batch subrequests', () => {
      const request = batch(
        createChangeSetWithFakeId(
          TestEntity.requestBuilder().create(testEntity)
        ),
        TestEntity.requestBuilder().getAll(),
        createChangeSetWithFakeId(
          TestEntity.requestBuilder().update(testEntity),
          TestEntity.requestBuilder().delete(testEntity)
        ),
        TestEntity.requestBuilder().getByKey('guidId', 'strId')
      );

      request.requestConfig = {
        boundary: 'batch_boundary'
      } as ODataBatchRequestConfig;

      expect(serializeBatchRequest(request)).toMatchSnapshot();
    });

    it("throws an error if the request option 'absolute' is with a destination without url.", () => {
      const batchRequestBuilder = batch().withSubRequestPathType('absolute');
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
