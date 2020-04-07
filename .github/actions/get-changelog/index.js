const core = require('@actions/core');
const { getChangelog } = require('../../../scripts/get-changelog');

try {
  core.setOutput("changelog", getChangelog());
} catch (error) {
  core.setFailed(error.message);
}
