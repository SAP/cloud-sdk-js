import fs from 'fs';
import { SAPCPWorkflowCFApi } from '../test/test-util/test-services/openapi/SAP_CP_Workflow_CF';
import { Destination } from './connectivity/scp-cf/destination';

describe('export', () => {
  it('executes request', async () => {
    const token = '';
    const dest: Destination = {
      url:
        'https://wfs-app-for-marika.internal.cfapps.sap.hana.ondemand.com/workflow-service/rest'
    };
    const authHeader = { Authorization: `Bearer ${token}` };
    const endpoint =
      'https://wfs-app-for-marika.internal.cfapps.sap.hana.ondemand.com/workflow-service/rest/v1/export';
    try {
      // get workflow definition test
      const res1 = await SAPCPWorkflowCFApi.getV1WorkflowDefinitions()
        .addCustomHeaders(authHeader)
        .executeRaw(dest);
      expect(res1.status).toEqual(200);
      expect(res1.data).toEqual([]);

      // raw axios test
      // const axiosConfig: AxiosRequestConfig = {
      //   method: 'get',
      //   url: endpoint,
      //   headers: authHeader,
      //   responseType: 'arraybuffer'
      // };
      // const axiosRes = await axios.request(axiosConfig);
      // fs.writeFileSync('./e0.zip', axiosRes.data);

      //
      const res2 = await SAPCPWorkflowCFApi.getV1Export()
        .addCustomHeaders(authHeader)
        .executeRaw(dest, { responseType: 'arraybuffer' });
      console.log(res2.status);
      console.log(res2.data);

      fs.writeFileSync('./e1.zip', res2.data);

    } catch (err) {
      console.error(err);
    }
  });
});
