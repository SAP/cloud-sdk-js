/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { ScenarioLabelList } from './scenario-label-list';
/**
 * Representation of the 'ScenarioBaseData' schema.
 */
export type ScenarioBaseData =
  | {
      /**
       * Name of the scenario
       * Max Length: 256.
       */
      name: string;
      /**
       * Description of the scenario
       * Max Length: 5000.
       */
      description?: string;
      labels?: ScenarioLabelList;
    }
  | Record<string, any>;
