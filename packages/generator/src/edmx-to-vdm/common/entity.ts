import {
  edmToFieldType,
  edmToTsType,
  forceArray,
  getFallbackEdmTypeIfNeeded,
  isCreatable,
  isDeletable,
  isNullableProperty,
  isUpdatable
} from '../../generator-utils';
import {
  VdmComplexType,
  VdmEntity,
  VdmNavigationProperty,
  VdmProperty,
  VdmMappedEdmType,
  VdmEnumType,
  VdmFunctionImport,
  VdmActionImport,
  VdmReturnTypeCategory
} from '../../vdm-types';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { applyPrefixOnJsConflictParam } from '../../name-formatting-strategies';
import { entityDescription, propertyDescription } from '../description-util';
import {
  EdmxEntitySetBase,
  EdmxEntityTypeBase,
  EdmxNamed,
  EdmxParameter,
  JoinedEntityMetadata
} from '../../edmx-parser/common';
import {
  checkCollectionKind,
  complexTypeFieldForName,
  complexTypeForName,
  enumTypeForName,
  isCollectionType,
  isComplexType,
  isEdmType,
  isEnumType,
  parseCollectionTypeName,
  typesForCollection
} from '../edmx-to-vdm-util';
import { SwaggerMetadata } from '../../swagger-parser/swagger-types';
import { EdmxAction, EdmxFunction } from '../../edmx-parser';

/**
 * @internal
 */
export function transformEntityBase(
  entityMetadata: JoinedEntityMetadata<EdmxEntitySetBase, any>,
  classNames: Record<string, any>,
  complexTypes: VdmComplexType[],
  enumTypes: VdmEnumType[],
  boundFunctions: EdmxFunction[],
  boundActions: EdmxAction[],
  formatter: ServiceNameFormatter
): Omit<VdmEntity, 'navigationProperties'> {
  const entity = {
    entitySetName: entityMetadata.entitySet.Name,
    entityTypeName: entityMetadata.entityType.Name,
    entityTypeNamespace: entityMetadata.entityType.Namespace,
    className: classNames[entityMetadata.entitySet.Name],
    properties: properties(entityMetadata, complexTypes, formatter, enumTypes),
    creatable: entityMetadata.entitySet
      ? isCreatable(entityMetadata.entitySet)
      : true,
    updatable: entityMetadata.entitySet
      ? isUpdatable(entityMetadata.entitySet)
      : true,
    deletable: entityMetadata.entitySet
      ? isDeletable(entityMetadata.entitySet)
      : true,
    boundFunctions: transformBoundFunctions(boundFunctions),
    boundActions: transformBoundActions(boundActions)
  };

  return {
    ...entity,
    keys: keys(entity.properties, entityMetadata.entityType.Key.PropertyRef),
    description: entityDescription(entityMetadata, entity.className)
  };
}

function keys(props: VdmProperty[], edmxKeys: EdmxNamed[]): VdmProperty[] {
  return edmxKeys
    .map(key => props.find(prop => prop.originalName === key.Name))
    .filter(e => !!e) as VdmProperty[];
}

function properties(
  entity: JoinedEntityMetadata<EdmxEntitySetBase, any>,
  complexTypes: VdmComplexType[],
  formatter: ServiceNameFormatter,
  enumTypes: VdmEnumType[]
): VdmProperty[] {
  return entity.entityType.Property.map(p => {
    checkCollectionKind(p);
    const swaggerProp = entity.swaggerDefinition
      ? entity.swaggerDefinition.properties[p.Name]
      : undefined;
    const instancePropertyName = formatter.originalToInstancePropertyName(
      entity.entitySet.Name,
      p.Name
    );
    const isCollection = isCollectionType(p.Type);
    const parsed = isCollection ? parseCollectionTypeName(p.Type) : p.Type;
    const isComplex = isComplexType(parsed, complexTypes);
    const isEnum = isEnumType(parsed, enumTypes);
    const typeMapping = getTypeMappingEntityProperties(
      p.Type,
      complexTypes,
      enumTypes,
      isComplex,
      isEnum
    );

    return {
      originalName: p.Name,
      instancePropertyName,
      staticPropertyName: formatter.originalToStaticPropertyName(
        entity.entitySet.Name,
        p.Name
      ),
      propertyNameAsParam: applyPrefixOnJsConflictParam(instancePropertyName),
      edmType: typeMapping.edmType,
      jsType: typeMapping.jsType,
      fieldType: typeMapping.fieldType,
      description: propertyDescription(p, swaggerProp),
      nullable: isNullableProperty(p),
      maxLength: p.MaxLength,
      isComplex,
      isEnum,
      isCollection
    };
  });
}

function emptyIfUndefined(input: string | undefined): string {
  return input? input : ''
}

function stringToBool(input: string | undefined): boolean {
  if (input) {
    return input.toLowerCase() === 'true'
  }
  return false
}

/**
 * @internal
 */
export function transformBoundFunctions(
  functions: EdmxFunction[]
): VdmFunctionImport[] {
  return functions.filter(f => f.IsBound).map(f => ({
    name: f.Name,
    // Remove first parameter which per spec always is the entity the function is bound to
    // cf https://docs.oasis-open.org/odata/odata-csdl-xml/v4.01/os/odata-csdl-xml-v4.01-os.html#sec_Parameter
    parameters: forceArray(f.Parameter)
      .slice(1)
      .map((p: EdmxParameter) => ({
        parameterName: p.Name,
        jsType: edmToTsType(p.Type),
        edmType: p.Type,
        originalName: p.Name,
        nullable: stringToBool(p.Nullable), 
        description: emptyIfUndefined(p.Documentation?.Summary), 
        fieldType: edmToTsType(p.Type)
      })),
    returnType: {
      returnType: emptyIfUndefined(f.ReturnType?.Type),
      isCollection: false, 
      isNullable: stringToBool(f.ReturnType?.Nullable), 
      returnTypeCategory: VdmReturnTypeCategory.VOID
    },
    httpMethod: '',
    originalName: f.Name,
    parametersTypeName: '',
    description: ''
  }));
}

function transformBoundActions(
  actions: EdmxAction[]
): VdmActionImport[] {
  return actions.filter(a => a.IsBound).map(a => ({
    name: a.Name,
    // Remove first parameter which per spec always is the entity the function is bound to
    // cf https://docs.oasis-open.org/odata/odata-csdl-xml/v4.01/os/odata-csdl-xml-v4.01-os.html#sec_Parameter
    parameters: forceArray(a.Parameter)
      .slice(1)
      .map((p: EdmxParameter) => ({
        parameterName: p.Name,
        jsType: edmToTsType(p.Type),
        edmType: p.Type,
        originalName: p.Name,
        nullable: stringToBool(p.Nullable), 
        description: emptyIfUndefined(p.Documentation?.Summary), 
        fieldType: edmToTsType(p.Type)
      })),
    returnType: {
      returnType: emptyIfUndefined(a.ReturnType?.Type),
      isCollection: false, 
      isNullable: stringToBool(a.ReturnType?.Nullable), 
      returnTypeCategory: VdmReturnTypeCategory.VOID
    },
    httpMethod: 'post',
    originalName: a.Name,
    parametersTypeName: '',
    description: ''
  }));
}

/**
 * @internal
 */
export function joinEntityMetadata<
  EntitySetT extends EdmxEntitySetBase,
  EntityTypeT extends EdmxEntityTypeBase<any>
>(
  entitySets: EntitySetT[],
  entityTypes: EntityTypeT[],
  swagger?: SwaggerMetadata
): JoinedEntityMetadata<EntitySetT, EntityTypeT>[] {
  return entitySets.map(entitySet => {
    const entityType = entityTypes.find(
      t => `${t.Namespace}.${t.Name}` === entitySet.EntityType
    );

    if (!entityType) {
      throw Error(
        `Could not find entity type '${entitySet.EntityType}' for entity set with name '${entitySet.Name}'.'`
      );
    }

    const joined: JoinedEntityMetadata<EntitySetT, EntityTypeT> = {
      entitySet,
      entityType
    };

    if (swagger) {
      const defKey = Object.keys(swagger.definitions).find(
        name => `${entityType!.Namespace}.${name}` === entitySet.EntityType
      );
      if (defKey) {
        joined.swaggerDefinition = swagger.definitions[defKey];
      }
    }

    return joined;
  });
}
/**
 * @internal
 */
export function navigationPropertyBase(
  navPropName: string,
  entitySetName: string,
  formatter: ServiceNameFormatter
): Pick<
  VdmNavigationProperty,
  | 'originalName'
  | 'instancePropertyName'
  | 'staticPropertyName'
  | 'propertyNameAsParam'
> {
  const instancePropertyName = formatter.originalToNavigationPropertyName(
    entitySetName,
    navPropName
  );

  return {
    originalName: navPropName,
    instancePropertyName,
    staticPropertyName: formatter.originalToStaticPropertyName(
      entitySetName,
      navPropName
    ),
    propertyNameAsParam: applyPrefixOnJsConflictParam(instancePropertyName)
  };
}
/**
 * @internal
 */
export function createEntityClassNames(
  entityMetadata: JoinedEntityMetadata<EdmxEntitySetBase, any>[],
  formatter: ServiceNameFormatter
): Record<string, string> {
  return entityMetadata.reduce(
    (names, e) => ({
      ...names,
      [e.entitySet.Name]: formatter.originalToEntityClassName(e.entitySet.Name)
    }),
    {}
  );
}

function getTypeMappingEntityProperties(
  typeName: string,
  complexTypes: VdmComplexType[],
  enumTypes: VdmEnumType[],
  isComplex: boolean,
  isEnum: boolean
): VdmMappedEdmType {
  if (isEdmType(typeName)) {
    const edmFallback = getFallbackEdmTypeIfNeeded(typeName);
    return {
      edmType: edmFallback,
      jsType: edmToTsType(edmFallback),
      fieldType: edmToFieldType(edmFallback)
    };
  }
  if (isCollectionType(typeName)) {
    return typesForCollection(typeName, enumTypes, complexTypes);
  }
  if (isComplex) {
    return {
      edmType: typeName,
      jsType: complexTypeForName(typeName, complexTypes),
      fieldType: complexTypeFieldForName(typeName, complexTypes)
    };
  }
  if (isEnum) {
    return {
      edmType: typeName,
      jsType: enumTypeForName(typeName, enumTypes),
      fieldType: 'EnumField'
    };
  }
  throw new Error(`No types found for ${typeName}`);
}
