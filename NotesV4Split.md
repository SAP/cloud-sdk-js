## Genral Idea.
 
Make the `Entity` aware of the OData version  with the approach:
SomeThing<EntityT extends Entity> ==> SomeThing<EntityT extends Entity<Version>,Version=ODataV2>
So ODataV2 is the fallback so everything generated stays the same.

This extension holds up to the fields StringField<EntityT extends Entity<Version>,Version=ODataV2> and everything.


- Use V4 extension also in class not only in file name.
-Selectable seems like a huge duplicate
- CustomField and concrete String & StringComplex are for ODataV2 the base classes are for <Version>,
-ComplexTypeField have default V2 so that generator stays the same


-Edm-types conditional type for non breaking change
-Selectable conditional type for non breaking change
