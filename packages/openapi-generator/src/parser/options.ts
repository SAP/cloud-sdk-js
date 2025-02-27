/**
 * Options that influence parsing.
 * @internal
 */
export interface ParserOptions {
  /**
   * Fail parsing on conflicting names.
   */
  strictNaming: boolean;
  /**
   * Add prefix to schema names.
   */
  schemaPrefix: string;
  /**
   * Resolve external references.
   */
  resolveExternal: boolean;
}
