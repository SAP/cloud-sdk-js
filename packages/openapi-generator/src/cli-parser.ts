import { parseCmdArgsBuilder } from '@sap-cloud-sdk/generator-common/internal';
import { cliOptions } from './options';
import type { GeneratorOptions } from './options';

const commandText =
  'OpenAPI Client Code Generator. Generates typed clients from OpenAPI files for usage with the SAP Cloud SDK for JavaScript.';
/**
 * @internal
 */
export const parseCmdArgs = parseCmdArgsBuilder<GeneratorOptions>({
  commandText,
  cliOptions
});
