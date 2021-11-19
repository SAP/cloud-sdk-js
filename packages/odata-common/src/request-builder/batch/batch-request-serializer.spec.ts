import { Destination } from '@sap-cloud-sdk/connectivity';
import { serializeChangeSet } from '@sap-cloud-sdk/odata-common';
import { CommonEntity } from '../../../test/common-entity';
import {
  batchRequestBuilder,
  createRequestBuilder,
  deleteRequestBuilder,
  getAllRequestBuilder,
  getByKeyRequestBuilder,
  updateRequestBuilder, WriteBuilder
} from '../../../test/common-request-config';
import {
  serializeBatchRequest,
  serializeRequest
} from './batch-request-serializer';
import { BatchChangeSet } from './batch-change-set';

function commonEntity(): CommonEntity {
  return CommonEntity.builder()
    .keyPropertyGuid('guidId')
    .keyPropertyString('strId')
    .stringProperty('value')
    .build();
}
const entityKeys = {
  KeyPropertyGuid: 'testId',
  KeyPropertyString: 'test'
};

export function changeSet(
    requests: WriteBuilder[]
): BatchChangeSet<WriteBuilder> {
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
            filter: CommonEntity.STRING_PROPERTY.equals('test')
          })
        )
      ).toMatchSnapshot();
    });

    it('encodes user provided filter parameters only once', () => {
      expect(
        serializeRequest(
          getAllRequestBuilder({
            filter: CommonEntity.STRING_PROPERTY.equals('with EmptySpace')
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
      expect(
        serializeRequest(updateRequestBuilder({ payload: commonEntity() }))
      ).toMatchSnapshot();
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
    it('serializes payload for batch subequests', () => {
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
          destination: {} as Destination
        })
      ).toThrowErrorMatchingInlineSnapshot(
        '"Cannot serialize batch request. Invalid destination provided for sub request path type \'absolute\'"'
      );
    });
  });
});
