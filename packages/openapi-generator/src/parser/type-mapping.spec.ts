import { createLogger } from '@sap-cloud-sdk/util';
import { getType } from './type-mapping';

describe('getType', () => {
  it('returns any for undefined', () => {
    expect(getType(undefined)).toEqual('any');
  });

  it('logs warning for unknown values and returns any', () => {
    const logger = createLogger('openapi-generator');
    spyOn(logger, 'debug');
    expect(getType('unknown')).toEqual('any');
    expect(logger.debug).toHaveBeenCalledWith(
      "Could not map type 'unknown' to a native type. Using any."
    );
  });

  it('returns number for for int', () => {
    expect(getType('int')).toEqual('number');
    expect(getType('integer')).toEqual('number');
  });
});
