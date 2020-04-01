/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { fail } from 'assert';
import BigNumber from 'bignumber.js';
import moment, { Moment } from 'moment';
import { createComplexType, edmToTs, Time } from '../../src';

const converter = {
  StringField: (controllingArea: string) => ({
    stringField: edmToTs(controllingArea, 'Edm.String')
  }),
  BooleanField: (booleanField: boolean) => ({
    booleanField: edmToTs(booleanField, 'Edm.Boolean')
  }),
  NumberField: (numberField: BigNumber) => ({
    numberField: edmToTs(numberField, 'Edm.Decimal')
  }),
  GuidField: (guidField: string) => ({
    guidField: edmToTs(guidField, 'Edm.Guid')
  }),
  IntField: (intField: number) => ({
    intField: edmToTs(intField, 'Edm.Int16')
  }),
  DateField: (dateField: Moment) => ({
    dateField: edmToTs(dateField, 'Edm.DateTime')
  }),
  TimeField: (timeField: Time) => ({
    timeField: edmToTs(timeField, 'Edm.Time')
  })
};

const time = { hours: 1, minutes: 20, seconds: 0 };

const json = {
  StringField: 'value',
  BooleanField: true,
  NumberField: new BigNumber(10),
  GuidField: '005056ba-23b6-1ed4-b0ca-a49649d05e98',
  IntField: 10,
  DateField: '/Date(1556630382000)/',
  TimeField: 'PT01H20M00S'
};

describe('create-complex-type', () => {
  it('createComplexType should map and instantiate a complex type ', () => {
    const actual = createComplexType(json, converter);
    const expected = {
      stringField: 'value',
      booleanField: true,
      numberField: new BigNumber(10),
      guidField: '005056ba-23b6-1ed4-b0ca-a49649d05e98',
      intField: 10,
      dateField: moment(1556630382000),
      timeField: time
    };
    expect(actual).toEqual(expected);
  });

  it('should fail if the json contains inadequate properties', () => {
    const mutatedJson = { ...json, AddedStringField: 'FAIL!' };
    try {
      createComplexType(mutatedJson, converter);
      fail();
    } catch (e) {
      expect(e.message).toEqual('converters[jsonKey] is not a function');
    }
  });
});
