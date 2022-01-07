import type { CyclicParent } from './cyclic-parent';
/**
 * Representation of the 'CyclicChild' schema.
 */
export declare type CyclicChild =
  | {
      parent?: CyclicParent;
    }
  | Record<string, any>;
//# sourceMappingURL=cyclic-child.d.ts.map
