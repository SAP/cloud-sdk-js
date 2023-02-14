import {
  CommonGeneratorOptions,
  parseCmdArgsBuilder
} from '@sap-cloud-sdk/generator-common/internal';
import { cliOptions } from './options';

const commandText =
  'OpenAPI Client Code Generator. Generates typed clients from OpenAPI files for usage with the SAP Cloud SDK for JavaScript.';
/**
 * @internal
 */
export const parseCmdArgs = parseCmdArgsBuilder<CommonGeneratorOptions>({
  commandText,
  cliOptions
});
