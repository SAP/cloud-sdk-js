/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { createLogger } from '@sap-cloud-sdk/util';
import { EntityDeserializer } from '../../src/odata/common/entity-deserializer';
import {
  parseEntityNameFromMetadataUri,
  BatchResponseTransformer
} from '../../src/odata/common/request-builder/batch/batch-response-transformer';
import { responseDataAccessorV2 } from '../../src/odata/v2/request-builder/response-data-accessor';

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
        parseEntityNameFromMetadataUri(undefined)
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
  describe('getConstructor', () => {
    const entityToConstructorMap = {
      entity: 'entity' as any
    };
    const batchTransformer = new BatchResponseTransformer(
      entityToConstructorMap,
      responseDataAccessorV2,
      {} as EntityDeserializer
    );

    it('returns constructor for single result', () => {
      expect(
        batchTransformer['getConstructor']({
          d: { __metadata: { uri: 'entity' } }
        })
      ).toEqual(entityToConstructorMap.entity);
    });

    it('returns constructor for collection result', () => {
      expect(
        batchTransformer['getConstructor']({
          d: { results: [{ __metadata: { uri: 'entity' } }] }
        })
      ).toEqual(entityToConstructorMap.entity);
    });

    it('returns undefined for empty collection result and logs a warning', () => {
      const logger = createLogger('batch-response-parser');
      spyOn(logger, 'warn');
      expect(
        batchTransformer['getConstructor']({ d: { results: [] } })
      ).toBeUndefined();
      expect(logger.warn).toHaveBeenCalledWith(
        'Could not parse constructor from response body.'
      );
    });
  });
});
