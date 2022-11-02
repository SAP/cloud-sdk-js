import { parse, resolve } from 'path';
import { existsSync, promises } from 'fs';
import { EOL } from 'os';
import { createLogger } from '@sap-cloud-sdk/util';
import {
  CompilerOptions,
  createProgram,
  Diagnostic,
  getPreEmitDiagnostics,
  ModuleKind,
  ModuleResolutionKind,
  NodeArray,
  ScriptTarget,
  Statement,
  WriteFileCallback
} from 'typescript';
import { GlobSync } from 'glob';
import { createFile, CreateFileOptions, getFileExtension } from './file-writer';

const logger = createLogger('compiler');
const { writeFile, mkdir } = promises;

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

  const allFiles2 = new GlobSync(includes, {
    ignore: excludes,
    cwd: path
  }).found;

  const program = await createProgram(
    allFiles2.map(file => resolve(path, file)),
    compilerOptions
  );

  // The write file handler does not support async function hence the work around with the outer promise list.
  const fileWriterPromises: Promise<void>[] = [];
  const prettierWriter: WriteFileCallback = (
    fileName,
    text,
    writeByteOrderMark,
    onError?,
    sourceFiles?,
    data?
  ) => {
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
    parse(pathToTsConfig).base === 'tsconfig.json'
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

/**
 * Reads and parses the compiler options a tsconfig.json.
 * @param pathToTsConfig - Folder containing or path to a tsconfig.json files
 * @returns Compiler options from the tsconfig.json
 * @internal
 */
export async function readCompilerOptions(
  pathToTsConfig: string
): Promise<CompilerOptions> {
  const options: CompilerOptions =
    (await readTsConfig(pathToTsConfig))['compilerOptions'] || {};

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

  return options;
}

function parseModuleResolutionKind(input: string): ModuleResolutionKind {
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
    es2020: ScriptTarget.ES2020,
    es2021: ScriptTarget.ES2021
  };
  if (mapping[input.toLowerCase()]) {
    return mapping[input.toLowerCase()];
  }
  logger.warn(
    `The selected ES target ${input} is not found - Fallback es2019 used`
  );
  return ScriptTarget.ES2019;
}

function parseModuleKind(input: string): ModuleKind {
  const mapping: Record<string, ModuleKind> = {
    commonjs: ModuleKind.CommonJS,
    amd: ModuleKind.AMD,
    es2015: ModuleKind.ES2015,
    es2020: ModuleKind.ES2020,
    esnext: ModuleKind.ESNext
  };

  if (mapping[input.toLowerCase()]) {
    return mapping[input.toLowerCase()];
  }
  logger.warn(
    `The selected module kind ${input} is not found - Fallback commonJS used`
  );
  return ModuleKind.CommonJS;
}
