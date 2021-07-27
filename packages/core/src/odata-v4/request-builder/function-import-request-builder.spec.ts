import { defaultDestination } from '../../../test/test-util/request-mocker';
import { testFunctionImportMultipleParams } from '../../../test/test-util/test-services/v4/test-service';

describe('FunctionImportRequestBuilder', () => {
  it('builds correct url for multiple parameters', async () => {
    const params = {
      stringParam: 'str1',
      nonNullableStringParam: 'str2',
      nullableBooleanParam: null
    };

    const requestBuilder = testFunctionImportMultipleParams(params);

    const url = await requestBuilder.url(defaultDestination);
    const expected = expect.stringMatching(
      /TestFunctionImportMultipleParams\(.*StringParam.*\)?\$format=json/
    );
    expect(url).toEqual(expected);
    expect(url).toContain(`StringParam='${params.stringParam}'`);
    expect(url).toContain(
      `NonNullableStringParam='${params.nonNullableStringParam}'`
    );
  });
});
