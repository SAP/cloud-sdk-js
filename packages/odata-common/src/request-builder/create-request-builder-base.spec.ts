import {
  CommonEntity,
  CommonEntityApi
} from '@sap-cloud-sdk/test-services-odata-common/common-entity';
import { createRequestBuilder } from '@sap-cloud-sdk/test-services-odata-common/common-request-config';
const mockBatchId = '<content-id>';
jest.mock('uuid', () => ({
  v4: jest.fn(() => mockBatchId)
}));
describe('CreateRequestBuilder', () => {
  function commonEntity(): CommonEntity {
    return new CommonEntityApi().entityBuilder().build();
  }
  it('should generate batch ID when the request builder instantiated', () => {
    const batchId = createRequestBuilder({
      payload: commonEntity()
    }).getBatchReference().id;
    expect(batchId).toEqual(mockBatchId);
  });
  it('should set and get batch ID', () => {
    const requestBuilder = createRequestBuilder({ payload: commonEntity() });
    const batchId = 'new-batch-id';
    requestBuilder.setBatchId(batchId);
    expect(requestBuilder.getBatchReference().id).toEqual(batchId);
  });
});
