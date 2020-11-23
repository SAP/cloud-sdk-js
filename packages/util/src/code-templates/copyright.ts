import { codeBlock } from './code-block';

const year = new Date().getFullYear();

const commentLines = (lines: string[]): string =>
  lines
    ? codeBlock`
*
${lines.map(line => `* ${line}`)}
`
    : '';

export const sapCopyright = (...additionalLines: string[]) => codeBlock`
/*
 * Copyright (c) ${year} SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
`;

export const sapCopyrightOld = () => codeBlock`
/*
 * Copyright (c) ${year} SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
`;
