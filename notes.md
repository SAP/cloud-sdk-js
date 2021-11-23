- RequestBuilder

- EntityRequestBuilder

  - deSerializers only used for type
  - need to pass deSerializers to navigation property entity builders

- Entity

  - generic properties
  - complex types
  - collection properties
  - navigation properties

  - static fields
    - EDM type fields
    - custom fields
    - orderable fields
    - complex type fields
    - collection fields
    - enum fields
    - filters
      - currently problematic
      - separation of entity + API
    - filter functions



- Possible improvements
  - make CustomDeSerializer type obsolete
  - remove default types from `requestBuilder` and `builder` static methods (reduce imports on pregenerated libs)


Ideas:
- generate
- extend


- Filters depend on entity, but do not need the entity in JS

- API should be "decided" by beta release

Open Questions:
- Can we reduce the type parameters in the EntityApi?
- Should filter functions be part of the first beta scope?
  - API should be decided
  - implementation can come later
- Do lambda functions work?
- Plan parallelization
  - Temporal
  - Generators
- Beta could also work without default switch
