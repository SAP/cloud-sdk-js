/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { DiscriminatorEntityChildA } from './discriminator-entity-child-a';
import type { DiscriminatorEntityChildB } from './discriminator-entity-child-b';
/**
 * Representation of the 'DiscriminatorEntityWithoutMapping' schema.
 */
export type DiscriminatorEntityWithoutMapping =
  | ({
      type: 'DiscriminatorEntityChildA';
    } & DiscriminatorEntityChildA)
  | ({
      type: 'DiscriminatorEntityChildB';
    } & DiscriminatorEntityChildB);
