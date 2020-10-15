/**
 * All fields of the {{entity.className}} entity.
 */
export const _allFields: Array<{{getAllFieldTypes entity service}}> = [
{{#each entity.properties as | property |}}
  {{../entity.className}}.{{property.staticPropertyName}},
{{/each}}
{{#each entity.navigationProperties as | navProperty | }}
  {{../entity.className}}.{{navProperty.staticPropertyName}}{{#unless @last}},{{/unless}}
{{/each}}
];
