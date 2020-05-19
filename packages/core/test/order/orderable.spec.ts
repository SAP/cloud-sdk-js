/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { asc, desc } from '../../src';
import { TestEntity } from '../test-util/test-services/v2/test-service';

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
