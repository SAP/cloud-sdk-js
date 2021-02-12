import execa from 'execa';
import { createLogger } from '@sap-cloud-sdk/util';

const logger = createLogger({
  package: 'openapi-generator',
  messageContext: 'generator-utils'
});

// TODO 1728: The following is duplicate in the OData generator
/**
 * Executes the type script compiler for the given directory.
 * A valid tsconfig.json needs to be present in the directory.
 * @param path - Directory to be compiled
 */
export async function transpileDirectory(path: string): Promise<void> {
  logger.debug(`Transpiling files in the directory: ${path} started.`);
  await execa('tsc', { cwd: path }).catch(err => {
    logger.error(`Error: Failed to generate js files: ${err}`);
    process.exit(1);
  });
  logger.debug(`Transpiling files in directory: ${path} finished.`);
}
