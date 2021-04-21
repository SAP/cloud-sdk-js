import axios from 'axios';

/**
 * Checks whether a URL is existing via a head request. Throws an exception if not.
 * @param url - URL to be checked
 */
export async function checkUrlExists(url: string): Promise<void> {
  return axios.request({ url, method: 'HEAD' });
}
