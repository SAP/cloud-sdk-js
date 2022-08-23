/**
 * Interface containing the functions to extract the data from the response object.
 * For example the `getCollectionResult` extracts the data from `data.d.results` per default but this needs to be adjusted in some situations.
 */
export interface ResponseDataAccessor {
  /**
   * TODO-JSDOC.
   */
  getCollectionResult: (data) => any[];
  /**
   * TODO-JSDOC.
   */
  isCollectionResult: (data) => boolean;
  /**
   * TODO-JSDOC.
   */
  getSingleResult: (data: any) => Record<string, any>;
  /**
   * TODO-JSDOC.
   */
  getLinkedCollectionResult: (data) => any[];
}
