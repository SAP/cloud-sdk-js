/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { StructureKind } from 'ts-morph';
import { functionImportParametersInterface } from '../../src/function-import';
import { orderBreakfast } from '../test-util/data-model';

describe('parameters-interface', () => {
  it('functionImportParametersInterface', () => {
    expect(functionImportParametersInterface(orderBreakfast)).toEqual({
      kind: StructureKind.Interface,
      name: 'Params',
      isExported: true,
      properties: [
        {
          name: 'withHoneyToast',
          type: 'boolean',
          hasQuestionToken: true,
          docs: ['Breakfast includes a honey toast']
        }
      ],
      docs: ['Type of the parameters to be passed to [[orderBreakfast]].']
    });
  });
});
