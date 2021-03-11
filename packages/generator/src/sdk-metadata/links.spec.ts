import { executeHttpRequest } from '@sap-cloud-sdk/core';
import { ErrorWithCause } from '@sap-cloud-sdk/util';
import { getLinks } from './links';

describe('sdk metadata links',()=>{
  it('contains only existing links',async ()=>{
    const links = getLinks();
    for(const link of Object.values(links)){
      await checkUrlExists(link);
  }
},10000);

  it('fails for non existing link',async()=>{
    await expect(checkUrlExists('https://sap.github.io/cloud-sdk/docs/js/features/non-existing-features')).rejects.toThrowErrorMatchingSnapshot();
  });
});

export async function checkUrlExists(url: string){
  try {
    const response = await executeHttpRequest({ url }, { method: 'get' });
    if(response.status !== 200){
      throw new Error(`Reques to ${url} failed with status: ${response.status}`);
    }
  }catch (err) {
    throw new ErrorWithCause(`Request to ${url} failed.`,err);
  }
}

