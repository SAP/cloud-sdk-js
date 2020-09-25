/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

export interface ResponseDataAccessor {
  getCollectionResult: (data) => any[];
  isCollectionResult: (data) => boolean;
  getSingleResult: (data: any) => Record<string, any>;
  getLinkedCollectionResult: (data) => any[];
}
