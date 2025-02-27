import { getFallbackEdmTypeIfNeeded } from '@sap-cloud-sdk/generator/internal';
import { expectType } from 'tsd';
import type { EdmTypeShared } from '@sap-cloud-sdk/generator/internal';

expectType<EdmTypeShared>(getFallbackEdmTypeIfNeeded('Edm.Any'));
