import { EntityApi } from './entity-base';

export type inferEntity<forExtraction> = forExtraction extends EntityApi<
  infer EntityT,
  infer DeserializerT
>
  ? EntityT
  : never;
