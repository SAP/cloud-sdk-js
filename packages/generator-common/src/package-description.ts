/**
 * @internal
 */
export function packageDescription(
  packageName: string,
  formatter?: (packageName: string) => string
): string {
  const formattedPackageName = formatter ? formatter(packageName) : packageName;
  return `SAP Cloud SDK for JavaScript: Virtual Data Model (VDM) for service ${formattedPackageName}`;
}
