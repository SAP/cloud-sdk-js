import { testFunctionImportMultipleParams } from '@sap-cloud-sdk/test-services/v4/test-service';
import { defaultDestination } from '../../../../test-resources/test/test-util/request-mocker';

describe('FunctionImportRequestBuilder', () => {
  it('builds correct url for multiple parameters', async () => {
    const params = { stringParam: 'str1', nonNullableStringParam: 'str2' };

    const requestBuilder = testFunctionImportMultipleParams(params);

    const url = await requestBuilder.url(defaultDestination);
    const expected = expect.stringMatching(
      /TestFunctionImportMultipleParams\(.*StringParam.*\)/
    );
    expect(url).toEqual(expected);
    expect(url).toContain(`StringParam='${params.stringParam}'`);
    expect(url).toContain(
      `NonNullableStringParam='${params.nonNullableStringParam}'`
    );
  });
});
