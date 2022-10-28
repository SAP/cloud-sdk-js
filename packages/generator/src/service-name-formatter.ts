import {
  camelCase,
  UniqueNameGenerator,
  upperCaseSnakeCase
} from '@sap-cloud-sdk/util';
import voca from 'voca';
import { stripPrefix } from './internal-prefix';
import { applyPrefixOnJsConflictFunctionImports } from './name-formatting-strategies';
import {
  defaultReservedWords,
  reservedServiceKeywords
} from './reserved-words';

/**
 * @internal
 */
export class ServiceNameFormatter {
  static originalToServiceName(name: string): string {
    let formattedName = name.replace(/\.|\//g, '_');
    formattedName = stripAPIUnderscore(formattedName);
    formattedName = stripUnderscoreSrv(formattedName);
    formattedName = voca.kebabCase(formattedName);
    return formattedName.endsWith('service')
      ? formattedName
      : `${formattedName}-service`;
  }

  static directoryToSpeakingModuleName(packageName: string): string {
    return voca.titleCase(packageName.replace(/-/g, ' '));
  }

  private serviceWideNameGenerator = new UniqueNameGenerator('_', [
    ...defaultReservedWords,
    ...reservedServiceKeywords
  ]);

  private parameterNameGenerators: {
    [functionImportName: string]: UniqueNameGenerator;
  } = {};

  private staticPropertyNameGenerators: {
    [entitySetOrComplexTypeName: string]: UniqueNameGenerator;
  } = {};

  private instancePropertyNameGenerators: {
    [entitySetOrComplexTypeName: string]: UniqueNameGenerator;
  } = {};

  constructor(
    entitySetNames: string[] = [],
    complexTypeNames: string[] = [],
    functionImportNames: string[] = []
  ) {
    // Here we assume that entity sets and complex types cannot have the same original name
    [...entitySetNames, ...complexTypeNames].forEach(
      entitySetOrComplexTypeName => {
        this.staticPropertyNameGenerators[entitySetOrComplexTypeName] =
          new UniqueNameGenerator('_', defaultReservedWords);
        this.instancePropertyNameGenerators[entitySetOrComplexTypeName] =
          new UniqueNameGenerator('_', defaultReservedWords);
      }
    );

    if (functionImportNames) {
      functionImportNames.forEach(functionImportName => {
        this.parameterNameGenerators[functionImportName] =
          new UniqueNameGenerator('_', defaultReservedWords);
      });
    }
  }

  originalToStaticPropertyName(
    originalContainerTypeName: string,
    originalPropertyName: string
  ): string {
    const transformedName = upperCaseSnakeCase(
      stripPrefix(originalPropertyName)
    );
    const generator = this.getOrInitGenerator(
      this.staticPropertyNameGenerators,
      originalContainerTypeName
    );

    return generator.generateAndSaveUniqueName(transformedName);
  }

  originalToInstancePropertyName(
    originalContainerTypeName: string,
    originalPropertyName: string
  ): string {
    const transformedName = camelCase(stripPrefix(originalPropertyName));

    const generator = this.getOrInitGenerator(
      this.instancePropertyNameGenerators,
      originalContainerTypeName
    );

    return generator.generateAndSaveUniqueName(transformedName);
  }

  originalToOperationName(originalName: string): string {
    const transformedName = voca.camelCase(originalName);
    const newName =
      this.serviceWideNameGenerator.generateAndSaveUniqueName(transformedName);

    return applyPrefixOnJsConflictFunctionImports(newName);
  }

  originalToBoundOperationName(
    entityName: string,
    functionName: string
  ): string {
    const generator = this.getOrInitGenerator(
      this.instancePropertyNameGenerators,
      entityName
    );
    const transformedName = voca.camelCase(functionName);
    const newName = generator.generateAndSaveUniqueName(transformedName);

    return applyPrefixOnJsConflictFunctionImports(newName);
  }

  originalToComplexTypeName(originalName: string): string {
    const transformedName = stripAUnderscore(
      voca.titleCase(originalName)
    ).replace('_', '');

    return this.serviceWideNameGenerator.generateAndSaveUniqueName(
      transformedName,
      false
    );
  }

  originalToEnumTypeName(originalName: string): string {
    return this.originalToComplexTypeName(originalName);
  }

  originalToNavigationPropertyName(
    entitySetName: string,
    originalPropertyName: string
  ): string {
    const transformedName = voca.camelCase(originalPropertyName);

    const generator = this.getOrInitGenerator(
      this.instancePropertyNameGenerators,
      entitySetName
    );
    return generator.generateAndSaveUniqueName(transformedName);
  }

  originalToParameterName(
    originalFunctionImportName: string,
    originalParameterName: string
  ): string {
    const transformedName = voca.camelCase(originalParameterName);

    const generator = this.getOrInitGenerator(
      this.parameterNameGenerators,
      originalFunctionImportName
    );

    return generator.generateAndSaveUniqueName(transformedName);
  }

  originalToBoundParameterName(
    entityName: string,
    originalFunctionImportName: string,
    originalParameterName: string
  ): string {
    const transformedName = voca.camelCase(originalParameterName);

    const generator = this.getOrInitGenerator(
      this.parameterNameGenerators,
      `${entityName}.${originalFunctionImportName}`
    );

    return generator.generateAndSaveUniqueName(transformedName);
  }

  originalToEntityClassName(entitySetName: string): string {
    let transformedName = entitySetName;
    if (transformedName.endsWith('Collection')) {
      transformedName = stripCollection(entitySetName);
    }

    transformedName = stripAUnderscore(voca.titleCase(transformedName));

    const newNames =
      this.serviceWideNameGenerator.generateAndSaveUniqueNamesWithSuffixes(
        transformedName,
        getInterfaceNamesSuffixes(),
        false
      );

    return newNames[0];
  }

  private getOrInitGenerator(
    generators: Record<string, UniqueNameGenerator>,
    name: string
  ): UniqueNameGenerator {
    if (!generators[name]) {
      generators[name] = new UniqueNameGenerator('_', defaultReservedWords);
    }
    return generators[name];
  }
}

function stripUnderscoreSrv(name: string) {
  return name.endsWith('_SRV') ? name.substr(0, name.length - 4) : name;
}

function stripAPIUnderscore(name: string) {
  return name.startsWith('API_') ? name.substring(4, name.length) : name;
}
/**
 * @internal
 */
export function stripCollection(name: string): string {
  return name.endsWith('Collection')
    ? name.substring(0, name.length - 10)
    : name;
}

function stripAUnderscore(name: string) {
  return name.startsWith('A_') ? name.substring(2, name.length) : name;
}

function getInterfaceNamesSuffixes(): string[] {
  return ['Type'];
}
