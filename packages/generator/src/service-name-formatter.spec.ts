import { createLogger } from '@sap-cloud-sdk/util';
import { ServiceNameFormatter } from './service-name-formatter';

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
      const formatter = new ServiceNameFormatter('MyServiceName', {
        entitySetNames: ['A_SomeEntity']
      });
      expect(formatter.originalToEntityClassName('A_SomeEntity')).toBe(
        'SomeEntity'
      );
    });

    it('entity with ugly entity set name', () => {
      const formatter = new ServiceNameFormatter('MyServiceName', {
        entitySetNames: ['A_SomeEntity']
      });
      expect(
        formatter.originalToEntityClassName('A_SomeEntityCollection')
      ).toBe('SomeEntity');
    });

    it('entity with ugly entity set and entity type name', () => {
      const formatter = new ServiceNameFormatter('MyServiceName', {
        entitySetNames: ['A_SomeEntity']
      });
      expect(
        formatter.originalToEntityClassName('A_SomeEntityCollection')
      ).toBe('SomeEntity');
    });

    it('property', () => {
      const formatter = new ServiceNameFormatter('MyServiceName', {
        entitySetNames: ['A_SomeEntity']
      });
      expect(
        formatter.originalToInstancePropertyName('A_SomeEntity', 'SomeProperty')
      ).toBe('someProperty');
      expect(
        formatter.originalToStaticPropertyName('A_SomeEntity', 'SomeProperty')
      ).toBe('SOME_PROPERTY');
    });

    it('nav property', () => {
      const formatter = new ServiceNameFormatter('MyServiceName', {
        entitySetNames: ['A_SomeEntity']
      });
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
      const formatter = new ServiceNameFormatter('MyServiceName', {
        complexTypeNames: ['My_Struct']
      });
      expect(formatter.originalToComplexTypeName('My_Struct')).toBe('MyStruct');
    });

    it('function import', () => {
      const formatter = new ServiceNameFormatter('MyServiceName', {
        functionImportNames: ['FunctionImport']
      });
      expect(formatter.originalToOperationName('FunctionImport')).toBe(
        'functionImport'
      );
    });

    it('function import parameters', () => {
      const formatter = new ServiceNameFormatter('MyServiceName', {
        functionImportNames: ['FunctionImport']
      });
      expect(
        formatter.originalToParameterName('FunctionImport', 'SomeParam')
      ).toBe('someParam');
    });
  });
  describe('enforces unique names for', () => {
    it('logs if names are changes', () => {
      const formatter = new ServiceNameFormatter('MyServiceName', {
        skipValidation: true
      });
      const logger = createLogger('service-name-formatter');
      const logSpy = jest.spyOn(logger, 'warn');
      formatter.originalToEntityClassName('SomeEntity');
      formatter.originalToEntityClassName('SomeEntity');
      expect(logSpy).toHaveBeenCalledWith(
        expect.stringMatching(
          /A naming conflict appears for service MyServiceName/
        )
      );
    });

    it('entities - skip validation', () => {
      const formatter = new ServiceNameFormatter('MyServiceName', {
        skipValidation: true,
        entitySetNames: ['A_SomeEntity', 'SomeEntity']
      });
      expect(formatter.originalToEntityClassName('A_SomeEntity')).toBe(
        'SomeEntity'
      );
      expect(formatter.originalToEntityClassName('SomeEntity')).toBe(
        'SomeEntity_1'
      );
    });

    it('entities - no skip validation', () => {
      const formatter = new ServiceNameFormatter('MyServiceName', {
        entitySetNames: ['A_SomeEntity', 'SomeEntity']
      });
      expect(formatter.originalToEntityClassName('A_SomeEntity')).toBe(
        'SomeEntity'
      );
      expect(() => formatter.originalToEntityClassName('SomeEntity')).toThrow(
        /A naming conflict appears for/
      );
    });

    it('entities, function imports and complex types vs external imports - skip validation', () => {
      const formatter = new ServiceNameFormatter('MyServiceName', {
        skipValidation: true
      });
      expect(formatter.originalToEntityClassName('Time')).toBe('Time_1');
      expect(formatter.originalToComplexTypeName('BigNumber')).toBe(
        'BigNumber_1'
      );
      expect(formatter.originalToEntityClassName('Service')).toBe('Service_1');
    });

    it('entities, function imports and complex types vs external imports - no skip validation', () => {
      const formatter = new ServiceNameFormatter('MyServiceName');
      expect(() => formatter.originalToEntityClassName('Time')).toThrow(
        /A naming conflict appears for/
      );
      expect(() => formatter.originalToComplexTypeName('BigNumber')).toThrow(
        /A naming conflict appears for/
      );
      expect(() => formatter.originalToEntityClassName('Service')).toThrow(
        /A naming conflict appears for/
      );
    });

    it('properties - skip validation', () => {
      const formatter = new ServiceNameFormatter('MyServiceName', {
        skipValidation: true,
        entitySetNames: ['A_SomeEntity']
      });
      expect(
        formatter.originalToInstancePropertyName('A_SomeEntity', 'SomeProperty')
      ).toBe('someProperty');
      expect(
        formatter.originalToInstancePropertyName('A_SomeEntity', 'someProperty')
      ).toBe('someProperty_1');
      expect(
        formatter.originalToInstancePropertyName(
          'A_SomeEntity',
          '_SomeProperty'
        )
      ).toBe('someProperty_2');
      expect(
        formatter.originalToInstancePropertyName('A_SomeEntity', '_entity')
      ).toBe('entity');
      expect(
        formatter.originalToStaticPropertyName('A_SomeEntity', 'SomeProperty')
      ).toBe('SOME_PROPERTY');
      expect(
        formatter.originalToStaticPropertyName('A_SomeEntity', 'someProperty')
      ).toBe('SOME_PROPERTY_1');
    });

    it('properties - no skip validation', () => {
      const formatter = new ServiceNameFormatter('MyServiceName', {
        entitySetNames: ['A_SomeEntity']
      });

      formatter.originalToInstancePropertyName('A_SomeEntity', 'SomeProperty');

      expect(() =>
        formatter.originalToInstancePropertyName('A_SomeEntity', 'someProperty')
      ).toThrow(/A naming conflict appears for/);
      expect(() =>
        formatter.originalToInstancePropertyName(
          'A_SomeEntity',
          '_SomeProperty'
        )
      ).toThrow(/A naming conflict appears for/);

      formatter.originalToStaticPropertyName('A_SomeEntity', 'SomeProperty');
      expect(() =>
        formatter.originalToStaticPropertyName('A_SomeEntity', 'someProperty')
      ).toThrow(/A naming conflict appears for/);
    });

    it('nav properties - skip validation', () => {
      const formatter = new ServiceNameFormatter('MyServiceName', {
        skipValidation: true,
        entitySetNames: ['A_SomeEntity']
      });
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

    it('nav properties - no skip validation', () => {
      const formatter = new ServiceNameFormatter('MyServiceName', {
        entitySetNames: ['A_SomeEntity']
      });

      formatter.originalToNavigationPropertyName(
        'A_SomeEntity',
        'to_SomeEntity'
      );

      expect(() =>
        formatter.originalToNavigationPropertyName(
          'A_SomeEntity',
          'toSomeEntity'
        )
      ).toThrow(/A naming conflict appears for/);

      formatter.originalToStaticPropertyName('A_SomeEntity', 'to_SomeEntity');

      expect(() =>
        formatter.originalToStaticPropertyName('A_SomeEntity', 'toSomeEntity')
      ).toThrow(/A naming conflict appears for/);
    });

    it('complex types - skip validation', () => {
      const formatter = new ServiceNameFormatter('MyServiceName', {
        skipValidation: true,
        complexTypeNames: ['My_Struct', 'MyStruct']
      });
      expect(formatter.originalToComplexTypeName('My_Struct')).toBe('MyStruct');
      expect(formatter.originalToComplexTypeName('MyStruct')).toBe(
        'MyStruct_1'
      );
    });

    it('complex types - no skip validation', () => {
      const formatter = new ServiceNameFormatter('MyServiceName', {
        complexTypeNames: ['My_Struct', 'MyStruct']
      });
      formatter.originalToComplexTypeName('My_Struct');
      expect(() => formatter.originalToComplexTypeName('MyStruct')).toThrow(
        /A naming conflict appears for/
      );
    });

    it('function imports - skip validation', () => {
      const formatter = new ServiceNameFormatter('MyServiceName', {
        skipValidation: true,
        functionImportNames: ['FunctionImport', 'functionImport']
      });
      expect(formatter.originalToOperationName('FunctionImport')).toBe(
        'functionImport'
      );
      expect(formatter.originalToOperationName('functionImport')).toBe(
        'functionImport_1'
      );
    });

    it('function imports - no skip validation', () => {
      const formatter = new ServiceNameFormatter('MyServiceName', {
        functionImportNames: ['FunctionImport', 'functionImport']
      });
      formatter.originalToOperationName('FunctionImport');
      expect(() => formatter.originalToOperationName('functionImport')).toThrow(
        /A naming conflict appears for/
      );
    });

    it('function import parameters - skip validation', () => {
      const formatter = new ServiceNameFormatter('MyServiceName', {
        skipValidation: true,
        functionImportNames: ['FunctionImport']
      });
      expect(
        formatter.originalToParameterName('FunctionImport', 'SomeParam')
      ).toBe('someParam');
      expect(
        formatter.originalToParameterName('FunctionImport', 'someParam')
      ).toBe('someParam_1');
    });

    it('function import parameters - no skip validation', () => {
      const formatter = new ServiceNameFormatter('MyServiceName', {
        functionImportNames: ['FunctionImport']
      });

      formatter.originalToParameterName('FunctionImport', 'SomeParam');
      expect(() =>
        formatter.originalToParameterName('FunctionImport', 'someParam')
      ).toThrow(/A naming conflict appears for/);
    });

    it('entities and interfaces - skip validation', () => {
      const formatter = new ServiceNameFormatter('MyServiceName', {
        skipValidation: true,
        entitySetNames: ['SomeEntity', 'SomeEntityType']
      });
      // SomeEntityType interface is created implicitly after the line below
      expect(formatter.originalToEntityClassName('SomeEntity')).toBe(
        'SomeEntity'
      );
      expect(formatter.originalToEntityClassName('SomeEntityType')).toBe(
        'SomeEntityType_1'
      );
    });

    it('entities and interfaces - no skip validation', () => {
      const formatter = new ServiceNameFormatter('MyServiceName', {
        entitySetNames: ['SomeEntity', 'SomeEntityType']
      });
      // SomeEntityType interface is created implicitly after the line below
      formatter.originalToEntityClassName('SomeEntity');

      expect(() =>
        formatter.originalToEntityClassName('SomeEntityType')
      ).toThrow(/A naming conflict appears for/);
    });
  });

  describe('updates the cache to avoid clashes in the future', () => {
    function getFreshNameFormatter(): ServiceNameFormatter {
      return new ServiceNameFormatter('MyServiceName', {
        functionImportNames: ['FunctionImport']
      });
    }

    it('should add class and classType to service wide names cache.', () => {
      const formatter = getFreshNameFormatter();
      const newName = formatter.originalToEntityClassName('MyClass');
      expect(
        formatter['serviceWideNameGenerator']['usedNames'].slice(-2)
      ).toEqual([newName, `${newName}Type`]);
    });

    it('should add the function import parameter to the parameter names cache.', () => {
      const formatter = new ServiceNameFormatter('MyServiceName', {
        functionImportNames: ['FunctionImport']
      });
      formatter.originalToParameterName('FunctionImport', 'SomeParam');
      expect(
        formatter['parameterNameGenerators']['FunctionImport'][
          'usedNames'
        ].includes('someParam')
      ).toBe(true);
    });

    it('should add the navigational parameter to the instance property names cache.', () => {
      const formatter = new ServiceNameFormatter('MyServiceName', {
        entitySetNames: ['A_SomeEntity']
      });
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

    it('should add the function import name to the service wide cache', () => {
      const formatter = getFreshNameFormatter();
      formatter.originalToOperationName('MyFunctionImport');
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

    it('should generate bound parameter name', () => {
      const formatter = getFreshNameFormatter();
      formatter.originalToBoundParameterName('A_SomeEntity', 'MyFn', 'MyParam');
      expect(
        formatter['parameterNameGenerators']['A_SomeEntity.MyFn'][
          'usedNames'
        ].pop()
      ).toEqual('myParam');
    });

    it('should generate bound operation name', () => {
      const formatter = getFreshNameFormatter();
      formatter.originalToBoundOperationName('A_SomeEntity', 'MyFn');
      expect(
        formatter['instancePropertyNameGenerators']['A_SomeEntity'][
          'usedNames'
        ].pop()
      ).toEqual('myFn');
    });
  });
});
