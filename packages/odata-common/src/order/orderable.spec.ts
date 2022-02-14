import { CommonEntityApi } from '../../test/common-entity';
import { asc, desc } from './orderable';

const api = new CommonEntityApi();
describe('order type', () => {
  it('should be ascending', () => {
    const order = asc(api.schema.STRING_PROPERTY);
    expect(order.orderType).toBe('asc');
  });

  it('should be descending', () => {
    const order = desc(api.schema.STRING_PROPERTY);
    expect(order.orderType).toBe('desc');
  });

  it('should be ascending for complex type', () => {
    const order = asc(api.schema.COMPLEX_TYPE_PROPERTY.stringProperty);
    expect(order.orderType).toBe('asc');
  });
});
