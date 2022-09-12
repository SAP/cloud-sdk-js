import mock from "mock-fs";
import { nextSdkVersion } from "./util";
import { resolve } from "path";

describe('nextSdkVersion', () => {
  afterEach(() => {
    mock.restore();
  });
  const sharedMock = {
    'package.json': `{ "name": "sap-cloud-sdk", "version": "1.2.3", "workspaces": ["packages/connectivity"] }`,
    'packages': {
      'connectivity': {
        'package.json': `{ "name": "@sap-cloud-sdk/connectivity" }`
      }
    }
  };

  it('should make a patch update', async () => {
    mock({
      ...sharedMock,
      '.changeset': {
        'config.json': mock.load(resolve('..', '.changeset', 'config.json')),
        'alex.md': "---\n" +
          "'@sap-cloud-sdk/connectivity': patch\n" +
          "---"
      }
    });

    expect(await nextSdkVersion()).toBe('1.2.4');
  })

  it('should make a minor update', async () => {
    mock({
      ...sharedMock,
      '.changeset': {
        'config.json': mock.load(resolve('..', '.changeset', 'config.json')),
        'alex.md': "---\n" +
          "'@sap-cloud-sdk/connectivity': patch\n" +
          "---",
        'bob.md': "---\n" +
          "'@sap-cloud-sdk/connectivity': minor\n" +
          "---"
      }
    });

    expect(await nextSdkVersion()).toBe('1.3.0');
  })

  it('should throw an error, when no changesets exist', async () => {
    mock({
      ...sharedMock,
      '.changeset': {
        'config.json': mock.load(resolve('..', '.changeset', 'config.json'))
      }
    });

    await expect(nextSdkVersion()).rejects.toThrowErrorMatchingSnapshot();
  })

  it('should not make a major update', async () => {
    mock({
      ...sharedMock,
      '.changeset': {
        'config.json': mock.load(resolve('..', '.changeset', 'config.json')),
        'carl.md': "---\n" +
          "'@sap-cloud-sdk/connectivity': major\n" +
          "---"
      }
    });

    await expect(nextSdkVersion()).rejects.toThrowErrorMatchingSnapshot();
  })
})
