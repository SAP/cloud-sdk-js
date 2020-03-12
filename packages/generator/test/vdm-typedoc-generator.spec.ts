/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { getFunctionDoc, getNavPropertyDescription, getPropertyDescription } from '../src/typedoc';
import { VdmNavigationProperty, VdmProperty } from '../src/vdm-types';

describe('typedoc', () => {
  it('get normal property description', () => {
    const property: VdmProperty = {
      originalName: 'OnePropertyName',
      description: 'entity info',
      jsType: 'string',
      edmType: 'Edm:String',
      nullable: true,
      fieldType: 'string',
      instancePropertyName: 'onePropertyName',
      staticPropertyName: 'ONE_PROPERTY_NAME',
      propertyNameAsParam: 'onePropertyName'
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
      propertyNameAsParam: 'onePropertyName'
    };
    expect(getPropertyDescription(property)).toBe('One Property Name.');
  });

  it('get navigation property description', () => {
    const navProp: VdmNavigationProperty = {
      from: 'A_OneEntity',
      originalName: 'toOtherEntity',
      to: 'A_OtherEntity',
      multiplicity: '1-*',
      isMultiLink: true,
      instancePropertyName: 'toOtherEntity',
      staticPropertyName: 'TO_OTHER_ENTITY',
      toEntityClassName: 'OtherEntity',
      propertyNameAsParam: 'toOtherEntity'
    };

    expect(getNavPropertyDescription(navProp)).toBe('One-to-many navigation property to the [[OtherEntity]] entity.');
  });

  it('write function JSDoc description', () => {
    const functionDescription = 'function description';
    const paramName = 'aParameter';
    const paramDescription = 'parameter description';
    const returnDescription = 'return description';
    const actual = getFunctionDoc(functionDescription, {
      params: [{ type: 'string', name: paramName, description: paramDescription }],
      returns: { type: 'string', description: returnDescription }
    });
    const expected = `function description\n@param ${paramName} ${paramDescription}\n@returns ${returnDescription}`;
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
      propertyNameAsParam: 'onePropertyName'
    };
    expect(getPropertyDescription(property, { nullable: true })).toBe('Property Description\n@nullable');
  });
});
