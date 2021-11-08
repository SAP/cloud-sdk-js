import os from 'os';
import { getAnalyticsData } from './analytics-data';

jest.mock('fs', () => {
  const fs = jest.requireActual('fs');
  return {
    ...fs,
    readFileSync: jest.fn().mockReturnValue(`{
        "name": "../../../../core",
        "dependencies": {
          "axios": "0.19.0",
          "rambda": "1.2.3",
          "moment": "2.24.0",
          "@sap-cloud-sdk/util": "1.7.1",
          "@sap/cloud-sdk-vdm-business-partner-service": "1.7.1"
        },
        "devDependencies": {
          "typescript": "3.4.1"
        }
      }`)
  };
});

describe('analytics-data', () => {
  const tmpEnv = process.env;
  const salt =
    '7e5eb0e845e73b72310436f29252bf4ad0ef3d0d8c0ae189dec3d5ff2531e6a0';

  beforeEach(() => {
    jest.resetModules();
    process.env.npm_config_user_agent = 'npm/6.0.0 node/v10.11.1 darwin x64';
  });

  afterEach(() => {
    process.env = tmpEnv;
    jest.clearAllMocks();
  });

  it('getAnalyticsData', async () => {
    jest.spyOn(os, 'platform').mockImplementationOnce(() => 'darwin');
    jest.spyOn(os, 'release').mockImplementationOnce(() => '18.2.0');
    jest.spyOn(os, 'arch').mockImplementationOnce(() => 'x64');

    const data = await getAnalyticsData({ enabled: true, salt });

    expect(data).toEqual({
      project_id: hashedProjectIdentifierWithSalt,
      node: '10.11.1',
      npm: '6.0.0',
      os: 'darwin,18.2.0,x64',
      sdk_dependencies:
        '@sap-cloud-sdk/util@1.7.1, @sap/cloud-sdk-vdm-business-partner-service@1.7.1',
      third_party_dependencies:
        'axios@0.19.0, moment@2.24.0, rambda@1.2.3, typescript@3.4.1',
      typescript: 'true'
    });
  });

  it('getAnalyticsData returns something even if some information is missing', async () => {
    jest.spyOn(os, 'platform').mockImplementationOnce(() => 'darwin');
    jest.spyOn(os, 'release').mockImplementationOnce(() => '18.2.0');
    jest.spyOn(os, 'arch').mockImplementationOnce(() => 'x64');

    delete process.env.npm_config_user_agent;

    const data = await getAnalyticsData({ enabled: true, salt });

    expect(data).toEqual({
      project_id: hashedProjectIdentifierWithSalt,
      node: 'no version detected',
      npm: 'no version detected',
      os: 'darwin,18.2.0,x64',
      sdk_dependencies:
        '@sap-cloud-sdk/util@1.7.1, @sap/cloud-sdk-vdm-business-partner-service@1.7.1',
      third_party_dependencies:
        'axios@0.19.0, moment@2.24.0, rambda@1.2.3, typescript@3.4.1',
      typescript: 'true'
    });
  });

  const hashedProjectIdentifierWithSalt =
    '0fb2c766d6da5ada59c6117da2c297dcac532257e9d4db03d49a9a66bcb33d84';

  it('getProjectIdentifier should throw an error if the salt is missing', async () => {
    expect(getAnalyticsData({ enabled: true })).rejects.toThrow();
  });
});
