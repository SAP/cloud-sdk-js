export namespace {{entity.className}} {
  {{#each entity.properties as | property | ~}}
  {{> staticProperty property=property entity=../entity~}}
  {{/each}}
  {{#each entity.navigationProperties as | navProperty | }}
  {{> staticNavigationProperty navProperty=navProperty entity=../entity}}
  {{/each}}
  {{> allFields}}
  /**
   * All fields selector.
   */
  export const ALL_FIELDS: AllFields<{{entity.className}}> = new AllFields('*', {{entity.className}});
  /**
   * All key fields of the {{entity.className}} entity.
   */
  export const _keyFields: Array<Field<{{entity.className}}>> = [{{#each entity.keys as | property |}}{{../entity.className}}.{{property.staticPropertyName}}{{#unless @last}}, {{/unless}}{{/each}}];
  /**
   * Mapping of all key field names to the respective static field property {{entity.className}}.
   */
  export const _keys: { [keys: string]: Field<{{entity.className}}> } = {{entity.className}}._keyFields.reduce((acc: { [keys: string]: Field<{{entity.className}}> }, field: Field<{{entity.className}}>) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
}
