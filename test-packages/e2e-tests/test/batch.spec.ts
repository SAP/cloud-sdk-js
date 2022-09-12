import {
  batch,
  changeset,
  createTestEntityByIdReturnId,
  returnInt,
  returnSapCloudSdk
} from '@sap-cloud-sdk/test-services-e2e/v4/test-service';
import { BatchChangeSet } from '@sap-cloud-sdk/odata-common';
import { DefaultDeSerializers } from '@sap-cloud-sdk/odata-v4';
import { destination } from './test-util';
import {
  deleteEntity,
  testEntityApi
} from './test-utils/test-entity-operations';

const entityKey = 456;
const entityKeysUsedInTests = [456, 1000, 1001];
const requestBuilder = testEntityApi.requestBuilder();

async function deleteAllCreatedEntities() {
  await Promise.all(
    entityKeysUsedInTests.map(id => deleteEntity(id, destination))
  );
}

describe('batch', () => {
  beforeEach(async () => deleteAllCreatedEntities());
  afterAll(async () => deleteAllCreatedEntities());

  it('should execute multiple action and function imports', async () => {
    const [responseSkd, create] = await batch(
      returnSapCloudSdk({}),
      new BatchChangeSet<DefaultDeSerializers>([
        createTestEntityByIdReturnId({ id: 1000 }),
        createTestEntityByIdReturnId({ id: 1001 })
      ])
    )
      .withSubRequestPathType('relativeToEntity')
      .execute(destination);

    if (!responseSkd.isReadResponse()) {
      throw new Error('Should be read response');
    }
    if (!create.isWriteResponses()) {
      throw new Error('Should be write response');
    }
    const casted = create.responses.map(res =>
      createTestEntityByIdReturnId({} as any).responseTransformer(res.body)
    );
    expect(casted.sort()).toEqual([1000, 1001]);
  });

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
