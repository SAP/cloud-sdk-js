import { getApiSpecificUsage, getGenerationDocumentation, getGenericUsage } from './generation-and-usage';
import { checkUrlExists } from './links.spec';

describe('sdk metadata - generation and usage content',()=>{
  it('creates generic usage example',async()=>{
    await expect(getGenericUsage()).resolves.toMatchSnapshot();
  });

  it('creates api specific usage for entity',async()=>{
    await expect(getApiSpecificUsage({ npmPackageName: '@sap/dummy-package', entities : [{ className:'DummyClass' }] } as any)).resolves.toMatchSnapshot();
  });

  it('gives instruction with working link',async ()=> {
    const url = getGenerationDocumentation().match(/(http.*)/)![1];
    checkUrlExists(url);
  });
});
