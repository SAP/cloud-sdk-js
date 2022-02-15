require('./usage-analytics');

printUpgradeAnnouncement();

function printUpgradeAnnouncement() {
  if (!process.env.SAP_CLOUD_SDK_SILENT) {
    /* eslint-disable no-console */
    console.log('');
    console.log('============================================');
    console.log('🚀 SAP Cloud SDK Announcement');
    console.log('');
    console.log('The SAP Cloud SDK has released version 2.');
    console.log(
      'Read more in our upgrade guidance: https://sap.github.io/cloud-sdk/docs/js/guides/upgrade-to-version-2'
    );
    console.log('============================================');
    console.log('');
  }
}
