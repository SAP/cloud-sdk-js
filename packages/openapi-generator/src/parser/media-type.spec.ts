import { createTestRefs, emptyObjectSchema } from '../../test/test-util';
import { parseTopLevelMediaType, parseMediaType } from './media-type';

const defaultOptions = {
  strictNaming: true,
  schemaPrefix: '',
  resolveExternal: true
};

function createMultipartContent(schema: any, encoding?: any) {
  return {
    content: {
      'multipart/form-data': {
        schema,
        ...(encoding && { encoding })
      }
    }
  };
}

function createImplicitEncoding(contentType: string): {
  contentType: string;
  isImplicit: true;
  parsedContentTypes: any[];
} {
  return {
    contentType,
    isImplicit: true,
    parsedContentTypes: [{ type: contentType, parameters: {} }]
  };
}

function createExplicitEncoding(
  contentType: string,
  parameters: Record<string, string> = {}
): {
  contentType: string;
  isImplicit: false;
  parsedContentTypes: any[];
} {
  return {
    contentType,
    isImplicit: false,
    parsedContentTypes: [{ type: contentType.split(';')[0].trim(), parameters }]
  };
}
describe('parseTopLevelMediaType', () => {
  it('returns undefined if the media type is not supported', async () => {
    expect(
      parseTopLevelMediaType(
        {
          content: { 'application/xml': { schema: { type: 'string' } } }
        },
        await createTestRefs(),
        defaultOptions
      )
    ).toBeUndefined();
  });

  it('returns parsed schema for supported media type application/json', async () => {
    expect(
      parseTopLevelMediaType(
        {
          content: {
            'application/json;charset=utf-8': { schema: { type: 'object' } }
          }
        },
        await createTestRefs(),
        defaultOptions
      )
    ).toEqual({
      schema: emptyObjectSchema,
      mediaType: 'application/json',
      encoding: undefined
    });
  });

  it('returns parsed schema for supported media type application/merge-patch+json', async () => {
    expect(
      parseTopLevelMediaType(
        {
          content: {
            'application/merge-patch+json': { schema: { type: 'object' } }
          }
        },
        await createTestRefs(),
        defaultOptions
      )
    ).toEqual({
      schema: emptyObjectSchema,
      mediaType: 'application/merge-patch+json',
      encoding: undefined
    });
  });

  it('returns parsed schema for supported media type text/plain', async () => {
    expect(
      parseTopLevelMediaType(
        {
          content: {
            'text/plain': { schema: { type: 'integer' } }
          }
        },
        await createTestRefs(),
        defaultOptions
      )
    ).toEqual({
      schema: { type: 'number' },
      mediaType: 'text/plain',
      encoding: undefined
    });
  });

  it('returns parsed schema for supported media type application/octet-stream', async () => {
    expect(
      parseTopLevelMediaType(
        {
          content: {
            'application/octet-stream': {
              schema: { type: 'string', format: 'binary' }
            }
          }
        },
        await createTestRefs(),
        defaultOptions
      )
    ).toEqual({
      schema: { type: 'Blob' },
      mediaType: 'application/octet-stream',
      encoding: undefined
    });
  });

  it('returns undefined encoding for non-multipart media types', async () => {
    const result = parseTopLevelMediaType(
      { content: { 'application/json': { schema: { type: 'object' } } } },
      await createTestRefs(),
      defaultOptions
    );
    expect(result?.encoding).toBeUndefined();
  });

  it('parses encoding with contentType for multipart/form-data', async () => {
    const schema = {
      type: 'object',
      properties: { profileImage: { type: 'string', format: 'binary' } }
    };
    const encoding = { profileImage: { contentType: 'image/png, image/jpeg' } };
    const result = parseTopLevelMediaType(
      createMultipartContent(schema, encoding),
      await createTestRefs(),
      defaultOptions
    );

    expect(result?.encoding).toEqual({
      profileImage: {
        contentType: 'image/png, image/jpeg',
        isImplicit: false,
        parsedContentTypes: [
          { type: 'image/png', parameters: {} },
          { type: 'image/jpeg', parameters: {} }
        ]
      }
    });
  });

  it('returns undefined encoding when encoding object is empty', async () => {
    const result = parseTopLevelMediaType(
      createMultipartContent({ type: 'object' }),
      await createTestRefs(),
      defaultOptions
    );
    expect(result?.encoding).toBeUndefined();
  });

  it('maps string with format binary to Blob type for multipart/form-data', async () => {
    const schema = {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        metadata: { type: 'string' }
      }
    };
    const result = parseTopLevelMediaType(
      createMultipartContent(schema),
      await createTestRefs(),
      defaultOptions
    );

    expect(result?.schema).toEqual({
      properties: [
        {
          schema: { type: 'Blob' },
          description: undefined,
          nullable: false,
          name: 'file',
          required: false,
          schemaProperties: { format: 'binary' }
        },
        {
          schema: { type: 'string' },
          description: undefined,
          nullable: false,
          name: 'metadata',
          required: false,
          schemaProperties: {}
        }
      ],
      additionalProperties: { type: 'any' }
    });
    expect(result?.mediaType).toBe('multipart/form-data');
    expect(result?.encoding).toEqual({
      file: createImplicitEncoding('application/octet-stream'),
      metadata: createImplicitEncoding('text/plain')
    });
  });

  it('respects explicit encoding over auto-inferred encoding for binary properties', async () => {
    const schema = {
      type: 'object',
      properties: { image: { type: 'string', format: 'binary' } }
    };
    const encoding = { image: { contentType: 'image/png' } };
    const result = parseTopLevelMediaType(
      createMultipartContent(schema, encoding),
      await createTestRefs(),
      defaultOptions
    );

    expect(result?.encoding).toEqual({
      image: createExplicitEncoding('image/png')
    });
  });

  it('auto-infers text/plain for primitive types in multipart/form-data', async () => {
    const schema = {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'integer' },
        score: { type: 'number' },
        active: { type: 'boolean' }
      }
    };
    const result = parseTopLevelMediaType(
      createMultipartContent(schema),
      await createTestRefs(),
      defaultOptions
    );

    const textPlainEncoding = createImplicitEncoding('text/plain');
    expect(result?.encoding).toEqual({
      name: textPlainEncoding,
      age: textPlainEncoding,
      score: textPlainEncoding,
      active: textPlainEncoding
    });
  });

  it('auto-infers content type for arrays based on item type in multipart/form-data', async () => {
    const schema = {
      type: 'object',
      properties: {
        tags: { type: 'array', items: { type: 'string' } },
        files: { type: 'array', items: { type: 'string', format: 'binary' } }
      }
    };
    const result = parseTopLevelMediaType(
      createMultipartContent(schema),
      await createTestRefs(),
      defaultOptions
    );

    expect(result?.encoding).toEqual({
      tags: createImplicitEncoding('text/plain'),
      files: createImplicitEncoding('application/octet-stream')
    });
  });

  it('auto-infers application/json for object types in multipart/form-data', async () => {
    const schema = {
      type: 'object',
      properties: {
        metadata: { type: 'object', properties: { key: { type: 'string' } } }
      }
    };
    const result = parseTopLevelMediaType(
      createMultipartContent(schema),
      await createTestRefs(),
      defaultOptions
    );

    expect(result?.encoding).toEqual({
      metadata: createImplicitEncoding('application/json')
    });
  });

  it('handles multipart/form-data with $ref schema', async () => {
    const schema = { $ref: '#/components/schemas/Body_predict_parquet' };
    const refs = await createTestRefs({
      schemas: {
        Body_predict_parquet: {
          type: 'object',
          properties: {
            file: { type: 'string', format: 'binary' },
            target_columns: { type: 'string' },
            metadata: {
              type: 'object',
              properties: { key: { type: 'string' } }
            }
          }
        }
      }
    });
    const result = parseTopLevelMediaType(
      createMultipartContent(schema),
      refs,
      defaultOptions
    );

    expect(result?.schema).toEqual({
      $ref: '#/components/schemas/Body_predict_parquet',
      schemaName: 'BodyPredictParquet',
      fileName: 'body-predict-parquet'
    });
    expect(result?.mediaType).toBe('multipart/form-data');
    expect(result?.encoding).toEqual({
      file: createImplicitEncoding('application/octet-stream'),
      target_columns: createImplicitEncoding('text/plain'),
      metadata: createImplicitEncoding('application/json')
    });
  });

  it('handles multipart/form-data with $ref schema containing nested $refs', async () => {
    const schema = { $ref: '#/components/schemas/FormData' };
    const refs = await createTestRefs({
      schemas: {
        FormData: {
          type: 'object',
          properties: {
            image: { $ref: '#/components/schemas/ImageFile' },
            description: { type: 'string' }
          }
        },
        ImageFile: { type: 'string', format: 'binary' }
      }
    });
    const result = parseTopLevelMediaType(
      createMultipartContent(schema),
      refs,
      defaultOptions
    );

    expect(result?.encoding).toEqual({
      image: createImplicitEncoding('application/octet-stream'),
      description: createImplicitEncoding('text/plain')
    });
  });

  it('parses content type with charset parameter', async () => {
    const schema = {
      type: 'object',
      properties: { textData: { type: 'string' } }
    };
    const encoding = { textData: { contentType: 'text/plain; charset=utf-8' } };
    const result = parseTopLevelMediaType(
      createMultipartContent(schema, encoding),
      await createTestRefs(),
      defaultOptions
    );

    expect(result?.encoding).toEqual({
      textData: {
        contentType: 'text/plain; charset=utf-8',
        isImplicit: false,
        parsedContentTypes: [
          { type: 'text/plain', parameters: { charset: 'utf-8' } }
        ]
      }
    });
  });

  it('parses multiple comma-separated content types', async () => {
    const result = parseTopLevelMediaType(
      {
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                document: { type: 'string', format: 'binary' }
              }
            },
            encoding: {
              document: {
                contentType: 'application/pdf, application/msword, text/plain'
              }
            }
          }
        }
      },
      await createTestRefs(),
      defaultOptions
    );

    expect(result?.encoding).toEqual({
      document: {
        contentType: 'application/pdf, application/msword, text/plain',
        isImplicit: false,
        parsedContentTypes: [
          { type: 'application/pdf', parameters: {} },
          { type: 'application/msword', parameters: {} },
          { type: 'text/plain', parameters: {} }
        ]
      }
    });
  });

  it('handles content type with multiple parameters', async () => {
    const schema = {
      type: 'object',
      properties: { xmlData: { type: 'string' } }
    };
    const encoding = {
      xmlData: {
        contentType: 'application/xml; charset=iso-8859-1; boundary=something'
      }
    };
    const result = parseTopLevelMediaType(
      createMultipartContent(schema, encoding),
      await createTestRefs(),
      defaultOptions
    );

    expect(result?.encoding).toEqual({
      xmlData: {
        contentType: 'application/xml; charset=iso-8859-1; boundary=something',
        isImplicit: false,
        parsedContentTypes: [
          {
            type: 'application/xml',
            parameters: { charset: 'iso-8859-1', boundary: 'something' }
          }
        ]
      }
    });
  });

  it('combines explicit encoding with charset and auto-inferred encoding', async () => {
    const schema = {
      type: 'object',
      properties: {
        customText: { type: 'string' },
        normalField: { type: 'string' }
      }
    };
    const encoding = {
      customText: { contentType: 'text/plain; charset=utf-16' }
    };
    const result = parseTopLevelMediaType(
      createMultipartContent(schema, encoding),
      await createTestRefs(),
      defaultOptions
    );

    expect(result?.encoding).toEqual({
      customText: {
        contentType: 'text/plain; charset=utf-16',
        isImplicit: false,
        parsedContentTypes: [
          { type: 'text/plain', parameters: { charset: 'utf-16' } }
        ]
      },
      normalField: createImplicitEncoding('text/plain')
    });
  });

  it('throws error with malformed content type', async () => {
    const schema = {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } }
    };
    const encoding = { file: { contentType: 'image/png;;invalid' } };
    const refs = await createTestRefs();

    expect(() =>
      parseTopLevelMediaType(
        createMultipartContent(schema, encoding),
        refs,
        defaultOptions
      )
    ).toThrow(/invalid content type.*image\/png;;invalid.*file/i);
  });

  it('handles wildcard content types correctly', async () => {
    const schema = {
      type: 'object',
      properties: { data: { type: 'string', format: 'binary' } }
    };
    const encoding = { data: { contentType: 'image/*' } };
    const result = parseTopLevelMediaType(
      createMultipartContent(schema, encoding),
      await createTestRefs(),
      defaultOptions
    );

    expect(result?.encoding).toEqual({
      data: createExplicitEncoding('image/*')
    });
  });

  it('throws error with completely invalid content type format', async () => {
    const schema = {
      type: 'object',
      properties: { attachment: { type: 'string', format: 'binary' } }
    };
    const encoding = {
      attachment: { contentType: 'not-a-valid-content-type-at-all' }
    };
    const refs = await createTestRefs();

    expect(() =>
      parseTopLevelMediaType(
        createMultipartContent(schema, encoding),
        refs,
        defaultOptions
      )
    ).toThrow(
      /invalid content type.*not-a-valid-content-type-at-all.*attachment/i
    );
  });
});

describe('parseMediaType', () => {
  it('returns undefined if there is no media type at all', async () => {
    expect(
      parseMediaType(undefined, await createTestRefs(), defaultOptions)
    ).toBeUndefined();
  });

  it('returns type `any` if there is an unsupported media type', async () => {
    expect(
      parseMediaType(
        {
          content: { 'application/xml': { schema: { type: 'string' } } }
        },
        await createTestRefs(),
        defaultOptions
      )
    ).toEqual({
      schema: { type: 'any' },
      mediaType: 'application/json'
    });
  });

  it('returns parsed schema if there is only application/json', async () => {
    expect(
      parseMediaType(
        {
          content: { 'application/json': { schema: { type: 'object' } } }
        },
        await createTestRefs(),
        defaultOptions
      )
    ).toEqual({
      schema: emptyObjectSchema,
      mediaType: 'application/json',
      encoding: undefined
    });
  });

  it('returns parsed schema if there is only application/merge-patch+json', async () => {
    expect(
      parseMediaType(
        {
          content: {
            'application/merge-patch+json': { schema: { type: 'object' } }
          }
        },
        await createTestRefs(),
        defaultOptions
      )
    ).toEqual({
      schema: emptyObjectSchema,
      mediaType: 'application/merge-patch+json',
      encoding: undefined
    });
  });

  it('returns parsed schema if there is only wildcard media type */*', async () => {
    expect(
      parseMediaType(
        {
          content: {
            '*/*': { schema: { type: 'string' } }
          }
        },
        await createTestRefs(),
        defaultOptions
      )
    ).toEqual({
      schema: { type: 'string' },
      mediaType: '*/*',
      encoding: undefined
    });
  });

  it('returns parsed schema if there is both application/json and application/merge-patch+json', async () => {
    expect(
      parseMediaType(
        {
          content: {
            'application/json': { schema: { type: 'object' } },
            'application/merge-patch+json': { schema: { type: 'object' } }
          }
        },
        await createTestRefs(),
        defaultOptions
      )
    ).toEqual({
      schema: emptyObjectSchema,
      mediaType: 'application/json',
      encoding: undefined
    });
  });

  it('returns anyOf schema if there are unsupported media type and supported media type', async () => {
    expect(
      parseMediaType(
        {
          content: {
            'application/json': { schema: { type: 'object' } },
            'application/xml': { schema: { type: 'string' } }
          }
        },
        await createTestRefs(),
        defaultOptions
      )
    ).toEqual({
      schema: { anyOf: [emptyObjectSchema, { type: 'any' }] },
      mediaType: 'application/json'
    });
  });
});
