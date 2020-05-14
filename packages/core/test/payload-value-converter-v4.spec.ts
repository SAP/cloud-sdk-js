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
  it('should parse Edm.Date to moment', () => {
    const expected = moment('2020-05-13');
    const actual = edmToTs('2020-05-13', 'Edm.Date');
    expect(actual).toBe(expected);
  });

  it('should parse Edm.DateTimeOffset string without offset', () => {
    //split for formats with names:
    const dateTimePrefix = '2020-05-13T16:14:59'
    const formatPrefix = 'YYYY-MM-DDTHH:mm:ss'

    const noFracSeconds = `${dateTimePrefix}Z`
    const expectedNoOffset = moment(noFracSeconds,`${formatPrefix}Z`)
    expect(edmToTs(noFracSeconds,'Edm.DateTimeOffset')).toBe(expectedNoOffset);

    const maxFractionDigits = 3;
    for(let fractionDigits=1;fractionDigits <= maxFractionDigits;fractionDigits++){
      const value = `${dateTimePrefix}.${"9".repeat(fractionDigits)}Z`
      const expected = moment(value,`${formatPrefix}.${"S".repeat(fractionDigits)}Z`)
      expect(edmToTs(value,'Edm.DateTimeOffset')).toBe(expected);
    }
  });

  it('should parse Edm.DateTimeOffset string with offset', () => {
    //split for formats with names:
    const dateTimePrefix = '2020-05-13T16:14:59'
    const formatPrefix = 'YYYY-MM-DDTHH:mm:ss'

    const noFracSeconds = `${dateTimePrefix}-09:00`
    const expectedNoOffset = moment(noFracSeconds,`${formatPrefix}`).utcOffset("-09:00")
    expect(edmToTs(noFracSeconds,'Edm.DateTimeOffset')).toBe(expectedNoOffset);

    const maxFractionDigits = 3;
    for(let fractionDigits=1;fractionDigits <= maxFractionDigits;fractionDigits++){
      const value = `${dateTimePrefix}.${"9".repeat(fractionDigits)}-09:00`
      const expected = moment(value,`${formatPrefix}.${"S".repeat(fractionDigits)}Z`).utcOffset("-09:00")
      expect(edmToTs(value,'Edm.DateTimeOffset')).toBe(expected);
    }
  });


  it('should parse Edm.Duration to moment.duration',()=>{
    const durationAll = '-P3DT6H32M49.987S'
    expect(edmToTs(durationAll,'Edm.Duration')).toBe(moment.duration(durationAll))

    const durationSomeDefaults = 'PT6H49S'
    expect(edmToTs(durationAll,'Edm.Duration')).toBe(moment.duration(durationSomeDefaults))
  })

  it('should parse Edm.TimeOfDay to moment.utc since there is proper time object', ()=>{
    const timeOfDay = '06:46:32'

    const maxFractionDigits = 3;
    for(let fractionDigits=0;fractionDigits <= maxFractionDigits;fractionDigits++) {
      const timeOfDatWithFrac = fractionDigits === 0 ? timeOfDay : `${timeOfDay}.${"9".repeat(fractionDigits)}`
      const expected = moment.utc(timeOfDay,fractionDigits === 0 ? 'HH:mm:ss': `HH:mm:ss.${"S".repeat(fractionDigits)}`)
      expect(edmToTs(timeOfDatWithFrac,'Edm.TimeOfDay')).toBe(expected)
    }
  })
});

describe('tsToEdm()', () => {
  it('should convert moment to Edm.Date',()=>{

  })

  it('should convert moment to Edm.DateTimeOffset',()=>{

  })

  it('should convert moment.duration to Edm.Duration',()=>{

  })


  it('should convert moment to Edm.TimeOfDay',()=>{

  })
});

describe('edm to ts to edm does not lead to information loss', () => {
    it('Edm.Byte', () => {
    const expected = 8;
    expect(tsToEdm(edmToTs(expected, 'Edm.Byte'), 'Edm.Byte')).toBe(expected);
  });
});
