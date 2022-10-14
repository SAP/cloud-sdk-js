import { boundTestService } from '../../../../test-packages/test-services-odata-v4/bound-test-service';

describe('BoundFunctionRequestBuilder', () => {
  it('does something', async () => {
    const { testEntityApi } = boundTestService();
    const entity = testEntityApi.entityBuilder().keyTestEntity(1).build();

    expect(
      await entity.boundFunctionWithoutArguments().url({ url: 'test' })
    ).toMatchInlineSnapshot(
      '"test/odata/test-service/TestEntity(KeyTestEntity=1)/TestService.boundFunctionWithoutArguments()"'
    );
  });
});
