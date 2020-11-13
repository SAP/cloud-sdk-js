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
  });
});
