import {
  formatTsConfig,
  readCustomTsConfig
} from '@sap-cloud-sdk/generator-common/internal';
import type { ParsedGeneratorOptions } from './options';

/**
 * Build a tsconfig.json file as string.
 * If the given options include a tsConfig setting, this config is read and returned.
 * @param options - Options passed to the generator.
 * @returns The serialized tsconfig.json contents.
 * @internal
 */
export async function tsconfigJson({
  transpile,
  tsconfig: tsConfig
}: ParsedGeneratorOptions): Promise<string | undefined> {
  if (transpile || tsConfig) {
    return tsConfig ? readCustomTsConfig(tsConfig) : formatTsConfig();
  }
}
