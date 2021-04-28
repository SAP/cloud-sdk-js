import { sdkMetaDataJS } from './sdk-metadata';
import { GeneratorOptions } from '../options';
import { dummyOpenApiDocument } from '../../test/test-util';
import nock = require('nock');

describe('sdk-metadata', () => {
  it('generates metadata content for services without pregenerated lib', async () => {
    const metadata = await sdkMetaDataJS(dummyOpenApiDocument,
      {versionInPackageJson: '1.0.0'} as GeneratorOptions);
    expect(metadata).toMatchSnapshot();
    expect(metadata.serviceStatus.status).toBe('verified');
    expect(metadata.pregeneratedLibrary).toBeUndefined();
    expect(metadata.serviceStatus.statusText).toBe(
      'The generation process for this API works.'
    );
  });


  it('generates metadata content for services with pregenerated lib', async () => {
    jest.spyOn(global.Date, 'now').mockImplementationOnce(() => 0);
    nock('http://registry.npmjs.org/').head(/.*/).reply(200);

    const metadata = await sdkMetaDataJS(dummyOpenApiDocument,
      {versionInPackageJson: '1.0.0'} as GeneratorOptions);
    expect(metadata).toMatchSnapshot();
    expect(metadata.pregeneratedLibrary).toBeDefined();
    expect(metadata.serviceStatus.status).toBe('certified');
    expect(metadata.serviceStatus.statusText).toBe(
      'A pre-generated API client exists.'
    );
  });
});
