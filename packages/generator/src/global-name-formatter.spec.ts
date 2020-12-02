import { GlobalNameFormatter } from './global-name-formatter';
import { VdmMapping } from './service-mapping';

describe('global-name-formatter', () => {
  const vdmMapping: VdmMapping = {
    API_A_SERV: {
      directoryName: 'a-serv',
      servicePath: '/path/to/serv',
      npmPackageName: '@sap/a-serv'
    },
    API_B_SERV: {
      directoryName: 'b-serv',
      servicePath: '/path/to/serv',
      npmPackageName: '@sap/b-serv'
    }
  };

  it('gives precedence to names present in the mapping', () => {
    const globalNameFormatter = new GlobalNameFormatter(vdmMapping);

    expect(
      globalNameFormatter.uniqueDirectoryName('a-serv', 'API_A_SERV')
    ).toBe('a-serv');
    expect(
      globalNameFormatter.uniqueNpmPackageName('@sap/a-serv', 'API_A_SERV')
    ).toBe('@sap/a-serv');
  });

  it('does not return the same name twice, but a unique one every time', () => {
    const globalNameFormatter = new GlobalNameFormatter(vdmMapping);

    expect(globalNameFormatter.uniqueDirectoryName('a-serv', 'NOPE')).toBe(
      'a-serv-1'
    );
    expect(
      globalNameFormatter.uniqueNpmPackageName('@sap/a-serv', 'NOPE')
    ).toBe('@sap/a-serv-1');

    expect(globalNameFormatter.uniqueDirectoryName('a-serv', 'NOPE')).toBe(
      'a-serv-2'
    );
    expect(
      globalNameFormatter.uniqueNpmPackageName('@sap/a-serv', 'NOPE')
    ).toBe('@sap/a-serv-2');
  });

  it('handles null or incomplete mappings', () => {
    const globalNameFormatter = new GlobalNameFormatter(undefined);

    try {
      expect(() => globalNameFormatter.uniqueDirectoryName('a', 'b'));
      expect(() => globalNameFormatter.uniqueNpmPackageName('a', 'b'));
    } catch (error) {
      fail("Shouldn't have failed.");
    }
  });
});
