import { TestEntity } from '@sap-cloud-sdk/test-services/test-service-legacy';

// $ExpectType GetAllRequestBuilder<TestEntity>
TestEntity.requestBuilder()
  .getAll()
  .select(
    TestEntity.STRING_PROPERTY,
    TestEntity.TO_MULTI_LINK,
    TestEntity.TO_SINGLE_LINK
  );
