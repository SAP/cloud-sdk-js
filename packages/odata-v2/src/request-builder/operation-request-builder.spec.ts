import { randomUUID } from 'node:crypto';
import nock from 'nock';
import {
  testFunctionImportComplexReturnType,
  testFunctionImportEdmReturnType,
  testFunctionImportEdmReturnTypeCollection,
  testFunctionImportEntityReturnType,
  testFunctionImportEntityReturnTypeCollection,
  testFunctionImportGet,
  testFunctionImportMultipleParams,
  testFunctionImportNoReturnType,
  testFunctionImportPost,
  testFunctionImportUnsupportedEdmTypes,
  testFunctionImportSharedEntityReturnType
} from '@sap-cloud-sdk/test-services-odata-v2/test-service';
import {
  defaultDestination,
  defaultHost
} from '../../../../test-resources/test/test-util';
import { testEntityApi } from '../../test/test-util';

const serviceUrl = '/sap/opu/odata/sap/API_TEST_SRV';

const mockedBuildHeaderResponse = {
  'x-csrf-token': 'mocked-x-csrf-token',
  'set-cookie': ['mocked-cookie-0;mocked-cookie-1', 'mocked-cookie-2']
};

describe('OperationRequestBuilder', () => {
  it('builds correct url for multiple parameters', async () => {
    const params = { stringParam: 'someString', booleanParam: false };
    const requestBuilder = testFunctionImportMultipleParams(params);

    const url = await requestBuilder.url(defaultDestination);
    expect(url).toContain(`StringParam='${params.stringParam}'`);
    expect(url).toContain(`BooleanParam=${params.booleanParam}`);
  });

  it('executes request with GET', async () => {
    const simpleParam = 't';
    const requestBuilder = testFunctionImportGet({ simpleParam });

    nock(defaultHost)
      .get(`${serviceUrl}/TestFunctionImportGET`)
      .query({ SimpleParam: `'${simpleParam}'` })
      .reply(200);

    await expect(
      requestBuilder.execute(defaultDestination)
    ).resolves.not.toThrow();
  });

  it('executes request with POST', async () => {
    const simpleParam = 't';
    const requestBuilder = testFunctionImportPost({ simpleParam });

    nock(defaultHost)
      .head(`${serviceUrl}/TestFunctionImportPOST/`)
      .reply(200, undefined, mockedBuildHeaderResponse);

    nock(defaultHost)
      .post(`${serviceUrl}/TestFunctionImportPOST`)
      .query({ SimpleParam: `'${simpleParam}'` })
      .reply(200);

    await expect(
      requestBuilder.execute(defaultDestination)
    ).resolves.not.toThrow();
  });

  it('returns single EDM type', async () => {
    const requestBuilder = testFunctionImportEdmReturnType({});

    nock(defaultHost)
      .get(`${serviceUrl}/TestFunctionImportEdmReturnType`)
      .query({})
      .reply(200, { d: { TestFunctionImportEdmReturnType: true } });

    const returnValue = await requestBuilder.execute(defaultDestination);
    expect(returnValue).toBe(true);
  });

  it('returns any type for unsupported EDM type in function module', async () => {
    const requestBuilder = testFunctionImportUnsupportedEdmTypes({
      simpleParam: 'SomeUntypedValue'
    });
    const responseValue = 'AnyReturnType';
    const untypedResponse = {
      d: { TestFunctionImportUnsupportedEdmTypes: responseValue }
    };

    nock(defaultHost)
      .get(`${serviceUrl}/TestFunctionImportUnsupportedEdmTypes`)
      .query({ SimpleParam: 'SomeUntypedValue' })
      .reply(200, untypedResponse);

    const returnValue = await requestBuilder.execute(defaultDestination);
    expect(returnValue).toEqual(responseValue);
  });

  it('returns edm type collection', async () => {
    const requestBuilder = testFunctionImportEdmReturnTypeCollection({});

    nock(defaultHost)
      .get(`${serviceUrl}/TestFunctionImportEdmReturnTypeCollection`)
      .query({})
      .reply(200, { d: { results: [true, false] } });

    const returnValue = await requestBuilder.execute(defaultDestination);
    expect(returnValue).toEqual([true, false]);
  });

  it('returns single entity', async () => {
    const requestBuilder = testFunctionImportEntityReturnType({});
    const expected = createTestEntity();

    nock(defaultHost)
      .get(`${serviceUrl}/TestFunctionImportEntityReturnType`)
      .query({})
      .reply(200, { d: getTestEntityData(expected) });

    const returnValue = await requestBuilder.execute(defaultDestination);
    expect(returnValue).toEqual(expected);
  });

  it('returns entity collection', async () => {
    const requestBuilder = testFunctionImportEntityReturnTypeCollection({});
    const expected = [createTestEntity(), createTestEntity()];

    nock(defaultHost)
      .get(`${serviceUrl}/TestFunctionImportEntityReturnTypeCollection`)
      .query({})
      .reply(200, { d: { results: expected.map(e => getTestEntityData(e)) } });

    const returnValue = await requestBuilder.execute(defaultDestination);
    expect(returnValue).toEqual(expected);
  });

  it('returns single complex type', async () => {
    const requestBuilder = testFunctionImportComplexReturnType({});
    const expected = createTestComplexType();

    nock(defaultHost)
      .get(`${serviceUrl}/TestFunctionImportComplexReturnType`)
      .query({})
      .reply(200, { d: getTestComplexTypeData(expected) });

    const returnValue = await requestBuilder.execute(defaultDestination);
    expect(returnValue).toEqual(expected);
  });

  it('returns entity collection', async () => {
    const requestBuilder = testFunctionImportEntityReturnTypeCollection({});
    const expected = [createTestComplexType(), createTestComplexType()];

    nock(defaultHost)
      .get(`${serviceUrl}/TestFunctionImportEntityReturnTypeCollection`)
      .query({})
      .reply(200, {
        d: { results: expected.map(e => getTestComplexTypeData(e)) }
      });

    const returnValue = await requestBuilder.execute(defaultDestination);
    expect(returnValue).toEqual(expected);
  });

  it('returns undefined', async () => {
    nock(defaultHost)
      .head(`${serviceUrl}/TestFunctionImportNoReturnType/`)
      .reply(200, undefined, mockedBuildHeaderResponse);

    nock(defaultHost)
      .post(`${serviceUrl}/TestFunctionImportNoReturnType`)
      .reply(200);

    const response = await testFunctionImportNoReturnType({}).execute(
      defaultDestination
    );
    expect(response).toBe(undefined);
  });

  it('throws in failure case', async () => {
    nock(defaultHost)
      .head(`${serviceUrl}/TestFunctionImportNoReturnType/`)
      .reply(200, undefined, mockedBuildHeaderResponse);

    nock(defaultHost)
      .post(`${serviceUrl}/TestFunctionImportNoReturnType`)
      .reply(400);

    await expect(
      testFunctionImportNoReturnType({}).execute(defaultDestination)
    ).rejects.toThrow();
  });

  it('returns single complex type when using data accessor', async () => {
    const requestBuilder = testFunctionImportComplexReturnType({});
    const expected = createTestComplexType();

    nock(defaultHost)
      .get(`${serviceUrl}/TestFunctionImportComplexReturnType`)
      .query({})
      .reply(200, { d: { Foo: getTestComplexTypeData(expected) } });

    const returnValue = await requestBuilder.execute(
      defaultDestination,
      data => data.d.Foo
    );
    expect(returnValue).toEqual(expected);
  });

  it('throws an error when shared entity type is used as return type', async () => {
    nock(defaultHost)
      .get(`${serviceUrl}/TestFunctionImportSharedEntityReturnType`)
      .reply(200, {});
    const requestBuilder = testFunctionImportSharedEntityReturnType({}) as any;

    await expect(
      requestBuilder.execute(defaultDestination)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      "\"Failed to build an entity from the response of the function import or action import: TestFunctionImportSharedEntityReturnType, because the entity type of the return type is shared by multiple entity sets. Please use 'executeRaw' instead of 'execute' to get the raw response. Original response body: {}.\""
    );
  });
});

function createTestEntity() {
  return testEntityApi
    .entityBuilder()
    .keyPropertyGuid(randomUUID())
    .keyPropertyString('id')
    .build();
}

function getTestEntityData(entity) {
  return {
    KeyPropertyGuid: entity.keyPropertyGuid,
    KeyPropertyString: entity.keyPropertyString
  };
}

function createTestComplexType() {
  return { guidProperty: randomUUID() };
}

function getTestComplexTypeData(t) {
  return { GuidProperty: t.guidProperty };
}
