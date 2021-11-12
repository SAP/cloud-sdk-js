import { getExpectedHelpfulLinks } from '../../test/test-util/readme-util';
import { VdmServiceMetadata } from '../vdm-types';
import { aggregatorReadme } from './readme';

describe('aggregator package readme', () => {
  it("returns the content of the package's README.md file", () => {
    expect(
      aggregatorReadme(
        [
          {
            npmPackageName: 'test'
          },
          {
            npmPackageName: '@test/package'
          }
        ] as VdmServiceMetadata[],
        'all-packages'
      )
    ).toBe(
      `# all-packages

This package is an aggregation of the following packages:
* test
* @test/package

${getExpectedHelpfulLinks()}
`
    );
  });
});
