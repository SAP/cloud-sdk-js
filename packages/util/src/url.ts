import axios from 'axios';

/**
 * Checks whether a URL is existing via a head request.
 * @param url - URL to be checked.
 * @returns Promise - resolves if the URL exists.
 */
export async function checkUrlExists(url: string): Promise<number> {
  return axios
    .request({ url, method: 'HEAD' })
    .then(response => response.status);
}
