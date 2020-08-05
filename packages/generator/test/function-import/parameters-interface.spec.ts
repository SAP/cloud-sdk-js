/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { StructureKind } from 'ts-morph';
import { orderBreakfast } from '../test-util/data-model';
import { parametersInterface } from '../../src/action-function-import/parameters-interface';

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
