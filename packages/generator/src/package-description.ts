/* eslint-disable valid-jsdoc */

/**
 * @internal
 */
export const s4hanaCloudDescription = (packageName: string): string =>
  `SAP Cloud SDK for JavaScript: Virtual Data Model (VDM) for the SAP S/4HANA Cloud ${packageName
    .split('-')
    .join(' ')}`;
/**
 * @internal
 */
export const genericDescription = (packageName: string): string =>
  `SAP Cloud SDK for JavaScript: Virtual Data Model (VDM) for service ${packageName}`;
