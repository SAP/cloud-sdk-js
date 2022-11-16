import { unixEOL } from '@sap-cloud-sdk/util';
import { breakfastEntity } from '../../../test/test-util/data-model';
import { requestBuilderSourceFile } from './file';

describe('source file', () => {
  it('generates the expected imports', () => {
    const sourceFileAsString = requestBuilderSourceFile(breakfastEntity, 'v2');
    const lines = sourceFileAsString.split(unixEOL);
    const odataV2ImportLine = lines.filter(
      line => line.indexOf('@sap-cloud-sdk/odata-v2') > 1
    )[0];
    expect(odataV2ImportLine).toBeDefined();
    const breakfastImportLine = lines.filter(
      line => line.indexOf('./Breakfast') > 1
    )[0];
    expect(breakfastImportLine).toBeDefined();
  });

  it('contains the expected class', () => {
    const sourceFileAsString = requestBuilderSourceFile(breakfastEntity, 'v2');
    expect(sourceFileAsString).toContain(
      'export class BreakfastRequestBuilder'
    );
    expect([...sourceFileAsString.matchAll(/export class/g)].length).toBe(1);
  });

  it('contains the same number of opening and closing braces and parentheses', () => {
    const sourceFileAsString = requestBuilderSourceFile(breakfastEntity, 'v2');

    const openBraceCount = [...sourceFileAsString.matchAll(/{/g)].length;
    const closedBraceCount = [...sourceFileAsString.matchAll(/}/g)].length;
    expect(openBraceCount).toEqual(closedBraceCount);

    const openParenthesesCount = [...sourceFileAsString.matchAll(/\(/g)].length;
    const closedParenthesesCount = [...sourceFileAsString.matchAll(/\)/g)]
      .length;
    expect(openParenthesesCount).toEqual(closedParenthesesCount);
  });
});
