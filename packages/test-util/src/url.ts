import { ErrorWithCause } from '@sap-cloud-sdk/util';
import { executeHttpRequest } from '@sap-cloud-sdk/core';

/**
 * Checks wheater a URL is existing via a get request. Throws an exception if not.
 * @param url - URL to be checked
 */
export async function checkUrlExists(url: string): Promise<void>{
  try {
    const response = await executeHttpRequest({ url }, { method: 'get' });
    if(response.status !== 200){
      throw new Error(`Reques to ${url} failed with status: ${response.status}`);
    }
  }catch (err) {
    throw new ErrorWithCause(`Request to ${url} failed.`,err);
  }
}
