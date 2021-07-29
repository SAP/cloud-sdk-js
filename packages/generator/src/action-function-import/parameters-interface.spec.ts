import { unixEOL } from '@sap-cloud-sdk/util';
import { StructureKind } from 'ts-morph';
import {
  orderBreakfast,
  orderBreakfastNullable
} from '../../test/test-util/data-model';
import { parametersInterface } from './parameters-interface';

describe('parameters-interface', () => {
  it('functionImportParametersInterface not nullable', () => {
    expect(parametersInterface(orderBreakfast)).toEqual({
      kind: StructureKind.Interface,
      name: 'Params',
      isExported: true,
      properties: [
        {
          name: 'withHoneyToast',
          type: 'boolean',
          hasQuestionToken: false,
          docs: [`${unixEOL}Breakfast includes a honey toast`]
        }
      ],
      docs: [
        `${unixEOL}Type of the parameters to be passed to [[orderBreakfast]].`
      ]
    });
  });

  it('functionImportParametersInterface Nullable', () => {
    expect(parametersInterface(orderBreakfastNullable)).toEqual({
      kind: StructureKind.Interface,
      name: 'Params',
      isExported: true,
      properties: [
        {
          name: 'withHoneyToast',
          type: 'boolean | null',
          hasQuestionToken: true,
          docs: [`${unixEOL}Breakfast includes a honey toast`]
        }
      ],
      docs: [
        `${unixEOL}Type of the parameters to be passed to [[orderBreakfast]].`
      ]
    });
  });
});
