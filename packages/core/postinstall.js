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
      'The SAP Cloud SDK released version 2.0 in February 2022 and older versions are not actively supported.'
    );
    console.log(
      'We will ensure that upgrading takes less than one day of effort when using our upgrade guide.'
    );
    console.log(
      'Read more in our release post: https://blogs.sap.com/2022/02/11/we-proudly-present-version-2.0-of-the-sap-cloud-sdk-for-javascript/'
    );
    console.log('');
    console.log(
      'Set environment variable SAP_CLOUD_SDK_SILENT to hide this and future announcements.'
    );
    console.log('============================================');
    console.log('');
  }
}
