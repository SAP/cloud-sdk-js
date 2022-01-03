import { basename, join, resolve } from 'path';
import { codeBlock, createLogger } from '@sap-cloud-sdk/util';
import { copyFile } from '@sap-cloud-sdk/openapi-generator/internal';

const logger = createLogger('generator-common');

/**
 * @returns A copyright header
 * @internal
 */
export function getCopyrightHeader(): string {
  return codeBlock`
/*
 * Copyright (c) ${new Date().getFullYear()} SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
 `;
}

/**
 * @param serviceDir - Target to where the additional files are copied
 * @param additionalFiles - List of additional files to be copied
 * @param overwrite - Overwrite flag
 * @internal
 */
export async function copyAdditionalFiles(
  serviceDir: string,
  additionalFiles: string[],
  overwrite: boolean
): Promise<void[]> {
  logger.verbose(
    `Copying additional files matching ${additionalFiles} into ${serviceDir}.`
  );

  return Promise.all(
    additionalFiles.map(filePath =>
      copyFile(
        resolve(filePath),
        join(serviceDir, basename(filePath)),
        overwrite
      )
    )
  );
}
