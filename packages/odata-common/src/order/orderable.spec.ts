import {asc, desc} from "./orderable";
import {DummyEntity} from "../dummy-entity.spec";

describe('Orderable', () => {
  describe('order type', () => {
    it('should be ascending', () => {
      const order = asc(DummyEntity.STRING_PROPERTY);
      expect(order.orderType).toBe('asc');
    });

    it('should be descending', () => {
      const order = desc(DummyEntity.STRING_PROPERTY);
      expect(order.orderType).toBe('desc');
    });


    it('should be ascending for complex type', () => {
      const order = asc(DummyEntity.COMPLEX_TYPE_PROPERTY.stringProperty);
      expect(order.orderType).toBe('asc');
    });
  });
});
