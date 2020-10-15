export interface {{entity.className}}Type {
  {{#each entity.properties}}
  {{instancePropertyName}}{{#if nullable}}?{{/if}}: {{jsType}}{{#if isCollection}}[]{{/if}}{{#if nullable}} | null{{/if}};
  {{/each}}
  {{#each entity.navigationProperties}}
  {{instancePropertyName}}: {{toEntityClassName}}Type{{#if isCollection}}[]{{/if}};
  {{/each}}
}
