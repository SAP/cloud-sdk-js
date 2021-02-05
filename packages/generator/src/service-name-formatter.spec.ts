import { ServiceNameFormatter } from '../src/service-name-formatter';

describe('name-formatter', () => {
  describe('formats name for', () => {
    it('service', () => {
      expect(
        ServiceNameFormatter.originalToServiceName('API_BUSINESS_PARTNER')
      ).toBe('business-partner-service');
    });

    it("service ending with 'service'", () => {
      expect(
        ServiceNameFormatter.originalToServiceName('API_SOME_SERVICE')
      ).toBe('some-service');
    });

    it('entity', () => {
      const formatter = new ServiceNameFormatter(['A_SomeEntity'], [], []);
      expect(formatter.originalToEntityClassName('A_SomeEntity')).toBe(
        'SomeEntity'
      );
    });

    it('entity with ugly entity set name', () => {
      const formatter = new ServiceNameFormatter(['A_SomeEntity'], [], []);
      expect(
        formatter.originalToEntityClassName('A_SomeEntityCollection')
      ).toBe('SomeEntity');
    });

    it('entity with ugly entity set and entity type name', () => {
      const formatter = new ServiceNameFormatter(['A_SomeEntity'], [], []);
      expect(
        formatter.originalToEntityClassName('A_SomeEntityCollection')
      ).toBe('SomeEntity');
    });

    it('property', () => {
      const formatter = new ServiceNameFormatter(['A_SomeEntity'], [], []);
      expect(
        formatter.originalToInstancePropertyName('A_SomeEntity', 'SomeProperty')
      ).toBe('someProperty');
      expect(
        formatter.originalToStaticPropertyName('A_SomeEntity', 'SomeProperty')
      ).toBe('SOME_PROPERTY');
    });

    it('nav property', () => {
      const formatter = new ServiceNameFormatter(['A_SomeEntity'], [], []);
      expect(
        formatter.originalToNavigationPropertyName(
          'A_SomeEntity',
          'to_SomeEntity'
        )
      ).toBe('toSomeEntity');
      expect(
        formatter.originalToStaticPropertyName('A_SomeEntity', 'to_SomeEntity')
      ).toBe('TO_SOME_ENTITY');
    });

    it('complex type', () => {
      const formatter = new ServiceNameFormatter([], ['My_Struct'], []);
      expect(formatter.originalToComplexTypeName('My_Struct')).toBe('MyStruct');
    });

    it('function import', () => {
      const formatter = new ServiceNameFormatter([], [], ['FunctionImport']);
      expect(formatter.originalToFunctionImportName('FunctionImport')).toBe(
        'functionImport'
      );
    });

    it('function import parameters', () => {
      const formatter = new ServiceNameFormatter([], [], ['FunctionImport']);
      expect(
        formatter.originalToParameterName('FunctionImport', 'SomeParam')
      ).toBe('someParam');
    });

    it('speaking service name from package name', () => {
      expect(
        ServiceNameFormatter.directoryToSpeakingModuleName(
          'business-partner-service'
        )
      ).toBe('Business Partner Service');
      expect(
        ServiceNameFormatter.directoryToSpeakingModuleName(
          'business partner service'
        )
      ).toBe('Business Partner Service');
    });
  });

  describe('enforces unique names for', () => {
    it('entities', () => {
      const formatter = new ServiceNameFormatter(
        ['A_SomeEntity', 'SomeEntity'],
        [],
        []
      );
      expect(formatter.originalToEntityClassName('A_SomeEntity')).toBe(
        'SomeEntity'
      );
      expect(formatter.originalToEntityClassName('SomeEntity')).toBe(
        'SomeEntity_1'
      );
    });

    it('entities, function imports and complex types vs external imports', () => {
      const formatter = new ServiceNameFormatter([], [], []);
      expect(formatter.originalToEntityClassName('Time')).toBe('Time_1');
      expect(formatter.originalToComplexTypeName('BigNumber')).toBe(
        'BigNumber_1'
      );
    });

    it('properties', () => {
      const formatter = new ServiceNameFormatter(['A_SomeEntity'], [], []);
      expect(
        formatter.originalToInstancePropertyName('A_SomeEntity', 'SomeProperty')
      ).toBe('someProperty');
      expect(
        formatter.originalToInstancePropertyName('A_SomeEntity', 'someProperty')
      ).toBe('someProperty_1');
      expect(
        formatter.originalToStaticPropertyName('A_SomeEntity', 'SomeProperty')
      ).toBe('SOME_PROPERTY');
      expect(
        formatter.originalToStaticPropertyName('A_SomeEntity', 'someProperty')
      ).toBe('SOME_PROPERTY_1');
    });

    it('nav properties', () => {
      const formatter = new ServiceNameFormatter(['A_SomeEntity'], [], []);
      expect(
        formatter.originalToNavigationPropertyName(
          'A_SomeEntity',
          'to_SomeEntity'
        )
      ).toBe('toSomeEntity');
      expect(
        formatter.originalToNavigationPropertyName(
          'A_SomeEntity',
          'toSomeEntity'
        )
      ).toBe('toSomeEntity_1');
      expect(
        formatter.originalToStaticPropertyName('A_SomeEntity', 'to_SomeEntity')
      ).toBe('TO_SOME_ENTITY');
      expect(
        formatter.originalToStaticPropertyName('A_SomeEntity', 'toSomeEntity')
      ).toBe('TO_SOME_ENTITY_1');
    });

    it('complex types', () => {
      const formatter = new ServiceNameFormatter(
        [],
        ['My_Struct', 'MyStruct'],
        []
      );
      expect(formatter.originalToComplexTypeName('My_Struct')).toBe('MyStruct');
      expect(formatter.originalToComplexTypeName('MyStruct')).toBe(
        'MyStruct_1'
      );
    });

    it('function imports', () => {
      const formatter = new ServiceNameFormatter(
        [],
        [],
        ['FunctionImport', 'functionImport']
      );
      expect(formatter.originalToFunctionImportName('FunctionImport')).toBe(
        'functionImport'
      );
      expect(formatter.originalToFunctionImportName('functionImport')).toBe(
        'functionImport_1'
      );
    });

    it('function import parameters', () => {
      const formatter = new ServiceNameFormatter([], [], ['FunctionImport']);
      expect(
        formatter.originalToParameterName('FunctionImport', 'SomeParam')
      ).toBe('someParam');
      expect(
        formatter.originalToParameterName('FunctionImport', 'someParam')
      ).toBe('someParam_1');
    });

    it('entities and interfaces', () => {
      const formatter = new ServiceNameFormatter(
        ['SomeEntity', 'SomeEntityType'],
        [],
        []
      );
      // SomeEntityType interface is created implicitly after the line below
      expect(formatter.originalToEntityClassName('SomeEntity')).toBe(
        'SomeEntity'
      );
      expect(formatter.originalToEntityClassName('SomeEntityType')).toBe(
        'SomeEntityType_1'
      );
    });
  });

  describe('updates the cache to avoid clashes in the future', () => {
    function getFreshNameFormatter(): ServiceNameFormatter {
      return new ServiceNameFormatter([], [], ['FunctionImport']);
    }

    it('should add class and classType to service wide names cache.', () => {
      const formatter = getFreshNameFormatter();
      const newName = formatter.originalToEntityClassName('MyClass');
      expect(
        formatter['serviceWideNameGenerator']['usedNames'].slice(-2)
      ).toEqual([newName, `${newName}Type`]);
    });

    it('should add the function import parameter to the parameter names cache.', () => {
      const formatter = new ServiceNameFormatter([], [], ['FunctionImport']);
      formatter.originalToParameterName('FunctionImport', 'SomeParam');
      expect(
        formatter['parameterNameGenerators']['FunctionImport'][
          'usedNames'
        ].includes('someParam')
      ).toBe(true);
    });

    it('should add the navigational parameter to the instance property names cache.', () => {
      const formatter = new ServiceNameFormatter(['A_SomeEntity'], [], []);
      expect(
        formatter.originalToNavigationPropertyName(
          'A_SomeEntity',
          'to_SomeEntity'
        )
      ).toBe('toSomeEntity');
      expect(
        formatter['instancePropertyNameGenerators']['A_SomeEntity'][
          'usedNames'
        ].includes('toSomeEntity')
      ).toBe(true);
    });

    it('should add the complex type parameter to the service wide cache', () => {
      const formatter = getFreshNameFormatter();
      formatter.originalToComplexTypeName('MyComplexType');
      expect(formatter['serviceWideNameGenerator']['usedNames'].pop()).toBe(
        'MyComplexType'
      );
    });

    it('should add the function inport name to the service wide cache', () => {
      const formatter = getFreshNameFormatter();
      formatter.originalToFunctionImportName('MyFunctionImport');
      expect(formatter['serviceWideNameGenerator']['usedNames'].pop()).toBe(
        'myFunctionImport'
      );
    });

    it('should add the instance property parameter to the instance property cache.', () => {
      const formatter = getFreshNameFormatter();
      formatter.originalToInstancePropertyName('A_SomeEntity', 'MyProperty');
      expect(
        formatter['instancePropertyNameGenerators']['A_SomeEntity'][
          'usedNames'
        ].includes('myProperty')
      ).toBe(true);
    });

    it('should add the static property parameter to the static property cache.', () => {
      const formatter = getFreshNameFormatter();
      formatter.originalToStaticPropertyName('A_SomeEntity', 'MyProperty');
      expect(
        formatter['staticPropertyNameGenerators']['A_SomeEntity'][
          'usedNames'
        ].includes('MY_PROPERTY')
      ).toBe(true);
    });
  });
});
