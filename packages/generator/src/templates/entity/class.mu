/**
 * This class represents the entity "{{entity.entitySetName}}" of service "{{service.namespace}}".
 {{#if service/apiBusinessHubMetadata/communicationScenario}}
 * This service is part of the following communication scenarios: {{service.apiBusinessHubMetadata.communicationScenario}}.
 {{/if}}
 {{#if service/apiBusinessHubMetadata/url}}
 * See {{service.apiBusinessHubMetadata.url}} for more information.
 {{/if}}
 {{#each commentLines}}
 * {{.}}
 {{/each}}
 */
export class {{entity.className}} extends Entity{{oDataVersionSuffix}} implements {{entity.className}}Type {
  /**
   * Technical entity name for {{entity.className}}.
   */
  static _entityName = '{{entity.entitySetName}}';
  /**
   * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
   * Technical service name for {{entity.className}}.
   */
  static _serviceName = '{{service.namespace}}';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '{{service.servicePath}}';
  {{#each entity.properties}}
  /**
   * {{#if description}}{{description}}{{else}}{{titleFormat instancePropertyName}}.{{/if}}
   {{#if maxLength}}
   * Maximum length: {{maxLength}}.
   {{/if}}
   {{#if nullable}}
   * @nullable
   {{/if}}
   */
  {{instancePropertyName}}{{#if nullable}}?{{else}}!{{/if}}: {{jsType}}{{#if isCollection}}[]{{/if}};
  {{/each}}
  {{#each entity.navigationProperties}}
  /**
   * {{#if isCollection}}One-to-many{{else}}One-to-one{{/if}} navigation property to the [[{{toEntityClassName}}]] entity.
   */
  {{instancePropertyName}}!: {{toEntityClassName}}{{#if isCollection}}[]{{/if}};
  {{/each}}

  /**
   * Returns an entity builder to construct instances `{{entity.className}}`.
   * @returns A builder that constructs instances of entity type `{{entity.className}}`.
   */
  static builder(): EntityBuilderType<{{entity.className}}, {{entity.className}}Type> {
    return Entity{{oDataVersionSuffix}}.entityBuilder({{entity.className}});
  }

  /**
   * Returns a request builder to construct requests for operations on the `{{entity.className}}` entity type.
   * @returns A `{{entity.className}}` request builder.
   */
  static requestBuilder(): {{entity.className}}RequestBuilder {
    return new {{entity.className}}RequestBuilder();
  }

  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `{{entity.className}}`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `{{entity.className}}`.
   */
  static customField(fieldName: string): CustomField{{oDataVersionSuffix}}<{{entity.className}}> {
    return Entity{{oDataVersionSuffix}}.customFieldSelector(fieldName, {{entity.className}});
  }

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}
