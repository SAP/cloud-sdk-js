import { parse, resolve } from 'path';
import { existsSync, promises } from 'fs';
import { EOL } from 'os';
import { createLogger } from '@sap-cloud-sdk/util';
import {
  createProgram,
  getPreEmitDiagnostics,
  ModuleKind,
  ModuleResolutionKind,
  ScriptTarget
} from 'typescript';
import { glob } from 'glob';
import { createFile, getFileExtension } from './file-writer';
import type { CreateFileOptions } from './file-writer';
import type {
  CompilerOptions,
  Diagnostic,
  NodeArray,
  Statement,
  WriteFileCallback
} from 'typescript';

const logger = createLogger('compiler');
const { mkdir } = promises;

/**
 * Executes the TypeScript compilation for the given directory.
 * It recursively compiles all files ending with .ts
 * @param path - Directory to be compiled.
 * @param compilerOptions - Compiler options to be used
 * @param includeExclude - Included and excluded files for compilation
 * @internal
 */
export async function transpileDirectory(
  path: string,
  {
    compilerOptions,
    createFileOptions
  }: { compilerOptions: CompilerOptions; createFileOptions: CreateFileOptions },
  includeExclude: IncludeExclude = defaultIncludeExclude
): Promise<void> {
  logger.verbose(`Transpiling files in the directory: ${path} started.`);

  const includes =
    includeExclude.include.length > 1
      ? `{${includeExclude.include.join(',')}}`
      : includeExclude.include[0];
  const excludes =
    includeExclude.exclude.length > 1
      ? `{${includeExclude.exclude.join(',')}}`
      : includeExclude.exclude[0];

  const allFiles = await glob(includes, {
    ignore: excludes,
    cwd: path
  });

  const program = await createProgram(
    allFiles.map(file => resolve(path, file)),
    compilerOptions
  );

  // The write file handler does not support async function hence the work around with the outer promise list.
  const fileWriterPromises: Promise<void>[] = [];
  const prettierWriter: WriteFileCallback = (fileName, text) => {
    const parsed = parse(fileName);
    const promise = mkdir(parsed.dir, { recursive: true }).then(async () => {
      // The transpile process creates `.map.js`, `.js` and `.d.ts` files
      // All not emitted files like .md or .json should be already formatted using prettier on creation.
      // Formatting .js files could break source map -> skip these.
      // The .map files are not human-readable and formatting increases file size -> skip these.
      const usePrettier =
        createFileOptions.usePrettier === false
          ? false
          : getFileExtension(fileName) === 'd.ts';

      return createFile(parsed.dir, parsed.base, text, {
        ...createFileOptions,
        usePrettier
      });
    });
    fileWriterPromises.push(promise);
  };

  const emitResult = program.emit(undefined, prettierWriter);
  await Promise.all(fileWriterPromises);
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

function getErrorList(diagnostics: Diagnostic[]): string[] {
  return diagnostics.map(diagnostic => {
    const text =
      typeof diagnostic.messageText === 'string'
        ? diagnostic.messageText
        : diagnostic.messageText.messageText;

    if (diagnostic.file) {
      const { lineNumber, linePosition } = findPositions(
        diagnostic.file.statements,
        diagnostic.start
      );

      return `${diagnostic.file.fileName}:${lineNumber}:${linePosition} - error TS${diagnostic.code}: ${text}`;
    }

    return `error TS${diagnostic.code}: ${text}`;
  });
}

function findPositions(
  statements?: NodeArray<Statement>,
  errorPosition?: number
): { lineNumber: number; linePosition: number } {
  if (!statements || statements.length === 0 || !errorPosition) {
    return { lineNumber: 0, linePosition: 0 };
  }
  let response;
  statements.forEach((statement, index) => {
    if (statement.pos <= errorPosition && errorPosition < statement.end) {
      response = {
        lineNumber: index + 1,
        linePosition: errorPosition - statement.pos
      };
    }
  });
  if (!response) {
    throw new Error('Can not find error position in list of statements.');
  }
  return response;
}

async function readTsConfig(
  pathToTsConfig: string
): Promise<Record<string, any>> {
  const fullPath =
    parse(pathToTsConfig).ext === '.json'
      ? pathToTsConfig
      : resolve(pathToTsConfig, 'tsconfig.json');

  if (!existsSync(fullPath)) {
    throw new Error(`No tsconfig found under path ${fullPath}`);
  }
  return JSON.parse(
    await promises.readFile(fullPath, {
      encoding: 'utf8'
    })
  );
}
interface IncludeExclude {
  include: string[];
  exclude: string[];
}

const defaultIncludeExclude: IncludeExclude = {
  include: ['**/*.ts'],
  exclude: ['dist/**/*', '**/*.d.ts', '**/*.spec.ts', 'node_modules/**/*']
};

/**
 * Reads the include and exclude property from the tsconfig.json using  ['**\/*.ts'] and ["dist/**\/*", "**\/*.spec.ts", "**\/*.d.ts", "node_modules/**\/*"] as default values.
 * @param pathToTsConfig - Folder containing or path to a tsconfig.json files
 * @returns IncludeExclude options for include and exclude files for compilation
 * @internal
 */
export async function readIncludeExcludeWithDefaults(
  pathToTsConfig: string
): Promise<IncludeExclude | undefined> {
  const tsConfig = await readTsConfig(pathToTsConfig);
  return {
    include: tsConfig.include || defaultIncludeExclude.include,
    exclude: tsConfig.exclude || defaultIncludeExclude.exclude
  };
}

async function readRawCompilerOptions(
  pathToTsConfig: string
): Promise<CompilerOptions> {
  const tsConfig = await readTsConfig(pathToTsConfig);
  const compilerOptions: CompilerOptions = tsConfig.compilerOptions || {};
  const pathToBase = tsConfig.extends;
  if (!pathToBase) {
    return compilerOptions;
  }
  const dir = parse(pathToTsConfig).dir;
  const bases = Array.isArray(pathToBase) ? pathToBase : [pathToBase];
  const baseOptions = await Promise.all(
    bases.map(base => readRawCompilerOptions(resolve(dir, base)))
  );
  return Object.assign({}, ...baseOptions, compilerOptions);
}

/**
 * Reads and parses the compiler options in a tsconfig.json.
 * @param pathToTsConfig - Folder containing or path to a tsconfig.json files
 * @returns Compiler options from the tsconfig.json
 * @internal
 */
export async function readCompilerOptions(
  pathToTsConfig: string
): Promise<CompilerOptions> {
  const options = await readRawCompilerOptions(pathToTsConfig);

  if (options.moduleResolution) {
    options.moduleResolution = parseModuleResolutionKind(
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
    options.module = parseModuleKind(options.module as any);
  }

  if (
    needsIgnoreDeprecationsTs6(
      options.moduleResolution,
      options.target,
      options.module
    )
  ) {
    options.ignoreDeprecations = '6.0';
  }

  return options;
}

function parseModuleResolutionKind(input: string): ModuleResolutionKind {
  const moduleResolution = input.toLowerCase();
  if (moduleResolution === 'bundler') {
    return ModuleResolutionKind.Bundler;
  }
  if (moduleResolution === 'node') {
    return ModuleResolutionKind.Node10;
  }
  if (moduleResolution === 'node16') {
    return ModuleResolutionKind.Node16;
  }
  if (moduleResolution === 'nodenext') {
    return ModuleResolutionKind.NodeNext;
  }
  return ModuleResolutionKind.Classic;
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
    es2020: ScriptTarget.ES2020,
    es2021: ScriptTarget.ES2021,
    es2022: ScriptTarget.ES2022,
    es2023: ScriptTarget.ES2023,
    es2024: ScriptTarget.ES2024,
    es2025: ScriptTarget.ES2025
  };
  if (mapping[input.toLowerCase()]) {
    return mapping[input.toLowerCase()];
  }
  logger.warn(
    `The selected ES target ${input} is not found - Fallback es2021 used`
  );
  return ScriptTarget.ES2021;
}

function parseModuleKind(input: string): ModuleKind {
  const mapping: Record<string, ModuleKind> = {
    commonjs: ModuleKind.CommonJS,
    amd: ModuleKind.AMD,
    umd: ModuleKind.UMD,
    system: ModuleKind.System,
    es2015: ModuleKind.ES2015,
    es2020: ModuleKind.ES2020,
    es2022: ModuleKind.ES2022,
    esnext: ModuleKind.ESNext,
    node16: ModuleKind.Node16,
    node18: ModuleKind.Node18,
    node20: ModuleKind.Node20,
    nodenext: ModuleKind.NodeNext,
    preserve: ModuleKind.Preserve
  };

  if (mapping[input.toLowerCase()]) {
    return mapping[input.toLowerCase()];
  }
  logger.warn(
    `The selected module kind ${input} is not found - Fallback commonJS used`
  );
  return ModuleKind.CommonJS;
}

function needsIgnoreDeprecationsTs6(
  moduleResolutionKind: ModuleResolutionKind | undefined,
  scriptTarget: ScriptTarget | undefined,
  moduleKind: ModuleKind | undefined
): boolean {
  if (
    moduleResolutionKind === ModuleResolutionKind.NodeJs ||
    moduleResolutionKind === ModuleResolutionKind.Classic
  ) {
    logger.warn(
      `The selected module resolution kind ${ModuleResolutionKind[moduleResolutionKind]} is deprecated with TypeScript 6.0`
    );
    return true;
  }

  if (scriptTarget === ScriptTarget.ES3 || scriptTarget === ScriptTarget.ES5) {
    logger.warn(
      `The selected script target ${ScriptTarget[scriptTarget]} is deprecated with TypeScript 6.0`
    );
    return true;
  }

  if (moduleKind === ModuleKind.AMD) {
    logger.warn(
      `The selected module kind ${ModuleKind[moduleKind]} is deprecated with TypeScript 6.0`
    );
    return true;
  }
  return false;
}
