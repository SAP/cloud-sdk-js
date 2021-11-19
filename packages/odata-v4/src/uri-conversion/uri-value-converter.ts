/* eslint-disable valid-jsdoc */

import { UriConverter } from '@sap-cloud-sdk/odata-common';
import { defaultDeSerializers } from '../de-serializers/default-de-serializers';

export const uriConverter: UriConverter = new UriConverter(
  defaultDeSerializers
);
