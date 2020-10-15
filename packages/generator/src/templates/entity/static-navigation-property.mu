/**
 * Static representation of the {{#if navProperty.isCollection}}one-to-many{{else}}one-to-one{{/if}} navigation property [[{{navProperty.instancePropertyName}}]] for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
{{#if navProperty.isCollection}}
export const {{navProperty.staticPropertyName}}: OneToManyLink<{{entity.className}}, {{navProperty.toEntityClassName}}> = new OneToManyLink('{{navProperty.originalName}}', {{entity.className}}, {{navProperty.toEntityClassName}});
{{else}}
export const {{navProperty.staticPropertyName}}: OneToOneLink<{{entity.className}}, {{navProperty.toEntityClassName}}> = new OneToOneLink('{{navProperty.originalName}}', {{entity.className}}, {{navProperty.toEntityClassName}});
{{/if}}
