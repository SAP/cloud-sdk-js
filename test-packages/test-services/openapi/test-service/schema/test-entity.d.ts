import type { SimpleTestEntity } from './simple-test-entity';
/**
 * Representation of the 'TestEntity' schema.
 */
export declare type TestEntity =
  | {
      keyProperty: string;
      stringProperty?: string;
      dateProperty?: string;
      dateTimeProperty?: string;
      int32Property?: number;
      int64Property?: number;
      floatProperty?: number;
      doubleProperty?: number;
      /**
       * SimpleTestEntity schema
       */
      linkedSimpleTestEntity?: SimpleTestEntity;
      linkedSimpleTestEntityCollection?: SimpleTestEntity[];
    }
  | Record<string, any>;
//# sourceMappingURL=test-entity.d.ts.map
