import { readEdmxFile } from './edmx-file-reader';
import {
  parseActionImport,
  parseActions,
  parseEntitySets,
  parseEntityType,
  parseEnumTypes,
  parseFunctionImports,
  parseFunctions
} from './v4';
import { parseComplexTypesBase } from './common';

describe('edmx-file-reader', () => {
  it('does not fail for multiple schema entries in the edmx file', () => {
    expect(() =>
      readEdmxFile(
        '../../test-resources/odata-service-specs/v2/API_MULTIPLE_SCHEMAS_SRV/API_MULTIPLE_SCHEMAS_SRV.edmx'
      )
    ).not.toThrow();
  });

  it('v4: parses edmx file that contains multiple schemas to JSON and coerces properties to arrays', () => {
    const metadataEdmx = readEdmxFile(
      '../../test-resources/odata-service-specs/v4/API_MULTIPLE_SCHEMAS_SRV/API_MULTIPLE_SCHEMAS_SRV.edmx'
    );

    expect(parseEntitySets(metadataEdmx.root).length).toBe(4);
    expect(parseEntityType(metadataEdmx.root).length).toBe(4);
    expect(parseFunctionImports(metadataEdmx.root).length).toBe(2);
    expect(parseFunctions(metadataEdmx.root).length).toBe(2);
    expect(parseActionImport(metadataEdmx.root).length).toBe(2);
    expect(parseActions(metadataEdmx.root).length).toBe(2);
    expect(parseComplexTypesBase(metadataEdmx.root).length).toBe(2);
    expect(parseEnumTypes(metadataEdmx.root).length).toBe(2);
  });
});
