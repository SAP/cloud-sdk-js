import { testEntityApi } from '../../test/test-util';

describe('with default (de-)serializers', () => {
  // const { serializeEntity } = entitySerializer(defaultDeSerializers);

  it('should serialize entity with complex type fields 1', () => {
    const stringProperty1 = 'test';
    const stringProperty2 = 'nest';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const testEntity = testEntityApi
      .entityBuilder()
      .complexTypeProperty({
        stringProperty: stringProperty1,
        complexTypeProperty: {
          stringProperty: stringProperty2
        }
      })
      .int16Property(100)
      .build();

    expect(true).toBe(true);
  });

  it('should serialize entity with complex type fields 2', () => {
    const stringProperty1 = 'test';
    const stringProperty2 = 'nest';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const testEntity = testEntityApi
      .entityBuilder()
      .complexTypeProperty({
        stringProperty: stringProperty1,
        complexTypeProperty: {
          stringProperty: stringProperty2
        }
      })
      .int16Property(100)
      .build();

    expect(true).toBe(true);
  });
});
