import { getAgentConfig } from '@sap-cloud-sdk/core';

// $ExpectType HttpAgentConfig | HttpsAgentConfig
getAgentConfig({ name: 'destination', url: 'url' });
