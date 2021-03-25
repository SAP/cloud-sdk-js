import { BusinessPartner } from '@sap/cloud-sdk-vdm-business-partner-service';

const resultPromise = BusinessPartner.requestBuilder()
  .getAll()
  .top(5)
  .execute({ destinationName: 'myDestinationName' });
