/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { recordWarning } from './warnings';

const oldDependencies = [
  '@sap/cloud-sdk-util',
  '@sap/cloud-sdk-analytics',
  '@sap/cloud-sdk-core',
  '@sap/cloud-sdk-generator',
  '@sap/cloud-sdk-test-util'
];

export function checkOldDependencies(dependenciesInPackageJson: any) {
  oldDependencies.forEach(oldDependency =>
    checkOldDependency(dependenciesInPackageJson, oldDependency)
  );
}

function checkOldDependency(
  dependenciesInPackageJson: any,
  oldDependency: string
) {
  if (dependenciesInPackageJson[oldDependency]) {
    recordWarning(`Old SAP Cloud SDK: ${oldDependency} is detected.`);
  }
}
