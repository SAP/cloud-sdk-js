/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { RestRequestBuilder } from '@sap-cloud-sdk/core';
import { PetstoreApi } from './open-api/api';
import './open-api/model';
export const PetstoreApiRequestBuilder = {
  listPets: () => new RestRequestBuilder<PetstoreApi, 'listPets'>(
    PetstoreApi,
    'listPets'
  ),
  createPets: () => new RestRequestBuilder<PetstoreApi, 'createPets'>(
    PetstoreApi,
    'createPets'
  ),
  showPetById: (petId: string) => new RestRequestBuilder<PetstoreApi, 'showPetById'>(
    PetstoreApi,
    'showPetById',
    petId
  )
};
