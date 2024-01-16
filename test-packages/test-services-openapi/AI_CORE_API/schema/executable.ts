/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { ExecutableBaseData } from './executable-base-data';
import type { ExecutableDetailData } from './executable-detail-data';
import type { CreationData } from './creation-data';
import type { ModificationData } from './modification-data';
/**
 * An ML executable consists of a set of ML tasks, flows between tasks, dependencies between tasks, models (or model versions?).
 *
 */
export type Executable = ExecutableBaseData &
  ExecutableDetailData &
  CreationData &
  ModificationData;
