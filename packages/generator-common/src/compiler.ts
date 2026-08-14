import { parse, resolve } from 'node:path';
import { promises } from 'node:fs';
import { EOL } from 'node:os';
import { createLogger } from '@sap-cloud-sdk/util';
import {
  createProgram,
  flattenDiagnosticMessageText,
  getPreEmitDiagnostics,
  ModuleKind,
  ModuleResolutionKind,
  parseJsonConfigFileContent,
  readConfigFile as readTsConfigFile,
  ScriptTarget,
  sys
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

function findTsConfigFile(pathToTsConfig: string): string {
  return parse(pathToTsConfig).ext === '.json'
    ? pathToTsConfig
    : resolve(pathToTsConfig, 'tsconfig.json');
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
  const fullPath = findTsConfigFile(pathToTsConfig);
  const configFile = readTsConfigFile(fullPath, sys.readFile);
  if (configFile.error) {
    throw new Error(
      `Failed to read tsconfig at ${fullPath}: ${flattenDiagnosticMessageText(configFile.error.messageText, EOL)}`
    );
  }
  return {
    include: configFile.config.include || defaultIncludeExclude.include,
    exclude: configFile.config.exclude || defaultIncludeExclude.exclude
  };
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
  const fullPath = findTsConfigFile(pathToTsConfig);
  const configFile = readTsConfigFile(fullPath, sys.readFile);
  if (configFile.error) {
    throw new Error(
      `Failed to read tsconfig at ${fullPath}: ${flattenDiagnosticMessageText(configFile.error.messageText, EOL)}`
    );
  }

  const { options, errors: parseErrors } = parseJsonConfigFileContent(
    configFile.config,
    sys,
    parse(fullPath).dir
  );

  // parseJsonConfigFileContent also resolves the file list. It reports TS18003 ("no inputs
  // found") when the output directory doesn't exist yet, which is normal — we only need
  // the compiler options here, not the file list.
  const relevantErrors = parseErrors.filter(e => e.code !== 18003);
  if (relevantErrors.length) {
    throw new Error(
      `Failed to parse compiler options in ${fullPath}:${EOL}${relevantErrors.map(e => flattenDiagnosticMessageText(e.messageText, EOL)).join(EOL)}`
    );
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
