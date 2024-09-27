import type { CommonEntity } from '@sap-cloud-sdk/test-services-odata-common/common-entity';
import {
  commonEntityApi,
  CommonEntityApi
} from '@sap-cloud-sdk/test-services-odata-common/common-entity';
import type { WriteBuilder } from '@sap-cloud-sdk/test-services-odata-common/common-request-config';
import {
  batchRequestBuilder,
  createRequestBuilder,
  deleteRequestBuilder,
  getAllRequestBuilder,
  getByKeyRequestBuilder,
  updateRequestBuilder
} from '@sap-cloud-sdk/test-services-odata-common/common-request-config';
import type { HttpDestination } from '@sap-cloud-sdk/connectivity/internal';
import {
  serializeBatchRequest,
  serializeRequest,
  serializeChangeSet
} from './batch-request-serializer';
import { BatchChangeSet } from './batch-change-set';

jest.mock('uuid', () => ({
  v4: jest.fn(() => '<content-id>')
}));

function commonEntity(): CommonEntity {
  return CommonEntityApi._privateFactory()
    .entityBuilder()
    .keyPropertyGuid('guidId')
    .keyPropertyString('strId')
    .stringProperty('value')
    .build();
}
const entityKeys = {
  KeyPropertyGuid: 'testId',
  KeyPropertyString: 'test'
};

function changeSet(requests: WriteBuilder[]): BatchChangeSet {
  return new BatchChangeSet<any>(requests, 'changeSet_boundary');
}

describe('batch request serializer', () => {
  describe('serializeRequest', () => {
    it('serializes getAll request', () => {
      expect(serializeRequest(getAllRequestBuilder())).toMatchSnapshot();
    });

    it('serializes getAll request with filter', () => {
      expect(
        serializeRequest(
          getAllRequestBuilder({
            filter: commonEntityApi.schema.STRING_PROPERTY.equals('test')
          })
        )
      ).toMatchSnapshot();
    });

    it('encodes user provided filter parameters only once', () => {
      expect(
        serializeRequest(
          getAllRequestBuilder({
            filter:
              commonEntityApi.schema.STRING_PROPERTY.equals('with EmptySpace')
          })
        )
      ).toMatch(/filter=\(StringProperty%20eq%20'with%20EmptySpace'\)/);
    });

    it('serializes getAll request with custom headers', () => {
      expect(
        serializeRequest(
          getAllRequestBuilder({ headers: { 'Custom-Header': 'custom' } })
        )
      ).toMatchSnapshot();
    });

    it('serializes getAll request with absolute sub request path', () => {
      expect(
        serializeRequest(getAllRequestBuilder(), {
          subRequestPathType: 'absolute',
          destination: { url: 'http://example.com' }
        })
      ).toMatchSnapshot();
    });

    it('serializes getAll request with entity relative sub request path', () => {
      expect(
        serializeRequest(getAllRequestBuilder(), {
          subRequestPathType: 'relativeToEntity',
          destination: { url: 'http://example.com' }
        })
      ).toMatchSnapshot();
    });
    it('serializes getAll request with entity relative to request URI', () => {
      expect(
        serializeRequest(getAllRequestBuilder(), {
          subRequestPathType: 'noPath',
          destination: { url: 'http://example.com' }
        })
      ).toMatchSnapshot();
    });

    it('serializes getByKey request', () => {
      expect(
        serializeRequest(getByKeyRequestBuilder({ keys: entityKeys }))
      ).toMatchSnapshot();
    });

    it('serializes create request', () => {
      expect(
        serializeRequest(createRequestBuilder({ payload: commonEntity() }))
      ).toMatchSnapshot();
    });

    it('serializes update request', () => {
      const test = serializeRequest(
        updateRequestBuilder({ payload: commonEntity() })
      );
      expect(test).toMatchSnapshot();
    });

    it('serializes update request using put', () => {
      const updateRequest = updateRequestBuilder({
        payload: commonEntity()
      }).replaceWholeEntityWithPut();
      expect(serializeRequest(updateRequest)).toMatchSnapshot();
    });

    it('serializes delete request with entity', () => {
      expect(
        serializeRequest(deleteRequestBuilder({ payload: commonEntity() }))
      ).toMatchSnapshot();
    });

    it('serializes delete request with id', () => {
      expect(
        serializeRequest(deleteRequestBuilder({ keys: entityKeys }))
      ).toMatchSnapshot();
    });

    it('serializes delete request with eTag', () => {
      const withEtag = commonEntity().setVersionIdentifier('eTag');
      expect(
        serializeRequest(deleteRequestBuilder({ payload: withEtag }))
      ).toMatchSnapshot();
    });
  });

  describe('serializeChangeSet', () => {
    it('serializes change set with one operation', () => {
      const createRequest = createRequestBuilder({ payload: commonEntity() });
      expect(serializeChangeSet(changeSet([createRequest]))).toMatchSnapshot();
    });

    it('serializes change set with multiple operations', () => {
      const updateRequest = updateRequestBuilder({ payload: commonEntity() });
      const createRequest = createRequestBuilder({ payload: commonEntity() });
      expect(
        serializeChangeSet(
          new BatchChangeSet<any>(
            [updateRequest, createRequest],
            'changeSet_boundary'
          )
        )
      ).toMatchSnapshot();
    });

    it('returns undefined for empty change set', () => {
      expect(serializeChangeSet(changeSet([]))).toBeUndefined();
    });
  });

  describe('serializeBatchRequest', () => {
    it('serializes payload for batch subrequests', () => {
      const requests = [
        changeSet([createRequestBuilder({ payload: commonEntity() })]),
        getAllRequestBuilder(),
        changeSet([
          updateRequestBuilder({ payload: commonEntity() }),
          deleteRequestBuilder({ keys: entityKeys })
        ]),
        getByKeyRequestBuilder({ keys: entityKeys })
      ];
      expect(
        serializeBatchRequest(batchRequestBuilder(requests))
      ).toMatchSnapshot();
    });

    it("throws an error if the request option 'absolute' is with a destination without url.", () => {
      const request = batchRequestBuilder([]).withSubRequestPathType(
        'absolute'
      );
      expect(() =>
        serializeBatchRequest(request, {
          subRequestPathType: request.requestConfig.subRequestPathType,
          destination: { url: '' } as HttpDestination
        })
      ).toThrowErrorMatchingInlineSnapshot(
        '"Cannot serialize batch request. Invalid destination provided for sub request path type \'absolute\'"'
      );
    });
  });
});
