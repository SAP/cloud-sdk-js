/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import {
  VdmComplexType,
  VdmEntity,
  VdmFunctionImport,
  VdmFunctionImportReturnTypeCategory,
  VdmNavigationProperty,
  VdmProperty,
  VdmServiceMetadata
} from '../../src/vdm-types';

export const entityName: VdmProperty = {
  instancePropertyName: 'entityName',
  staticPropertyName: 'ENTITY_NAME',
  propertyNameAsParam: 'entityName',
  jsType: 'string',
  fieldType: 'StringField',
  originalName: 'EntityName',
  edmType: 'Edm.String',
  description: 'The name of the entity.',
  nullable: false,
  isMulti: false
};

export const numberOfEggs: VdmProperty = {
  instancePropertyName: 'numberOfEggs',
  staticPropertyName: 'NUMBER_OF_EGGS',
  propertyNameAsParam: 'numberOfEggs',
  jsType: 'BigNumber',
  fieldType: 'BigNumberField',
  originalName: 'A_noEggs',
  edmType: 'Edm.Decimal',
  description: 'The number of eggs for breakfast.',
  nullable: true,
  isMulti: false
};

export const breakfastTime: VdmProperty = {
  instancePropertyName: 'breakfastTime',
  staticPropertyName: 'BREAKFAST_TIME',
  propertyNameAsParam: 'breakfastTime',
  jsType: 'Time',
  fieldType: 'TimeField',
  originalName: 'BreakfastTime',
  edmType: 'Edm.DateTime',
  description: 'The time of breakfast.',
  nullable: false,
  isMulti: false
};

export const brunchEntity: VdmEntity = {
  className: 'Brunch',
  description: 'Breakfast took a little longer.',
  entitySetName: 'BrunchSet',
  entityTypeName: 'BrunchType',
  properties: [entityName],
  navigationProperties: [],
  keys: [entityName],
  creatable: true,
  deletable: true,
  updatable: true
};

export const toBrunch: VdmNavigationProperty = {
  from: 'Breakfast',
  to: brunchEntity.entitySetName,
  isMultiLink: false,
  instancePropertyName: 'toBrunch',
  staticPropertyName: 'TO_BRUNCH',
  propertyNameAsParam: 'toBrunch',
  originalName: 'TO_BRUNCH',
  toEntityClassName: brunchEntity.className,
  multiplicity: '1-1'
};

export const breakfastEntity: VdmEntity = {
  className: 'Breakfast',
  description: 'Breakfast is cool.',
  entitySetName: 'BreakfastSet',
  entityTypeName: 'BreakfastType',
  properties: [entityName, numberOfEggs, breakfastTime],
  navigationProperties: [toBrunch],
  keys: [entityName, breakfastTime],
  creatable: true,
  deletable: false,
  updatable: true
};

export const foodService: VdmServiceMetadata = {
  oDataVersion: 'v2',
  directoryName: 'FOOD_SERVICE',
  namespace: 'FOOD_SERVICE',
  servicePath: 'some/path/to/food',
  npmPackageName: '@hello/food-service',
  originalFileName: 'food.service.edmx',
  speakingModuleName: 'Food Service',
  entities: [breakfastEntity, brunchEntity],
  functionImports: [],
  complexTypes: [],
  className: 'FoodService',
  edmxPath: 'some/path/to/food/edmx'
};

export const complexMeal: VdmComplexType = {
  originalName: 'ComplexMealName',
  typeName: 'ComplexMealType',
  fieldType: 'ComplexMealField',
  factoryName: 'createComplexMeal',
  properties: [
    {
      originalName: 'Complexity',
      description: 'something something very good',
      edmType: 'Edm.String',
      fieldType: 'ComplexTypeStringPropertyField',
      nullable: false,
      instancePropertyName: 'complexity',
      propertyNameAsParam: 'complexity',
      jsType: 'string',
      staticPropertyName: 'COMPLEXITY',
      isMulti: false
    },
    {
      originalName: 'Amount',
      description: 'something something very much',
      edmType: 'Edm.Int16',
      fieldType: 'ComplexTypeNumberPropertyField',
      nullable: false,
      instancePropertyName: 'amount',
      propertyNameAsParam: 'amount',
      jsType: 'number',
      staticPropertyName: 'AMOUNT',
      isMulti: false
    }
  ]
};

export const complexDesert: VdmComplexType = {
  originalName: 'ComplexDesert',
  typeName: 'ComplexDesert',
  fieldType: 'ComplexDesertField',
  factoryName: 'createComplexDesert',
  properties: [
    {
      originalName: 'Amount',
      description: 'Amount of the desert',
      edmType: 'Edm.Int16',
      fieldType: 'ComplexTypeNumberPropertyField',
      nullable: false,
      instancePropertyName: 'amount',
      propertyNameAsParam: 'amount',
      jsType: 'number',
      staticPropertyName: 'AMOUNT',
      isMulti: false
    },
    {
      originalName: 'Name',
      description: 'name of the desert',
      edmType: 'Edm.String',
      fieldType: 'ComplexTypeStringPropertyField',
      nullable: false,
      instancePropertyName: 'name',
      propertyNameAsParam: 'name',
      jsType: 'string',
      staticPropertyName: 'NAME',
      isMulti: false
    }
  ]
};

export const complexMealWithDesert: VdmComplexType = {
  originalName: 'ComplexMealWithDesertName',
  typeName: 'ComplexMealWithDesertType',
  fieldType: 'ComplexMealWithDesertField',
  factoryName: 'createComplexMealWithDesert',
  properties: [
    {
      originalName: 'ComplexDesert',
      description: 'the desert',
      edmType: 'ComplexDesert',
      fieldType: 'ComplexDesertField',
      nullable: false,
      instancePropertyName: 'complexDesert',
      propertyNameAsParam: 'complexDesert',
      jsType: 'ComplexDesert',
      staticPropertyName: 'COMPLEX_DESERT',
      isComplex: true,
      isMulti: false
    },
    {
      originalName: 'Amount',
      description: 'something something very much',
      edmType: 'Edm.Int16',
      fieldType: 'ComplexTypeNumberPropertyField',
      nullable: false,
      instancePropertyName: 'amount',
      propertyNameAsParam: 'amount',
      jsType: 'number',
      staticPropertyName: 'AMOUNT',
      isMulti: false
    }
  ]
};

export const orderBreakfast: VdmFunctionImport = {
  description: 'order a breakfast',
  functionName: 'orderBreakfast',
  httpMethod: 'post',
  originalName: 'OrderBreakfast',
  parameters: [
    {
      originalName: 'WithHoneyToast',
      parameterName: 'withHoneyToast',
      nullable: true,
      description: 'Breakfast includes a honey toast',
      edmType: 'Edm.Boolean',
      jsType: 'boolean'
    }
  ],
  parametersTypeName: 'Params',
  returnType: {
    builderFunction: '(val) => edmToTs(val, Edm.String)',
    returnType: 'string',
    isMulti: false,
    returnTypeCategory: VdmFunctionImportReturnTypeCategory.EDM_TYPE
  }
};
