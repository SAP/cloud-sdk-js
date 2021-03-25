import { checkUrlExists } from '@sap-cloud-sdk/test-util';
import { getLinks } from './links';

describe('links',()=>{
  it('[E2E] contains only existing links',async ()=>{
    const links = getLinks();
    for(const link of Object.values(links)){
      await checkUrlExists(link);
  }
},10000);
});

