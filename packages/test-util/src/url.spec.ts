import { checkUrlExists } from './url';

describe('url', () => {
  it('[E2E] fails for non existing link', async () => {
    await expect(
      checkUrlExists(
        'https://sap.github.io/cloud-sdk/docs/js/features/non-existing-features'
      )
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it('[E2E] does not fail for existing link', async () => {
    await expect(checkUrlExists('https://sap.github.io/cloud-sdk/')).resolves;
  });
});
