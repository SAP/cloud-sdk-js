/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { parseEdmxFromPath } from '../../src/parser';

describe('edmx-parser', () => {
  it('takes an edmx/XML file, parses it to JSON and coerces properties with possibly many values to arrays', () => {
    const metadataEdmx = parseEdmxFromPath(
      '../../test-resources/service-specs/API_TEST_SRV/API_TEST_SRV.edmx'
    );

    expect(metadataEdmx.entitySets.length).toBe(10);
    expect(metadataEdmx.entityTypes.length).toBe(10);
    expect(metadataEdmx.functionImports.length).toBe(12);
    expect(metadataEdmx.complexTypes.length).toBe(2);
    expect(metadataEdmx.associationSets.length).toBe(8);
    expect(metadataEdmx.associations.length).toBe(8);

    metadataEdmx.entityTypes.forEach(e => {
      expect(e.Key.PropertyRef).toBeInstanceOf(Array);
      expect(e.NavigationProperty).toBeInstanceOf(Array);
      expect(e.Property).toBeInstanceOf(Array);
    });

    metadataEdmx.associationSets.forEach(a => {
      expect(a.End.length).toBe(2);
    });

    metadataEdmx.associations.forEach(a => {
      expect(a.End.length).toBe(2);
    });

    metadataEdmx.functionImports.forEach(f => {
      expect(f.Parameter).toBeInstanceOf(Array);
    });

    metadataEdmx.complexTypes.forEach(c => {
      expect(c.Property).toBeInstanceOf(Array);
    });
  });

  it('does not fail for multiple schema entries in the edmx file', () => {
    expect(() =>
      parseEdmxFromPath(
        '../../test-resources/service-specs/API_MULTIPLE_SCHEMAS_SRV/API_MULTIPLE_SCHEMAS_SRV.edmx'
      )
    ).not.toThrow();
  });
});
