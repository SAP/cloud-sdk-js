import { getChangelog } from '../../../scripts/get-changelog';
import { setOutput, setFailed } from '@actions/core';

try {
  setOutput('changelog', getChangelog());
} catch (error) {
  setFailed(error.message);
}
