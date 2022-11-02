import { resolve } from 'path';
import { oDataServiceSpecs } from '../../../../test-resources/odata-service-specs';
import { readEdmxFile } from './edmx-file-reader';
import {
  parseEntitySetsV4,
  parseEntityType,
  parseEnumTypes,
  parseOperationImports,
  parseOperations
} from './v4';
import { parseComplexTypesBase } from './common';

describe('edmx-file-reader', () => {
  it('does not fail for multiple schema entries in the EDMX file', () => {
    expect(() =>
      readEdmxFile(
        resolve(
          oDataServiceSpecs,
          'v2',
          'API_MULTIPLE_SCHEMAS_SRV',
          'API_MULTIPLE_SCHEMAS_SRV.edmx'
        )
      )
    ).not.toThrow();
  });

  it('v4: parses edmx file that contains multiple schemas to JSON and coerces properties to arrays', () => {
    const metadataEdmx = readEdmxFile(
      resolve(
        oDataServiceSpecs,
        'v4',
        'API_MULTIPLE_SCHEMAS_SRV',
        'API_MULTIPLE_SCHEMAS_SRV.edmx'
      )
    );

    expect(parseEntitySetsV4(metadataEdmx.root).length).toBe(4);
    expect(parseEntityType(metadataEdmx.root).length).toBe(4);
    expect(parseOperationImports(metadataEdmx.root, 'function').length).toBe(2);
    expect(parseOperations(metadataEdmx.root, 'function').length).toBe(2);
    expect(parseOperationImports(metadataEdmx.root, 'action').length).toBe(2);
    expect(parseOperations(metadataEdmx.root, 'action').length).toBe(2);
    expect(parseComplexTypesBase(metadataEdmx.root).length).toBe(2);
    expect(parseEnumTypes(metadataEdmx.root).length).toBe(2);
  });
});
