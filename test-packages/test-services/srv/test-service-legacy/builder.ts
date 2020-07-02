import { TestEntityMultiLinkRequestBuilder } from '../v2/test-service';

export function getFoo():TestEntityMultiLinkRequestBuilder{
  return new TestEntityMultiLinkRequestBuilder();
}
