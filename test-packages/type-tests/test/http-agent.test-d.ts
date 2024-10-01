import { getAgentConfigAsync } from '@sap-cloud-sdk/connectivity';
import { expectType } from 'tsd';
import type {
  HttpAgentConfig,
  HttpsAgentConfig
} from '@sap-cloud-sdk/connectivity';

expectType<Promise<HttpAgentConfig | HttpsAgentConfig>>(
  getAgentConfigAsync({ name: 'destination', url: 'url' })
);
