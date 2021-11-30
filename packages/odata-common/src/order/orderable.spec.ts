import { CommonEntity } from '../../test/common-entity';
import { asc, desc } from './orderable';

describe('Orderable', () => {
  describe('order type', () => {
    it('should be ascending', () => {
      const order = asc(CommonEntity.STRING_PROPERTY);
      expect(order.orderType).toBe('asc');
    });

    it('should be descending', () => {
      const order = desc(CommonEntity.STRING_PROPERTY);
      expect(order.orderType).toBe('desc');
    });

    it('should be ascending for complex type', () => {
      const order = asc(CommonEntity.COMPLEX_TYPE_PROPERTY.stringProperty);
      expect(order.orderType).toBe('asc');
    });
  });
});
