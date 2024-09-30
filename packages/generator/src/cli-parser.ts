import { parseCmdArgsBuilder } from '@sap-cloud-sdk/generator-common/internal';
import { cliOptions } from './options';
import type { GeneratorOptions } from './options';

const commandText =
  'OData Client Code Generator for OData v2 and v4. Generates typed clients from EDMX and XML files for usage with the SAP Cloud SDK for JavaScript.';
/**
 * @internal
 */
export const parseCmdArgs = parseCmdArgsBuilder<GeneratorOptions>({
  commandText,
  cliOptions
});
