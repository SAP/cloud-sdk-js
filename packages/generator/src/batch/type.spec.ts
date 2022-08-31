import { foodService } from '../../test/test-util/data-model';
import { readRequestType, writeRequestType } from './type';

describe('type', () => {
  it('considers only GET function imports for read response', () => {
    const types = readRequestType(foodService).type as string;
    expect(types).toMatch(/funcGetReturn/);
  });

  it('considers not POST function imports for read response', () => {
    const types = readRequestType(foodService).type as string;
    expect(types).not.toMatch(/funcPostReturn/);
  });

  it('considers POST function import for write response', () => {
    const types = writeRequestType(foodService).type as string;
    expect(types).toMatch(/funcPostReturn/);
  });

  it('considers not GET function import for write response', async () => {
    const types = writeRequestType(foodService).type as string;
    expect(types).not.toMatch(/funcGetReturn/);
  });
});
