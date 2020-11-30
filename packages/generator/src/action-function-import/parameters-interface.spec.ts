import { StructureKind } from 'ts-morph';
import { orderBreakfast } from '../../test/test-util/data-model';
import { parametersInterface } from './parameters-interface';

describe('parameters-interface', () => {
  it('functionImportParametersInterface', () => {
    expect(parametersInterface(orderBreakfast)).toEqual({
      kind: StructureKind.Interface,
      name: 'Params',
      isExported: true,
      properties: [
        {
          name: 'withHoneyToast',
          type: 'boolean',
          hasQuestionToken: true,
          docs: ['\nBreakfast includes a honey toast']
        }
      ],
      docs: ['\nType of the parameters to be passed to [[orderBreakfast]].']
    });
  });
});
