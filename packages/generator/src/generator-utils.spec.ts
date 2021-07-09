import {
  cloudSdkVdmHack,
  edmToTsType,
  ensureString,
  forceArray,
  getFallbackEdmTypeIfNeeded,
  isCreatable,
  isDeletable,
  isFilterable,
  isNullableParameter,
  isNullableProperty,
  isSortable,
  isUpdatable,
  npmCompliantName,
  prefixString
} from './generator-utils';

describe('isNullableProperty', () => {
  it('return true iff "Nullable" is a key of the input object', () => {
    expect(isNullableProperty({ Nullable: 'whatever' })).toBe(false);
    expect(isNullableProperty({})).toBe(true);
  });
});

describe('isNullableParameter', () => {
  it('return false if "Nullable" is not a key of the input object or false', () => {
    expect(isNullableParameter({ Nullable: 'true' })).toBe(true);
    expect(isNullableParameter({ Nullable: 'false' })).toBe(false);
    expect(isNullableParameter({ Nullable: 'whatever' })).toBe(true);
    expect(isNullableParameter({})).toBe(false);
  });
});

describe('isFilterable', () => {
  it('return true iff "sap:filterable" is a key of the input object', () => {
    expect(isFilterable({ 'sap:filterable': 5 })).toBe(false);
    expect(isFilterable({})).toBe(true);
  });
});

describe('isSortable', () => {
  it('return true iff "sap:sortable" is a key of the input object', () => {
    expect(isSortable({ 'sap:sortable': 5 })).toBe(false);
    expect(isSortable({})).toBe(true);
  });
});

describe('isUpdatable', () => {
  it('return true iff "sap:updatable" is a key of the input object', () => {
    expect(isUpdatable({ 'sap:updatable': 5 })).toBe(false);
    expect(isUpdatable({})).toBe(true);
  });
});

describe('isDeletable', () => {
  it('return true iff "sap:deletable" is a key of the input object', () => {
    expect(isDeletable({ 'sap:deletable': 5 })).toBe(false);
    expect(isDeletable({})).toBe(true);
  });
});

describe('isCreatable', () => {
  it('return true iff "sap:creatable" is a key of the input object', () => {
    expect(isCreatable({ 'sap:creatable': 5 })).toBe(false);
    expect(isCreatable({})).toBe(true);
  });
});

describe('forceArray', () => {
  const testObj = { test: 'test' };

  it('returns a single object as array of length 1', () => {
    expect(forceArray(testObj)).toEqual([testObj]);
  });

  it('returns an empty array on null', () => {
    expect(forceArray(null)).toEqual([]);
  });

  it('returns an empty array on undefined', () => {
    expect(forceArray(undefined)).toEqual([]);
  });

  it('returns the input array for arrays of size one and above', () => {
    expect(forceArray([testObj])).toContain(testObj);
  });
});

describe('npmCompliantName', () => {
  it('returns a name that is guaranteed to be compliant with npm package naming rules', () => {
    expect(npmCompliantName('')).toBe('');
    expect(npmCompliantName('bla-bla-bla')).toBe('bla-bla-bla');
    expect(npmCompliantName('AbC')).toBe('abc');
    expect(npmCompliantName('._abc')).toBe('abc');
    expect(npmCompliantName('@sap/cloud-sdk-vdm')).toBe('@sap/cloud-sdk-vdm');
    expect(npmCompliantName('@sap/cloud-SDK-vdm')).toBe('@sap/cloud-sdk-vdm');
    expect(npmCompliantName('@sap/._cloud-SDK-vdm')).toBe('@sap/cloud-sdk-vdm');
    expect(npmCompliantName('_-.abc')).toBe('-.abc');
    expect(npmCompliantName('a'.repeat(250))).toBe('a'.repeat(214));
  });
});

describe('edmToTsType', () => {
  it('maps EdmTypes if included in map, return any if not included', () => {
    expect(edmToTsType('Edm.String')).toBe('string');
    expect(edmToTsType('Edm.Decimal')).toBe('BigNumber');
    expect(edmToTsType('Edm.Single')).toBe('number');
    expect(edmToTsType('Edm.DateTime')).toBe('Moment');
    expect(edmToTsType('Edm.Time')).toBe('Time');
    expect(() =>
      edmToTsType('Edm.GeographyPoint')
    ).toThrowErrorMatchingInlineSnapshot(
      '"Could not determine TypeScript type for EDM type: \'Edm.GeographyPoint\'."'
    );
    expect(edmToTsType(getFallbackEdmTypeIfNeeded('Edm.GeographyPoint'))).toBe(
      'any'
    );
    expect(() =>
      edmToTsType('Edm.Undefined')
    ).toThrowErrorMatchingInlineSnapshot(
      '"Could not determine TypeScript type for EDM type: \'Edm.Undefined\'."'
    );
    expect(edmToTsType(getFallbackEdmTypeIfNeeded('Edm.Undefined'))).toBe(
      'any'
    );
  });
});

describe('getFallbackEdmTypeIfNeeded', () => {
  it('return Edm.Any for unknown/unsupported edm types', () => {
    expect(getFallbackEdmTypeIfNeeded('Edm.String')).toBe('Edm.String');
    expect(getFallbackEdmTypeIfNeeded('Edm.Unsuported')).toBe('Edm.Any');
  });
});

describe('ensureString', () => {
  it('returns string for whatever passed type', () => {
    expect(typeof ensureString('test')).toBe('string');
    expect(
      typeof ensureString({ anyNumber: 1234, anyObject: {}, anyString: 'abcd' })
    ).toBe('string'); // This returns [object Object]
    expect(typeof ensureString(1234)).toBe('string');
    expect(typeof ensureString(undefined)).toBe('string');
    expect(typeof ensureString(null)).toBe('string');
    expect(typeof ensureString(true)).toBe('string');
    expect(typeof ensureString([])).toBe('string');
  });
});

describe('prefixString', () => {
  it('prepends prefix', () => {
    expect(prefixString('AString')).toBe('AString');
    expect(prefixString('AString', 'Prefix')).toBe('PrefixAString');
  });
});

describe('cloudSdkVdmHack', () => {
  it('should pop the string tail if @sap/cloud-sdk-vdm- is passed', () => {
    expect(cloudSdkVdmHack('@sap/cloud-sdk-vdm-')).toBe('@sap/cloud-sdk-vdm');
    expect(cloudSdkVdmHack('@sap/cloud-sdk-vdm-testing-service')).toBe(
      '@sap/cloud-sdk-vdm-testing-service'
    );
  });
});
