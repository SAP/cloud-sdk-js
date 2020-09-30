import { generateProject } from '../src/generator';
import { GeneratorOptions } from '../src/generator-options';
import * as csnGeneration from '../src/service/csn';

const testGeneratorOptions: GeneratorOptions = {
  inputDir:
    '../../test-resources/service-specs/v2/API_TEST_SRV/API_TEST_SRV.edmx',
  outputDir: 'foo',
  useSwagger: false,
  writeReadme: false,
  forceOverwrite: false,
  clearOutputDir: false,
  serviceMapping: 'foo',
  generateNpmrc: true,
  generateTypedocJson: true,
  generatePackageJson: true,
  generateJs: false,
  s4hanaCloud: false,
  sdkAfterVersionScript: false,
  generateCSN: true
};

describe('edmx-to-csn', () => {
  it('should invoke csn', async () => {
    jest.spyOn(csnGeneration, 'csn');
    await generateProject(testGeneratorOptions);
    expect(csnGeneration.csn).toHaveBeenCalled();
  });
});
