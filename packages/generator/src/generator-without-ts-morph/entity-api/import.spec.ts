import { Import } from '@sap-cloud-sdk/generator-common/internal';
import { mergeImports } from './imports';

describe('entity api import', () => {
  it('merge imports', () => {
    const someEmptyDeclaration = {
      moduleIdentifier: './empty',
      names: []
    } as Import;

    const typeImport1 = {
      moduleIdentifier: './module1',
      names: ['Type1'],
      typeOnly: true
    } as Import;

    const import1 = {
      moduleIdentifier: './module1',
      names: ['Import1'],
      typeOnly: false
    } as Import;

    const typeImport11 = {
      moduleIdentifier: './module1',
      names: ['Type11'],
      typeOnly: true
    } as Import;

    const import2 = {
      moduleIdentifier: './module2',
      names: ['Import2'],
      typeOnly: false
    } as Import;

    const merged = [
      {
        moduleIdentifier: './module1',
        names: ['Type1', 'Type11'],
        typeOnly: true
      },
      {
        moduleIdentifier: './module1',
        names: ['Import1'],
        typeOnly: false
      },
      {
        moduleIdentifier: './module2',
        names: ['Import2'],
        typeOnly: false
      }
    ] as Import[];
    expect(
      mergeImports([
        someEmptyDeclaration,
        typeImport1,
        typeImport11,
        import1,
        import2
      ])
    ).toEqual(merged);
  });
});
