/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { createLogger } from '@sap-cloud-sdk/util';
import {
  detectNewLineSymbol,
  getResponseBody,
  splitChangeSetResponse,
  splitBatchResponse,
  parseEntityNameFromMetadataUri,
  parseHttpCode,
  getConstructor,
  parseResponse
} from '../../src/odata/v2/batch-response-parser';

/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
describe('batch response parser', () => {
  describe('detectNewLineSymbol', () => {
    it('detects windows style new line and carriage return', () => {
      expect(detectNewLineSymbol('multiple\r\nlines')).toBe('\r\n');
    });

    it('detects posix style new line', () => {
      expect(detectNewLineSymbol('multiple\nlines')).toBe('\n');
    });

    it('throws error for unknown new line symbol', () => {
      expect(() =>
        detectNewLineSymbol('multiple\tlines')
      ).toThrowErrorMatchingInlineSnapshot(
        '"Cannot detect line breaks in the batch response body."'
      );
    });
  });

  describe('getResponseBody', () => {
    it('retrieves the response body when there are >= 3 lines', () => {
      const responseLines = ['--partId', '', 'responseBody'];
      const response = responseLines.join('\n');
      expect(getResponseBody(response)).toBe(responseLines[2]);
    });

    it('retrieves the response body when there are < 3 lines', () => {
      const response = ['--partId', 'responseBody'].join('\n');
      expect(() =>
        getResponseBody(response)
      ).toThrowErrorMatchingInlineSnapshot(
        '"Cannot parse batch subrequest response body. Expected at least three lines in the response, got 2."'
      );
    });
  });

  describe('splitBatchResponse', () => {
    const batchId = 'batch_1234';
    const retrieveResponse = 'retrieveResponse';
    const changesetId = 'changeset_1234';
    const changeSetResponse = [
      `--${changesetId}`,
      'changeSetResponse',
      `--${changesetId}--`
    ].join('\n');
    const createBatchResponse = (
      data,
      headers: Record<string, any> = {
        'content-type': `multipart/mixed; boundary=${batchId}`
      }
    ) => ({ data, headers, status: 200 });

    it('correctly partitions batch response', () => {
      const body = [
        `--${batchId}`,
        retrieveResponse,
        `--${batchId}`,
        changeSetResponse,
        `--${batchId}--`
      ].join('\n');

      expect(splitBatchResponse(createBatchResponse(body))).toEqual([
        retrieveResponse,
        changeSetResponse
      ]);
    });

    it('correctly partitions batch response for upper case headers', () => {
      const body = [
        `--${batchId}`,
        retrieveResponse,
        `--${batchId}`,
        changeSetResponse,
        `--${batchId}--`
      ].join('\n');

      expect(
        splitBatchResponse(
          createBatchResponse(body, {
            'Content-Type': `multipart/mixed; boundary=${batchId}`
          })
        )
      ).toEqual([retrieveResponse, changeSetResponse]);
    });

    it('correctly trims white space', () => {
      const body = [
        '',
        '',
        `--${batchId}`,
        '',
        retrieveResponse,
        '',
        `--${batchId}`,
        '',
        changeSetResponse,
        '',
        `--${batchId}--`,
        ''
      ].join('\n');

      expect(splitBatchResponse(createBatchResponse(body))).toEqual([
        retrieveResponse,
        changeSetResponse
      ]);
    });

    it('returns empty array for empty response', () => {
      const body = ['', '', ''].join('\n');
      expect(splitBatchResponse(createBatchResponse(body))).toEqual([]);
    });

    it('throws an error when headers do not contain boundary', () => {
      const body = [`--${batchId}`, retrieveResponse, `--${batchId}--`].join(
        '\n'
      );
      const response = createBatchResponse(body, {
        'Content-Type': 'multipart/mixed'
      });
      expect(() =>
        splitBatchResponse(response)
      ).toThrowErrorMatchingInlineSnapshot(
        '"Could not parse batch response body. Expected at least two response boundaries."'
      );
    });

    it('throws an error when there are not enough boundaries', () => {
      expect(() =>
        splitBatchResponse(createBatchResponse(retrieveResponse))
      ).toThrowErrorMatchingInlineSnapshot(
        '"Could not parse batch response body. Expected at least two response boundaries."'
      );
    });
  });

  describe('splitChangeSetResponse', () => {
    const changeSetId = 'changeSetId';
    const response1 = 'response1';
    const response2 = 'response2';
    const contentTypeHeader = `Content-Type: multipart/mixed; boundary=${changeSetId}`;
    it('correctly partitions change set response', () => {
      const changeSet = [
        contentTypeHeader,
        '',
        `--${changeSetId}`,
        response1,
        `--${changeSetId}`,
        response2,
        `--${changeSetId}--`
      ].join('\n');

      expect(splitChangeSetResponse(changeSet)).toEqual([response1, response2]);
    });

    it('correctly partitions change set response when the first header is not content-type', () => {
      const changeSet = [
        'content-length: 123',
        contentTypeHeader,
        '',
        `--${changeSetId}`,
        response1,
        `--${changeSetId}--`
      ].join('\n');

      expect(splitChangeSetResponse(changeSet)).toEqual([response1]);
    });

    it('throws error if there is no boundary in the headers', () => {
      const changeSet = ['', ''].join('\n');
      expect(() =>
        splitChangeSetResponse(changeSet)
      ).toThrowErrorMatchingInlineSnapshot('"Cannot parse change set."');
    });

    describe('getEntityNameFromMetadata', () => {
      it('correctly parses name from meta data', () => {
        expect(
          parseEntityNameFromMetadataUri(
            "base/service/entity('key1','key2')?query"
          )
        ).toBe('entity');
      });

      it('correctly parses name from meta data if there is a trailing slash', () => {
        expect(
          parseEntityNameFromMetadataUri('base/service/entity/?query')
        ).toBe('entity');
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
  });

  describe('toHttpCode', () => {
    const code = 200;

    it('parses http code for version 1.1 and description', () => {
      expect(parseHttpCode(`HTTP/1.1 ${code} Success`)).toBe(code);
    });

    it('parses http code for version 3.0 and no description', () => {
      expect(parseHttpCode(`HTTP/3.0 ${code}`)).toBe(code);
    });

    it('throws an error if the http code cannot be parsed', () => {
      expect(() => parseHttpCode(`${code}`)).toThrowErrorMatchingInlineSnapshot(
        '"Cannot parse http code of the response."'
      );
    });
  });

  describe('getConstructor', () => {
    const entityToConstructorMap = {
      entity: 'entity' as any
    };
    it('returns constructor for single result', () => {
      expect(
        getConstructor(
          { d: { __metadata: { uri: 'entity' } } },
          entityToConstructorMap
        )
      ).toEqual(entityToConstructorMap.entity);
    });

    it('returns constructor for collection result', () => {
      expect(
        getConstructor(
          { d: { results: [{ __metadata: { uri: 'entity' } }] } },
          entityToConstructorMap
        )
      ).toEqual(entityToConstructorMap.entity);
    });

    it('returns undefined for empty collection result and logs a warning', () => {
      const logger = createLogger('batch-response-parser');
      spyOn(logger, 'warn');
      expect(
        getConstructor({ d: { results: [] } }, entityToConstructorMap)
      ).toBeUndefined();
      expect(logger.warn).toHaveBeenCalledWith(
        'Could not parse constructor from response body.'
      );
    });
  });

  describe('parseResponse', () => {
    const firstHeader = [
      'Content-Type: application/http',
      'Content-Length: X',
      'content-transfer-encoding: binary',
      ''
    ].join('\n');

    const secondHeader = [
      'Content-Length: X',
      'dataserviceversion: 2.0',
      ''
    ].join('\n');

    const body = { valid: 'json' };

    it('parses get response', () => {
      const response = [
        firstHeader,
        'HTTP/1.1 200 Success',
        secondHeader,
        JSON.stringify(body)
      ].join('\n');

      expect(parseResponse(response, {})).toEqual({
        httpCode: 200,
        body,
        type: undefined,
        isSuccess: expect.anything(),
        as: expect.anything()
      });
    });

    it('parses no content response', () => {
      const response = [
        firstHeader,
        'HTTP/1.1 204 No Content',
        secondHeader,
        ''
      ].join('\n');

      expect(parseResponse(response, {})).toEqual({
        httpCode: 204,
        body: {},
        type: undefined,
        as: expect.anything()
      });
    });

    it('parses create response', () => {
      const response = [
        firstHeader,
        'HTTP/1.1 201 Created',
        secondHeader,
        JSON.stringify(body)
      ].join('\n');

      expect(parseResponse(response, {})).toEqual({
        httpCode: 201,
        body,
        type: undefined,
        as: expect.anything()
      });
    });
  });
});
