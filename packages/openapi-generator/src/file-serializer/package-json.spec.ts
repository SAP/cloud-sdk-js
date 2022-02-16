import { packageJson } from './package-json';

describe('packageJson', () => {
  it('returns the package.json content', () => {
    expect(
      packageJson({
        npmPackageName: 'workflow-service',
        description: 'description',
        sdkVersion: '1.35.0',
        version: '1.23.1'
      })
    ).toMatchSnapshot();
  });

  it('includes the license', () => {
    const parsed = JSON.parse(
      packageJson({
        npmPackageName: 'workflow-service',
        description: 'description',
        sdkVersion: '1.35.0',
        version: '1.23.1',
        license: 'my license information'
      })
    );
    expect(parsed.license).toBe('my license information');
  });
});
