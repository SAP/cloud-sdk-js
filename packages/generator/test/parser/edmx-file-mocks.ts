import * as entityParser from '../../src/parser/v4/entity-parser';
import { EdmxEntityType } from '../../src/parser/common/edmx-types';
import { EdmxNavigationProperty } from '../../src/parser/v4/edmx-types';


export function mockEntityTypes(entityTypes:EdmxEntityType<EdmxNavigationProperty>[]){
  return jest.spyOn(entityParser, 'parseEntityType').mockImplementation(()=>entityTypes)
}
