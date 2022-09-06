/**
 * Interface containing the functions to extract the data from the response object.
 * For example the `getCollectionResult` extracts the data from `data.d.results` per default but this needs to be adjusted in some situations.
 */
export interface ResponseDataAccessor {
  /**
   * A function that extracts array data from the response object.
   * The data is extracted per default from `data.d.results`.
   */
  getCollectionResult: (data) => any[];
  /**
   * Checks if the response is an array-like object.
   */
  isCollectionResult: (data) => boolean;
  /**
   * A function that extracts object data from the response object.
   * The data is extracted by default from `data.d.results`.
   */
  getSingleResult: (data: any) => Record<string, any>;
  /**
   * Extract the collection data from the one-to-many link response.
   * If the data does not contain a collection, an empty array is returned.
   */
  getLinkedCollectionResult: (data) => any[];
}
