import {getAgentConfig} from "@sap-cloud-sdk/connectivity";

// $ExpectType HttpAgentConfig | HttpsAgentConfig
getAgentConfig({ name: 'destination', url: 'url' });
