/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { resolve } from 'path';
import { readFileSync } from 'fs-extra';

export function getTemplate(path: string): string {
  return readFileSync(resolve(__dirname, '..', 'templates', path), 'utf8');
}
