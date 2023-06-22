import {
  getAgentConfigAsync,
  HttpAgentConfig,
  HttpsAgentConfig
} from '@sap-cloud-sdk/connectivity';
import { expectType } from 'tsd';

expectType<Promise<HttpAgentConfig | HttpsAgentConfig>>(
  getAgentConfigAsync({ name: 'destination', url: 'url' })
);
