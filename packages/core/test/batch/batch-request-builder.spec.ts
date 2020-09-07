/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  ODataBatchRequestBuilderV2,
  getPayload,
  trimRetrieveHeaders,
  partitionBatchResponse,
  partitionChangeSetResponse,
  getEntityNameFromMetadata,
  toHttpCode
} from '../../src';
import { TestEntity } from '../test-util/test-services/v2/test-service';
import {
  createChangeSetWithFakeId,
  buildTestEntity
} from '../test-util/batch-test-util';
import { ODataBatchRequestConfig } from '../../src/odata/common/request/odata-batch-request-config';

const testEntity = buildTestEntity();
describe('batch request builder', () => {
  describe('detectNewLineSymbol', () => {
    const requestBuilder = new ODataBatchRequestBuilderV2(
      'service/path',
      [],
      {}
    );
    it('detects windows style new line and carriage return', () => {
      const response = { data: 'multiple\r\nlines' };
      expect(requestBuilder.detectNewLineSymbol(response)).toBe('\r\n');
    });

    it('detects posix style new line', () => {
      const response = { data: 'multiple\nlines' };
      expect(requestBuilder.detectNewLineSymbol(response)).toBe('\n');
    });

    it('throws error for unknown new line symbol', () => {
      const response = { data: 'multiple\tlines' };
      expect(() =>
        requestBuilder.detectNewLineSymbol(response)
      ).toThrowErrorMatchingInlineSnapshot(
        '"Cannot detect line breaks in the response body: multiple	lines."'
      );
    });
  });

  describe('getPayload', () => {
    it('serializes payload for batch subrequests', () => {
      const payload = getPayload(
        [
          createChangeSetWithFakeId(
            TestEntity.requestBuilder().create(testEntity)
          ),
          TestEntity.requestBuilder().getAll(),
          createChangeSetWithFakeId(
            TestEntity.requestBuilder().update(testEntity),
            TestEntity.requestBuilder().delete(testEntity)
          ),
          TestEntity.requestBuilder().getByKey('guidId', 'strId')
        ],
        { batchId: 'batchId' } as ODataBatchRequestConfig
      );

      expect(payload).toMatchSnapshot();
    });
  });

  describe('trimRetrieveHeaders', () => {
    it('retrieves the response body when there are >= 3 lines', () => {
      const responseLines = ['--partId', '', 'responseBody'];
      const response = responseLines.join('\n');
      expect(trimRetrieveHeaders(response, '\n')).toBe(responseLines[2]);
    });

    it('retrieves the response body when there are < 3 lines', () => {
      const response = ['--partId', 'responseBody'].join('\n');
      expect(() =>
        trimRetrieveHeaders(response, '\n')
      ).toThrowErrorMatchingInlineSnapshot(
        '"Cannot parse batch subrequest response body. Expected at least three lines in the response, got 2."'
      );
    });
  });

  describe('partitionBatchResponse', () => {
    const batchId = '--batch_1234';
    const retrieveResponse = 'retrieveResponse';
    const changesetId = '--changeset_1234';
    const changeSetResponse = [
      changesetId,
      'changeSetResponse',
      `${changesetId}--`
    ].join('\n');

    it('correctly partitions batch response', () => {
      const batchResponse = [
        batchId,
        retrieveResponse,
        batchId,
        changeSetResponse,
        `${batchId}--`
      ].join('\n');

      expect(partitionBatchResponse(batchResponse, '\n')).toEqual([
        retrieveResponse,
        changeSetResponse
      ]);
    });

    it('correctly trims white space', () => {
      const batchResponse = [
        '',
        '',
        batchId,
        '',
        retrieveResponse,
        '',
        batchId,
        '',
        changeSetResponse,
        '',
        `${batchId}--`,
        ''
      ].join('\n');

      expect(partitionBatchResponse(batchResponse, '\n')).toEqual([
        retrieveResponse,
        changeSetResponse
      ]);
    });

    it('returns empty array for empty response', () => {
      const batchResponse = ['', '', ''].join('\n');
      expect(partitionBatchResponse(batchResponse, '\n')).toEqual([]);
    });

    it('throws an error when there is no batch id separator', () => {
      const batchResponse = retrieveResponse;
      expect(() =>
        partitionBatchResponse(batchResponse, '\n')
      ).toThrowErrorMatchingInlineSnapshot(
        '"Could not parse batch response. Expected response to start with \'--\'."'
      );
    });
  });

  describe('partitionChangeSetResponse', () => {
    it('correctly partitions change set response', () => {
      const changeSetId = 'changeSetId';
      const response1 = 'response1';
      const response2 = 'response2';
      const contentTypeHeader = `Content-Type: multipart/mixed; boundary=${changeSetId}`;
      const changeSet = [
        contentTypeHeader,
        '',
        `--${changeSetId}`,
        response1,
        `--${changeSetId}`,
        response2,
        `--${changeSetId}--`
      ].join('\n');

      expect(partitionChangeSetResponse(changeSet, '\n')).toEqual([
        response1,
        response2
      ]);
    });

    it('throws error if the first line is falsy', () => {
      const changeSet = ['', ''].join('\n');
      expect(() =>
        partitionChangeSetResponse(changeSet, '\n')
      ).toThrowErrorMatchingInlineSnapshot('"Cannot parse change set."');
    });
  });

  describe('getEntityNameFromMetadata', () => {
    it('correctly parses name from meta data', () => {
      const metadata = {
        uri: "base/service/entity('key1','key2')?query"
      };

      expect(getEntityNameFromMetadata(metadata)).toBe('entity');
    });

    it('correctly parses name from meta data if there is a trailing slash', () => {
      const metadata = {
        uri: 'base/service/entity/?query'
      };

      expect(getEntityNameFromMetadata(metadata)).toBe('entity');
    });

    it('throws error if uri is undefined in meta data', () => {
      expect(() =>
        getEntityNameFromMetadata({})
      ).toThrowErrorMatchingInlineSnapshot(
        '"Could not retrieve entity name from metadata. URI was: \'undefined\'."'
      );
    });

    it('throws error if uri has unknown format', () => {
      const metadata = {
        uri: '/'
      };

      expect(() =>
        getEntityNameFromMetadata(metadata)
      ).toThrowErrorMatchingInlineSnapshot(
        '"Could not retrieve entity name from metadata. Unknown URI format. URI was: \'/\'."'
      );
    });
  });

  describe('toHttpCode', () => {
    const code = 200;

    it('parses http code for version 1.1 and description', () => {
      expect(toHttpCode(`HTTP/1.1 ${code} Success`)).toBe(code);
    });

    it('parses http code for version 3.0 and no description', () => {
      expect(toHttpCode(`HTTP/3.0 ${code}`)).toBe(code);
    });

    it('throws an error if the http code cannot be parsed', () => {
      expect(() => toHttpCode(`${code}`)).toThrowErrorMatchingInlineSnapshot(
        '"Cannot parse http code of the response."'
      );
    });
  });
});
