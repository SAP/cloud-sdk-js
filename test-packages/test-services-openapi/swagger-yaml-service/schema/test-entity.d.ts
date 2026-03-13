/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
/**
 * Representation of the 'TestEntity' schema.
 */
export type TestEntity = {
  /**
   * A string property
   */
  stringProperty?: string;
  /**
   * An integer property
   */
  integerProperty?: number;
  /**
   * An array of enum property
   */
  stringArrayEnum?: ('EnumVariantOne' | 'EnumVariantTwo')[];
} & Record<string, any>;
