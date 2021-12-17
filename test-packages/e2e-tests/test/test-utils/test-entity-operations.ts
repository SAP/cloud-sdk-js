import { testService } from '@sap-cloud-sdk/test-services-e2e/v4/test-service';

export const { testEntityApi, testEntityLinkApi } = testService();

export async function queryEntity(key: number, destination) {
  return testEntityApi
    .requestBuilder()
    .getByKey(key)
    .expand(testEntityApi.schema.TO_MULTI_LINK)
    .execute(destination);
}

export async function deleteEntity(key: number, destination): Promise<void> {
  try {
    const fetched = await queryEntity(key, destination);
    await Promise.all(
      fetched.toMultiLink.map(link =>
        testEntityLinkApi.requestBuilder().delete(link).execute(destination)
      )
    );
    return testEntityApi.requestBuilder().delete(fetched).execute(destination);
  } catch (e) {
    if (!e.stack.includes('Request failed with status code 404')) {
      throw new Error(e);
    }
  }
}
