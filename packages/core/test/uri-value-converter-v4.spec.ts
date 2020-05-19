/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { EdmWithV4, tsToEdm } from './payload-value-converter-v4.spec';
import moment from 'moment';

function convertToUriFormat(value: any, edmType: EdmWithV4): string {
  const converted = tsToEdm(value, edmType);
  switch (edmType) {
    case 'Edm.Date':
      return converted
      case 'Edm.DateTimeOffset':
        return converted;
    case 'Edm.TimeOfDay':
      return converted;
    case 'Edm.Duration':
      return `duration'${converted}'`
    case 'Edm.Guid':
      return converted;
    default:
      return converted
  }
}

describe('convertToUriFormat', () => {
  it('should convert guid',()=>{
    const value = '01234567-89ab-cdef-0123-456789abcdef'
    expect(convertToUriFormat(value,'Edm.Guid')).toBe(value)
  })

  it('should convert dateTimeOffset',()=>{
    expect(convertToUriFormat(moment(0),'Edm.DateTimeOffset')).toBe('1970-01-01T00:00:00.000Z')
  })

  it('should convert duration',()=>{
    const value = moment.duration({d:1,h:17,s:59,ms:123})
    expect(convertToUriFormat(value,'Edm.Duration')).toBe('duration\'P1DT17H59.123S\'')
  })

  it('should convert timeOfDay',()=>{
    expect(convertToUriFormat(moment(1589887303123),'Edm.TimeOfDay')).toBe('13:21:43.123')
  })

  it('should convert date',()=>{
    expect(convertToUriFormat(moment(1589887303000),'Edm.Date')).toBe('2020-05-19')
  })
});
