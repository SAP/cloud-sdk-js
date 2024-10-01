import { resolve } from 'path';
import { readEdmxFile } from '../edmx-file-reader';
import { parseComplexTypesBase } from '../common';
import { oDataServiceSpecs } from '../../../../../test-resources/odata-service-specs';
import {
  parseAssociation,
  parseAssociationSets,
  parseEntitySetsV2,
  parseEntityTypes,
  parseFunctionImportsV2
} from './edmx-parser';

describe('edmx-edmx-parser', () => {
  it('v2: parses EDMX file to JSON and coerces properties to arrays', () => {
    const metadataEdmx = readEdmxFile(
      resolve(oDataServiceSpecs, 'v2', 'API_TEST_SRV', 'API_TEST_SRV.edmx')
    );

    expect(parseEntitySetsV2(metadataEdmx.root).length).toBe(14);
    expect(parseEntityTypes(metadataEdmx.root).length).toBe(12);
    expect(parseFunctionImportsV2(metadataEdmx.root).length).toBe(15);
    expect(parseComplexTypesBase(metadataEdmx.root).length).toBe(3);
    expect(parseAssociationSets(metadataEdmx.root).length).toBe(8);
    expect(parseAssociation(metadataEdmx.root).length).toBe(8);

    parseEntityTypes(metadataEdmx.root).forEach(e => {
      expect(e.Key.PropertyRef).toBeInstanceOf(Array);
      expect(e.NavigationProperty).toBeInstanceOf(Array);
      expect(e.Property).toBeInstanceOf(Array);
    });

    parseAssociationSets(metadataEdmx.root).forEach(a => {
      expect(a.End.length).toBe(2);
    });

    parseAssociation(metadataEdmx.root).forEach(a => {
      expect(a.End.length).toBe(2);
    });

    parseFunctionImportsV2(metadataEdmx.root).forEach(f => {
      expect(f.Parameter).toBeInstanceOf(Array);
    });

    parseComplexTypesBase(metadataEdmx.root).forEach(c => {
      expect(c.Property).toBeInstanceOf(Array);
    });
  });
});
