import { BatchRequestBuilder } from './batch-request-builder';

describe('batch request builder', () => {
  it('initializes headers correctly', () => {
    const requestBuilder = new BatchRequestBuilder('path', [], {});
    expect(requestBuilder.requestConfig.contentType).toMatch(
      /multipart\/mixed; boundary=.*/
    );
  });
});
