require('./usage-analytics');

printUpgradeAnnouncement();

function printUpgradeAnnouncement() {
  if (!process.env.SAP_CLOUD_SDK_SILENT) {
    /* eslint-disable no-console */
    console.log('');
    console.log('============================================');
    console.log('🚀 SAP Cloud SDK Announcement');
    console.log('');
    console.log(
      'The SAP Cloud SDK will release new major versions regularly starting in 2022.'
    );
    console.log(
      'A beta version for version 2 is expected to be released in November 2021.'
    );
    console.log(
      'We will ensure that upgrading takes less than one day of effort when using our upgrade guide.'
    );
    console.log(
      'Read more in our announcement post: https://sap.github.io/cloud-sdk/docs/js/announcing-version-2'
    );
    console.log('');
    console.log(
      'Set environment variable SAP_CLOUD_SDK_SILENT to hide this and future announcements.'
    );
    console.log('============================================');
    console.log('');
  }
}
