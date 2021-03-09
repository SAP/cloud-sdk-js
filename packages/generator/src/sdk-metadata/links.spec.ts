import { getLinks } from './links';
import { executeHttpRequest, http_version } from '@sap-cloud-sdk/core';

describe('sdk metadata links',()=>{


  const links = getLinks()

  it('contains only existing links',async ()=>{
    for(const link of Object.values(links)){
      await checkUrlExists(link)
  }})

})


export async function checkUrlExists(url:string){
  const response =  await executeHttpRequest({url},{method: 'get'})

  if(response.status !== 200){
    throw new Error(`Reques to ${url} failed with status: ${response.status}`)
  }
}
