/**
 * Interface containing the functions to extract the data from the response object.
 * For example the `getCollectionResult` extracts the data from `data.d.results` per default but this needs to be adjusted in some situations.
 */
export interface ResponseDataAccessor {
  getCollectionResult: (data) => any[];
  isCollectionResult: (data) => boolean;
  getSingleResult: (data: any) => Record<string, any>;
  getLinkedCollectionResult: (data) => any[];
}
