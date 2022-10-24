import {
  ActionImportRequestBuilder,
  DeSerializers,
  DefaultDeSerializers
} from '@sap-cloud-sdk/odata-v4';
import { TestEntity } from './TestEntity';
/**
 * Type of the parameters to be passed to {@link createTestEntityById_4}.
 */
export interface CreateTestEntityById4Parameters<
  DeSerializersT extends DeSerializers
> {
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
export declare function createTestEntityById_4<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: CreateTestEntityById4Parameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): ActionImportRequestBuilder<
  DeSerializersT,
  CreateTestEntityById4Parameters<DeSerializersT>,
  TestEntity
>;
/**
 * Type of the parameters to be passed to {@link createTestEntityByIdReturnId_4}.
 */
export interface CreateTestEntityByIdReturnId4Parameters<
  DeSerializersT extends DeSerializers
> {
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
export declare function createTestEntityByIdReturnId_4<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: CreateTestEntityByIdReturnId4Parameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): ActionImportRequestBuilder<
  DeSerializersT,
  CreateTestEntityByIdReturnId4Parameters<DeSerializersT>,
  number
>;
export declare const actionImports: {
  createTestEntityById_4: typeof createTestEntityById_4;
  createTestEntityByIdReturnId_4: typeof createTestEntityByIdReturnId_4;
};
//# sourceMappingURL=action-imports.d.ts.map
