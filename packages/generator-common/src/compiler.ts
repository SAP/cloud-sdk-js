import {parse, resolve} from 'path';
import {existsSync, promises} from 'fs';
import {createLogger} from '@sap-cloud-sdk/util';
import {
  CompilerOptions,
  createProgram,
  Diagnostic,
  getPreEmitDiagnostics,
  ModuleKind,
  ModuleResolutionKind,
  ScriptTarget
} from 'TypeScript';
import {GlobSync} from 'glob';
import {EOL} from 'os';

const logger = createLogger('compiler');

/**
 * Executes the TypeScript compilation for the given directory.
 * It recursively compiles all files ending with .ts
 * A valid tsconfig.json needs to be present in the directory.
 * @param path - Directory to be compiled.
 */
export async function transpileDirectory(
  path: string,
  compilerOptions: CompilerOptions
): Promise<void> {
  logger.verbose(`Transpiling files in the directory: ${path} started.`);

  const files = new GlobSync(resolve(path, '**/*.ts'), {}).found;
  const program = await createProgram(files, compilerOptions);
  const emitResult = await program.emit();

  const allDiagnostics = getPreEmitDiagnostics(program).concat(
    emitResult.diagnostics
  );
  if (allDiagnostics.length > 0) {
    throw new Error(
      `Compilation Errors:${EOL}${getErrorList(allDiagnostics).join(EOL)}`
    );
  }
  logger.verbose(`Transpiling files in directory: ${path} finished.`);
}

function getErrorList(diagnostis: Diagnostic[]): string[] {
  return diagnostis.map(diagnostic => {
    return `${diagnostic.file?.fileName}:${diagnostic.start}:${diagnostic.length} - error TS${diagnostic.code}: ${diagnostic.messageText}`;
  });
}

/**
 * Reads the compiler options from the ts-config.json.
 * @param pathToTsConfig
 * @returns Compiler options read from the tsconfig
 */
export async function readCompilerOptions(
  pathToTsConfig: string
): Promise<CompilerOptions> {
  const fullPath =
    parse(pathToTsConfig).base === 'tsconfig.json'
      ? pathToTsConfig
      : resolve(pathToTsConfig, 'tsconfig.json');

  if (!existsSync(fullPath)) {
    throw new Error(`No tsconfig found under path ${fullPath}`);
  }
  const options: CompilerOptions =
    JSON.parse(
      await promises.readFile(fullPath, {
        encoding: 'utf8'
      })
    )['compilerOptions'] || {};

  //TODO map other values to enum later as well
  if (options.moduleResolution) {
    options.moduleResolution = parseModuleResolutionEnum(
      options.moduleResolution as any
    );
  }

  if (options.lib && options.lib.length > 0) {
    options.lib = options.lib!.map(name => `lib.${name}.d.ts`);
  }
  if (options.target) {
    options.target = parseScriptTarget(options.target as any);
  }

  if (options.module) {
    options.module = parseModuleKind(options.target as any);
  }

  return options;
}

function parseModuleResolutionEnum(input: string): ModuleResolutionKind {
  return input.includes('node')
    ? ModuleResolutionKind.NodeJs
    : ModuleResolutionKind.Classic;
}

function parseScriptTarget(input: string): ScriptTarget {
  const mapping: Record<string, ScriptTarget> = {
    es3: ScriptTarget.ES3,
    es5: ScriptTarget.ES5,
    esnext: ScriptTarget.ESNext,
    es2015: ScriptTarget.ES2015,
    es2016: ScriptTarget.ES2016,
    es2017: ScriptTarget.ES2017,
    es2018: ScriptTarget.ES2018,
    es2019: ScriptTarget.ES2019,
    es2020: ScriptTarget.ES2020
  };
  if(mapping[input.toLowerCase()]){
    return mapping[input.toLowerCase()]
  }
  logger.warn(`The selected ES target ${input} is not found fallback es5 used`)
  return ScriptTarget.ES5
}

function parseModuleKind(input: string): ModuleKind {
  const mapping: Record<string, ModuleKind> = {
   'commonjs':ModuleKind.CommonJS,
    'amd':ModuleKind.AMD,
    'es2015':ModuleKind.ES2015,
    'es2020':ModuleKind.ES2020,
    'esnext':ModuleKind.ESNext
  };

  if(mapping[input.toLowerCase()]){
    return mapping[input.toLowerCase()]
  }
  logger.warn(`The selected ES target ${input} is not found fallback commonJS used`)
  return ModuleKind.CommonJS
}
