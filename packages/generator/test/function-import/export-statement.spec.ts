import { exportStatement } from '../../src/function-import';
import { orderBreakfast } from '../test-util/data-model';

describe('export-statement', () => {
  it('exportStatement', () => {
    const actual = exportStatement([orderBreakfast]);

    expect(actual.declarationKind).toEqual('const');
    expect(actual.isExported).toBeTruthy();
    expect(actual.declarations).toEqual([{ name: 'functionImports', initializer: '{\norderBreakfast\n}' }]);
  });
});
