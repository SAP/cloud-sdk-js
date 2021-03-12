import { checkUrlExists } from './url';

describe('url',()=>{
  it('fails for non existing link',async()=>{
  await expect(checkUrlExists('https://sap.github.io/cloud-sdk/docs/js/features/non-existing-features')).rejects.toThrowErrorMatchingSnapshot();
});
});
