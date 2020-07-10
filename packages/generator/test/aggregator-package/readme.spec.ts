/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { readme } from '../../src/aggregator-package';
import { VdmServiceMetadata } from '../../src/vdm-types';
import { getExpectedHelpfulLinks } from '../test-util/readme-util';

describe('aggregator package readme', () => {
  it("returns the content of the package's README.md file", () => {
    expect(
      readme(
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
