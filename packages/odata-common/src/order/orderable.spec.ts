import { TestEntity } from '@sap-cloud-sdk/test-services/v2/test-service';
import { asc, desc } from '@sap-cloud-sdk/odata-common';

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
