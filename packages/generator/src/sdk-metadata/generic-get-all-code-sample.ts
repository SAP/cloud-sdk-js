import { testService } from '@sap-cloud-sdk/test-services-odata-v2/test-service';

const { testEntityApi } = testService();
const resultPromise = testEntityApi.requestBuilder().getAll().top(5).execute({ destinationName: 'myDestinationName' });
