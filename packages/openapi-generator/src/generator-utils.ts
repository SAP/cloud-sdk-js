import execa from 'execa';
import { createLogger } from '@sap-cloud-sdk/util';

const logger = createLogger('openapi-generator');

// TODO 1728: The following is duplicate in the OData generator
/**
 * Executes the TypeScript compilation for the given directory.
 * A valid tsconfig.json needs to be present in the directory.
 * @param path - Directory to be compiled.
 * @deprecated Since version 1.43.0 Use the transpileDirectory in the generator-common package
 */
export async function transpileDirectory(path: string): Promise<void> {
  logger.verbose(`Transpiling files in the directory: ${path} started.`);
  await execa('tsc', { cwd: path }).catch(err => {
    logger.error(`Error: Failed to generate js files: ${err}`);
    process.exit(1);
  });
  logger.verbose(`Transpiling files in directory: ${path} finished.`);
}
