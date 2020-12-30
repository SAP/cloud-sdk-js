import { ActionImportRequestBuilder } from '@sap-cloud-sdk/core';
import { TestEntity } from './TestEntity';
/**
 * Type of the parameters to be passed to [[createTestEntity]].
 */
export interface CreateTestEntityParameters {
    /**
     * Id.
     */
    id: number;
}
/**
 * Create Test Entity.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function createTestEntity(parameters: CreateTestEntityParameters): ActionImportRequestBuilder<CreateTestEntityParameters, TestEntity>;
/**
 * Type of the parameters to be passed to [[createTestEntityReturnId]].
 */
export interface CreateTestEntityReturnIdParameters {
    /**
     * Id.
     */
    id: number;
}
/**
 * Create Test Entity Return Id.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function createTestEntityReturnId(parameters: CreateTestEntityReturnIdParameters): ActionImportRequestBuilder<CreateTestEntityReturnIdParameters, number>;
export declare const actionImports: {
    createTestEntity: typeof createTestEntity;
    createTestEntityReturnId: typeof createTestEntityReturnId;
};
//# sourceMappingURL=action-imports.d.ts.map