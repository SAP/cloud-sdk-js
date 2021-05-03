import nock = require('nock');
import { getSdkVersion } from '@sap-cloud-sdk/generator-common';
import { GeneratorOptions } from '../options';
import { dummyOpenApiDocument } from '../../test/test-util';
import { sdkMetadata } from './sdk-metadata';

describe('sdk-metadata', () => {
  it('generates metadata content for services without pregenerated lib', async () => {
    const metadata = await sdkMetadata(dummyOpenApiDocument, {
      packageVersion: '1.0.0'
    } as GeneratorOptions);
    expect(metadata).toMatchSnapshot({
      generationAndUsage: { generatorVersion: expect.any(String) }
    });
    expect(metadata.generationAndUsage.generatorVersion).toEqual(
      await getSdkVersion()
    );
  });

  it('generates metadata content for services with pregenerated lib', async () => {
    jest.spyOn(global.Date, 'now').mockImplementationOnce(() => 0);
    nock('http://registry.npmjs.org/').head(/.*/).reply(200);

    const metadata = await sdkMetadata(dummyOpenApiDocument, {
      packageVersion: '1.0.0'
    } as GeneratorOptions);
    expect(metadata).toMatchSnapshot({
      generationAndUsage: { generatorVersion: expect.any(String) }
    });
  });
});
