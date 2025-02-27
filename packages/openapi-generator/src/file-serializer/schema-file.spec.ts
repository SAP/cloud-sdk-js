import { readPrettierConfig } from '@sap-cloud-sdk/generator-common/internal';
import { schemaDocumentation, schemaFile } from './schema-file';
import { schemaPropertyDocumentation } from './schema';
import type {
  OpenApiObjectSchemaProperty,
  OpenApiPersistedSchema
} from '../openapi-types';
import type { CreateFileOptions } from '@sap-cloud-sdk/generator-common/internal';

const schema = {
  schemaName: 'MySchema',
  fileName: 'my-schema',
  nullable: true,
  schema: {
    properties: [
      {
        name: 'string-property',
        required: true,
        nullable: false,
        schema: {
          type: 'string'
        },
        schemaProperties: {
          maxLength: 10
        }
      }
    ]
  },
  schemaProperties: {
    deprecated: true
  }
};

const schemaWithReferences = {
  schemaName: 'MySchema',
  fileName: 'my-schema',
  schemaProperties: {},
  nullable: false,
  schema: {
    properties: [
      {
        name: 'otherSchema1',
        required: true,
        nullable: false,
        schema: {
          $ref: '#/components/schema/OtherSchema1',
          schemaName: 'OtherSchema1',
          fileName: 'other-schema-1'
        },
        schemaProperties: {}
      },
      {
        name: 'otherSchema2',
        description: 'Description other Schema 2',
        required: true,
        nullable: false,
        schema: {
          $ref: '#/components/schema/OtherSchema2',
          schemaName: 'OtherSchema2',
          fileName: 'other-schema-2'
        },
        schemaProperties: {}
      }
    ]
  }
};

const schemaWithNotSchema = {
  schemaName: 'MySchema',
  fileName: 'my-schema',
  nullable: false,
  schema: {
    items: { not: { type: 'integer' } }
  },
  schemaProperties: {}
};

const schemaWithoutImportsIncludingOnlySelfReference = {
  schemaName: 'MySchema',
  fileName: 'my-schema',
  nullable: false,
  schema: {
    properties: [
      {
        name: 'property',
        required: false,
        nullable: false,
        schema: {
          $ref: '#/components/schema/MySchema',
          schemaName: 'MySchema',
          fileName: 'my-schema'
        },
        schemaProperties: {}
      }
    ]
  },
  schemaProperties: {}
};

const schemaWithDescription = {
  schemaName: 'MySchema',
  fileName: 'my-schema',
  nullable: false,
  schema: {
    properties: [
      {
        name: 'string-property',
        description: 'My description',
        required: true,
        nullable: false,
        schema: {
          type: 'string'
        },
        schemaProperties: {
          minLength: 2
        }
      },
      {
        name: 'string-property-no-description',
        required: true,
        nullable: false,
        schema: {
          type: 'string'
        },
        schemaProperties: {}
      }
    ]
  },
  schemaProperties: {}
};

describe('schemaFile', () => {
  it('serializes schema file for schema', () => {
    expect(schemaFile(schema)).toMatchSnapshot();
  });

  it('serializes schema file for schema including references', () => {
    expect(schemaFile(schemaWithReferences)).toMatchSnapshot();
  });

  it('serializes schema file for schema including ESM references', async () => {
    const createFileOptions: CreateFileOptions = {
      generateESM: true,
      overwrite: false,
      prettierOptions: await readPrettierConfig(undefined)
    };
    expect(
      schemaFile(schemaWithReferences, createFileOptions)
    ).toMatchSnapshot();
  });

  it('serializes schema file for schema including not schema', () => {
    expect(schemaFile(schemaWithNotSchema)).toMatchSnapshot();
  });

  it('serializes schema file without imports for schema including only self reference', () => {
    expect(
      schemaFile(schemaWithoutImportsIncludingOnlySelfReference)
    ).toMatchSnapshot();
  });

  it('serializes simple schema file for schema with description', () => {
    expect(schemaFile(schemaWithDescription)).toMatchSnapshot();
  });

  it('creates schema documentation', () => {
    expect(
      schemaDocumentation({ schemaName: 'mySchema' } as OpenApiPersistedSchema)
    ).toMatchSnapshot();
  });

  it('uses the schema description documentation if present', () => {
    expect(
      schemaDocumentation({
        schemaName: 'mySchema',
        description: 'My schema description.'
      } as OpenApiPersistedSchema)
    ).toMatch(/My schema description/);
  });

  it('creates a schema property documentation', () => {
    expect(
      schemaPropertyDocumentation({
        description: 'My property Description.'
      } as OpenApiObjectSchemaProperty)
    ).toMatchSnapshot();
  });
});
