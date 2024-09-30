import { expectType } from 'tsd';
import type { SimpleTestEntity } from '@sap-cloud-sdk/test-services-openapi/test-service';

const simpleTestEntity: SimpleTestEntity = { stringProperty: 'prop' };

expectType<string>(simpleTestEntity.stringProperty);
expectType<any>(simpleTestEntity.additionalProperty);
