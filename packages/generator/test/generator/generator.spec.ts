import { SourceFile } from 'ts-morph';
import { generateProject } from '../../src';
import { createOptions } from '../test-util/create-generator-options';

describe('generator', () => {
  let files: SourceFile[];

  describe('common', () => {
    it('copies the additional files matching the glob.', async () => {
      const project = await generateProject(
        createOptions({
          inputDir: '../../test-resources/service-specs/v2/API_TEST_SRV',
          additionalFiles: '../../test-resources/*.md'
        })
      );

      const sourceFiles = project!.getSourceFiles();
      expect(
        sourceFiles.find(file => file.getBaseName() === 'some-test-markdown.md')
      ).toBeDefined();
      expect(
        sourceFiles.find(file => file.getBaseName() === 'CHANGELOG.md')
      ).toBeDefined();
    });
  });
});
