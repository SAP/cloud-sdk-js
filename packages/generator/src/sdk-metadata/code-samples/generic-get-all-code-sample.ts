import { TestEntity } from '@sap-cloud-sdk/core/test/test-util/test-services/v2/test-service';

const resultPromise = TestEntity.requestBuilder().getAll().top(5).execute({ destinationName:'myDestinationName' });
