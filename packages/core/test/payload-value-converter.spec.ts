/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import BigNumber from 'bignumber.js';
import moment from 'moment';
import {
  edmDateTimeToMoment,
  edmToTs,
  momentToEdmDateTime,
  parseNumber,
  tsToEdm
} from '../src/payload-value-converter';

describe('edmToTs()', () => {
  it('should parse Edm.String to string', () => {
    const expected = 'testitest';
    const actual = edmToTs(expected, 'Edm.String');
    expect(actual).toBe(expected);
  });

  it('should parse Edm.Boolean to boolean', () => {
    const expected = true;
    const actual = edmToTs(expected, 'Edm.Boolean');
    expect(actual).toBe(expected);
  });

  it('should parse S/4HANA Edm.Guid to string', () => {
    const expected = '005056ba-23b6-1ed4-b0ca-a49649d05e98';
    const actual = edmToTs(expected, 'Edm.Guid');
    expect(actual).toBe(expected);
  });

  it('should parse Edm.Guid to string', () => {
    const expected = '005056ba-23b6-1ed4-b0ca-a49649d05e98';
    const actual = edmToTs(`guid'${expected}`, 'Edm.Guid');
    expect(actual).toBe(expected);
  });

  it('should parse Edm.Decimal to BigNumber', () => {
    const expected = new BigNumber('1.23');
    const actual = edmToTs('1.23', 'Edm.Decimal');
    expect(actual).toEqual(expected);
  });

  it('should parse Edm.Int16 to number', () => {
    const expected = 16;
    const actual = edmToTs('16', 'Edm.Int16');
    expect(actual).toBe(expected);
  });

  it('should parse Edm.Int32 to number', () => {
    const expected = 16;
    const actual = edmToTs('16', 'Edm.Int32');
    expect(actual).toBe(expected);
  });

  it('should parse Edm.Int64 to number', () => {
    const expected = new BigNumber(16);
    const actual = edmToTs('16', 'Edm.Int64');
    expect(actual).toEqual(expected);
  });

  it('should parse Edm.Single to number', () => {
    const expected = 16;
    const actual = edmToTs('16', 'Edm.Single');
    expect(actual).toBe(expected);
  });

  it('should parse Edm.Double to number', () => {
    const expected = 16.1616;
    const actual = edmToTs('16.1616', 'Edm.Double');
    expect(actual).toBe(expected);
  });

  it('should parse Edm.Byte to number', () => {
    const expected = 255;
    const actual = edmToTs('255', 'Edm.Byte');
    expect(actual).toBe(expected);
  });

  // This is not even used anywhere in S/4...
  it('should parse Edm.SByte to number', () => {
    const expected = -8;
    const actual = edmToTs('-8', 'Edm.SByte');
    expect(actual).toBe(expected);
  });

  it('should parse Edm.DateTime to Moment', () => {
    const expected = moment(1425427200000);
    const actual = edmToTs('/Date(1425427200000)/', 'Edm.DateTime');
    expect(actual).toEqual(expected);
  });

  it('should parse Edm.DateTimeOffset to Moment', () => {
    const expected = moment(1425427200000).utc().utcOffset(0);
    const actual = edmToTs('/Date(1425427200000+0000)/', 'Edm.DateTimeOffset');
    expect(actual).toEqual(expected);
  });

  it('should parse Edm.Time to Time', () => {
    const expected = {
      hours: 13,
      minutes: 20,
      seconds: 0
    };
    const actual = edmToTs('PT13H20M00S', 'Edm.Time');
    expect(actual).toEqual(expected);
  });

  it('should parse Edm.Binary to base64 string', () => {
    const expected = '23A0';
    const actual = edmToTs('23A0', 'Edm.Binary');
    expect(actual).toEqual(expected);
  });
});

describe('tsToEdm()', () => {
  it('should parse string to Edm.String', () => {
    const expected = 'testitest';
    const actual = tsToEdm(expected, 'Edm.String');
    expect(actual).toBe(expected);
  });

  it('should parse boolean to Edm.Boolean', () => {
    const expected = true;
    const actual = tsToEdm(true, 'Edm.Boolean');
    expect(actual).toBe(expected);
  });

  it('should parse string to Edm.Guid', () => {
    const expected = '005056ba-23b6-1ed4-b0ca-a49649d05e98';
    const actual = tsToEdm('005056ba-23b6-1ed4-b0ca-a49649d05e98', 'Edm.Guid');
    expect(actual).toBe(expected);
  });

  it('should parse BigNumber to Edm.Decimal', () => {
    const expected = '1.23';
    const actual = tsToEdm(new BigNumber('1.23'), 'Edm.Decimal');
    expect(actual).toBe(expected);
  });

  it('should parse number to Edm.Int16', () => {
    const expected = 16;
    const actual = tsToEdm(16, 'Edm.Int16');
    expect(actual).toBe(expected);
  });

  it('should parse number to Edm.Int32', () => {
    const expected = 16;
    const actual = tsToEdm(16, 'Edm.Int32');
    expect(actual).toBe(expected);
  });

  it('should parse BigNumber to Edm.Int64', () => {
    const expected = '16';
    const actual = tsToEdm(new BigNumber('16'), 'Edm.Int64');
    expect(actual).toStrictEqual(expected);
  });

  it('should parse number to Edm.Single', () => {
    const expected = 16;
    const actual = tsToEdm(16, 'Edm.Single');
    expect(actual).toBe(expected);
  });

  it('should parse number to Edm.Double', () => {
    const expected = 16.1616;
    const actual = tsToEdm(16.1616, 'Edm.Double');
    expect(actual).toBe(expected);
  });

  it('should parse number to Edm.Byte', () => {
    const expected = 255;
    const actual = tsToEdm(255, 'Edm.Byte');
    expect(actual).toBe(expected);
  });

  // This is not even used anywhere in S/4...
  it('should parse number to Edm.SByte', () => {
    const expected = -8;
    const actual = tsToEdm(-8, 'Edm.SByte');
    expect(actual).toBe(expected);
  });

  it('should parse Moment to Edm.DateTime', () => {
    const expected = '/Date(1425427200000)/';
    const actual = tsToEdm(moment(1425427200000), 'Edm.DateTime');
    expect(actual).toEqual(expected);
  });

  it('should parse Moment to Edm.DateTimeOffset', () => {
    const expected = '/Date(1425427200000+0000)/';
    const actual = tsToEdm(
      moment(1425427200000).utc().utcOffset(0),
      'Edm.DateTimeOffset'
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
      'Edm.Time'
    );
    expect(actual).toEqual(expected);
  });

  it('should parse UInt8Array to Edm.Binary', () => {
    const expected = '23A0';
    const actual = tsToEdm('23A0', 'Edm.Binary');
    expect(actual).toEqual(expected);
  });
});

describe('edm to ts to edm does not lead to information loss', () => {
  it('Edm.String', () => {
    const expected = 'teststring';
    expect(tsToEdm(edmToTs(expected, 'Edm.String'), 'Edm.String')).toBe(
      expected
    );
  });

  it('Edm.Boolean', () => {
    const expected = true;
    expect(tsToEdm(edmToTs(expected, 'Edm.Boolean'), 'Edm.Boolean')).toBe(
      expected
    );
  });

  it('Edm.Guid', () => {
    const expected = '005056ba-23b6-1ed4-b0ca-a49649d05e98';
    expect(tsToEdm(edmToTs(expected, 'Edm.Guid'), 'Edm.Guid')).toBe(expected);
  });

  it('Edm.Decimal', () => {
    const expected = '123456.789';
    expect(tsToEdm(edmToTs(expected, 'Edm.Decimal'), 'Edm.Decimal')).toBe(
      expected
    );
  });

  it('Edm.Double', () => {
    const expected = 1234.56;
    expect(tsToEdm(edmToTs(expected, 'Edm.Double'), 'Edm.Double')).toBe(
      expected
    );
  });

  it('Edm.Single', () => {
    const expected = 1234;
    expect(tsToEdm(edmToTs(expected, 'Edm.Single'), 'Edm.Single')).toBe(
      expected
    );
  });

  it('Edm.Int16', () => {
    const expected = 16;
    expect(tsToEdm(edmToTs(expected, 'Edm.Int16'), 'Edm.Int16')).toBe(expected);
  });

  it('Edm.Int32', () => {
    const expected = 32;
    expect(tsToEdm(edmToTs(expected, 'Edm.Int32'), 'Edm.Int32')).toBe(expected);
  });

  it('Edm.Int64', () => {
    const expected = '64';
    expect(tsToEdm(edmToTs(expected, 'Edm.Int64'), 'Edm.Int64')).toStrictEqual(
      expected
    );
  });

  it('Edm.SByte', () => {
    const expected = -8;
    expect(tsToEdm(edmToTs(expected, 'Edm.SByte'), 'Edm.SByte')).toBe(expected);
  });

  it('Edm.DateTime', () => {
    const expected = '/Date(1425427200000)/';
    expect(tsToEdm(edmToTs(expected, 'Edm.DateTime'), 'Edm.DateTime')).toBe(
      expected
    );
  });

  it('Edm.DateTimeOffset', () => {
    const expected = '/Date(1425427200000+1000)/';
    expect(
      tsToEdm(edmToTs(expected, 'Edm.DateTimeOffset'), 'Edm.DateTimeOffset')
    ).toBe(expected);
  });

  it('Edm.Time', () => {
    const expected = 'PT13H20M00S';
    expect(tsToEdm(edmToTs(expected, 'Edm.Time'), 'Edm.Time')).toBe(expected);
  });

  it('Edm.Binary', () => {
    const expected = 'BASE64==';
    expect(tsToEdm(edmToTs(expected, 'Edm.Binary'), 'Edm.Binary')).toBe(
      expected
    );
  });

  it('Edm.Byte', () => {
    const expected = 8;
    expect(tsToEdm(edmToTs(expected, 'Edm.Byte'), 'Edm.Byte')).toBe(expected);
  });
});

describe('parseNumber', () => {
  it('parses a number from string or returns the corresponding Number construct for INF, -INF and NaN', () => {
    expect(parseNumber('INF')).toEqual(Number.POSITIVE_INFINITY);
    expect(parseNumber('-INF')).toEqual(Number.NEGATIVE_INFINITY);
    expect(Number.isNaN(parseNumber('NaN'))).toBeTruthy();
    expect(parseNumber('32')).toBe(32);
  });

  it('can handle input in arbitrary cases', () => {
    expect(parseNumber('InF')).toEqual(Number.POSITIVE_INFINITY);
    expect(parseNumber('inf')).toEqual(Number.POSITIVE_INFINITY);
    expect(parseNumber('iNF')).toEqual(Number.POSITIVE_INFINITY);
  });

  it('throws an error for non-numbers', () => {
    expect(() => parseNumber('something something danger zone')).toThrow();
  });
});

describe('edm to moment and back', () => {
  describe('edm to moment', () => {
    it('returns a non utc date if there is no offset', () => {
      const aMoment = edmDateTimeToMoment('/Date(1556630382000)/');
      expect(aMoment['_isUTC']).toBeFalsy();
    });

    it('returns a utc date if there is an offset', () => {
      const aMoment = edmDateTimeToMoment('/Date(1556630382000+0000)/');
      expect(aMoment['_isUTC']).toBeTruthy();
      expect(aMoment.format('YYYY-MM-DD HH:mm')).toBe('2019-04-30 13:19');
    });

    it('handles two digit offsets', () => {
      const aMoment = edmDateTimeToMoment('/Date(1556630382000+0030)/');
      expect(aMoment.utcOffset()).toBe(30);
    });
  });

  describe('moment to edm', () => {
    it('returns no offset for non-utc dates', () => {
      const edmDateTime = momentToEdmDateTime(moment(1556630382000));
      expect(edmDateTime).toBe('/Date(1556630382000)/');
    });

    it('returns an offset for utc dates', () => {
      const edmDateTime = momentToEdmDateTime(
        moment(1556630382000).utc().utcOffset(120)
      );
      expect(edmDateTime).toBe('/Date(1556630382000+0120)/');
    });

    it('handles negative offsets', () => {
      const edmDateTime = momentToEdmDateTime(
        moment(1556630382000).utc().utcOffset(-120)
      );
      expect(edmDateTime).toBe('/Date(1556630382000-0120)/');
    });

    it('handles two digit offsets', () => {
      const edmDateTime = momentToEdmDateTime(
        moment(1556630382000).utc().utcOffset(30)
      );
      expect(edmDateTime).toBe('/Date(1556630382000+0030)/');
    });
  });

  it('edm to moment to edm has no information loss', () => {
    const valueWithoutOffset = '/Date(1556630382000)/';
    const valueWithOffset = '/Date(1556630382000+0120)/';

    expect(momentToEdmDateTime(edmDateTimeToMoment(valueWithoutOffset))).toBe(
      valueWithoutOffset
    );
    expect(momentToEdmDateTime(edmDateTimeToMoment(valueWithOffset))).toBe(
      valueWithOffset
    );
  });
});
