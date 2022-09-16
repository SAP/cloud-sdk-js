import {
  getAgentConfig,
  HttpAgentConfig,
  HttpsAgentConfig
} from '@sap-cloud-sdk/connectivity';
import { expectType } from 'tsd';

expectType<HttpAgentConfig | HttpsAgentConfig>(
  getAgentConfig({ name: 'destination', url: 'url' })
);
