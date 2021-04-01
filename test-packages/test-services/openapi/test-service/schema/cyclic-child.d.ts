import type { CyclicParent } from './cyclic-parent';
/**
 * Representation of the 'CyclicChild' schema.
 */
export declare type CyclicChild =
  | {
      /**
       * Use PR 1160 Mapping here later
       */
      parent?: CyclicParent;
    }
  | Record<string, any>;
//# sourceMappingURL=cyclic-child.d.ts.map
