import {
  camelCase,
  createLogger,
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

const logger = createLogger('service-name-formatter');
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

  private serviceName: string;
  private skipValidation: boolean;

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
    serviceName: string,
    options?: {
      skipValidation?: boolean;
      entitySetNames?: string[];
      complexTypeNames?: string[];
      functionImportNames?: string[];
    }
  ) {
    const defaults = {
      skipValidation: false,
      entitySetNames: [],
      complexTypeNames: [],
      functionImportNames: []
    };
    const {
      skipValidation,
      entitySetNames,
      complexTypeNames,
      functionImportNames
    } = { ...defaults, ...options };
    this.skipValidation = skipValidation;
    this.serviceName = serviceName;

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

    const uniqueName = generator.generateAndSaveUniqueName(transformedName);
    this.assertNameChange({
      originalContainerTypeName,
      transformedName,
      uniqueName
    });
    return uniqueName;
  }

  assertNameChange({
    originalContainerTypeName,
    transformedName,
    uniqueName
  }: {
    originalContainerTypeName: string;
    transformedName: string;
    uniqueName: string;
  }): void {
    if (uniqueName !== transformedName) {
      const message = `A naming conflict appears for service ${this.serviceName} in container '${originalContainerTypeName}'.
The conflict resolution is: ${transformedName} -> ${uniqueName}.`;
      if (this.skipValidation) {
        logger.info(message);
      } else {
        throw new Error(`${message}
If you are ok with this change execute the generator with the '--skipValidation' option.`);
      }
    }
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

    const uniqueName = generator.generateAndSaveUniqueName(transformedName);
    this.assertNameChange({
      originalContainerTypeName: 'action/function operation name',
      transformedName,
      uniqueName
    });
    return uniqueName;
  }

  originalToOperationName(originalName: string): string {
    const transformedName = voca.camelCase(stripPrefix(originalName));
    const newName =
      this.serviceWideNameGenerator.generateAndSaveUniqueName(transformedName);

    const uniqueName = applyPrefixOnJsConflictFunctionImports(newName);

    this.assertNameChange({
      originalContainerTypeName: 'action/function operation name',
      transformedName,
      uniqueName
    });

    return uniqueName;
  }

  originalToBoundOperationName(
    entityName: string,
    functionName: string
  ): string {
    const transformedName = this.originalToInstancePropertyName(
      entityName,
      functionName
    );
    const uniqueName = applyPrefixOnJsConflictFunctionImports(transformedName);

    this.assertNameChange({
      originalContainerTypeName: 'bound action/function operation name',
      transformedName,
      uniqueName
    });

    return uniqueName;
  }

  originalToComplexTypeName(originalName: string): string {
    return this.originalToServiceWideName(originalName, 'complex type name');
  }

  originalToEnumTypeName(originalName: string): string {
    return this.originalToServiceWideName(originalName, 'enum name');
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
    const uniqueName = generator.generateAndSaveUniqueName(transformedName);

    this.assertNameChange({
      originalContainerTypeName: entitySetName,
      transformedName,
      uniqueName
    });

    return uniqueName;
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

    const uniqueName = generator.generateAndSaveUniqueName(transformedName);

    this.assertNameChange({
      originalContainerTypeName: 'action/function parameter name',
      transformedName,
      uniqueName
    });

    return uniqueName;
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

    const uniqueName = generator.generateAndSaveUniqueName(transformedName);

    this.assertNameChange({
      originalContainerTypeName: 'bound action/function parameter name',
      transformedName,
      uniqueName
    });

    return uniqueName;
  }

  originalToEntityClassName(entitySetName: string): string {
    let transformedName = entitySetName;
    if (transformedName.endsWith('Collection')) {
      transformedName = stripCollection(entitySetName);
    }

    transformedName = stripAUnderscore(voca.titleCase(transformedName));

    const uniqueName =
      this.serviceWideNameGenerator.generateAndSaveUniqueNamesWithSuffixes(
        transformedName,
        getInterfaceNamesSuffixes(),
        false
      )[0];

    this.assertNameChange({
      originalContainerTypeName: 'entity set name',
      transformedName,
      uniqueName
    });

    return uniqueName;
  }

  private originalToServiceWideName(
    originalName: string,
    originalContainerTypeName: string
  ): string {
    const transformedName = stripAUnderscore(
      voca.titleCase(originalName)
    ).replace('_', '');

    const uniqueName = this.serviceWideNameGenerator.generateAndSaveUniqueName(
      transformedName,
      false
    );

    this.assertNameChange({
      originalContainerTypeName,
      transformedName,
      uniqueName
    });

    return uniqueName;
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
