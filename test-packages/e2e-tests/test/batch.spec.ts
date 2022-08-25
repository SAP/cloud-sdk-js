import {
  batch,
  changeset,
  returnInt,
  returnSapCloudSdk
} from '@sap-cloud-sdk/test-services-e2e/v4/test-service';
import { destination } from './test-util';
import {
  deleteEntity,
  testEntityApi
} from './test-utils/test-entity-operations';

const entityKey = 456;
const requestBuilder = testEntityApi.requestBuilder();

describe('batch', () => {
  beforeEach(async () => deleteEntity(entityKey, destination));
  afterEach(async () => deleteEntity(entityKey, destination));

  it('should execute multiple function imports', async () => {
    const [responseSdk, responseInt, responseGetAll] = await batch(
      returnSapCloudSdk({}),
      returnInt({ param: 123 }),
      requestBuilder.getAll().top(1)
    )
      .skipCsrfTokenFetching()
      .withSubRequestPathType('relativeToEntity')
      .execute(destination);
    if (!responseSdk.isReadResponse()) {
      throw new Error('Expected response type is not read');
    }

    expect(returnSapCloudSdk({}).responseTransformer(responseSdk.body)).toBe(
      'SapCloudSdk'
    );

    if (!responseInt.isReadResponse()) {
      throw new Error('Expected response type is not read');
    }
    expect(returnInt({} as any).responseTransformer(responseInt.body)).toBe(
      123
    );

    if (!responseGetAll.isReadResponse()) {
      throw new Error('Expected response type is not read');
    }
    expect(responseGetAll.as(testEntityApi)[0].stringProperty).toBeDefined();
  });

  it('should execute retrieve and change set requests', async () => {
    const getAll = requestBuilder.getAll();
    const testEntity = testEntityApi
      .entityBuilder()
      .keyTestEntity(entityKey)
      .stringProperty('batch')
      .build();
    const create = requestBuilder.create(testEntity);
    const deleteRequestBuilder = requestBuilder.delete(entityKey);

    const [retrieveResponse, changesetResponse] = await batch(
      getAll,
      changeset(create)
    )
      .withSubRequestPathType('relativeToEntity')
      .skipCsrfTokenFetching()
      .execute(destination);

    const [deleteRes] = await batch(changeset(deleteRequestBuilder))
      .withSubRequestPathType('relativeToEntity')
      .skipCsrfTokenFetching()
      .execute(destination);

    expect(retrieveResponse.isSuccess()).toBe(true);
    expect(changesetResponse.isSuccess()).toBe(true);
    expect(deleteRes.isSuccess()).toBe(true);
  });
});
