export interface ResponseDataAccessor {
  getCollectionResult: (data) => any[];
  isCollectionResult: (data) => boolean;
  getSingleResult: (data: any) => Record<string, any>;
  getLinkedCollectionResult: (data) => any[];
}
