import { toPropertyFormat, toStaticPropertyFormat } from '@sap-cloud-sdk/core';
import voca from 'voca';
import { stripPrefix } from './internal-prefix';
import { applyPrefixOnJsConflictFunctionImports } from './name-formatting-strategies';
import { UniqueNameFinder } from './unique-name-finder';
import { reservedServiceKeywords } from './name-formatting-reserved-key-words';

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

  private finderServiceWide = new UniqueNameFinder(
    '_',
    reservedServiceKeywords
  );

  private parameterNamesFinder: {
    [functionImportName: string]: UniqueNameFinder;
  } = {};

  private staticPropertyNamesFinder: {
    [entitySetOrComplexTypeName: string]: UniqueNameFinder;
  } = {};

  private instancePropertyNamesFinder: {
    [entitySetOrComplexTypeName: string]: UniqueNameFinder;
  } = {};

  constructor();
  /**
   * @deprecated since version 1.25.0. The name formatters for the sets, types and function imports are initialized lazy now so there is no need to pass the names beforehand.
   * Use the argument free constructor instead.
   * @param entitySetNames The entity set names.
   * @param complexTypeNames The complex type names.
   * @param functionImportNames Then function import names.
   */
  constructor(
    entitySetNames: string[],
    complexTypeNames: string[],
    functionImportNames: string[]
  );
  constructor(
    entitySetNames: string[] = [],
    complexTypeNames: string[] = [],
    functionImportNames: string[] = []
  ) {
    // Here we assume that entitysets and complextypes cannot have the same original name
    [...entitySetNames, ...complexTypeNames].forEach(
      entitySetOrComplexTypeName => {
        this.staticPropertyNamesFinder[
          entitySetOrComplexTypeName
        ] = new UniqueNameFinder();
        this.instancePropertyNamesFinder[
          entitySetOrComplexTypeName
        ] = new UniqueNameFinder();
      }
    );

    if (functionImportNames) {
      functionImportNames.forEach(functionImportName => {
        this.parameterNamesFinder[functionImportName] = new UniqueNameFinder();
      });
    }
  }

  originalToStaticPropertyName(
    originalContainerTypeName: string,
    originalPropertyName: string
  ): string {
    const transformedName = toStaticPropertyFormat(
      stripPrefix(originalPropertyName)
    );
    const finder = this.getOrInitStaticPropertyNameFinder(
      originalContainerTypeName
    );
    const newName = finder.findUniqueName(transformedName);

    finder.addToUsedNames(newName);
    return newName;
  }

  originalToInstancePropertyName(
    originalContainerTypeName: string,
    originalPropertyName: string
  ): string {
    const transformedName = toPropertyFormat(stripPrefix(originalPropertyName));

    const finder = this.getOrInitInstancePropertyNameFinder(
      originalContainerTypeName
    );
    const newName = finder.findUniqueName(transformedName);

    finder.addToUsedNames(newName);
    return newName;
  }

  originalToFunctionImportName(str: string): string {
    const transformedName = voca.camelCase(str);
    const newName = this.finderServiceWide.findUniqueName(transformedName);

    this.finderServiceWide.addToUsedNames(newName);
    return applyPrefixOnJsConflictFunctionImports(newName);
  }

  originalToActionImportName(str: string): string {
    return this.originalToFunctionImportName(str);
  }

  originalToComplexTypeName(str: string): string {
    const transformedName = stripAUnderscore(voca.titleCase(str)).replace(
      '_',
      ''
    );

    const newName = this.finderServiceWide.findUniqueName(
      transformedName,
      false
    );

    this.finderServiceWide.addToUsedNames(newName);
    return newName;
  }

  originalToEnumTypeName(str: string): string {
    return this.originalToComplexTypeName(str);
  }

  typeNameToFactoryName(str: string);
  /**
   * @deprecated since version 1.25.0. In the refactored version of the generator the reserved names are obsolete.
   * @param str
   * @param reservedNames
   */
  /* eslint-disable-next-line  @typescript-eslint/unified-signatures */
  typeNameToFactoryName(str: string, reservedNames: Set<string>);
  typeNameToFactoryName(str: string, reservedNames?: Set<string>): string {
    let factoryName = `create${str}`;
    if (reservedNames) {
      let index = 1;
      while (reservedNames.has(factoryName)) {
        factoryName = `${factoryName}_${index}`;
        index += 1;
      }
    }
    const newName = this.finderServiceWide.findUniqueName(factoryName);

    this.finderServiceWide.addToUsedNames(newName);
    return newName;
  }

  originalToNavigationPropertyName(
    entitySetName: string,
    originalPropertyName: string
  ): string {
    const transformedName = voca.camelCase(originalPropertyName);

    const finder = this.getOrInitInstancePropertyNameFinder(entitySetName);
    const newName = finder.findUniqueName(transformedName);

    finder.addToUsedNames(newName);
    return newName;
  }

  originalToParameterName(
    originalFunctionImportName: string,
    originalParameterName: string
  ): string {
    const transformedName = voca.camelCase(originalParameterName);

    const finder = this.getOrInitParameterNameFinder(
      originalFunctionImportName
    );
    const newName = finder.findUniqueName(transformedName);

    finder.addToUsedNames(newName);
    return newName;
  }

  originalToEntityClassName(entitySetName: string): string {
    let transformedName = entitySetName;
    if (transformedName.endsWith('Collection')) {
      transformedName = stripCollection(entitySetName);
    }

    transformedName = stripAUnderscore(voca.titleCase(transformedName));

    const newNames = this.finderServiceWide.findUniqueNameWithSuffixes(
      transformedName,
      getInterfaceNamesSuffixes(),
      false
    );

    newNames.forEach(name => {
      this.finderServiceWide.addToUsedNames(name);
    });

    return newNames[0];
  }

  private getOrInitStaticPropertyNameFinder(name: string): UniqueNameFinder {
    if (this.staticPropertyNamesFinder[name]) {
      return this.staticPropertyNamesFinder[name];
    }
    this.staticPropertyNamesFinder[name] = new UniqueNameFinder();
    return this.staticPropertyNamesFinder[name];
  }

  private getOrInitInstancePropertyNameFinder(name: string): UniqueNameFinder {
    if (this.instancePropertyNamesFinder[name]) {
      return this.instancePropertyNamesFinder[name];
    }
    this.instancePropertyNamesFinder[name] = new UniqueNameFinder();
    return this.instancePropertyNamesFinder[name];
  }

  private getOrInitParameterNameFinder(name: string): UniqueNameFinder {
    if (this.parameterNamesFinder[name]) {
      return this.parameterNamesFinder[name];
    }
    this.parameterNamesFinder[name] = new UniqueNameFinder();
    return this.parameterNamesFinder[name];
  }
}

function stripUnderscoreSrv(name: string) {
  return name.endsWith('_SRV') ? name.substr(0, name.length - 4) : name;
}

function stripAPIUnderscore(name: string) {
  return name.startsWith('API_') ? name.substring(4, name.length) : name;
}

export function stripCollection(name: string) {
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
