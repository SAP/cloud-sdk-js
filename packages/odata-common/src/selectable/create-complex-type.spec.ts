import { fail } from 'assert';
import BigNumber from 'bignumber.js';
import moment from 'moment';
import { Time } from '../time';
import { createComplexType } from './create-complex-type';
import {edmToTsV2} from "@sap-cloud-sdk/odata-v2";

const converter = {
  StringField: (controllingArea: string) => ({
    stringField: edmToTsV2(controllingArea, 'Edm.String')
  }),
  BooleanField: (booleanField: boolean) => ({
    booleanField: edmToTsV2(booleanField, 'Edm.Boolean')
  }),
  NumberField: (numberField: BigNumber) => ({
    numberField: edmToTsV2(numberField, 'Edm.Decimal')
  }),
  GuidField: (guidField: string) => ({
    guidField: edmToTsV2(guidField, 'Edm.Guid')
  }),
  IntField: (intField: number) => ({
    intField: edmToTsV2(intField, 'Edm.Int16')
  }),
  DateField: (dateField: moment.Moment) => ({
    dateField: edmToTsV2(dateField, 'Edm.DateTime')
  }),
  TimeField: (timeField: Time) => ({
    timeField: edmToTsV2(timeField, 'Edm.Time')
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
