import { getAgentConfig } from '@sap-cloud-sdk/connectivity';
import { expectType } from 'tsd';
import type {
  HttpAgentConfig,
  HttpsAgentConfig
} from '@sap-cloud-sdk/connectivity';

expectType<Promise<HttpAgentConfig | HttpsAgentConfig>>(
  getAgentConfig({ name: 'destination', url: 'url' })
);
