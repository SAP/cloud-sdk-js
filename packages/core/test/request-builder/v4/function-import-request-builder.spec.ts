import { defaultDestination } from '../../test-util/request-mocker';
import { testFunctionImportMultipleParams } from '../../test-util/test-services/v4/test-service';

describe('FunctionImportRequestBuilderV4', () => {
  it('builds correct url for multiple parameters', async () => {
    const params = { stringParam: 'str1', nonNullableStringParam: 'str2' };

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
