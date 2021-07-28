import { ActionImportRequestBuilder } from '@sap-cloud-sdk/core';
import { TestEntity } from './TestEntity';
/**
 * Type of the parameters to be passed to [[createTestEntityById]].
 */
export interface CreateTestEntityByIdParameters {
  /**
   * Id.
   */
  id?: number | null;
}
/**
 * Create Test Entity By Id.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function createTestEntityById(
  parameters: CreateTestEntityByIdParameters
): ActionImportRequestBuilder<
  CreateTestEntityByIdParameters,
  TestEntity | null
>;
/**
 * Type of the parameters to be passed to [[createTestEntityByIdReturnId]].
 */
export interface CreateTestEntityByIdReturnIdParameters {
  /**
   * Id.
   */
  id?: number | null;
}
/**
 * Create Test Entity By Id Return Id.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function createTestEntityByIdReturnId(
  parameters: CreateTestEntityByIdReturnIdParameters
): ActionImportRequestBuilder<
  CreateTestEntityByIdReturnIdParameters,
  number | null
>;
export declare const actionImports: {
  createTestEntityById: typeof createTestEntityById;
  createTestEntityByIdReturnId: typeof createTestEntityByIdReturnId;
};
//# sourceMappingURL=action-imports.d.ts.map
