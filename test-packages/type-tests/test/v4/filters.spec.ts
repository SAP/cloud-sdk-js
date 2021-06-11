import { and, any } from '@sap-cloud-sdk/core';
import { TestEntity, TestEntityMultiLink } from '@sap-cloud-sdk/test-services/v4/test-service';

// $ExpectType FilterList<TestEntity>
and(TestEntity.TO_MULTI_LINK.filter(any(TestEntityMultiLink.STRING_PROPERTY.equals('test'))));
