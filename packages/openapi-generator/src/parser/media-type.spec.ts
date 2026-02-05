import { createTestRefs, emptyObjectSchema } from '../../test/test-util';
import { parseTopLevelMediaType, parseMediaType } from './media-type';

const defaultOptions = {
  strictNaming: true,
  schemaPrefix: '',
  resolveExternal: true
};
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
      schema: { type: 'string' },
      mediaType: 'application/octet-stream',
      encoding: undefined
    });
  });

  it('returns undefined encoding for non-multipart media types', async () => {
    const result = parseTopLevelMediaType(
      {
        content: {
          'application/json': {
            schema: { type: 'object' }
          }
        }
      },
      await createTestRefs(),
      defaultOptions
    );
    expect(result?.encoding).toBeUndefined();
  });

  it('parses encoding with contentType for multipart/form-data', async () => {
    const result = parseTopLevelMediaType(
      {
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                profileImage: { type: 'string', format: 'binary' }
              }
            },
            encoding: {
              profileImage: {
                contentType: 'image/png, image/jpeg'
              }
            }
          }
        }
      },
      await createTestRefs(),
      defaultOptions
    );

    expect(result?.encoding).toEqual({
      profileImage: {
        contentType: 'image/png, image/jpeg',
        isImplicit: false,
        contentTypeParsed: [
          { type: 'image/png', parameters: {} },
          { type: 'image/jpeg', parameters: {} }
        ]
      }
    });
  });

  it('returns undefined encoding when encoding object is empty', async () => {
    const result = parseTopLevelMediaType(
      {
        content: {
          'multipart/form-data': {
            schema: { type: 'object' }
          }
        }
      },
      await createTestRefs(),
      defaultOptions
    );
    expect(result?.encoding).toBeUndefined();
  });

  it('maps string with format binary to Blob type for multipart/form-data', async () => {
    const result = parseTopLevelMediaType(
      {
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                file: { type: 'string', format: 'binary' },
                metadata: { type: 'string' }
              }
            }
          }
        }
      },
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
      file: {
        contentType: 'application/octet-stream',
        isImplicit: true,
        contentTypeParsed: [{ type: 'application/octet-stream', parameters: {} }]
      },
      metadata: {
        contentType: 'text/plain',
        isImplicit: true,
        contentTypeParsed: [{ type: 'text/plain', parameters: {} }]
      }
    });
  });

  it('respects explicit encoding over auto-inferred encoding for binary properties', async () => {
    const result = parseTopLevelMediaType(
      {
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                image: { type: 'string', format: 'binary' }
              }
            },
            encoding: {
              image: {
                contentType: 'image/png'
              }
            }
          }
        }
      },
      await createTestRefs(),
      defaultOptions
    );

    expect(result?.encoding).toEqual({
      image: {
        contentType: 'image/png',
        isImplicit: false,
        contentTypeParsed: [{ type: 'image/png', parameters: {} }]
      }
    });
  });

  it('auto-infers text/plain for primitive types in multipart/form-data', async () => {
    const result = parseTopLevelMediaType(
      {
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                age: { type: 'integer' },
                score: { type: 'number' },
                active: { type: 'boolean' }
              }
            }
          }
        }
      },
      await createTestRefs(),
      defaultOptions
    );

    expect(result?.encoding).toEqual({
      name: {
        contentType: 'text/plain',
        isImplicit: true,
        contentTypeParsed: [{ type: 'text/plain', parameters: {} }]
      },
      age: {
        contentType: 'text/plain',
        isImplicit: true,
        contentTypeParsed: [{ type: 'text/plain', parameters: {} }]
      },
      score: {
        contentType: 'text/plain',
        isImplicit: true,
        contentTypeParsed: [{ type: 'text/plain', parameters: {} }]
      },
      active: {
        contentType: 'text/plain',
        isImplicit: true,
        contentTypeParsed: [{ type: 'text/plain', parameters: {} }]
      }
    });
  });

  it('auto-infers content type for arrays based on item type in multipart/form-data', async () => {
    const result = parseTopLevelMediaType(
      {
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                tags: { type: 'array', items: { type: 'string' } },
                files: {
                  type: 'array',
                  items: { type: 'string', format: 'binary' }
                }
              }
            }
          }
        }
      },
      await createTestRefs(),
      defaultOptions
    );

    expect(result?.encoding).toEqual({
      tags: {
        contentType: 'text/plain',
        isImplicit: true,
        contentTypeParsed: [{ type: 'text/plain', parameters: {} }]
      },
      files: {
        contentType: 'application/octet-stream',
        isImplicit: true,
        contentTypeParsed: [{ type: 'application/octet-stream', parameters: {} }]
      }
    });
  });

  it('auto-infers application/json for object types in multipart/form-data', async () => {
    const result = parseTopLevelMediaType(
      {
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                metadata: {
                  type: 'object',
                  properties: { key: { type: 'string' } }
                }
              }
            }
          }
        }
      },
      await createTestRefs(),
      defaultOptions
    );

    expect(result?.encoding).toEqual({
      metadata: {
        contentType: 'application/json',
        isImplicit: true,
        contentTypeParsed: [{ type: 'application/json', parameters: {} }]
      }
    });
  });

  it('handles multipart/form-data with $ref schema', async () => {
    const result = parseTopLevelMediaType(
      {
        content: {
          'multipart/form-data': {
            schema: {
              $ref: '#/components/schemas/Body_predict_parquet'
            }
          }
        }
      },
      await createTestRefs({
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
      }),
      defaultOptions
    );

    expect(result?.schema).toEqual({
      $ref: '#/components/schemas/Body_predict_parquet',
      schemaName: 'BodyPredictParquet',
      fileName: 'body-predict-parquet'
    });
    expect(result?.mediaType).toBe('multipart/form-data');
    expect(result?.encoding).toEqual({
      file: {
        contentType: 'application/octet-stream',
        isImplicit: true,
        contentTypeParsed: [{ type: 'application/octet-stream', parameters: {} }]
      },
      target_columns: {
        contentType: 'text/plain',
        isImplicit: true,
        contentTypeParsed: [{ type: 'text/plain', parameters: {} }]
      },
      metadata: {
        contentType: 'application/json',
        isImplicit: true,
        contentTypeParsed: [{ type: 'application/json', parameters: {} }]
      }
    });
  });

  it('handles multipart/form-data with $ref schema containing nested $refs', async () => {
    const result = parseTopLevelMediaType(
      {
        content: {
          'multipart/form-data': {
            schema: {
              $ref: '#/components/schemas/FormData'
            }
          }
        }
      },
      await createTestRefs({
        schemas: {
          FormData: {
            type: 'object',
            properties: {
              image: { $ref: '#/components/schemas/ImageFile' },
              description: { type: 'string' }
            }
          },
          ImageFile: {
            type: 'string',
            format: 'binary'
          }
        }
      }),
      defaultOptions
    );

    expect(result?.encoding).toEqual({
      image: {
        contentType: 'application/octet-stream',
        isImplicit: true,
        contentTypeParsed: [{ type: 'application/octet-stream', parameters: {} }]
      },
      description: {
        contentType: 'text/plain',
        isImplicit: true,
        contentTypeParsed: [{ type: 'text/plain', parameters: {} }]
      }
    });
  });

  it('parses content type with charset parameter', async () => {
    const result = parseTopLevelMediaType(
      {
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                textData: { type: 'string' }
              }
            },
            encoding: {
              textData: {
                contentType: 'text/plain; charset=utf-8'
              }
            }
          }
        }
      },
      await createTestRefs(),
      defaultOptions
    );

    expect(result?.encoding).toEqual({
      textData: {
        contentType: 'text/plain; charset=utf-8',
        isImplicit: false,
        contentTypeParsed: [
          {
            type: 'text/plain',
            parameters: { charset: 'utf-8' }
          }
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
        contentTypeParsed: [
          { type: 'application/pdf', parameters: {} },
          { type: 'application/msword', parameters: {} },
          { type: 'text/plain', parameters: {} }
        ]
      }
    });
  });

  it('handles content type with multiple parameters', async () => {
    const result = parseTopLevelMediaType(
      {
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                xmlData: { type: 'string' }
              }
            },
            encoding: {
              xmlData: {
                contentType: 'application/xml; charset=iso-8859-1; boundary=something'
              }
            }
          }
        }
      },
      await createTestRefs(),
      defaultOptions
    );

    expect(result?.encoding).toEqual({
      xmlData: {
        contentType: 'application/xml; charset=iso-8859-1; boundary=something',
        isImplicit: false,
        contentTypeParsed: [
          {
            type: 'application/xml',
            parameters: {
              charset: 'iso-8859-1',
              boundary: 'something'
            }
          }
        ]
      }
    });
  });

  it('combines explicit encoding with charset and auto-inferred encoding', async () => {
    const result = parseTopLevelMediaType(
      {
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                customText: { type: 'string' },
                normalField: { type: 'string' }
              }
            },
            encoding: {
              customText: {
                contentType: 'text/plain; charset=utf-16'
              }
            }
          }
        }
      },
      await createTestRefs(),
      defaultOptions
    );

    expect(result?.encoding).toEqual({
      customText: {
        contentType: 'text/plain; charset=utf-16',
        isImplicit: false,
        contentTypeParsed: [
          {
            type: 'text/plain',
            parameters: { charset: 'utf-16' }
          }
        ]
      },
      normalField: {
        contentType: 'text/plain',
        isImplicit: true,
        contentTypeParsed: [{ type: 'text/plain', parameters: {} }]
      }
    });
  });

  it('throws error with malformed content type', async () => {
    const refs = await createTestRefs();
    expect(() =>
      parseTopLevelMediaType(
        {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  file: { type: 'string', format: 'binary' }
                }
              },
              encoding: {
                file: {
                  contentType: 'image/png;;invalid'
                }
              }
            }
          }
        },
        refs,
        defaultOptions
      )
    ).toThrow(/invalid content-type.*image\/png;;invalid.*file/i);
  });

  it('handles wildcard content types correctly', async () => {
    const result = parseTopLevelMediaType(
      {
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                data: { type: 'string', format: 'binary' }
              }
            },
            encoding: {
              data: {
                contentType: 'image/*'
              }
            }
          }
        }
      },
      await createTestRefs(),
      defaultOptions
    );

    expect(result?.encoding).toEqual({
      data: {
        contentType: 'image/*',
        isImplicit: false,
        contentTypeParsed: [
          {
            type: 'image/*',
            parameters: {}
          }
        ]
      }
    });
  });

  it('throws error with completely invalid content type format', async () => {
    const refs = await createTestRefs();
    expect(() =>
      parseTopLevelMediaType(
        {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  attachment: { type: 'string', format: 'binary' }
                }
              },
              encoding: {
                attachment: {
                  contentType: 'not-a-valid-content-type-at-all'
                }
              }
            }
          }
        },
        refs,
        defaultOptions
      )
    ).toThrow(/invalid content-type.*not-a-valid-content-type-at-all.*attachment/i);
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
