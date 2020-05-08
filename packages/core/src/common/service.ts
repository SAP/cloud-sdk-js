/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

export interface ServiceIdentifiable {
  readonly _oDataVersion: 'v2' | 'v4';
}

export type ODataVersion<T extends ServiceIdentifiable> = T['_oDataVersion'];
