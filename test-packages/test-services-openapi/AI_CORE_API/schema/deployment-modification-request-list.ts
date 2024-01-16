/*
 * Copyright (c) 2024 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import type { DeploymentModificationRequestWithIdentifier } from './deployment-modification-request-with-identifier';
/**
 * Representation of the 'DeploymentModificationRequestList' schema.
 * @example [
 *   {
 *     "id": "aa97b177-9383-4934-8543-0f91a7a0283a",
 *     "targetStatus": "STOPPED"
 *   },
 *   {
 *     "id": "qweq32131-qwee-1231-8543-0f91a7a2e2e",
 *     "targetStatus": "DELETED"
 *   }
 * ]
 * Min Items: 1.
 * Max Items: 100.
 */
export type DeploymentModificationRequestList =
  Set<DeploymentModificationRequestWithIdentifier>;
