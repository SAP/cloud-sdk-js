import { codeBlock } from './code-block';

export const VALUE_IS_UNDEFINED = 'VALUE_IS_UNDEFINED';

export function getCopyrightHeader(): string {
  return codeBlock`
/*
 * Copyright (c) ${new Date().getFullYear()} SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
 `;
}
