import nock = require('nock');
import { createOptions } from '../../test/test-util/create-generator-options';
import { VdmServiceMetadata } from '../vdm-types';
import { getTestService } from './pregenerated-lib.spec';
import {
  getSdkMetadataFileNames,
  sdkMetaDataHeader,
  sdkMetaDataJS
} from './sdk-metadata';

describe('sdk-metadata', () => {
  const service = getTestService();

  it('generates the header content', async () => {
    expect(
      sdkMetaDataHeader(
        service,
        createOptions({ versionInPackageJson: '1.0.0' })
      )
    ).toMatchSnapshot();
  });

  it('generates the File names', () => {
    expect(
      getSdkMetadataFileNames({
        originalFileName: 'MyService'
      } as VdmServiceMetadata)
    ).toMatchSnapshot();
  });

  it('generates the JS metadata content for services with pregenerated lib', async () => {
    jest.spyOn(global.Date, 'now').mockImplementationOnce(() => 0);
    nock('http://registry.npmjs.org/').head(/.*/).reply(200);

    const metaData = await sdkMetaDataJS(
      service,
      createOptions({ versionInPackageJson: '1.0.0' })
    );
    expect(metaData).toMatchSnapshot();
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
    nock('http://registry.npmjs.org/').head(/.*/).reply(200);

    expect(metaData).toMatchSnapshot();
    expect(metaData.serviceStatus.status).toBe('verified');
    expect(metaData.serviceStatus.statusText).toBe(
      'The generation process for this API works.'
    );
  });
});
