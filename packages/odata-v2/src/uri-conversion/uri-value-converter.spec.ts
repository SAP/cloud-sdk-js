import { createUriConverter } from '@sap-cloud-sdk/odata-common/internal';
import BigNumber from 'bignumber.js';
import moment from 'moment';
import { defaultDeSerializers, edmToTs } from '../de-serializers';

const convertToUriFormat = createUriConverter(defaultDeSerializers);

describe('convertToUriFormat', () => {
  it('Edm.Binary', () => {
    expect(convertToUriFormat('BASE64==', 'Edm.Binary')).toBe("X'BASE64=='");
  });

  it('Edm.Boolean', () => {
    expect(convertToUriFormat(true, 'Edm.Boolean')).toBe('true');
  });

  it('Edm.Byte', () => {
    expect(convertToUriFormat(8, 'Edm.Byte')).toBe('8');
  });

  it('Edm.Int16', () => {
    expect(convertToUriFormat(16, 'Edm.Int16')).toBe('16');
  });

  it('Edm.Int32', () => {
    expect(convertToUriFormat(32, 'Edm.Int32')).toBe('32');
  });

  it('Edm.SByte', () => {
    expect(convertToUriFormat(-8, 'Edm.SByte')).toBe('-8');
  });

  it('Edm.Int64', () => {
    expect(convertToUriFormat(64, 'Edm.Int64')).toBe('64L');
  });

  it('Edm.Decimal', () => {
    expect(convertToUriFormat(new BigNumber('64'), 'Edm.Decimal')).toBe('64M');
  });

  it('Edm.Double', () => {
    expect(convertToUriFormat(64, 'Edm.Double')).toBe('64D');
  });

  it('Edm.Single', () => {
    expect(convertToUriFormat(64, 'Edm.Single')).toBe('64F');
  });

  it('Edm.Guid', () => {
    expect(
      convertToUriFormat('01234567-89ab-cdef-ghij-KLMNOPQRSTUV', 'Edm.Guid')
    ).toBe("guid'01234567-89ab-cdef-ghij-KLMNOPQRSTUV'");
  });

  it('Edm.String', () => {
    expect(convertToUriFormat('test', 'Edm.String')).toBe("'test'");
  });

  it('Edm.String with space, umlaut and plus', () => {
    expect(convertToUriFormat("ä 'ö+", 'Edm.String')).toBe("'ä ''ö+'");
  });

  it('Edm.String with single quotes', () => {
    expect(convertToUriFormat("a'b'c", 'Edm.String')).toBe("'a''b''c'");
  });

  it('Edm.DateTime', () => {
    expect(
      convertToUriFormat(moment(1552304382000).utc(), 'Edm.DateTime')
    ).toBe("datetime'2019-03-11T11:39:42.000'");
    expect(
      convertToUriFormat(
        edmToTs('/Date(1552304382000)/', 'Edm.DateTime', defaultDeSerializers),
        'Edm.DateTime'
      )
    ).toBe("datetime'2019-03-11T11:39:42.000'");
  });

  it('Edm.DateTimeOffset', () => {
    expect(
      convertToUriFormat(moment(1552304382000).utc(), 'Edm.DateTimeOffset')
    ).toBe("datetimeoffset'2019-03-11T11:39:42.000Z'");
    expect(
      convertToUriFormat(
        edmToTs(
          '/Date(1552304382000+0000)/',
          'Edm.DateTimeOffset',
          defaultDeSerializers
        ),
        'Edm.DateTimeOffset'
      )
    ).toBe("datetimeoffset'2019-03-11T11:39:42.000Z'");
  });

  it('Edm.Time', () => {
    expect(
      convertToUriFormat({ hours: 12, minutes: 34, seconds: 56 }, 'Edm.Time')
    ).toBe("time'PT12H34M56S'");
  });
});
