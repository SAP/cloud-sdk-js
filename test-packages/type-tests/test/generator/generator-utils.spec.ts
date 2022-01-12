import type { EdmTypeShared } from '@sap-cloud-sdk/odata-common/internal';
import { getFallbackEdmTypeIfNeeded } from '@sap-cloud-sdk/generator/internal';

// $ExpectType EdmTypeShared
const edmType:EdmTypeShared<'any'> = getFallbackEdmTypeIfNeeded('Edm.Any');
