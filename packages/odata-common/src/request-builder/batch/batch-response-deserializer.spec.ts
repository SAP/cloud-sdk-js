import { createLogger } from '@sap-cloud-sdk/util';
import {
  BatchResponseDeserializer,
  parseEntityNameFromContext,
  parseEntityNameFromMetadataUri
} from './batch-response-deserializer';
import type { EntityDeserializer } from '../../entity-deserializer';
import type { ResponseDataAccessor } from '../../response-data-accessor';

describe('batch response transformer', () => {
  describe('getEntityNameFromMetadata', () => {
    it('correctly parses name from meta data', () => {
      expect(
        parseEntityNameFromMetadataUri(
          "base/service/entity('key1','key2')?query"
        )
      ).toBe('entity');
    });

    it('correctly parses name from meta data if there is a trailing slash', () => {
      expect(parseEntityNameFromMetadataUri('base/service/entity/?query')).toBe(
        'entity'
      );
    });

    it('throws error if uri is undefined in meta data', () => {
      expect(() =>
        parseEntityNameFromMetadataUri(undefined as unknown as string)
      ).toThrowErrorMatchingInlineSnapshot(
        '"Could not retrieve entity name from metadata. URI was: \'undefined\'."'
      );
    });

    it('throws error if uri has unknown format', () => {
      expect(() =>
        parseEntityNameFromMetadataUri('/')
      ).toThrowErrorMatchingInlineSnapshot(
        '"Could not retrieve entity name from metadata. Unknown URI format. URI was: \'/\'."'
      );
    });
  });

  describe('parseEntityNameFromContext', () => {
    it('parses the entity set name from different context URL formats', () => {
      expect(parseEntityNameFromContext('$metadata#People')).toBe('People');
      expect(parseEntityNameFromContext('$metadata#People/$entity')).toBe(
        'People'
      );
      expect(parseEntityNameFromContext('$metadata#People(Name,Age)')).toBe(
        'People'
      );
      expect(
        parseEntityNameFromContext(
          'https://example.com/service/$metadata#People(Name)/$entity'
        )
      ).toBe('People');
    });

    it('returns undefined if the context URL has no fragment', () => {
      expect(parseEntityNameFromContext('$metadata')).toBeUndefined();
    });
  });

  describe('getApi', () => {
    const entityToConstructorMap = {
      entity: 'entity' as any
    };

    const batchTransformerCollection = new BatchResponseDeserializer(
      entityToConstructorMap,
      {
        /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
        isCollectionResult: input => true,
        getCollectionResult: input => input.d.results
      } as ResponseDataAccessor,
      {} as EntityDeserializer
    );

    const batchTransformerSingle = new BatchResponseDeserializer(
      entityToConstructorMap,
      {
        /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
        isCollectionResult: input => false,
        getSingleResult: input => input.d
      } as ResponseDataAccessor,
      {} as EntityDeserializer
    );

    it('returns constructor for single result', () => {
      expect(
        batchTransformerSingle['getApi']({
          d: { __metadata: { uri: 'entity' } }
        })
      ).toEqual(entityToConstructorMap.entity);
    });

    it('returns constructor for collection result', () => {
      expect(
        batchTransformerCollection['getApi']({
          d: { results: [{ __metadata: { uri: 'entity' } }] }
        })
      ).toEqual(entityToConstructorMap.entity);
    });

    it('returns constructor for OData v4 collection result using @odata.context', () => {
      expect(
        batchTransformerCollection['getApi']({
          '@odata.context': '$metadata#entity',
          d: { results: [{ prop: 'value' }] }
        })
      ).toEqual(entityToConstructorMap.entity);
    });

    it('returns constructor for OData v4 single result using @odata.context', () => {
      expect(
        batchTransformerSingle['getApi']({
          '@odata.context': '$metadata#entity/$entity',
          d: { prop: 'value' }
        })
      ).toEqual(entityToConstructorMap.entity);
    });

    it('returns constructor for OData v4 empty collection result using @odata.context', () => {
      const logger = createLogger('batch-response-transformer');
      jest.spyOn(logger, 'warn');
      expect(
        batchTransformerCollection['getApi']({
          '@odata.context': '$metadata#entity',
          d: { results: [] }
        })
      ).toEqual(entityToConstructorMap.entity);
      expect(logger.warn).not.toHaveBeenCalled();
    });

    it('returns undefined and logs a warning for an unknown @odata.context', () => {
      const logger = createLogger('batch-response-transformer');
      jest.spyOn(logger, 'warn');
      expect(
        batchTransformerSingle['getApi']({
          '@odata.context': '$metadata#unknown/$entity',
          d: { prop: 'value' }
        })
      ).toBeUndefined();
      expect(logger.warn).toHaveBeenCalledWith(
        'Could not parse constructor from response body.'
      );
    });

    it('returns undefined for empty collection result and logs a warning', () => {
      const logger = createLogger('batch-response-transformer');
      jest.spyOn(logger, 'warn');
      expect(
        batchTransformerCollection['getApi']({ d: { results: [] } })
      ).toBeUndefined();
      expect(logger.warn).toHaveBeenCalledWith(
        'Could not parse constructor from response body.'
      );
    });
  });
});
