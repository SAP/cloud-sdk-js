import { createOptions } from '../../test-util/create-generator-options';
import { parseAllServices } from '../../../src/service-generator';

describe('service-parser', () => {
  describe('parses services', () => {
    it('enum property is read correctly', () => {
      const services = parseAllServices(
        createOptions({
          inputDir: '../../test-resources/odata-service-specs/v4/API_TEST_SRV'
        })
      );
      const properties = services[0].entities.find(
        entity => entity.className === 'TestEntity'
      )!.properties;
      const stringProp = properties.find(
        prop => prop.originalName === 'EnumPropertyWithOneMember'
      );

      expect(stringProp).toEqual({
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
        isEnum: true
      });
    });

    it('v4 function imports edm return types are read correctly', () => {
      const [service] = parseAllServices(
        createOptions({
          inputDir: '../../test-resources/odata-service-specs/v4/API_TEST_SRV',
          useSwagger: false
        })
      );

      const functionImport = service.functionImports.find(
        f => f.originalName === 'TestFunctionImportEdmReturnType'
      )!;

      expect(functionImport.name).toBe('testFunctionImportEdmReturnType');
      expect(functionImport.returnType.builderFunction).toBe(
        "(val) => edmToTsV4(val.value, 'Edm.Boolean')"
      );
    });

    it('should parse actions imports correctly', () => {
      const services = parseAllServices(
        createOptions({
          inputDir: '../../test-resources/odata-service-specs/v4/API_TEST_SRV',
          useSwagger: false
        })
      );

      const actions = services[0].actionsImports;

      expect(actions?.length).toBe(3);
      const actionWithUnsupportedEdmType = actions?.find(
        action => action.originalName === 'TestActionImportUnsupportedEdmTypes'
      );
      expect(actionWithUnsupportedEdmType?.returnType.builderFunction).toBe(
        "(val) => edmToTsV4(val.value, 'Edm.Any')"
      );
      expect(actionWithUnsupportedEdmType?.parameters[0].edmType).toBe(
        'Edm.Any'
      );
    });
  });
});
