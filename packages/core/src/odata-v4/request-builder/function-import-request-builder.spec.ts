import nock from 'nock';
import {
  defaultDestination,
  defaultHost
} from '../../../test/test-util/request-mocker';
import {
  testFunctionImportMultipleParams,
  testFunctionImportSharedEntityReturnType
} from '../../../test/test-util/test-services/v4/test-service';

const serviceUrl = '/testination/sap/opu/odata/sap/API_TEST_SRV';

describe('FunctionImportRequestBuilder', () => {
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

  it('throws an error when shared entity type is used as return type', async () => {
    nock(defaultHost)
      .get(`${serviceUrl}/TestFunctionImportSharedEntityReturnType()`)
      .query({ $format: 'json' })
      .reply(200, {});
    const requestBuilder = testFunctionImportSharedEntityReturnType({});

    await expect(
      requestBuilder.execute(defaultDestination)
    ).rejects.toThrowErrorMatchingSnapshot();
  });
});
