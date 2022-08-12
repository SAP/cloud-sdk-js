import { foodService } from '../../test/test-util/data-model';
import { readRequestType } from './type';

describe('type', () => {
  const serviceV2 = foodService;

  it('considers only GET function imports for read response', () => {
    const types = (readRequestType(foodService).type as string).split('|');
    expect(types).toContain(
      'FunctionImportRequestBuilder<DeSerializersT, funcGetReturn<DeSerializersT>, string>'
    );
  });

  it('considers not POST function imports for read response', () => {
    const types = (readRequestType(foodService).type as string).split('|');
    expect(types).not.toContain(
      'FunctionImportRequestBuilder<DeSerializersT, funcPostReturn<DeSerializersT>, string>'
    );
  });
});
