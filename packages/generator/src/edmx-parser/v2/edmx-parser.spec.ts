import { resolve } from 'path';
import { readEdmxFile } from '../../../src/edmx-parser/edmx-file-reader';
import { parseComplexTypesBase } from '../../../src/edmx-parser/common/edmx-parser';
import {
  parseAssociation,
  parseAssociationSets,
  parseEntitySets as parseEntitySetsV2,
  parseEntityTypes as parseEntityTypesV2,
  parseFunctionImports as parseFunctionImportsV2
} from '../../../src/edmx-parser/v2';
import { oDataServiceSpecs } from '../../../../../test-resources/odata-service-specs';

describe('edmx-edmx-parser', () => {
  it('v2: parses edmx file to JSON and coerces properties to arrays', () => {
    const metadataEdmx = readEdmxFile(
      resolve(oDataServiceSpecs,'v2','API_TEST_SRV','API_TEST_SRV.edmx')
    );

    expect(parseEntitySetsV2(metadataEdmx.root).length).toBe(11);
    expect(parseEntityTypesV2(metadataEdmx.root).length).toBe(10);
    expect(parseFunctionImportsV2(metadataEdmx.root).length).toBe(13);
    expect(parseComplexTypesBase(metadataEdmx.root).length).toBe(3);
    expect(parseAssociationSets(metadataEdmx.root).length).toBe(8);
    expect(parseAssociation(metadataEdmx.root).length).toBe(8);

    parseEntityTypesV2(metadataEdmx.root).forEach(e => {
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
