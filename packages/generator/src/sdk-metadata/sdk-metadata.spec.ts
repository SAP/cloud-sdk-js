import nock = require('nock');
import { createOptions } from '../../test/test-util/create-generator-options';
import { VdmServiceMetadata } from '../vdm-types';
import { getTestService } from './pregenerated-lib.spec';
import {
  getSdkMetadataFileNames,
  sdkMetaDataHeader,
  sdkMetaDataJS, sdkMetaDataJSFallback
} from './sdk-metadata';

describe('sdk-metadata', () => {
  const service = getTestService();

  it('generates the header content from objects', async () => {
    expect(
      sdkMetaDataHeader(
        service,
        createOptions({ versionInPackageJson: '1.0.0' })
      )
    ).toMatchSnapshot();
  });


  it('generates the header content from strings', async () => {
    expect(
      sdkMetaDataHeader(
        'serviceName',
        'clientVersion'
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
    nock('http://registry.npmjs.org/').head(/.*/).reply(200);

    expect(metaData).toMatchSnapshot();
    expect(metaData.serviceStatus.status).toBe('verified');
    expect(metaData.pregeneratedLibrary).toBeUndefined();
    expect(metaData.serviceStatus.statusText).toBe(
      'The generation process for this API works.'
    );
  });


  it('generates the JS metadta fallback content',async ()=>{
    const metaData = await sdkMetaDataJSFallback(
     '1234'
    );
    nock('http://registry.npmjs.org/').head(/.*/).reply(200);

    expect(metaData).toMatchSnapshot();
    expect(metaData.serviceStatus.status).toBe('unknown');
    expect(metaData.pregeneratedLibrary).toBeUndefined();
    expect(metaData.serviceStatus.statusText).toBe(
      'No information for this service present.'
    );
  })
});
