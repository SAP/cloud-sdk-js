import type { CyclicChild } from './cyclic-child';
/**
 * Representation of the 'CyclicParent' schema
 */
export declare type CyclicParent =
  | {
      children?: CyclicChild[];
    }
  | Record<string, any>;
//# sourceMappingURL=cyclic-parent.d.ts.map
