import {
  EdmTypeShared,
  getFallbackEdmTypeIfNeeded
} from '@sap-cloud-sdk/generator/internal';
import { expectType } from 'tsd';

expectType<EdmTypeShared>(getFallbackEdmTypeIfNeeded('Edm.Any'));
