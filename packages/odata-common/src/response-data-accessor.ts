/**
 * Interface containing the functions to extract the data from the response object.
 * For example the `getCollectionResult` extracts the data from `data.d.results` per default but this needs to be adjusted in some situations.
 */
export interface ResponseDataAccessor {
  /**
   * A function that extracts data from the response object.
   * The data is extracted per default from `data.d.results`.
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
