import { TestEntity } from '@sap-cloud-sdk/core/test/test-util/test-services/v2/test-service';
import { asc, desc } from './orderable';

describe('Orderable', () => {
  describe('order type', () => {
    it('should be ascending', () => {
      const order = asc(TestEntity.STRING_PROPERTY);
      expect(order.orderType).toBe('asc');
    });

    it('should be descending', () => {
      const order = desc(TestEntity.STRING_PROPERTY);
      expect(order.orderType).toBe('desc');
    });

    it('should be ascending for complex type', () => {
      const order = asc(TestEntity.COMPLEX_TYPE_PROPERTY.stringProperty);
      expect(order.orderType).toBe('asc');
    });
  });
});
