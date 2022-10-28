import { ActionImportRequestBuilder, DeSerializers, DefaultDeSerializers } from '@sap-cloud-sdk/odata-v4';
import { TestEntity } from './TestEntity';
/**
 * Type of the parameters to be passed to {@link createTestEntityById}.
 */
export interface CreateTestEntityByIdParameters<DeSerializersT extends DeSerializers> {
    /**
     * Id.
     */
    id: number;
}
/**
 * Create Test Entity By Id.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function createTestEntityById<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: CreateTestEntityByIdParameters<DeSerializersT>, deSerializers?: DeSerializersT): ActionImportRequestBuilder<DeSerializersT, CreateTestEntityByIdParameters<DeSerializersT>, TestEntity>;
/**
 * Type of the parameters to be passed to {@link createTestEntityByIdReturnId}.
 */
export interface CreateTestEntityByIdReturnIdParameters<DeSerializersT extends DeSerializers> {
    /**
     * Id.
     */
    id: number;
}
/**
 * Create Test Entity By Id Return Id.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function createTestEntityByIdReturnId<DeSerializersT extends DeSerializers = DefaultDeSerializers>(parameters: CreateTestEntityByIdReturnIdParameters<DeSerializersT>, deSerializers?: DeSerializersT): ActionImportRequestBuilder<DeSerializersT, CreateTestEntityByIdReturnIdParameters<DeSerializersT>, number>;
export declare const actionImports: {
    createTestEntityById: typeof createTestEntityById;
    createTestEntityByIdReturnId: typeof createTestEntityByIdReturnId;
};
//# sourceMappingURL=action-imports.d.ts.map