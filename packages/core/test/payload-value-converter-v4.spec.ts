/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import moment, { Duration, Moment } from 'moment';
import {
  tsToEdm
} from '../src/payload-value-converter';
import { EdmType } from '../src';



//replace later with real map
function edmToTs(value:string,edmType:EdmType|'Edm.Date'|'Edm.Duration'|'Edm.TimeOfDay'){
  switch (edmType) {
    case 'Edm.Date':
      return edmDateToMoment(value)
    case 'Edm.DateTimeOffset':
      return edmDateTimeOffsetToMoment(value)
    case 'Edm.Duration':
      return edmDurationToMoment(value)
    case 'Edm.TimeOfDay':
      return edmTimeOfDay(value)
    default:
      throw new Error('Implementation is missing.')
  }
}

//put to desrializer mapping
function edmDateToMoment(date:string):Moment{
  const parsed =  moment(date,'YYYY-MM-DD',true);
  if(!parsed.isValid()){
    throw new Error(`Provided date value ${date} does not follow the Edm.Date pattern: YYYY-MM-DD`)
  }
  return parsed
}

function edmDateTimeOffsetToMoment(dateTime: string):Moment {
  const prefix = 'YYYY-MM-DDTHH:mm'
  //In moment the Z is either Offset from UTC as +-HH:mm, +-HHmm, or Z
  const validFormats = [`${prefix}Z`,`${prefix}:ssZ`,`${prefix}:ss.SSSZ`]
  const parsed = moment(dateTime,validFormats,true)
  if(!parsed.isValid()){
    throw new Error(`Provided date-time value ${dateTime} does not follow the Edm.DateTimeOffset pattern: YYYY-MM-DDTHH:mm(:ss(.SSS))Z`)
  }
  return parsed
}

function edmDurationToMoment(value: string):Duration {
  return moment.duration(value)
}


function edmTimeOfDay(value: string):Moment {
  const prefix = 'HH:mm:ss'
  const validFormats = [`${prefix}`,`${prefix}.SSS`]
  const parsed =   moment.utc(value,validFormats,true)
  if(!parsed.isValid()){
    throw new Error(`Provided time-of-day value ${value} does not follow the Edm.TimeOfDay pattern: HH:mm:ss(.SSS)`)
  }
  return moment.utc({y:1970,M:0,d:0,h:parsed.hours(),m:parsed.minutes(),s:parsed.seconds(),ms:parsed.milliseconds()});
}

describe('edmToTs()', () => {
  it('should parse Edm.Date to moment', () => {
    const date ='2020-05-13';
    const actual = edmToTs(date, 'Edm.Date') as Moment;
    expect(actual.format('YYYY-MM-DD')).toBe(date);
  });

  it('should throw on wrong formatted Edm.Date', () =>{
    expect(()=>edmToTs('2020-1-123','Edm.Date')).toThrow(/does not follow the Edm.Date pattern/)
  })

  it('should parse Edm.DateTimeOffset to string', () => {
    //split for formats with names:
    const dateTimePrefix = '2020-05-13T16:14'
    const datePrefixUnix = 1589386440;
    let actual = edmToTs(`${dateTimePrefix}Z`,'Edm.DateTimeOffset') as Moment
    expect(actual.unix()).toBe(1589386440)

    actual = edmToTs(`${dateTimePrefix}:24Z`,'Edm.DateTimeOffset') as Moment
    expect(actual.unix()).toBe(1589386440+24)

    actual = edmToTs(`${dateTimePrefix}+05:00`,'Edm.DateTimeOffset') as Moment
    expect(actual.unix()).toBe(1589386440-3600*5)

    actual = edmToTs(`${dateTimePrefix}:17.987+03:00`,'Edm.DateTimeOffset') as Moment
    expect(actual.unix()).toBe(1589386440-3600*3+17)
    expect(actual.millisecond()).toBe(987)
  });

  it('should throw on wrong formatted Edm.DateTimeOffset', () =>{
    expect(()=>edmToTs('2020-05-13T16:14','Edm.DateTimeOffset')).toThrow(/ does not follow the Edm.DateTimeOffset pattern/)

    expect(()=>edmToTs('2020-05-13T16:14:23.1Z','Edm.DateTimeOffset')).toThrow(/ does not follow the Edm.DateTimeOffset pattern/)

    expect(()=>edmToTs('2020-05-13T16:14:23:57.97+5:00','Edm.DateTimeOffset')).toThrow(/ does not follow the Edm.DateTimeOffset pattern/)

    expect(()=>edmToTs('2020-05-13T16:14:23+5:00','Edm.DateTimeOffset')).toThrow(/ does not follow the Edm.DateTimeOffset pattern/)
  })

  it('should parse Edm.Duration to moment.duration',()=>{
    const durationAll = '-P3DT6H32M49.987S'
    let expected = -1 * (( 3 * 24 * 60 * 60  + 6 * 60 * 60 + 32 * 60 + 49) * (1000) + 987)
    let actual = edmToTs(durationAll,'Edm.Duration') as Duration
    expect(actual.asMilliseconds()).toBe(expected)

    const durationSomeDefaults = 'PT6H49S'
    expected = ( 6 * 60 * 60  + 49 ) * 1000
    actual = edmToTs(durationSomeDefaults,'Edm.Duration') as Duration
    expect(actual.asMilliseconds()).toBe(expected)
  })

  it('should return duration 0 for wrong formatted Edm.Duration', () =>{
    //Discuss if we should be more strict with some regex pattern
    expect((edmToTs('someThingWrong','Edm.Duration') as Duration).asMilliseconds()).toBe(0)
  })

  it('should parse Edm.TimeOfDay to moment.utc since there is proper time object', ()=>{
    let timeOfDay = '06:46:32'
    const expected = 6 * 60 * 60 + 46 * 60 + 32;
    let actual = edmToTs(timeOfDay,'Edm.TimeOfDay') as Moment;
    expect(actual.unix()).toBe(expected)

    timeOfDay = '06:46:32.965'
    actual = edmToTs(timeOfDay,'Edm.TimeOfDay') as Moment;
    expect(actual.unix()).toBe(expected)
    expect(actual.milliseconds()).toBe(965)
  })

  it('should throw on wrong formatter Edm.TimeOfDay',()=>{
    expect(()=>edmToTs('05:1:45','Edm.TimeOfDay')).toThrow(/ does not follow the Edm.TimeOfDay pattern/)
    expect(()=>edmToTs('05:1:45.2','Edm.TimeOfDay')).toThrow(/ does not follow the Edm.TimeOfDay pattern/)
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

});
