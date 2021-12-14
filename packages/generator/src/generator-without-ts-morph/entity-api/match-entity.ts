import {
  VdmNavigationProperty,
  VdmServiceMetadata,
  VdmEntity
} from '../../vdm-types';

export function matchEntity(
  navProp: VdmNavigationProperty,
  service: VdmServiceMetadata
): VdmEntity {
  const matchedEntity = service.entities.find(
    e => e.entitySetName === navProp.to
  );
  if (!matchedEntity) {
    throw Error(
      `Failed to find the entity from the service: ${JSON.stringify(
        service
      )} for nav property ${navProp}`
    );
  }

  return matchedEntity;
}
