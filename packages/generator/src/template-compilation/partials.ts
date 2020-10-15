/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { registerPartial } from 'handlebars';
import { getTemplate } from './get-template';

export function registerPartials() {
  registerPartial('blockComment', getTemplate('general/block-comment.ts.mu'));
  registerPartial('imports', getTemplate('general/imports.mu'));
  registerPartial('entityClass', getTemplate('entity/class.mu'));
  registerPartial('entityInterfaces', getTemplate('entity/interface.mu'));
  registerPartial('entityNamespace', getTemplate('entity/namespace.mu'));
  registerPartial('staticProperty', getTemplate('entity/static-property.mu'));
  registerPartial(
    'staticNavigationProperty',
    getTemplate('entity/static-navigation-property.mu')
  );
  registerPartial('allFields', getTemplate('entity/all-fields.mu'));
}
