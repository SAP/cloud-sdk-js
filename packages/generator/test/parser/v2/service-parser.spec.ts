import { GlobalNameFormatter } from '../../../src/global-name-formatter';
import { ServiceMapping } from '../../../src/service-mapping';
import { VdmReturnTypeCategory, VdmProperty } from '../../../src/vdm-types';
import { createOptions } from '../../test-util/create-generator-options';
import { parseAllServices, parseService } from '../../../src/service-generator';

describe('service-parser', () => {
  describe('chooses package name source', () => {
    it('namespace by default', () => {
      const serviceMetadata = parseService(
        {
          edmxPath:
            '../../test-resources/odata-service-specs/v2/API_TEST_SRV/API_TEST_SRV.edmx'
        },
        createOptions(),
        {},
        new GlobalNameFormatter(undefined)
      );
      expect(serviceMetadata.directoryName).toBe('test-service');
    });

    it('prioritizes mapping over original names', () => {
      const serviceMapping: ServiceMapping = {
        directoryName: 'custom-directory-name',
        servicePath: '/path/to/service',
        npmPackageName: 'custom-package-name'
      };

      const serviceMetadata = parseService(
        {
          edmxPath:
            '../../test-resources/odata-service-specs/v2/API_TEST_SRV/API_TEST_SRV.edmx'
        },
        createOptions(),
        {
          API_TEST_SRV: serviceMapping
        },
        new GlobalNameFormatter({ API_TEST_SRV: serviceMapping })
      );

      expect(serviceMetadata.directoryName).toBe(serviceMapping.directoryName);
      expect(serviceMetadata.servicePath).toBe(serviceMapping.servicePath);
      expect(serviceMetadata.npmPackageName).toBe(
        serviceMapping.npmPackageName
      );
    });
  });

  describe('parses services', () => {
    it('generates vdm from edmx', () => {
      const services = parseAllServices(
        createOptions({
          inputDir: '../../test-resources/odata-service-specs/v2/API_TEST_SRV',
          useSwagger: false
        })
      );

      expect(services[0].namespaces[0]).toBe('API_TEST_SRV');
      expect(services[0].directoryName).toBe('test-service');
      expect(services[0].npmPackageName).toBe('test-service');
      expect(services[0].servicePath).toBe('/sap/opu/odata/sap/API_TEST_SRV');
      expect(services[0].entities.length).toBe(11);
    });

    it('generates vdm from edmx using swagger', () => {
      const services = parseAllServices(
        createOptions({
          inputDir: '../../test-resources/odata-service-specs/v2/API_TEST_SRV',
          useSwagger: true
        })
      );

      expect(services[0].entities.length).toBe(11);
      expect(
        services[0].apiBusinessHubMetadata!.businessDocumentationUrl
      ).toBeDefined();
    });

    it('entity properties are read correctly', () => {
      const services = parseAllServices(
        createOptions({
          inputDir: '../../test-resources/odata-service-specs/v2/API_TEST_SRV'
        })
      );
      const properties = services[0].entities.find(
        entity => entity.className === 'TestEntity'
      )!.properties;
      expect(properties.length).toBe(19);
      const stringProp = properties.find(
        prop => prop.originalName === 'StringProperty'
      );
      expect(stringProp).toEqual({
        originalName: 'StringProperty',
        instancePropertyName: 'stringProperty',
        staticPropertyName: 'STRING_PROPERTY',
        propertyNameAsParam: 'stringProperty',
        edmType: 'Edm.String',
        jsType: 'string',
        fieldType: 'StringField',
        description: '',
        nullable: true,
        maxLength: '10',
        isComplex: false,
        isCollection: false,
        isEnum: false
      });

      const anyField = properties.find(
        prop => prop.originalName === 'SomethingTheSDKDoesNotSupport'
      );
      expect(anyField).toEqual({
        originalName: 'SomethingTheSDKDoesNotSupport',
        instancePropertyName: 'somethingTheSdkDoesNotSupport',
        staticPropertyName: 'SOMETHING_THE_SDK_DOES_NOT_SUPPORT',
        propertyNameAsParam: 'somethingTheSdkDoesNotSupport',
        edmType: 'Edm.Any',
        jsType: 'any',
        fieldType: 'AnyField',
        description: '',
        nullable: true,
        isComplex: false,
        isCollection: false,
        isEnum: false
      });
    });

    it('entities are read correctly', () => {
      const services = parseAllServices(
        createOptions({
          inputDir: '../../test-resources/odata-service-specs/v2/API_TEST_SRV'
        })
      );

      expect(
        services[0].entities.map(entity => ({
          entitySetName: entity.entitySetName,
          className: entity.className,
          numProperties: entity.properties.length,
          numKeys: entity.keys.length
        }))
      ).toEqual([
        {
          entitySetName: 'A_TestEntity',
          className: 'TestEntity',
          numKeys: 2,
          numProperties: 19
        },
        {
          entitySetName: 'A_TestEntityMultiLink',
          className: 'TestEntityMultiLink',
          numKeys: 1,
          numProperties: 5
        },
        {
          entitySetName: 'A_TestEntityOtherMultiLink',
          className: 'TestEntityOtherMultiLink',
          numKeys: 1,
          numProperties: 1
        },
        {
          entitySetName: 'A_TestEntityLvl2MultiLink',
          className: 'TestEntityLvl2MultiLink',
          numKeys: 1,
          numProperties: 5
        },
        {
          entitySetName: 'A_TestEntitySingleLink',
          className: 'TestEntitySingleLink',
          numKeys: 1,
          numProperties: 5
        },
        {
          entitySetName: 'A_TestEntityLvl2SingleLink',
          className: 'TestEntityLvl2SingleLink',
          numKeys: 1,
          numProperties: 5
        },
        {
          entitySetName: 'A_TestEntityCircularLinkParent',
          className: 'TestEntityCircularLinkParent',
          numKeys: 1,
          numProperties: 1
        },
        {
          entitySetName: 'A_TestEntityCircularLinkChild',
          className: 'TestEntityCircularLinkChild',
          numKeys: 1,
          numProperties: 1
        },
        {
          entitySetName: 'A_TestEntityEndsWithCollection',
          className: 'TestEntityEndsWith',
          numKeys: 1,
          numProperties: 1
        },
        {
          entitySetName: 'A_TestEntityEndsWithSomethingElse',
          className: 'TestEntityEndsWithSomethingElse',
          numKeys: 1,
          numProperties: 1
        },
        {
          entitySetName: 'A_Testentity',
          className: 'Testentity_1',
          numKeys: 2,
          numProperties: 19
        }
      ]);
    });

    it('complex types are parsed correctly', () => {
      const services = parseAllServices(
        createOptions({
          inputDir: '../../test-resources/odata-service-specs/v2/API_TEST_SRV'
        })
      );

      const complexTypes = services[0].complexTypes;
      const complexType = complexTypes[0];

      expect(complexTypes.length).toBe(3);
      expect(complexType.typeName).toBe('TestComplexType');
      expect(complexType.originalName).toBe('A_TestComplexType');
      expect(complexType.factoryName).toBe('createTestComplexType_1');
      expect(complexType.fieldType).toBe('TestComplexTypeField');
      expect(complexType.properties.length).toBe(17);

      expect(
        complexType.properties.find(
          prop => prop.originalName === 'SomethingTheSDKDoesNotSupport'
        )!.fieldType
      ).toBe('ComplexTypeAnyPropertyField');

      expect(
        complexType.properties.find(
          prop => prop.originalName === 'ComplexTypeProperty'
        )!.fieldType
      ).toBe('TestNestedComplexTypeField');
    });

    it('complex type properties are read correctly', () => {
      const services = parseAllServices(
        createOptions({
          inputDir: '../../test-resources/odata-service-specs/v2/API_TEST_SRV',
          useSwagger: false
        })
      );

      const testEntity = services[0].entities[0];
      const complexProperty = testEntity.properties.find(
        prop => prop.originalName === 'ComplexTypeProperty'
      );
      const expected: VdmProperty = {
        instancePropertyName: 'complexTypeProperty',
        staticPropertyName: 'COMPLEX_TYPE_PROPERTY',
        propertyNameAsParam: 'complexTypeProperty',
        originalName: 'ComplexTypeProperty',
        edmType: 'API_TEST_SRV.A_TestComplexType',
        jsType: 'TestComplexType',
        fieldType: 'TestComplexTypeField',
        description: '',
        nullable: true,
        isComplex: true,
        isCollection: false,
        isEnum: false,
        maxLength: undefined
      };
      expect(complexProperty).toEqual(expected);
    });

    it('does not clash with complex type builder function', () => {
      const services = parseAllServices(
        createOptions({
          inputDir: '../../test-resources/odata-service-specs/v2/API_TEST_SRV',
          useSwagger: false
        })
      );

      const functionImport = services[0].functionImports.find(
        f => f.originalName === 'CreateTestComplexType'
      )!;
      const complexType = services[0].complexTypes.find(
        c => c.originalName === 'A_TestComplexType'
      )!;

      const complexTypeName = 'TestComplexType';
      const functionImportName = 'createTestComplexType';
      const factoryName = 'createTestComplexType_1';
      const expectedReturnType = {
        returnTypeCategory: VdmReturnTypeCategory.COMPLEX_TYPE,
        returnType: 'TestComplexType',
        builderFunction:
          '(data) => deserializeComplexTypeV2(data, TestComplexType)',
        isCollection: false,
        isMulti: false
      };

      expect(functionImport.name).toBe(functionImportName);
      expect(functionImport.returnType).toEqual(expectedReturnType);

      expect(complexType.typeName).toBe(complexTypeName);
      expect(complexType.factoryName).toBe(factoryName);
    });

    it('does not clash with reserved JavaScript keywords', () => {
      const services = parseAllServices(
        createOptions({
          inputDir: '../../test-resources/odata-service-specs/v2/API_TEST_SRV',
          useSwagger: false
        })
      );

      const functionImport = services[0].functionImports.find(
        f => f.originalName === 'Continue'
      )!;

      expect(functionImport.name).toBe('fContinue');
    });

    it('v2 function imports edm return types are read correctly', () => {
      const [service] = parseAllServices(
        createOptions({
          inputDir: '../../test-resources/odata-service-specs/v2/API_TEST_SRV',
          useSwagger: false
        })
      );

      const functionImport = service.functionImports.find(
        f => f.originalName === 'TestFunctionImportEdmReturnType'
      )!;

      expect(functionImport.name).toBe('testFunctionImportEdmReturnType');
      expect(functionImport.returnType.builderFunction).toBe(
        "(val) => edmToTsV2(val.TestFunctionImportEdmReturnType, 'Edm.Boolean')"
      );

      const functionImportUnsupportedEdmTypes = service.functionImports.find(
        f => f.originalName === 'TestFunctionImportUnsupportedEdmTypes'
      )!;

      expect(functionImportUnsupportedEdmTypes.returnType.builderFunction).toBe(
        "(val) => edmToTsV2(val.TestFunctionImportUnsupportedEdmTypes, 'Edm.Any')"
      );
      expect(functionImportUnsupportedEdmTypes.parameters[0].edmType).toBe(
        'Edm.Any'
      );
    });

    it('should parse C4C service definitions with proper class names.', () => {
      const services = parseAllServices(
        createOptions({
          inputDir: '../../test-resources/odata-service-specs/v2/API_TEST_SRV',
          useSwagger: false
        })
      );

      const entities = services[0].entities;

      const entityEndsWithCollection = entities.find(
        e => e.entitySetName === 'A_TestEntityEndsWithCollection'
      )!;
      const entityEndsWithSthElse = entities.find(
        e => e.entitySetName === 'A_TestEntityEndsWithSomethingElse'
      )!;

      expect(entityEndsWithCollection.className).toBe('TestEntityEndsWith');
      expect(entityEndsWithSthElse.className).toBe(
        'TestEntityEndsWithSomethingElse'
      );
    });
  });

  it('should skip entity types when not defined in any entity sets', () => {
    const services = parseAllServices(
      createOptions({
        inputDir: '../../test-resources/odata-service-specs/v2/API_TEST_SRV',
        useSwagger: false
      })
    );

    const entity = services[0].entities.find(
      e => e.entityTypeName === 'Unused'
    );

    expect(entity).toBeUndefined();
  });

  it('parses multiple schemas', () => {
    const services = parseAllServices(
      createOptions({
        inputDir:
          '../../test-resources/odata-service-specs/v2/API_MULTIPLE_SCHEMAS_SRV',
        useSwagger: false
      })
    );

    expect(services[0].entities.length).toBe(1);
  });
});
