/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { getInterfaceNames, ServiceNameFormatter } from '../src/service-name-formatter';
import { applySuffixOnConflictUnderscore } from '../src/name-formatting-strategies';

describe('name-formatter', () => {
  describe('formats name for', () => {
    it('service', () => {
      const formatter = new ServiceNameFormatter([], [], []);
      expect(formatter.originalToServiceName('API_BUSINESS_PARTNER')).toBe(
        'business-partner-service'
      );
    });

    it("service ending with 'service'", () => {
      const formatter = new ServiceNameFormatter([], [], []);
      expect(formatter.originalToServiceName('API_SOME_SERVICE')).toBe(
        'some-service'
      );
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
      const formatter = new ServiceNameFormatter([], [], []);
      expect(
        formatter.directoryToSpeakingModuleName('business-partner-service')
      ).toBe('Business Partner Service');
      expect(
        formatter.directoryToSpeakingModuleName('business partner service')
      ).toBe('Business Partner Service');
    });
  });

  it('should hande names containing a _1 correctly',()=>{
    let newName = applySuffixOnConflictUnderscore('MyClass_1',['MyClass_1'])
    expect(newName).toBe('MyClass_2')
  })

  it('should avoid name clashes with name, type and type Force Mandatory', ()=> {

    let newName = originalToEntityClassName('MyClass',['MyClass'])
    expect(newName).toBe('MyClass_1')

    newName = originalToEntityClassName('MyClass', ['MyClassType'])
    expect(newName).toBe('MyClass_1')

    newName = originalToEntityClassName('MyClass',['MyClassTypeForceMandatory'])
    expect(newName).toBe('MyClass_1')

    newName = originalToEntityClassName('MyClass',['MyClass,MyClass_1Type'])
    expect(newName).toBe('MyClass_2')

  });

  it('should update the name cash to avoid future clashes for entity class',()=>{
    const serviceNameFormatter = new ServiceNameFormatter([],[],[])

    serviceNameFormatter.originalToEntityClassName('MyClassType')
    let expectedList = ['MyClassType',...getInterfaceNames('MyClassType')]
    expectedList.forEach(ele=>expect(serviceNameFormatter['serviceWideNamesCache']).toContain(ele))
  })


  it('should update the name cash to avoid future clashes for function import',()=>{
    expect(1).toBe(0) check the updated values to be only one
  })

  it('should handle mixed suffixes ok MyClass-1 MyClass_1',()=>{
    expect(1).toBe(0) check the updated values to be only one
  })


  it('should handle also cases greater 1 i.e unsorted already a few things there',()=>{
    expect(1).toBe(0) check the updated values to be only one
  })

  it('should handle MyClass_1Type already in list and MyClass is added ',()=>{
    expect(1).toBe(0) check the updated values to be only one
  })


  it('should handle MyClass_3Type already in list and MyClass is added higher suffix for all ',()=>{
    expect(1).toBe(0) check the updated values to be only one
  })

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
});
