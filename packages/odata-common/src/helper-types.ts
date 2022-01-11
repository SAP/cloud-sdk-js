import {EntityApi} from "./entity-base";

export type inferDeserializer<forExtraction> = forExtraction extends EntityApi<infer EntityT, infer DeserializerT> ? DeserializerT : never;
export type inferEntity<forExtraction> = forExtraction extends EntityApi<infer EntityT, infer DeserializerT> ? EntityT : never;
