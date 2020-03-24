/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

export const s4hanaCloudDescription = (packageName: string): string =>
  `SAP Cloud SDK for JavaScript: Virtual Data Model (VDM) for the SAP S/4HANA Cloud ${packageName
    .split('-')
    .join(' ')}`;

export const genericDescription = (packageName: string): string =>
  `SAP Cloud SDK for JavaScript: Virtual Data Model (VDM) for service ${packageName}`;
