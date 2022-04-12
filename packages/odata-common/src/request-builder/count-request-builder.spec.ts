import { createLogger } from '@sap-cloud-sdk/util';
import { defaultDestination } from '../../../../test-resources/test/test-util/request-mocker';
import { getAllRequestBuilder } from '../../test/common-request-config';
import { Filter } from '../filter';

describe('CountRequestBuilder', () => {
  const requestBuilder = getAllRequestBuilder();

  describe('url', () => {
    it('builds basic count correctly', async () => {
      const expected =
        '/testination/sap/opu/odata/sap/API_COMMON_SRV/A_CommonEntity/$count';

      const actual = await requestBuilder.count().url(defaultDestination);
      expect(actual).toBe(expected);
    });

    it('works also with additional parameters', async () => {
      const expected =
        "/testination/sap/opu/odata/sap/API_COMMON_SRV/A_CommonEntity/$count?$filter=(SomeProp%20eq%20'test')";
      const actual = await getAllRequestBuilder({
        filter: new Filter<any, any, any>(
          'SomeProp',
          'eq',
          'test',
          'Edm.String'
        )
      })
        .count()
        .url(defaultDestination);
      expect(actual).toBe(expected);
    });

    it('ignores methods which must not affect count like $top, $skip', async () => {
      const expected =
        '/testination/sap/opu/odata/sap/API_COMMON_SRV/A_CommonEntity/$count';
      const actual = await requestBuilder
        .top(1)
        .skip(1)
        .count()
        .url(defaultDestination);
      expect(actual).toBe(expected);
    });

    it('warns the users if parameters are ignored in count', async () => {
      const logger = createLogger({
        messageContext: 'count-request-config'
      });
      const warnSpy = jest.spyOn(logger, 'warn');
      await getAllRequestBuilder().top(1).count().url(defaultDestination);
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy).toHaveBeenCalledWith(
        'The query parameter $top must not be used in a count request and has been ignored.'
      );
    });
  });
});
