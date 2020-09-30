try {
  // See docs/specs/0005_analytics-lifecycle-trick.md
  const analytics = require('@sap-cloud-sdk/analytics');
  const path = require('path');

  const pathOfPostinstallScript = path.resolve(__dirname);
  analytics.performUsageAnalytics(pathOfPostinstallScript, {
    event_type: 'npm_install_core'
  });
} catch (e) {
  console.log('Looks like a local install to me.');
}
