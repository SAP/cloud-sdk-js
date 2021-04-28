import nock = require('nock');
import { createOptions } from '../../test/test-util/create-generator-options';
import {
  getSdkMetadataFileNames,
  sdkMetaDataHeader
} from '../common/sdk-metadata';
import { getTestService } from './pregenerated-lib.spec';
import { sdkMetaDataJS } from './sdk-metadata';

describe('sdk-metadata', () => {
  const service = getTestService();
  //todo move
  it('generates the header content', async () => {
    expect(
      await sdkMetaDataHeader('odata', service.originalFileName, '1.0.0')
    ).toMatchSnapshot();
  });
  //todo move
  it('generates the File names', () => {
    expect(getSdkMetadataFileNames('MyService')).toMatchSnapshot();
  });

  it('generates the JS metadata content for services with pregenerated lib', async () => {
    jest.spyOn(global.Date, 'now').mockImplementationOnce(() => 0);
    nock('http://registry.npmjs.org/').head(/.*/).reply(200);

    const metaData = await sdkMetaDataJS(
      service,
      createOptions({ versionInPackageJson: '1.0.0' })
    );
    expect(metaData).toMatchSnapshot();
    expect(metaData.pregeneratedLibrary).toBeDefined();
    expect(metaData.serviceStatus.status).toBe('certified');
    expect(metaData.serviceStatus.statusText).toBe(
      'A pre-generated API client exists.'
    );
  });

  it('generates the JS metadata content for services without pregenerated lib', async () => {
    const metaData = await sdkMetaDataJS(
      service,
      createOptions({ versionInPackageJson: '1.0.0' })
    );

    expect(metaData).toMatchSnapshot();
    expect(metaData.serviceStatus.status).toBe('verified');
    expect(metaData.pregeneratedLibrary).toBeUndefined();
    expect(metaData.serviceStatus.statusText).toBe(
      'The generation process for this API works.'
    );
  });
});
