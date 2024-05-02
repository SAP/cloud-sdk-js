// eslint-disable-next-line import/no-internal-modules
import {
  ParsedOptions,
  Options,
  getCommonCliOptions,
  CommonGeneratorOptions,
  CreateFileOptions
} from '@sap-cloud-sdk/generator-common/internal';

/**
 * Represents the generationHook function type.
 */
export type GenerationHookHandler = (
  serviceDirPath: string,
  serviceName: string,
  apiServiceName: string,
  api: any,
  options: CreateFileOptions
) => void;

// eslint-disable-next-line jsdoc/require-jsdoc
export interface ProgrammaticOptions {
  /**
   * Generation process allows hooking into the process of Services generation.
   * If you provide this (function) option, it will be triggered for each generated API
   * allowing you to hook into API generation process and generate any custom API related code.
   */
  generationHook?: GenerationHookHandler;
}

/**
 * Options to configure OData client generation when using the generator programmatically.
 */
export type GeneratorOptions = CommonGeneratorOptions & ProgrammaticOptions;

/**
 * @internal
 * Represents the parsed generator options.
 */
export type ParsedGeneratorOptions = ParsedOptions<typeof cliOptions>;

/**
 * @internal
 */
export const cliOptions = {
  ...getCommonCliOptions('OpenApi')
} as const satisfies Options<GeneratorOptions>;
