import { codeBlock } from '@sap-cloud-sdk/util';

/**
 * @returns A copyright header
 * @internal
 */
export function getCopyrightHeader(): string {
  return codeBlock`
/*
 * Copyright (c) ${new Date().getFullYear()} SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
 `;
}
