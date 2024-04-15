import { setOutput, setFailed } from '@actions/core';
import { getChangelog } from '../../scripts/get-changelog';

try {
  setOutput('changelog', getChangelog());
} catch (error)  {
  setFailed(error.message);
}
