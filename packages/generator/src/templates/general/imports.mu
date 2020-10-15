{{#each imports}}
import { {{#each imports as |i|}}{{i}}{{#unless @last}}, {{/unless}}{{/each}} } from '{{module}}';
{{/each}}
