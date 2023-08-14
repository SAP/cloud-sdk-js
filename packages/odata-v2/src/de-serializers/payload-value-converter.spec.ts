import BigNumber from 'bignumber.js';
import moment from 'moment';
import {
  deserializeToNumber,
  serializeFromNumber
} from '@sap-cloud-sdk/odata-common/internal';
import { EdmType } from '../edm-types';
import { defaultDeSerializers } from '../de-serializers';
import { edmToTs, tsToEdm } from './payload-value-converter';

describe('edmToTs()', () => {
  it('should parse Edm.String to string', () => {
    const expected = 'testitest';
    const actual = edmToTs(expected, 'Edm.String', defaultDeSerializers);
    expect(actual).toBe(expected);
  });

  it('should parse Edm.Boolean to boolean', () => {
    const expected = true;
    const actual = edmToTs(expected, 'Edm.Boolean', defaultDeSerializers);
    expect(actual).toBe(expected);
  });

  it('should parse S/4HANA Edm.Guid to string', () => {
    const expected = '005056ba-23b6-1ed4-b0ca-a49649d05e98';
    const actual = edmToTs(expected, 'Edm.Guid', defaultDeSerializers);
    expect(actual).toBe(expected);
  });

  it('should parse Edm.Guid to string', () => {
    const expected = '005056ba-23b6-1ed4-b0ca-a49649d05e98';
    const actual = edmToTs(
      `guid'${expected}`,
      'Edm.Guid',
      defaultDeSerializers
    );
    expect(actual).toBe(expected);
  });

  it('should parse Edm.Decimal to BigNumber', () => {
    const expected = new BigNumber('1.23');
    const actual = edmToTs('1.23', 'Edm.Decimal', defaultDeSerializers);
    expect(actual).toEqual(expected);
  });

  it('should parse Edm.Int16 to number', () => {
    const expected = 16;
    const actual = edmToTs('16', 'Edm.Int16', defaultDeSerializers);
    expect(actual).toBe(expected);
  });

  it('should parse Edm.Int32 to number', () => {
    const expected = 16;
    const actual = edmToTs('16', 'Edm.Int32', defaultDeSerializers);
    expect(actual).toBe(expected);
  });

  it('should parse Edm.Int64 to number', () => {
    const expected = new BigNumber(16);
    const actual = edmToTs('16', 'Edm.Int64', defaultDeSerializers);
    expect(actual).toEqual(expected);
  });

  it('should parse Edm.Single to number', () => {
    const expected = 16;
    const actual = edmToTs('16', 'Edm.Single', defaultDeSerializers);
    expect(actual).toBe(expected);
    checkInfinityCasesToTs('Edm.Single');
  });

  it('should parse Edm.Double to number', () => {
    const expected = 16.1616;
    const actual = edmToTs('16.1616', 'Edm.Double', defaultDeSerializers);
    expect(actual).toBe(expected);
    checkInfinityCasesToTs('Edm.Double');
  });

  it('should parse Edm.Float to number', () => {
    const expected = 16.1616;
    const actual = edmToTs('16.1616', 'Edm.Float', defaultDeSerializers);
    expect(actual).toBe(expected);
    checkInfinityCasesToTs('Edm.Float');
  });

  it('should parse Edm.Byte to number', () => {
    const expected = 255;
    const actual = edmToTs('255', 'Edm.Byte', defaultDeSerializers);
    expect(actual).toBe(expected);
  });

  // This is not even used anywhere in S/4...
  it('should parse Edm.SByte to number', () => {
    const expected = -8;
    const actual = edmToTs('-8', 'Edm.SByte', defaultDeSerializers);
    expect(actual).toBe(expected);
  });

  it('should parse Edm.DateTime to Moment', () => {
    const expected = moment(1425427200000);
    const actual = edmToTs(
      '/Date(1425427200000)/',
      'Edm.DateTime',
      defaultDeSerializers
    );
    expect(actual).toEqual(expected);
  });

  it('should parse Edm.DateTimeOffset to Moment', () => {
    const expected = moment(1425427200000).utc().utcOffset(0);
    const actual = edmToTs(
      '/Date(1425427200000+0000)/',
      'Edm.DateTimeOffset',
      defaultDeSerializers
    );
    expect(actual).toEqual(expected);
  });

  it('should parse Edm.Time to Time', () => {
    const expected = {
      hours: 13,
      minutes: 20,
      seconds: 0
    };
    const actual = edmToTs('PT13H20M00S', 'Edm.Time', defaultDeSerializers);
    expect(actual).toEqual(expected);
  });

  it('should parse Edm.Time with one skipped part', () => {
    const expected = {
      hours: 0,
      minutes: 20,
      seconds: 0
    };
    const actual = edmToTs('PT20M', 'Edm.Time', defaultDeSerializers);
    expect(actual).toEqual(expected);
  });

  it('should parse Edm.Time with no parts', () => {
    const expected = {
      hours: 0,
      minutes: 0,
      seconds: 0
    };
    const actual = edmToTs('PT', 'Edm.Time', defaultDeSerializers);
    expect(actual).toEqual(expected);
  });

  it('should parse Edm.Binary to base64 string', () => {
    const expected = '23A0';
    const actual = edmToTs('23A0', 'Edm.Binary', defaultDeSerializers);
    expect(actual).toEqual(expected);
  });
});

describe('tsToEdm()', () => {
  it('should parse string to Edm.String', () => {
    const expected = 'testitest';
    const actual = tsToEdm(expected, 'Edm.String', defaultDeSerializers);
    expect(actual).toBe(expected);
  });

  it('should parse boolean to Edm.Boolean', () => {
    const expected = true;
    const actual = tsToEdm(true, 'Edm.Boolean', defaultDeSerializers);
    expect(actual).toBe(expected);
  });

  it('should parse string to Edm.Guid', () => {
    const expected = '005056ba-23b6-1ed4-b0ca-a49649d05e98';
    const actual = tsToEdm(
      '005056ba-23b6-1ed4-b0ca-a49649d05e98',
      'Edm.Guid',
      defaultDeSerializers
    );
    expect(actual).toBe(expected);
  });

  it('should parse BigNumber to Edm.Decimal', () => {
    const expected = '1.23';
    const actual = tsToEdm(
      new BigNumber('1.23'),
      'Edm.Decimal',
      defaultDeSerializers
    );
    expect(actual).toBe(expected);
  });

  it('should parse number to Edm.Int16', () => {
    const expected = 16;
    const actual = tsToEdm(16, 'Edm.Int16', defaultDeSerializers);
    expect(actual).toBe(expected);
  });

  it('should parse number to Edm.Int32', () => {
    const expected = 16;
    const actual = tsToEdm(16, 'Edm.Int32', defaultDeSerializers);
    expect(actual).toBe(expected);
  });

  it('should parse BigNumber to Edm.Int64', () => {
    const expected = '16';
    const actual = tsToEdm(
      new BigNumber('16'),
      'Edm.Int64',
      defaultDeSerializers
    );
    expect(actual).toStrictEqual(expected);
  });

  it('should parse number to Edm.Single', () => {
    const expected = 16;
    const actual = tsToEdm(16, 'Edm.Single', defaultDeSerializers);
    expect(actual).toBe(expected);
    checkInfinityCasesToEdm('Edm.Single');
  });

  it('should parse number to Edm.Double', () => {
    const expected = 16.1616;
    const actual = tsToEdm(16.1616, 'Edm.Double', defaultDeSerializers);
    expect(actual).toBe(expected);
    checkInfinityCasesToEdm('Edm.Double');
  });

  it('should parse number to Edm.Float', () => {
    const expected = 16.1616;
    const actual = tsToEdm(16.1616, 'Edm.Float', defaultDeSerializers);
    expect(actual).toBe(expected);
    checkInfinityCasesToEdm('Edm.Float');
  });

  it('should parse number to Edm.Byte', () => {
    const expected = 255;
    const actual = tsToEdm(255, 'Edm.Byte', defaultDeSerializers);
    expect(actual).toBe(expected);
  });

  // This is not even used anywhere in S/4...
  it('should parse number to Edm.SByte', () => {
    const expected = -8;
    const actual = tsToEdm(-8, 'Edm.SByte', defaultDeSerializers);
    expect(actual).toBe(expected);
  });

  it('should parse Moment to Edm.DateTime', () => {
    const expected = '/Date(1425427200000)/';
    const actual = tsToEdm(
      moment(1425427200000),
      'Edm.DateTime',
      defaultDeSerializers
    );
    expect(actual).toEqual(expected);
  });

  it('should parse Moment to Edm.DateTimeOffset', () => {
    const expected = '/Date(1425427200000+0000)/';
    const actual = tsToEdm(
      moment(1425427200000).utc().utcOffset(0),
      'Edm.DateTimeOffset',
      defaultDeSerializers
    );
    expect(actual).toEqual(expected);
  });

  it('should parse Time to Edm.Time', () => {
    const expected = 'PT13H20M00S';
    const actual = tsToEdm(
      {
        hours: 13,
        minutes: 20,
        seconds: 0
      },
      'Edm.Time',
      defaultDeSerializers
    );
    expect(actual).toEqual(expected);
  });

  it('should parse UInt8Array to Edm.Binary', () => {
    const expected = '23A0';
    const actual = tsToEdm('23A0', 'Edm.Binary', defaultDeSerializers);
    expect(actual).toEqual(expected);
  });
});

describe('EDM to ts to EDM does not lead to information loss', () => {
  it('Edm.String', () => {
    const expected = 'teststring';
    expect(
      tsToEdm(
        edmToTs(expected, 'Edm.String', defaultDeSerializers),
        'Edm.String',
        defaultDeSerializers
      )
    ).toBe(expected);
  });

  it('Edm.Boolean', () => {
    const expected = true;
    expect(
      tsToEdm(
        edmToTs(expected, 'Edm.Boolean', defaultDeSerializers),
        'Edm.Boolean',
        defaultDeSerializers
      )
    ).toBe(expected);
  });

  it('Edm.Guid', () => {
    const expected = '005056ba-23b6-1ed4-b0ca-a49649d05e98';
    expect(
      tsToEdm(
        edmToTs(expected, 'Edm.Guid', defaultDeSerializers),
        'Edm.Guid',
        defaultDeSerializers
      )
    ).toBe(expected);
  });

  it('Edm.Decimal', () => {
    const expected = '123456.789';
    expect(
      tsToEdm(
        edmToTs(expected, 'Edm.Decimal', defaultDeSerializers),
        'Edm.Decimal',
        defaultDeSerializers
      )
    ).toBe(expected);
  });

  it('Edm.Double', () => {
    const expected = 1234.56;
    expect(
      tsToEdm(
        edmToTs(expected, 'Edm.Double', defaultDeSerializers),
        'Edm.Double',
        defaultDeSerializers
      )
    ).toBe(expected);
    checkInfinityCasesRoundTrip('Edm.Double');
  });

  it('Edm.Single', () => {
    const expected = 1234;
    expect(
      tsToEdm(
        edmToTs(expected, 'Edm.Single', defaultDeSerializers),
        'Edm.Single',
        defaultDeSerializers
      )
    ).toBe(expected);
    checkInfinityCasesRoundTrip('Edm.Single');
  });

  it('Edm.Float', () => {
    const expected = 1234;
    expect(
      tsToEdm(
        edmToTs(expected, 'Edm.Float', defaultDeSerializers),
        'Edm.Float',
        defaultDeSerializers
      )
    ).toBe(expected);
    checkInfinityCasesRoundTrip('Edm.Float');
  });

  it('Edm.Int16', () => {
    const expected = 16;
    expect(
      tsToEdm(
        edmToTs(expected, 'Edm.Int16', defaultDeSerializers),
        'Edm.Int16',
        defaultDeSerializers
      )
    ).toBe(expected);
  });

  it('Edm.Int32', () => {
    const expected = 32;
    expect(
      tsToEdm(
        edmToTs(expected, 'Edm.Int32', defaultDeSerializers),
        'Edm.Int32',
        defaultDeSerializers
      )
    ).toBe(expected);
  });

  it('Edm.Int64', () => {
    const expected = '64';
    expect(
      tsToEdm(
        edmToTs(expected, 'Edm.Int64', defaultDeSerializers),
        'Edm.Int64',
        defaultDeSerializers
      )
    ).toStrictEqual(expected);
  });

  it('Edm.SByte', () => {
    const expected = -8;
    expect(
      tsToEdm(
        edmToTs(expected, 'Edm.SByte', defaultDeSerializers),
        'Edm.SByte',
        defaultDeSerializers
      )
    ).toBe(expected);
  });

  it('Edm.DateTime', () => {
    const expected = '/Date(1425427200000)/';
    expect(
      tsToEdm(
        edmToTs(expected, 'Edm.DateTime', defaultDeSerializers),
        'Edm.DateTime',
        defaultDeSerializers
      )
    ).toBe(expected);
  });

  it('Edm.DateTimeOffset', () => {
    const expected = '/Date(1425427200000+1000)/';
    expect(
      tsToEdm(
        edmToTs(expected, 'Edm.DateTimeOffset', defaultDeSerializers),
        'Edm.DateTimeOffset',
        defaultDeSerializers
      )
    ).toBe(expected);
  });

  it('Edm.Time', () => {
    const expected = 'PT13H20M00S';
    expect(
      tsToEdm(
        edmToTs(expected, 'Edm.Time', defaultDeSerializers),
        'Edm.Time',
        defaultDeSerializers
      )
    ).toBe(expected);
  });

  it('Edm.Binary', () => {
    const expected = 'BASE64==';
    expect(
      tsToEdm(
        edmToTs(expected, 'Edm.Binary', defaultDeSerializers),
        'Edm.Binary',
        defaultDeSerializers
      )
    ).toBe(expected);
  });

  it('Edm.Byte', () => {
    const expected = 8;
    expect(
      tsToEdm(
        edmToTs(expected, 'Edm.Byte', defaultDeSerializers),
        'Edm.Byte',
        defaultDeSerializers
      )
    ).toBe(expected);
  });
});

describe('toNumber from EDM type input', () => {
  it('parses a number from string or returns the corresponding Number construct for INF, -INF and NaN', () => {
    expect(deserializeToNumber('INF')).toEqual(Number.POSITIVE_INFINITY);
    expect(deserializeToNumber('-INF')).toEqual(Number.NEGATIVE_INFINITY);
    expect(Number.isNaN(deserializeToNumber('NaN'))).toBeTruthy();
    expect(deserializeToNumber('32')).toBe(32);
  });

  it('can handle input in arbitrary cases', () => {
    expect(deserializeToNumber('InF')).toEqual(Number.POSITIVE_INFINITY);
    expect(deserializeToNumber('inf')).toEqual(Number.POSITIVE_INFINITY);
    expect(deserializeToNumber('iNF')).toEqual(Number.POSITIVE_INFINITY);
  });

  it('throws an error for non-numbers', () => {
    expect(() =>
      deserializeToNumber('something something danger zone')
    ).toThrow();
  });
});

describe('toNumber from ts type input', () => {
  it('parses a number from string or returns the corresponding Number construct for INF, -INF and NaN', () => {
    expect(serializeFromNumber(Number.POSITIVE_INFINITY)).toEqual('INF');
    expect(serializeFromNumber(Number.NEGATIVE_INFINITY)).toEqual('-INF');
    expect(serializeFromNumber(Number.NaN)).toEqual('NaN');
    expect(serializeFromNumber(32)).toBe(32);
  });

  it('throws an error for non-numbers', () => {
    expect(() =>
      serializeFromNumber('something something danger zone' as any)
    ).toThrow();
  });
});

function checkInfinityCasesToEdm(edmType: EdmType) {
  expect(tsToEdm(Number.POSITIVE_INFINITY, edmType, defaultDeSerializers)).toBe(
    'INF'
  );
  expect(tsToEdm(Number.NEGATIVE_INFINITY, edmType, defaultDeSerializers)).toBe(
    '-INF'
  );
  expect(tsToEdm(Number.NaN, edmType, defaultDeSerializers)).toBe('NaN');
}

function checkInfinityCasesToTs(edmType: EdmType) {
  expect(edmToTs('INF', edmType, defaultDeSerializers)).toBe(
    Number.POSITIVE_INFINITY
  );
  expect(edmToTs('-INF', edmType, defaultDeSerializers)).toBe(
    Number.NEGATIVE_INFINITY
  );
  expect(edmToTs('NaN', edmType, defaultDeSerializers)).toBe(Number.NaN);
}

function checkInfinityCasesRoundTrip(edmType: EdmType) {
  ['INF', '-INF', 'NaN'].forEach(s =>
    expect(
      tsToEdm(
        edmToTs(s, edmType, defaultDeSerializers),
        edmType,
        defaultDeSerializers
      )
    ).toBe(s)
  );
}
