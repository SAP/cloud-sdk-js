import { packageJson } from './package-json';

describe('packageJson', () => {
  it('returns the package.json content', () => {
    expect(
      packageJson('workflow-service', 'description', '1.35.0', '1.23.1')
    ).toMatchSnapshot();
  });
});
