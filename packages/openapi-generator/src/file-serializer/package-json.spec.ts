import { packageJson } from './package-json';

describe('packageJson', () => {
  it('returns the package.json content', () => {
    expect(
      packageJson('workflow-service', 'description', '1.35.0', '1.23.1')
    ).toMatchSnapshot();
  });

  it('returns the package.json content when packageVersion is undefined', () => {
    expect(
      packageJson('workflow-service', 'description', '1.35.0')
    ).toMatchSnapshot();
  });
});
