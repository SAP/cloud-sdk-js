import moment from 'moment';
import BigNumber from 'bignumber.js';
import { createUriConverter } from '@sap-cloud-sdk/odata-common/internal';
import { defaultDeSerializers } from '../de-serializers';

const convertToUriFormat = createUriConverter(defaultDeSerializers);
describe('convertToUriFormat', () => {
  it('should convert guid', () => {
    const value = '01234567-89ab-cdef-0123-456789abcdef';
    expect(convertToUriFormat(value, 'Edm.Guid')).toBe(value);
  });

  it('should convert dateTimeOffset', () => {
    expect(convertToUriFormat(moment(0), 'Edm.DateTimeOffset')).toBe(
      '1970-01-01T00:00:00.000Z'
    );
  });

  it('should convert duration', () => {
    const value = moment.duration({ d: 1, h: 17, s: 59, ms: 123 });
    expect(convertToUriFormat(value, 'Edm.Duration')).toBe(
      "duration'P1DT17H59.123S'"
    );
  });

  it('should convert timeOfDay', () => {
    expect(
      convertToUriFormat(
        { hours: 13, minutes: 21, seconds: 43.123 },
        'Edm.TimeOfDay'
      )
    ).toBe('13:21:43.123');
  });

  it('should convert date', () => {
    expect(convertToUriFormat(moment(1589887303000), 'Edm.Date')).toBe(
      '2020-05-19'
    );
  });

  it('should convert Edm.Decimal', () => {
    expect(convertToUriFormat(new BigNumber('99.99'), 'Edm.Decimal')).toBe(
      '99.99'
    );
  });
});
