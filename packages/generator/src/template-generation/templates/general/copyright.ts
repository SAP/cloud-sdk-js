import { codeBlock } from './common';
import { year } from './year';

export const copyRight = () => codeBlock`
/*
 * Copyright (c) ${year()} SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
`;
