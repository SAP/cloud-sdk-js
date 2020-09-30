import { ServiceNameFormatter } from '../../service-name-formatter';
import { VdmEnumType } from '../../vdm-types';
import { EdmxEnumType } from '../../edmx-parser/v4';

export function transformEnumTypesBase(
  edmTypes: EdmxEnumType[],
  formatter: ServiceNameFormatter
): VdmEnumType[] {
  const formattedTypes = edmTypes.reduce(
    (formatted, c) => ({
      ...formatted,
      [c.Name]: formatter.originalToEnumTypeName(c.Name)
    }),
    {}
  );
  return edmTypes.map(e => {
    const typeName = formattedTypes[e.Name];
    return {
      originalName: e.Name,
      typeName,
      members: e.Member.map(m => m.Name)
    };
  });
}
