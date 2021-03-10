import { TestEntity } from '@sap-cloud-sdk/test-services/v2/test-service';

const result = TestEntity.requestBuilder().getAll().top(5).execute({destinationName:'myDestinationName'})
