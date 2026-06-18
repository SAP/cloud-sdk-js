async function getVersionsDownloads(
  packageName: string
): Promise<Record<string, number>> {
  const res = await fetch(
    `https://api.npmjs.org/versions/${encodeURIComponent(packageName)}/last-week`
  );
  if (!res.ok) {
    throw new Error(`npm API error ${res.status} for ${packageName}`);
  }
  const data = (await res.json()) as { downloads: Record<string, number> };
  return data.downloads;
}

function aggregateStats(
  versionsDownloads: Record<string, number>
): Record<string, number> {
  return Object.entries(versionsDownloads)
    .filter(([version]) => !version.includes('-'))
    .reduce<Record<string, number>>((acc, [version, downloads]) => {
      const [major] = version.split('.');
      acc[major] = (acc[major] ?? 0) + downloads;
      return acc;
    }, {});
}

async function getStatsForPackage(packageName: string) {
  const versionsDownloads = await getVersionsDownloads(packageName);
  return {
    name: packageName,
    downloads: aggregateStats(versionsDownloads)
  };
}

async function getAllStats(): Promise<
  { name: string; downloads: Record<string, number> }[]
> {
  const packages = [
    '@sap-cloud-sdk/util',
    '@sap-cloud-sdk/connectivity',
    '@sap-cloud-sdk/http-client',
    '@sap-cloud-sdk/odata-v2',
    '@sap-cloud-sdk/odata-v4',
    '@sap-cloud-sdk/generator',
    '@sap-cloud-sdk/openapi',
    '@sap-cloud-sdk/openapi-generator',
    '@sap-cloud-sdk/test-util',
    '@sap-cloud-sdk/eslint-config',
    '@sap-cloud-sdk/temporal-de-serializers',
    '@sap-cloud-sdk/odata-common',
    '@sap-cloud-sdk/resilience',
    '@sap/cds'
  ];

  const stats: { name: string; downloads: Record<string, number> }[] = [];
  for (const packageName of packages) {
    const packageInfo = await getStatsForPackage(packageName);
    stats.push(packageInfo);
    await new Promise(resolve => setTimeout(resolve, 100)); // avoid potential API rate limits
  }
  return stats;
}

async function main() {
  const stats = await getAllStats();

  // eslint-disable-next-line no-console
  console.log(
    stats
      .map(
        ({ name, downloads }) =>
          name +
          ':\n' +
          Object.entries(downloads)
            .map(([version, dls]) => `- v${version}: ${dls} downloads`)
            .join('\n'),
        ''
      )
      .join('\n\n')
  );
}

main();
