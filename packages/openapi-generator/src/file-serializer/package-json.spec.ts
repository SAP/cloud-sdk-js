import { packageJson } from './package-json';

describe('packageJson', () => {
  it('returns the package.json content', () => {
    expect(
      packageJson({
        npmPackageName: 'workflow-service',
        description: 'description',
        sdkVersion: '1.35.0'
      })
    ).toMatchSnapshot();
  });

  it('includes the license', () => {
    const parsed = JSON.parse(
      packageJson({
        npmPackageName: 'workflow-service',
        description: 'description',
        sdkVersion: '1.35.0'
      })
    );
    expect(parsed.license).toBe('UNLICENSED');
  });

  it('includes type module when generateESM is true', () => {
    const parsed = JSON.parse(
      packageJson({
        npmPackageName: 'workflow-service',
        description: 'description',
        sdkVersion: '1.35.0',
        generateESM: true
      })
    );
    expect(parsed.type).toBe('module');
  });

  it('includes type module when generateESM is undefined', () => {
    const parsed = JSON.parse(
      packageJson({
        npmPackageName: 'workflow-service',
        description: 'description',
        sdkVersion: '1.35.0'
      })
    );
    expect(parsed.type).toBeUndefined();
  });
});
