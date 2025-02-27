import { resolve } from 'path';
import mock from 'mock-fs';
import { getRelPathWithPosixSeparator } from '@sap-cloud-sdk/generator-common/internal';
import { createParsedOptions } from '../test/test-util/create-generator-options';
import { oDataServiceSpecs } from '../../../test-resources/odata-service-specs';
import { parseAllServices, parseService } from './service-generator';
import type { VdmProperty } from './vdm-types';
import type { OptionsPerService } from '@sap-cloud-sdk/generator-common/internal';
import type { ServiceOptions } from '@sap-cloud-sdk/generator-common/dist/options-per-service';

describe('service-generator', () => {
  describe('v2', () => {
    describe('parseService', () => {
      it('prioritizes mapping over original names', async () => {
        const pathSpec = resolve(
          oDataServiceSpecs,
          'v2',
          'API_TEST_SRV',
          'API_TEST_SRV.edmx'
        );
        const pathConfig = resolve(__dirname, '../options.json');
        const serviceOptions: ServiceOptions = {
          directoryName: 'custom-directory-name',
          basePath: '/path/to/service',
          packageName: 'custom-package-name'
        };
        const optionsPerService: OptionsPerService = {
          [getRelPathWithPosixSeparator(pathSpec)]: serviceOptions
        };
        mock({
          [pathConfig]: JSON.stringify(optionsPerService),
          [pathSpec]: mock.load(pathSpec)
        });

        const serviceMetadata = await parseService(
          pathSpec,
          createParsedOptions({
            input: pathSpec,
            optionsPerService: 'options.json'
          })
        );

        expect(serviceMetadata.serviceOptions.directoryName).toEqual(
          serviceOptions.directoryName
        );
        expect(serviceMetadata.serviceOptions.basePath).toEqual(
          serviceOptions.basePath
        );
        expect(serviceMetadata.serviceOptions.packageName).toEqual(
          serviceOptions.packageName
        );
        mock.restore();
      });
    });

    describe('parseAllServices', () => {
      it('generates vdm from EDMX', async () => {
        const services = await parseAllServices(
          createParsedOptions({
            input: resolve(oDataServiceSpecs, 'v2', 'API_TEST_SRV'),
            useSwagger: false
          })
        );

        expect(services[0].namespaces[0]).toEqual('API_TEST_SRV');
        expect(services[0].serviceOptions.directoryName).toEqual(
          'API_TEST_SRV'
        );
        expect(services[0].serviceOptions.packageName).toEqual('api_test_srv');
        expect(services[0].serviceOptions.basePath).toEqual(
          '/sap/opu/odata/sap/API_TEST_SRV'
        );
        expect(services[0].entities.length).toEqual(14);
      });

      it('generates vdm from EDMX using swagger', async () => {
        const services = await parseAllServices(
          createParsedOptions({
            input: resolve(oDataServiceSpecs, 'v2', 'API_TEST_SRV'),
            useSwagger: true
          })
        );

        expect(services[0].entities.length).toEqual(14);
        expect(
          services[0].apiBusinessHubMetadata!.businessDocumentationUrl
        ).toBeDefined();
      });

      it('entity properties are read correctly', async () => {
        const services = await parseAllServices(
          createParsedOptions({
            input: resolve(oDataServiceSpecs, 'v2', 'API_TEST_SRV')
          })
        );
        const properties = services[0].entities.find(
          entity => entity.className === 'TestEntity'
        )!.properties;
        expect(properties.length).toEqual(19);
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
          fieldType: 'OrderableEdmTypeField',
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
          fieldType: 'EdmTypeField',
          description: '',
          nullable: true,
          isComplex: false,
          isCollection: false,
          isEnum: false,
          maxLength: undefined
        });
      });

      it('entities are read correctly', async () => {
        const services = await parseAllServices(
          createParsedOptions({
            input: resolve(oDataServiceSpecs, 'v2', 'API_TEST_SRV')
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
            className: 'TestEntityWithSharedEntityType1',
            entitySetName: 'A_TestEntityWithSharedEntityType1',
            numKeys: 1,
            numProperties: 1
          },
          {
            className: 'TestEntityWithSharedEntityType2',
            entitySetName: 'A_TestEntityWithSharedEntityType2',
            numKeys: 1,
            numProperties: 1
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
            className: 'CaseTest',
            entitySetName: 'A_CaseTest',
            numKeys: 1,
            numProperties: 1
          },
          {
            className: 'Casetest_1',
            entitySetName: 'A_CASETEST',
            numKeys: 1,
            numProperties: 1
          }
        ]);
      });

      it('complex types are parsed correctly', async () => {
        const services = await parseAllServices(
          createParsedOptions({
            input: resolve(oDataServiceSpecs, 'v2', 'API_TEST_SRV')
          })
        );

        const complexTypes = services[0].complexTypes;
        const complexType = complexTypes[0];

        expect(complexTypes.length).toEqual(3);
        expect(complexType.typeName).toEqual('TestComplexType');
        expect(complexType.originalName).toEqual('A_TestComplexType');
        expect(complexType.fieldType).toEqual('TestComplexTypeField');
        expect(complexType.properties.length).toEqual(17);

        const anyProp = complexType.properties.find(
          prop => prop.originalName === 'SomethingTheSDKDoesNotSupport'
        );
        expect(anyProp?.fieldType).toEqual('EdmTypeField');
        expect(anyProp?.edmType).toEqual('Edm.Any');

        const complexTypeProp = complexType.properties.find(
          prop => prop.originalName === 'ComplexTypeProperty'
        );
        expect(complexTypeProp?.fieldType).toEqual(
          'TestNestedComplexTypeField'
        );
      });

      it('complex type properties are read correctly', async () => {
        const services = await parseAllServices(
          createParsedOptions({
            input: resolve(oDataServiceSpecs, 'v2', 'API_TEST_SRV'),
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

      it('does not clash with complex type builder function', async () => {
        const services = await parseAllServices(
          createParsedOptions({
            input: resolve(oDataServiceSpecs, 'v2', 'API_TEST_SRV'),
            useSwagger: false
          })
        );

        const functionImport = services[0].operations.find(
          f =>
            f.originalName === 'CreateTestComplexType' && f.type === 'function'
        )!;
        const complexType = services[0].complexTypes.find(
          c => c.originalName === 'A_TestComplexType'
        )!;

        const complexTypeName = 'TestComplexType';
        const functionImportName = 'createTestComplexType';
        const expectedReturnType = {
          returnTypeCategory: 'complex-type',
          returnType: 'TestComplexType',
          builderFunction:
            '(data) => entityDeserializer(\n        deSerializers || defaultDeSerializers\n        ).deserializeComplexType(data, TestComplexType)',
          isCollection: false,
          isNullable: false
        };

        expect(functionImport.name).toEqual(functionImportName);
        expect(functionImport.returnType).toEqual(expectedReturnType);

        expect(complexType.typeName).toEqual(complexTypeName);
      });

      it('does not clash with reserved JavaScript keywords', async () => {
        const services = await parseAllServices(
          createParsedOptions({
            input: resolve(oDataServiceSpecs, 'v2', 'API_TEST_SRV'),
            useSwagger: false
          })
        );

        const functionImport = services[0].operations.find(
          f => f.originalName === 'Continue' && f.type === 'function'
        )!;

        expect(functionImport.name).toEqual('fContinue');
      });

      it('function imports EDM return types are read correctly', async () => {
        const [service] = await parseAllServices(
          createParsedOptions({
            input: resolve(oDataServiceSpecs, 'v2', 'API_TEST_SRV'),
            useSwagger: false
          })
        );

        const functionImport = service.operations.find(
          f =>
            f.originalName === 'TestFunctionImportEdmReturnType' &&
            f.type === 'function'
        )!;

        expect(functionImport.name).toEqual('testFunctionImportEdmReturnType');
        expect(functionImport.returnType.builderFunction).toEqual(
          "(val) => edmToTs(val.TestFunctionImportEdmReturnType, 'Edm.Boolean', deSerializers)"
        );

        const functionImportUnsupportedEdmTypes = service.operations.find(
          f =>
            f.originalName === 'TestFunctionImportUnsupportedEdmTypes' &&
            f.type === 'function'
        )!;

        expect(
          functionImportUnsupportedEdmTypes.returnType.builderFunction
        ).toEqual(
          "(val) => edmToTs(val.TestFunctionImportUnsupportedEdmTypes, 'Edm.Any', deSerializers)"
        );
        expect(functionImportUnsupportedEdmTypes.parameters[0].edmType).toEqual(
          'Edm.Any'
        );
      });

      it('should parse C4C service definitions with proper class names.', async () => {
        const services = await parseAllServices(
          createParsedOptions({
            input: resolve(oDataServiceSpecs, 'v2', 'API_TEST_SRV'),
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

        expect(entityEndsWithCollection.className).toEqual(
          'TestEntityEndsWith'
        );
        expect(entityEndsWithSthElse.className).toEqual(
          'TestEntityEndsWithSomethingElse'
        );
      });

      it('should skip entity types when not defined in any entity sets', async () => {
        const services = await parseAllServices(
          createParsedOptions({
            input: resolve(oDataServiceSpecs, 'v2', 'API_TEST_SRV'),
            useSwagger: false
          })
        );

        const entity = services[0].entities.find(
          e => e.entityTypeName === 'Unused'
        );

        expect(entity).toBeUndefined();
      });

      it('parses multiple schemas', async () => {
        const services = await parseAllServices(
          createParsedOptions({
            input: resolve(oDataServiceSpecs, 'v2', 'API_MULTIPLE_SCHEMAS_SRV'),
            useSwagger: false
          })
        );

        expect(services[0].entities.length).toEqual(1);
      });
    });
  });

  describe('v4', () => {
    describe('parseAllServices', () => {
      it('enum property is read correctly', async () => {
        const services = await parseAllServices(
          createParsedOptions({
            input: resolve(oDataServiceSpecs, 'v4', 'API_TEST_SRV')
          })
        );
        const properties = services[0].entities.find(
          entity => entity.className === 'TestEntity'
        )!.properties;
        const enumProp = properties.find(
          prop => prop.originalName === 'EnumPropertyWithOneMember'
        );

        expect(enumProp).toEqual({
          originalName: 'EnumPropertyWithOneMember',
          instancePropertyName: 'enumPropertyWithOneMember',
          staticPropertyName: 'ENUM_PROPERTY_WITH_ONE_MEMBER',
          propertyNameAsParam: 'enumPropertyWithOneMember',
          edmType: 'API_TEST_SRV.A_TestEnumType_WithOneMember',
          jsType: 'TestEnumTypeWithOneMember',
          fieldType: 'EnumField',
          description: '',
          nullable: true,
          isComplex: false,
          isCollection: false,
          isEnum: true,
          maxLength: undefined
        });
      });

      it('v4 function imports EDM return types are read correctly', async () => {
        const [service] = await parseAllServices(
          createParsedOptions({
            input: resolve(oDataServiceSpecs, 'v4', 'API_TEST_SRV'),
            useSwagger: false
          })
        );

        const functionImport = service.operations.find(
          f =>
            f.originalName === 'TestFunctionImportEdmReturnType' &&
            f.type === 'function'
        )!;

        expect(functionImport.name).toEqual('testFunctionImportEdmReturnType');
        expect(functionImport.returnType.builderFunction).toEqual(
          "(val) => edmToTs(val.value, 'Edm.Boolean', deSerializers)"
        );
      });

      it('should parse actions imports correctly', async () => {
        const services = await parseAllServices(
          createParsedOptions({
            input: resolve(oDataServiceSpecs, 'v4', 'API_TEST_SRV'),
            useSwagger: false
          })
        );

        const actions = services[0].operations.filter(
          op => op.type === 'action'
        );

        expect(actions?.length).toEqual(7);
        const actionWithUnsupportedEdmType = actions?.find(
          action =>
            action.originalName === 'TestActionImportUnsupportedEdmTypes'
        );
        expect(
          actionWithUnsupportedEdmType?.returnType.builderFunction
        ).toEqual("(val) => edmToTs(val.value, 'Edm.Any', deSerializers)");
        expect(actionWithUnsupportedEdmType?.parameters[0].edmType).toEqual(
          'Edm.Any'
        );
      });
    });
  });
});
