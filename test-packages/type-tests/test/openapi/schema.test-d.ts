import type { SimpleTestEntity } from '@sap-cloud-sdk/test-services-openapi/test-service';
import { expectType } from 'tsd';

const simpleTestEntity: SimpleTestEntity = { stringProperty: 'prop' };

expectType<string>(simpleTestEntity.stringProperty);
expectType<any>(simpleTestEntity.additionalProperty);
