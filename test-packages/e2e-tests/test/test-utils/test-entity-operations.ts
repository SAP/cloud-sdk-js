import {
  TestEntity,
  TestEntityLink
} from '@sap-cloud-sdk/test-services-e2e/v4/test-service';

export async function queryEntity(
  key: number,
  destination
): Promise<TestEntity> {
  return TestEntity.requestBuilder()
    .getByKey(key)
    .expand(TestEntity.TO_MULTI_LINK)
    .execute(destination);
}

export async function deleteEntity(key: number, destination): Promise<void> {
  try {
    const fetched = await queryEntity(key, destination);
    await Promise.all(
      fetched.toMultiLink.map(link =>
        TestEntityLink.requestBuilder().delete(link).execute(destination)
      )
    );
    return TestEntity.requestBuilder().delete(fetched).execute(destination);
  } catch (e) {
    if (!e.stack.includes('Request failed with status code 404')) {
      throw new Error(e);
    }
  }
}
