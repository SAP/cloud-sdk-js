import { expectType } from 'tsd';
import type {
  DiscriminatorEntityWithMapping,
  DiscriminatorEntityWithoutMapping,
  DiscriminatorObjectEntityWorkaroundParent,
  SimpleTestEntity
} from '@sap-cloud-sdk/test-services-openapi/test-service';

const simpleTestEntity: SimpleTestEntity = { stringProperty: 'prop' };

expectType<string>(simpleTestEntity.stringProperty);
expectType<any>(simpleTestEntity.additionalProperty);

const discriminatorEntityWithMappingA: DiscriminatorEntityWithMapping = {
  type: 'child-a',
  otherProperty: 1
};

expectType<'child-a'>(discriminatorEntityWithMappingA.type);
expectType<number | undefined>(discriminatorEntityWithMappingA.otherProperty);

const discriminatorEntityWithMappingB: DiscriminatorEntityWithMapping = {
  type: 'child-b',
  otherProperty: 'test'
};

expectType<'child-b'>(discriminatorEntityWithMappingB.type);
expectType<string>(discriminatorEntityWithMappingB.otherProperty);

const discriminatorEntityWithoutMappingA: DiscriminatorEntityWithoutMapping = {
  type: 'DiscriminatorEntityChildA',
  otherProperty: 1
};

expectType<'DiscriminatorEntityChildA'>(
  discriminatorEntityWithoutMappingA.type
);

const discriminatorEntityWithoutMappingB: DiscriminatorEntityWithoutMapping = {
  type: 'DiscriminatorEntityChildB',
  otherProperty: 'test'
};

expectType<'DiscriminatorEntityChildB'>(
  discriminatorEntityWithoutMappingB.type
);

const discriminatorWorkaroundChildA: DiscriminatorObjectEntityWorkaroundParent =
  {
    child: 'a',
    otherProperty: 'test'
  };

expectType<'a'>(discriminatorWorkaroundChildA.child);
expectType<string | undefined>(discriminatorWorkaroundChildA.otherProperty);

const discriminatorWorkaroundChildB: DiscriminatorObjectEntityWorkaroundParent =
  {
    child: 'b',
    otherProperty: 2
  };

expectType<'b'>(discriminatorWorkaroundChildB.child);
expectType<number | undefined>(discriminatorWorkaroundChildB.otherProperty);
