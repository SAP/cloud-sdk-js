import { setOutput, setFailed } from '@actions/core';
import { getChangelog } from '../../scripts/get-changelog';

(async () => {
  try {
    setOutput('changelog', await getChangelog());
  } catch (error) {
    setFailed(error.message);
  }
})();
