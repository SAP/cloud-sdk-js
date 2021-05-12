import { readFileSync } from 'fs';
import { GeneratorOptions } from './options';

export function parseOptionsFromConfig(path: string): GeneratorOptions {
  return JSON.parse(readFileSync(path, 'utf8'));
}
