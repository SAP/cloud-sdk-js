/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { DiscriminatorObjectEntityWorkaroundChildA } from './discriminator-object-entity-workaround-child-a';
import type { DiscriminatorObjectEntityWorkaroundChildB } from './discriminator-object-entity-workaround-child-b';
/**
 * Representation of the 'DiscriminatorObjectEntityWorkaroundParent' schema.
 */
export type DiscriminatorObjectEntityWorkaroundParent =
  | ({
      child: 'a';
    } & DiscriminatorObjectEntityWorkaroundChildA)
  | ({
      child: 'b';
    } & DiscriminatorObjectEntityWorkaroundChildB);
