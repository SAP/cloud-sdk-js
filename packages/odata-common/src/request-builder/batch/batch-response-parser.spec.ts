import { unixEOL, createLogger } from '@sap-cloud-sdk/util';
import { HttpResponse } from '@sap-cloud-sdk/http-client';
import {
  detectNewLineSymbol,
  getResponseBody,
  parseBatchResponse,
  parseHttpCode,
  parseResponseData,
  splitBatchResponse,
  splitChangeSetResponse
} from './batch-response-parser';

describe('batch response parser', () => {
  describe('detectNewLineSymbol', () => {
    it('detects windows style new line and carriage return', () => {
      expect(detectNewLineSymbol('multiple\r\nlines')).toBe('\r\n');
    });

    it('detects posix style new line', () => {
      expect(detectNewLineSymbol('multiple$\nlines')).toBe('\n');
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
      const response = responseLines.join(unixEOL);
      expect(getResponseBody(response)).toBe(responseLines[2]);
    });

    it('retrieves the response body when there are < 3 lines', () => {
      const response = ['--partId', 'responseBody'].join(unixEOL);
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
    ].join(unixEOL);
    const createBatchResponse = (
      data,
      headers: Record<string, any> = {
        'content-type': `multipart/mixed; boundary=${batchId}`
      }
    ) => ({ data, headers, status: 200, request: undefined });

    it('correctly splits batch response', () => {
      const body = [
        `--${batchId}`,
        retrieveResponse,
        `--${batchId}`,
        changeSetResponse,
        `--${batchId}--`
      ].join(unixEOL);

      expect(splitBatchResponse(createBatchResponse(body))).toEqual([
        retrieveResponse,
        changeSetResponse
      ]);
    });

    it('correctly splits batch response for upper case headers', () => {
      const body = [
        `--${batchId}`,
        retrieveResponse,
        `--${batchId}`,
        changeSetResponse,
        `--${batchId}--`
      ].join(unixEOL);

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
      ].join(unixEOL);

      expect(splitBatchResponse(createBatchResponse(body))).toEqual([
        retrieveResponse,
        changeSetResponse
      ]);
    });

    it('returns empty array for empty response', () => {
      const body = ['', '', ''].join(unixEOL);
      expect(splitBatchResponse(createBatchResponse(body))).toEqual([]);
    });

    it('throws an error when headers do not contain boundary', () => {
      const body = [`--${batchId}`, retrieveResponse, `--${batchId}--`].join(
        unixEOL
      );
      const response = createBatchResponse(body, {
        'Content-Type': 'multipart/mixed'
      });
      expect(() =>
        splitBatchResponse(response)
      ).toThrowErrorMatchingInlineSnapshot('"Could not parse batch response."');
    });

    it('throws an error when there are not enough boundaries', () => {
      expect(() =>
        splitBatchResponse(createBatchResponse(retrieveResponse))
      ).toThrowErrorMatchingInlineSnapshot('"Could not parse batch response."');
    });
  });

  describe('splitChangeSetResponse', () => {
    const changeSetId = 'changeSetId';
    const response1 = 'response1';
    const response2 = 'response2';
    const contentTypeHeader = `Content-Type: multipart/mixed; boundary=${changeSetId}`;
    it('correctly splits change set response', () => {
      const changeSet = [
        contentTypeHeader,
        '',
        `--${changeSetId}`,
        response1,
        `--${changeSetId}`,
        response2,
        `--${changeSetId}--`
      ].join(unixEOL);

      expect(splitChangeSetResponse(changeSet)).toEqual([response1, response2]);
    });

    it('correctly splits change set response when the first header is not content-type', () => {
      const changeSet = [
        'content-length: 123',
        contentTypeHeader,
        '',
        `--${changeSetId}`,
        response1,
        `--${changeSetId}--`
      ].join(unixEOL);

      expect(splitChangeSetResponse(changeSet)).toEqual([response1]);
    });

    it('throws error if there is no boundary in the headers', () => {
      const changeSet = ['', ''].join(unixEOL);
      expect(() =>
        splitChangeSetResponse(changeSet)
      ).toThrowErrorMatchingInlineSnapshot(
        '"Could not parse change set response."'
      );
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

  describe('parseResponseData', () => {
    const firstHeader = [
      'Content-Type: application/http',
      'Content-Length: X',
      'content-transfer-encoding: binary',
      ''
    ].join(unixEOL);

    const secondHeader = [
      'Content-Length: X',
      'dataserviceversion: 2.0',
      ''
    ].join(unixEOL);

    const body = { valid: 'json' };

    it('parses get response', () => {
      const response = [
        firstHeader,
        'HTTP/1.1 200 Success',
        secondHeader,
        JSON.stringify(body)
      ].join(unixEOL);

      expect(parseResponseData(response)).toEqual({
        httpCode: 200,
        body
      });
    });

    it('parses no content response', () => {
      const response = [
        firstHeader,
        'HTTP/1.1 204 No Content',
        secondHeader,
        ''
      ].join(unixEOL);

      expect(parseResponseData(response)).toEqual({
        httpCode: 204,
        body: {}
      });
    });

    it('parses create response', () => {
      const response = [
        firstHeader,
        'HTTP/1.1 201 Created',
        secondHeader,
        JSON.stringify(body)
      ].join(unixEOL);

      expect(parseResponseData(response)).toEqual({
        httpCode: 201,
        body
      });
    });
  });

  describe('parseBatchResponse', () => {
    it('parses a batch response with both empty and non-empty bodies', () => {
      const data = [
        '--3B17E95920A7FAF8BCB7495D043515000',
        'Content-Type: multipart/mixed; boundary=3B17E95920A7FAF8BCB7495D043515001',
        'Content-Length:      2427',
        '',
        '--3B17E95920A7FAF8BCB7495D043515001',
        'Content-Type: application/http',
        'Content-Length: 71,',
        'content-transfer-encoding: binary',
        '',
        'HTTP/1.1 200 Success',
        'Content-Length: 0',
        'dataserviceversion: 2.0',
        '',
        '{"valid": "json"}',
        '--3B17E95920A7FAF8BCB7495D043515001',
        'Content-Type: application/http',
        'Content-Length: 71',
        'content-transfer-encoding: binary',
        '',
        'HTTP/1.1 204 No Content',
        'Content-Length: 0',
        'dataserviceversion: 2.0',
        '',
        '',
        '--3B17E95920A7FAF8BCB7495D043515001',
        'content-type: application/http',
        'content-transfer-encoding: binary',
        'content-id: ~00',
        '',
        'HTTP/1.1 204 No Content',
        'odata-version: 4.0',
        '',
        '',
        '--3B17E95920A7FAF8BCB7495D043515001--',
        '',
        '--3B17E95920A7FAF8BCB7495D043515000--'
      ].join(unixEOL);
      const batchResponse = {
        data,
        status: 200,
        headers: {
          'content-type':
            'multipart/mixed; boundary=3B17E95920A7FAF8BCB7495D043515000'
        }
      } as HttpResponse;
      const logger = createLogger({
        messageContext: 'batch-response-parser'
      });
      const errorSpy = jest.spyOn(logger, 'error');
      parseBatchResponse(batchResponse);
      expect(errorSpy).toHaveBeenCalledTimes(0);
    });
  });
});
