import { unixEOL } from '@sap-cloud-sdk/util';
import {
  getFunctionDoc,
  getNavPropertyDescription,
  getPropertyDescription
} from './typedoc';
import { VdmNavigationProperty, VdmProperty } from './vdm-types';

describe('typedoc', () => {
  it('get normal property description', () => {
    const property: VdmProperty = {
      originalName: 'OnePropertyName',
      description: `${unixEOL}  entity info`,
      jsType: 'string',
      edmType: 'Edm:String',
      nullable: true,
      fieldType: 'string',
      instancePropertyName: 'onePropertyName',
      staticPropertyName: 'ONE_PROPERTY_NAME',
      propertyNameAsParam: 'onePropertyName',
      isCollection: false
    };

    expect(getPropertyDescription(property)).toBe(property.description);
  });

  it('get normal property OData name when no description were provided', () => {
    const property: VdmProperty = {
      description: '',
      originalName: 'OnePropertyName',
      jsType: 'string',
      edmType: 'Edm:String',
      nullable: true,
      fieldType: 'string',
      instancePropertyName: 'onePropertyName',
      staticPropertyName: 'ONE_PROPERTY_NAME',
      propertyNameAsParam: 'onePropertyName',
      isCollection: false
    };
    expect(getPropertyDescription(property)).toBe('One Property Name.');
  });

  it('get navigation property description', () => {
    const navProp: VdmNavigationProperty = {
      from: 'A_OneEntity',
      originalName: 'toOtherEntity',
      to: 'A_OtherEntity',
      isCollection: true,
      instancePropertyName: 'toOtherEntity',
      staticPropertyName: 'TO_OTHER_ENTITY',
      toEntityClassName: 'OtherEntity',
      propertyNameAsParam: 'toOtherEntity'
    };

    expect(getNavPropertyDescription(navProp)).toBe(
      'One-to-many navigation property to the {@link OtherEntity} entity.'
    );
  });

  it('write function JSDoc description', () => {
    const functionDescription = 'function description';
    const paramName = 'aParameter';
    const paramDescription = 'parameter description';
    const returnDescription = 'return description';
    const actual = getFunctionDoc(functionDescription, {
      params: [
        { type: 'string', name: paramName, description: paramDescription }
      ],
      returns: { type: 'string', description: returnDescription }
    });
    const expected = `function description${unixEOL}@param ${paramName} ${paramDescription}${unixEOL}@returns ${returnDescription}`;
    expect(actual).toBe(expected);
  });

  it('add nullable constraint', () => {
    const property: VdmProperty = {
      description: 'Property Description',
      originalName: 'OnePropertyName',
      jsType: 'string',
      edmType: 'string',
      nullable: true,
      fieldType: 'string',
      instancePropertyName: 'onePropertyName',
      staticPropertyName: 'ONE_PROPERTY_NAME',
      propertyNameAsParam: 'onePropertyName',
      isCollection: false
    };
    expect(getPropertyDescription(property, { nullable: true })).toBe(
      `Property Description${unixEOL}@nullable`
    );
  });
});
