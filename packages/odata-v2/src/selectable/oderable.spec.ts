import { TestEntity } from '@sap-cloud-sdk/test-services/v2/test-service';
import moment from 'moment';

describe('oderable', () => {
  describe('DateTime and DateTimeOffset fields', () => {
    const dateFilterValue = moment(1425427200000);
    const datetimefieldName = 'DateTimeProperty';
    const datetimeOffsetfieldName = 'DateTimeOffSetProperty';

    it('should create filter for type DateTimeOffset by passing moment() ', () => {
      const filter = TestEntity.DATE_TIME_OFF_SET_PROPERTY.equals(moment());
      expect(moment.isMoment(filter.value)).toBe(true);
    });

    it('should create filter for equals for type Edm.DateTime', () => {
      const filter = TestEntity.DATE_TIME_PROPERTY.equals(
        moment(1425427200000)
      );
      expect(filter.field).toBe(datetimefieldName);
      expect(filter.operator).toBe('eq');
      expect(filter.value).toEqual(dateFilterValue);
    });

    it('should create filter for equals for type Edm.DateTimeOffset', () => {
      const filter = TestEntity.DATE_TIME_OFF_SET_PROPERTY.equals(
        moment(1425427200000)
      );
      expect(filter.field).toBe(datetimeOffsetfieldName);
      expect(filter.operator).toBe('eq');
      expect(filter.value).toEqual(dateFilterValue);
    });
  });
});
