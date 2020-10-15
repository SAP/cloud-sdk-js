/**
 * Static representation of the [[{{property.instancePropertyName}}]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
{{#if property.isCollection}}
{{#if property.isComplex~}}
  {{! complex type collection property ~}}
  export const {{property.staticPropertyName}}: {{property.fieldType}}<{{entity.className}}, {{property.jsType}}> = new {{property.fieldType}}('{{property.originalName}}', {{entity.className}}, {{property.jsType}});
{{else if property.isEnum~}}
  {{! enum type collection property ~}}
  export const {{property.staticPropertyName}}: {{property.fieldType}}<{{entity.className}}, 'Edm.Enum'> = new {{property.fieldType}}('{{property.originalName}}', {{entity.className}}, 'Edm.Enum');
{{else~}}
  {{! edm type collection property ~}}
  export const {{property.staticPropertyName}}: {{property.fieldType}}<{{entity.className}}, '{{property.edmType}}'> = new {{property.fieldType}}('{{property.originalName}}', {{entity.className}}, '{{property.edmType}}');
{{/if}}
{{else}}
{{#if property.isComplex~}}
  {{! complex type property ~}}
  export const {{property.staticPropertyName}}: {{property.fieldType}}<{{entity.className}}> = new {{property.fieldType}}('{{property.originalName}}', {{entity.className}});
{{else if property.isEnum~}}
  {{! enum type property ~}}
  export const {{property.staticPropertyName}}: {{property.fieldType}}<{{entity.className}}> = new {{property.fieldType}}('{{property.originalName}}', {{entity.className}});
{{else~}}
  {{! edm type property ~}}
  export const {{property.staticPropertyName}}: {{property.fieldType}}<{{entity.className}}> = new {{property.fieldType}}('{{property.originalName}}', {{entity.className}}, '{{property.edmType}}');
{{/if~}}
{{/if}}
