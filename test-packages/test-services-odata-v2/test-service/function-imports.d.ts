/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  DeSerializers,
  DefaultDeSerializers,
  FunctionImportRequestBuilder
} from '@sap-cloud-sdk/odata-v2';
import { TestEntity } from './TestEntity';
import { TestComplexType } from './TestComplexType';
/**
 * Type of the parameters to be passed to {@link testFunctionImportNoReturnType}.
 */
export interface TestFunctionImportNoReturnTypeParameters<
  DeSerializersT extends DeSerializers
> {}
/**
 * Test Function Import No Return Type.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportNoReturnType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportNoReturnTypeParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): FunctionImportRequestBuilder<
  DeSerializersT,
  TestFunctionImportNoReturnTypeParameters<DeSerializersT>,
  undefined
>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportEdmReturnType}.
 */
export interface TestFunctionImportEdmReturnTypeParameters<
  DeSerializersT extends DeSerializers
> {}
/**
 * Test Function Import Edm Return Type.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportEdmReturnType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportEdmReturnTypeParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): FunctionImportRequestBuilder<
  DeSerializersT,
  TestFunctionImportEdmReturnTypeParameters<DeSerializersT>,
  boolean
>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportEdmReturnTypeCollection}.
 */
export interface TestFunctionImportEdmReturnTypeCollectionParameters<
  DeSerializersT extends DeSerializers
> {}
/**
 * Test Function Import Edm Return Type Collection.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportEdmReturnTypeCollection<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportEdmReturnTypeCollectionParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): FunctionImportRequestBuilder<
  DeSerializersT,
  TestFunctionImportEdmReturnTypeCollectionParameters<DeSerializersT>,
  string[]
>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportEntityReturnType}.
 */
export interface TestFunctionImportEntityReturnTypeParameters<
  DeSerializersT extends DeSerializers
> {}
/**
 * Test Function Import Entity Return Type.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportEntityReturnType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportEntityReturnTypeParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): FunctionImportRequestBuilder<
  DeSerializersT,
  TestFunctionImportEntityReturnTypeParameters<DeSerializersT>,
  TestEntity
>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportEntityReturnTypeCollection}.
 */
export interface TestFunctionImportEntityReturnTypeCollectionParameters<
  DeSerializersT extends DeSerializers
> {}
/**
 * Test Function Import Entity Return Type Collection.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportEntityReturnTypeCollection<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportEntityReturnTypeCollectionParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): FunctionImportRequestBuilder<
  DeSerializersT,
  TestFunctionImportEntityReturnTypeCollectionParameters<DeSerializersT>,
  TestEntity[]
>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportSharedEntityReturnType}.
 */
export interface TestFunctionImportSharedEntityReturnTypeParameters<
  DeSerializersT extends DeSerializers
> {}
/**
 * Test Function Import Shared Entity Return Type. The 'execute' method does not exist when using this function import. Please use the 'executeRaw' for getting the raw response.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportSharedEntityReturnType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportSharedEntityReturnTypeParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): Omit<
  FunctionImportRequestBuilder<
    DeSerializersT,
    TestFunctionImportSharedEntityReturnTypeParameters<DeSerializersT>,
    never
  >,
  'execute'
>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportSharedEntityReturnTypeCollection}.
 */
export interface TestFunctionImportSharedEntityReturnTypeCollectionParameters<
  DeSerializersT extends DeSerializers
> {}
/**
 * Test Function Import Shared Entity Return Type Collection. The 'execute' method does not exist when using this function import. Please use the 'executeRaw' for getting the raw response.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportSharedEntityReturnTypeCollection<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): Omit<
  FunctionImportRequestBuilder<
    DeSerializersT,
    TestFunctionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT>,
    never
  >,
  'execute'
>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportComplexReturnType}.
 */
export interface TestFunctionImportComplexReturnTypeParameters<
  DeSerializersT extends DeSerializers
> {}
/**
 * Test Function Import Complex Return Type.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportComplexReturnType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportComplexReturnTypeParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): FunctionImportRequestBuilder<
  DeSerializersT,
  TestFunctionImportComplexReturnTypeParameters<DeSerializersT>,
  TestComplexType
>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportUnsupportedEdmTypes}.
 */
export interface TestFunctionImportUnsupportedEdmTypesParameters<
  DeSerializersT extends DeSerializers
> {
  /**
   * Simple Param.
   */
  simpleParam: any;
}
/**
 * Test Function Import Unsupported Edm Types.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportUnsupportedEdmTypes<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportUnsupportedEdmTypesParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): FunctionImportRequestBuilder<
  DeSerializersT,
  TestFunctionImportUnsupportedEdmTypesParameters<DeSerializersT>,
  any
>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportComplexReturnTypeCollection}.
 */
export interface TestFunctionImportComplexReturnTypeCollectionParameters<
  DeSerializersT extends DeSerializers
> {}
/**
 * Test Function Import Complex Return Type Collection.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportComplexReturnTypeCollection<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportComplexReturnTypeCollectionParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): FunctionImportRequestBuilder<
  DeSerializersT,
  TestFunctionImportComplexReturnTypeCollectionParameters<DeSerializersT>,
  TestComplexType[]
>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportGet}.
 */
export interface TestFunctionImportGetParameters<
  DeSerializersT extends DeSerializers
> {
  /**
   * Simple Param.
   */
  simpleParam: string;
}
/**
 * Test Function Import Get.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportGet<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportGetParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): FunctionImportRequestBuilder<
  DeSerializersT,
  TestFunctionImportGetParameters<DeSerializersT>,
  boolean
>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportPost}.
 */
export interface TestFunctionImportPostParameters<
  DeSerializersT extends DeSerializers
> {
  /**
   * Simple Param.
   */
  simpleParam: string;
}
/**
 * Test Function Import Post.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportPost<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportPostParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): FunctionImportRequestBuilder<
  DeSerializersT,
  TestFunctionImportPostParameters<DeSerializersT>,
  boolean
>;
/**
 * Type of the parameters to be passed to {@link testFunctionImportMultipleParams}.
 */
export interface TestFunctionImportMultipleParamsParameters<
  DeSerializersT extends DeSerializers
> {
  /**
   * String Param.
   */
  stringParam: string;
  /**
   * Boolean Param.
   */
  booleanParam: boolean;
}
/**
 * Test Function Import Multiple Params.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function testFunctionImportMultipleParams<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: TestFunctionImportMultipleParamsParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): FunctionImportRequestBuilder<
  DeSerializersT,
  TestFunctionImportMultipleParamsParameters<DeSerializersT>,
  boolean
>;
/**
 * Type of the parameters to be passed to {@link createTestComplexType}.
 */
export interface CreateTestComplexTypeParameters<
  DeSerializersT extends DeSerializers
> {}
/**
 * Create Test Complex Type.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function createTestComplexType<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: CreateTestComplexTypeParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): FunctionImportRequestBuilder<
  DeSerializersT,
  CreateTestComplexTypeParameters<DeSerializersT>,
  TestComplexType
>;
/**
 * Type of the parameters to be passed to {@link fContinue}.
 */
export interface FContinueParameters<DeSerializersT extends DeSerializers> {}
/**
 * Continue.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export declare function fContinue<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: FContinueParameters<DeSerializersT>,
  deSerializers?: DeSerializersT
): FunctionImportRequestBuilder<
  DeSerializersT,
  FContinueParameters<DeSerializersT>,
  boolean
>;
export declare const functionImports: {
  testFunctionImportNoReturnType: typeof testFunctionImportNoReturnType;
  testFunctionImportEdmReturnType: typeof testFunctionImportEdmReturnType;
  testFunctionImportEdmReturnTypeCollection: typeof testFunctionImportEdmReturnTypeCollection;
  testFunctionImportEntityReturnType: typeof testFunctionImportEntityReturnType;
  testFunctionImportEntityReturnTypeCollection: typeof testFunctionImportEntityReturnTypeCollection;
  testFunctionImportSharedEntityReturnType: typeof testFunctionImportSharedEntityReturnType;
  testFunctionImportSharedEntityReturnTypeCollection: typeof testFunctionImportSharedEntityReturnTypeCollection;
  testFunctionImportComplexReturnType: typeof testFunctionImportComplexReturnType;
  testFunctionImportUnsupportedEdmTypes: typeof testFunctionImportUnsupportedEdmTypes;
  testFunctionImportComplexReturnTypeCollection: typeof testFunctionImportComplexReturnTypeCollection;
  testFunctionImportGet: typeof testFunctionImportGet;
  testFunctionImportPost: typeof testFunctionImportPost;
  testFunctionImportMultipleParams: typeof testFunctionImportMultipleParams;
  createTestComplexType: typeof createTestComplexType;
  fContinue: typeof fContinue;
};
//# sourceMappingURL=function-imports.d.ts.map
