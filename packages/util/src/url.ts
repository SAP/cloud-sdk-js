import axios from 'axios';

/**
 * Checks whether a URL is existing via a head request.
 * @param url - URL to be checked
 * @returns promise - resolves if the URL exists
 */
export async function checkUrlExists(url: string): Promise<number> {
  return axios
    .request({ url, method: 'HEAD', timeout: 2 })
    .then(response => response.status);
}
