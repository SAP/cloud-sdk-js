import type { SimpleTestEntity } from './simple-test-entity';
import type { TestEntity } from './test-entity';
/**
 * Representation of the 'ComplexTestEntity' schema.
 */
export declare type ComplexTestEntity =
  | {
      referenceProperty?: SimpleTestEntity;
      arrayProperty?:
        | {
            item?: string;
          }
        | Record<string, any>[];
      uniqueItemsProperty?: Set<string>;
      requiredPropertiesProperty?:
        | {
            optionalProperty?: string;
            requiredProperty: string;
          }
        | Record<string, any>;
      enumProperty?: 'one' | 'two';
      oneOfProperty?: SimpleTestEntity | TestEntity;
      allOfProperty?:
        | (SimpleTestEntity & {
            additionalProperty?: string;
          })
        | Record<string, any>;
      anyOfProperty?:
        | SimpleTestEntity
        | {
            additionalProperty?: string;
          }
        | Record<string, any>;
      notProperty?: any;
      objectPropertyWithNoAdditionalProperties?: {
        specifiedProperty?: string;
      };
      objectPropertyWithAdditionalProperties?:
        | {
            specifiedProperty?: string;
          }
        | Record<string, any>;
      objectPropertyWithNumberAdditionalProperties?:
        | {
            specifiedProperty?: string;
          }
        | Record<string, number>;
    }
  | Record<string, any>;
//# sourceMappingURL=complex-test-entity.d.ts.map
