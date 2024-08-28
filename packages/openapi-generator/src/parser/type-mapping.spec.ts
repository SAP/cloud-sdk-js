import { createLogger } from '@sap-cloud-sdk/util';
import { getType } from './type-mapping';

describe('getType', () => {
  it('returns any for undefined', () => {
    expect(getType({ type: undefined })).toEqual('any');
  });

  it('logs warning for unknown values and returns any', () => {
    const logger = createLogger('openapi-generator');
    jest.spyOn(logger, 'verbose');
    expect(getType({ type: 'unknown' })).toEqual('any');
    expect(logger.verbose).toHaveBeenCalledWith(
      "Could not map type 'unknown' to a native type. Using any."
    );
  });

  it('returns number for for int', () => {
    expect(getType({ type: 'int' })).toEqual('number');
    expect(getType({ type: 'integer' })).toEqual('number');
  });
});
