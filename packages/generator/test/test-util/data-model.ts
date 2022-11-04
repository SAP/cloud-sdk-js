import {
  VdmComplexType,
  VdmEntity,
  VdmEnumType,
  VdmOperation,
  VdmNavigationProperty,
  VdmProperty,
  VdmReturnTypeCategory,
  VdmServiceMetadata,
  VdmParameter,
  VdmUnsupportedReason,
  VdmOperationReturnType
} from '../../src/vdm-types';

export const entityName: VdmProperty = {
  instancePropertyName: 'entityName',
  staticPropertyName: 'ENTITY_NAME',
  propertyNameAsParam: 'entityName',
  jsType: 'string',
  fieldType: 'OrderableEdmTypeField',
  originalName: 'EntityName',
  edmType: 'Edm.String',
  description: 'The name of the entity.',
  nullable: false,
  isCollection: false
};

export const numberOfEggs: VdmProperty = {
  instancePropertyName: 'numberOfEggs',
  staticPropertyName: 'NUMBER_OF_EGGS',
  propertyNameAsParam: 'numberOfEggs',
  jsType: 'BigNumber',
  fieldType: 'OrderableEdmTypeField',
  originalName: 'A_noEggs',
  edmType: 'Edm.Decimal',
  description: 'The number of eggs for breakfast.',
  nullable: true,
  isCollection: false
};

export const breakfastTime: VdmProperty = {
  instancePropertyName: 'breakfastTime',
  staticPropertyName: 'BREAKFAST_TIME',
  propertyNameAsParam: 'breakfastTime',
  jsType: 'Time',
  fieldType: 'OrderableEdmTypeField',
  originalName: 'BreakfastTime',
  edmType: 'Edm.DateTime',
  description: 'The time of breakfast.',
  nullable: false,
  isCollection: false
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
  updatable: true,
  entityTypeNamespace: '',
  functions: [],
  actions: []
};

export const toBrunch: VdmNavigationProperty = {
  from: 'Breakfast',
  to: brunchEntity.entitySetName,
  isCollection: false,
  instancePropertyName: 'toBrunch',
  staticPropertyName: 'TO_BRUNCH',
  propertyNameAsParam: 'toBrunch',
  originalName: 'TO_BRUNCH',
  toEntityClassName: brunchEntity.className
};

const returnType: VdmOperationReturnType = {
  returnType: 'string',
  isCollection: false,
  isNullable: false,
  returnTypeCategory: VdmReturnTypeCategory.EDM_TYPE,
  builderFunction:
    "(val) => edmToTs(val.TestFunctionImportEdmReturnType, 'Edm.String', deSerializers)"
};

const getPriceFunction: VdmOperation = {
  httpMethod: 'GET',
  type: 'function',
  returnType,
  originalName: 'GetPrice',
  parameters: [
    {
      originalName: 'Meal',
      parameterName: 'meal',
      nullable: false,
      description: 'Name of the meal',
      jsType: 'string',
      fieldType: 'EdmTypeField',
      edmType: 'Edm.String'
    }
  ],
  parametersTypeName: 'GetPriceParameters',
  name: 'getPrice',
  description: 'Get the price of a meal',
  isBound: false
};

const payMealAction: VdmOperation = {
  httpMethod: 'POST',
  type: 'action',
  returnType,
  originalName: 'payMeal',
  parameters: [
    {
      originalName: 'Meal',
      parameterName: 'meal',
      nullable: false,
      description: 'The meal to pay.',
      jsType: 'string',
      fieldType: 'EdmTypeField',
      edmType: 'Edm.String'
    },
    {
      originalName: 'Cash',
      parameterName: 'cash',
      nullable: false,
      description: 'Cash amount, that was handed over.',
      jsType: 'string',
      fieldType: 'EdmTypeField',
      edmType: 'Edm.String'
    }
  ],
  parametersTypeName: 'PayMealParameters',
  isBound: false,
  name: 'payMeal',
  description:
    'Pay for a meal, with a certain amount of cash. Returns the amount of change.'
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
  updatable: true,
  entityTypeNamespace: '',
  functions: [getPriceFunction],
  actions: [payMealAction]
};

function getFunctionImport(
  originalName: string,
  httpMethod: string
): VdmOperation {
  return {
    originalName,
    httpMethod,
    parametersTypeName: `${originalName}Return`,
    parameters: [{ description: 'local test parameter' }] as VdmParameter[],
    returnType: {
      returnType: 'string',
      returnTypeCategory: VdmReturnTypeCategory.EDM_TYPE,
      builderFunction:
        "(val) => edmToTs(val.TestFunctionImportEdmReturnType, 'Edm.String', deSerializers)"
    }
  } as VdmOperation;
}

function getActionImport(): VdmOperation {
  return {
    originalName: 'food-action-import',
    httpMethod: 'POST',
    returnType: {
      returnType: 'string'
    },
    parametersTypeName: 'actionImportReturn',
    parameters: [{ description: 'local test parameter' }] as VdmParameter[]
  } as VdmOperation;
}

export const foodService: VdmServiceMetadata = {
  oDataVersion: 'v2',
  directoryName: 'FOOD_SERVICE',
  namespaces: ['FOOD_SERVICE'],
  servicePath: 'some/path/to/food',
  npmPackageName: '@hello/food-service',
  originalFileName: 'food.service.edmx',
  speakingModuleName: 'Food Service',
  entities: [breakfastEntity, brunchEntity],
  functionImports: [
    getFunctionImport('funcGet', 'get'),
    getFunctionImport('funcPost', 'post')
  ],
  actionImports: [getActionImport()],
  complexTypes: [],
  enumTypes: [],
  className: 'FoodService',
  edmxPath: 'some/path/to/food/edmx'
};

export const enumMeal: VdmEnumType = {
  originalName: 'EnumMealName',
  typeName: 'EnumMealType',
  members: [
    { name: 'member1', originalValue: '0' },
    { name: 'member2', originalValue: '1' }
  ],
  underlyingType: 'Edm.Int32'
};

export const complexMeal: VdmComplexType = {
  originalName: 'ComplexMealName',
  typeName: 'ComplexMealType',
  fieldType: 'ComplexMealField',
  properties: [
    {
      originalName: 'Complexity',
      description: 'something something very good',
      edmType: 'Edm.String',
      fieldType: 'OrderableEdmTypeField',
      nullable: false,
      instancePropertyName: 'complexity',
      propertyNameAsParam: 'complexity',
      jsType: 'string',
      staticPropertyName: 'COMPLEXITY',
      isCollection: false
    },
    {
      originalName: 'Amount',
      description: 'something something very much',
      edmType: 'Edm.Int16',
      fieldType: 'OrderableEdmTypeField',
      nullable: false,
      instancePropertyName: 'amount',
      propertyNameAsParam: 'amount',
      jsType: 'number',
      staticPropertyName: 'AMOUNT',
      isCollection: false
    }
  ],
  namespace: ''
};

export const complexDesert: VdmComplexType = {
  originalName: 'ComplexDesert',
  typeName: 'ComplexDesert',
  fieldType: 'ComplexDesertField',
  properties: [
    {
      originalName: 'Amount',
      description: 'Amount of the desert',
      edmType: 'Edm.Int16',
      fieldType: 'OrderableEdmTypeField',
      nullable: false,
      instancePropertyName: 'amount',
      propertyNameAsParam: 'amount',
      jsType: 'number',
      staticPropertyName: 'AMOUNT',
      isCollection: false
    },
    {
      originalName: 'Name',
      description: 'name of the desert',
      edmType: 'Edm.String',
      fieldType: 'OrderableEdmTypeField',
      nullable: false,
      instancePropertyName: 'name',
      propertyNameAsParam: 'name',
      jsType: 'string',
      staticPropertyName: 'NAME',
      isCollection: false
    }
  ],
  namespace: ''
};

export const complexMealWithDesert: VdmComplexType = {
  originalName: 'ComplexMealWithDesertName',
  typeName: 'ComplexMealWithDesertType',
  fieldType: 'ComplexMealWithDesertField',
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
      isCollection: false
    },
    {
      originalName: 'Amount',
      description: 'something something very much',
      edmType: 'Edm.Int16',
      fieldType: 'OrderableEdmTypeField',
      nullable: false,
      instancePropertyName: 'amount',
      propertyNameAsParam: 'amount',
      jsType: 'number',
      staticPropertyName: 'AMOUNT',
      isCollection: false
    }
  ],
  namespace: ''
};

const orderBreakfastBuilder = (isNullable: boolean): VdmOperation => ({
  description: 'order a breakfast',
  name: 'orderBreakfast',
  httpMethod: 'post',
  originalName: 'OrderBreakfast',
  type: 'function',
  isBound: false,
  parameters: [
    {
      originalName: 'WithHoneyToast',
      parameterName: 'withHoneyToast',
      nullable: isNullable,
      description: 'Breakfast includes a honey toast',
      edmType: 'Edm.Boolean',
      jsType: 'boolean',
      fieldType: 'OrderableEdmTypeField'
    }
  ],
  parametersTypeName: 'Params',
  returnType: {
    builderFunction: "(val) => edmToTs(val, 'Edm.String', deSerializers)",
    returnType: 'string',
    isCollection: false,
    isNullable: false,
    returnTypeCategory: VdmReturnTypeCategory.EDM_TYPE
  }
});

export const orderBreakfast = orderBreakfastBuilder(false);
export const orderBreakfastNullable = orderBreakfastBuilder(true);

export const entityNotDeserializable: VdmOperation = {
  description: 'entityNotDeserializable',
  name: 'entityNotDeserializable',
  httpMethod: 'get',
  originalName: 'entityNotDeserializable',
  parameters: [],
  isBound: false,
  parametersTypeName: 'Params',
  type: 'function',
  returnType: {
    builderFunction: '',
    returnType: 'never',
    isCollection: false,
    isNullable: false,
    returnTypeCategory: VdmReturnTypeCategory.NEVER,
    unsupportedReason: VdmUnsupportedReason.ENTITY_NOT_DESERIALIZABLE
  }
};
