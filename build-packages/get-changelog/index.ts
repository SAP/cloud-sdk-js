import { setOutput, setFailed } from '@actions/core';
// eslint-disable-next-line import/no-internal-modules
import { getChangelog } from '../../scripts/get-changelog';

(async () => {
  try {
    setOutput('changelog', await getChangelog());
  } catch (error) {
    setFailed(error.message);
  }
})();
