import {TestEntity, testService} from '@sap-cloud-sdk/test-services-odata-v2/test-service/index';
import { OneToOneLink } from '@sap-cloud-sdk/odata-common';
import {expectError, expectType} from "tsd";
import {DefaultDeSerializerV2} from "./batch.test-d";
import {TestEntitySingleLinkApi} from "@sap-cloud-sdk/test-services-odata-v2/test-service/TestEntitySingleLinkApi";

const { testEntityApi, testEntitySingleLinkApi } = testService();

expectType<OneToOneLink<TestEntity<DefaultDeSerializerV2>, DefaultDeSerializerV2, TestEntitySingleLinkApi<DefaultDeSerializerV2>>>(new OneToOneLink(
  'TestEntitySingleLink',
  testEntityApi,
  testEntitySingleLinkApi
));

expectError<any>(new OneToOneLink(
  'SomeWrongLink',
  testEntityApi,
  {} // $ExpectError
));
