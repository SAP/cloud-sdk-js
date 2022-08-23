import { foodService } from '../../test/test-util/data-model';
import { readRequestType, writeRequestType } from './type';

describe('type', () => {
  const serviceV2 = foodService;

  it('considers only GET function imports for read response', () => {
    const types = (readRequestType(foodService).type as string).split('|');
    expect(types.join()).toMatch(/funcGetReturn/);
  });

  it('considers not POST function imports for read response', () => {
    const types = (readRequestType(foodService).type as string).split('|');
    expect(types.join()).not.toMatch(/funcPostReturn/);
  });

  it('considers POST function import for write response', () => {
    const types = (writeRequestType(foodService).type as string).split('|');
    expect(types.join()).toMatch(/funcPostReturn/);
  });

  it('considers not GET function import for write response', async () => {
    const types = (writeRequestType(foodService).type as string).split('|');
    expect(types.join()).not.toMatch(/funcGetReturn/);
  });
});
