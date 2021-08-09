# Style Guide <!-- omit in toc -->

This style guide includes some basic rules to be applied when writing code in the SAP Cloud SDK.
Most of the rules are being checked by lint, but not all of them can be checked.
Those that are checked by lint are marked by the following symbol: ✓.

#### Table of Contents

- [Naming](#naming)
  - [Use kebap case for file names](#use-kebap-case-for-file-names)
  - [Use camel case for variable names ✓](#use-camel-case-for-variable-names-)
  - [Use pascal case for classes ✓](#use-pascal-case-for-classes-)
  - [Use pascal case for interface names and don't prefix them](#use-pascal-case-for-interface-names-and-dont-prefix-them)
  - [Use pascal case for enums and enum properties](#use-pascal-case-for-enums-and-enum-properties)
  - [Use camel case for acronyms](#use-camel-case-for-acronyms)
  - [Use verbs in function names](#use-verbs-in-function-names)
- [Strings](#strings)
  - [Use single quotes ✓](#use-single-quotes-)
  - [String concatenation](#string-concatenation)
- [Arrays](#arrays)
  - [Use `.forEach` and other array functions rather than `for`](#use-foreach-and-other-array-functions-rather-than-for)
- [`null` and `undefined`](#null-and-undefined)
  - [Use optional parameters for optional values](#use-optional-parameters-for-optional-values)
  - [Use `undefined` for explicit absence of values](#use-undefined-for-explicit-absence-of-values)
  - [Use `null` for intentional explicit absence of values or if it is part of an external API](#use-null-for-intentional-explicit-absence-of-values-or-if-it-is-part-of-an-external-api)
  - [Use truthy/falsy checks where possible](#use-truthyfalsy-checks-where-possible)
- [White space](#white-space)
  - [Indentation: Use 2 spaces, not tabs ✓](#indentation-use-2-spaces-not-tabs-)
  - [Add one empty line before and after function definitions](#add-one-empty-line-before-and-after-function-definitions)
- [Comments](#comments)
  - [Document public API with TypeDoc comments](#document-public-api-with-typedoc-comments)
  - [Use `@deprecated` tag for deprecation](#use-deprecated-tag-for-deprecation)
  - [Don't reference types in parameters and type parameters](#dont-reference-types-in-parameters-and-type-parameters)
  - [Use @returns if a function has a return value ✓](#use-returns-if-a-function-has-a-return-value-)
- [Tests](#tests)
  - [Use .spec in test file names](#use-spec-in-test-file-names)
  - [Use it and describe notation](#use-it-and-describe-notation)
  - [Put unit test files next to source files](#put-unit-test-files-next-to-source-files)
- [Promises](#promises)
  - [Use `async`/`await` rather than `.then`](#use-asyncawait-rather-than-then)
  - [Use `try ... catch` and `.catch` with `async`/`await`](#use-try--catch-and-catch-with-asyncawait)
- [Functions](#functions)
  - [Use arrow functions for callbacks](#use-arrow-functions-for-callbacks)
  - [Use function declarations to reference functions by name](#use-function-declarations-to-reference-functions-by-name)

## Naming

### Use kebap case for file names

Use kebap case for all file names and directories, except for generated files and markdown files, that are not in the knowledge base.

❌ Examples of **incorrect** code:

```ts
/* Don't use camel case */
someDir / someClass.ts;

/* Don't use pascal case */
SomeDir / SomeClass.ts;

/* Don't use snake case */
some_dir / some_class.ts;
```

✅ Examples of **correct** code:

```ts
/* Use kebap case */
some-dir/some-class.ts

/* Exceptions apply for generated files and some markdown files */
README.md
node_modules/dependency/index.js
```

### Use camel case for variable names ✓

This is common in most JavaScript/TypeScript projects.
This rule applies to **all** variables, even static ones or reusable constants.

❌ Examples of **incorrect** code:

```ts
/* Don't use uppercase snake case */
const FOO_BAR = 'foo';

/* Don't use snake case */
const foo_bar = 'foo';

/* Don't use different case for static variables */
class FooBar {
  static FOO_BAR;
  readonly READ_ONLY;
}
```

✅ Examples of **correct** code:

```ts
/* Use camel case */
const fooBar = 'foo';

/* Use different case for static variables */
class FooBar {
  static fooBar;
}
```

### Use pascal case for classes ✓

Pascal case is common in most JavaScript/TypeScript projects for classes.

✅ Examples of **correct** code:

```ts
/* Use pascal case */
class FooBar {
  ...
}
```

### Use pascal case for interface names and don't prefix them

Pascal case is common in most JavaScript/TypeScript projects for interfaces.
Don't prefix interfaces with the hungarian notation 'I' (or other prefixes).
If you have a class with the same name as an interface, consider a more general name for the interface or a more specific name for the class - if they are different things it should be possible to name them differently.

❌ Examples of **incorrect** code:

```ts
/* Don't use 'I' prefix (or any other prefixes) */
interface IFooBar {
  ...
}
```

✅ Examples of **correct** code:

```ts
/* Use pascal case without prefix */
interface FooBar {
  ...
}

/* Use speaking names for classes and interfaces */
interface Foo extends FooType {
  ...
}
```

### Use pascal case for enums and enum properties

Pascal case is common in most JavaScript/TypeScript projects for enums and enum properties.

❌ Examples of **incorrect** code:

```ts
/* Don't use upper case snake case for enums and enum properties */
enum SomeEnum {
  FOO_BAR,
  BAR_FOO
}

/* Don't use camel case for enums and enum properties */
enum SomeEnum {
  fooBar,
  barFoo
}
```

✅ Examples of **correct** code:

```ts
/* Use pascal case */
enum SomeEnum {
  FooBar,
  BarFoo
}
```

### Use camel case for acronyms

In case you want to use an acronym in a variable name, class, interface, enum, function or other names use camel case.

❌ Examples of **incorrect** code:

```ts
/* Don't use upper case */
function parseJSON() { ... }
```

✅ Examples of **correct** code:

```ts
/* Use camel case */
function parseJson() { ... }
```

### Use verbs in function names

Every function should do something and that action should be described with a verb.
The verb should fit the return type and value.
An exception to this can be methods, that operate on an instance directly, e. g. `instance.toString()`, `instance.asObject()`.

❌ Examples of **incorrect** code:

```ts
/* Don't use functions without verb */
function toFoo(): Foo {
  ...
}

/* Avoid verbs that imply a different return type or behavior */
function isFoo(): void {
  ...
  throw Error(...);
}

```

✅ Examples of **correct** code:

```ts
/* Use functions with verbs */
function transformToFoo(): Foo {
  ...
}

/* Use functions with verbs that fit the return type */
function isFoo(): boolean {
  ...
}

/* Use functions with verbs that fit the return type */
function validateFoo(): void {
  ...
  throw Error(...);
}

/* Exception, you can omit verbs in methods, that transform the instance that they are invoked on */
class FooBar {
  toString(): string {
    ...
  }

  asObject(): Record<string, any> {
    ...
  }
}
```

## Strings

### Use single quotes ✓

Use single quotes, unless not possible otherwise, e. g. when your string contains single quotes.

❌ Examples of **incorrect** code:

```ts
/* Don't use double quotes */
const foo = 'foo';
```

✅ Examples of **correct** code:

````ts
/* Use single quotes */
const foo = 'foo';

/* Use double quotes if the quoted string contains single quotes. */
const foo = "'foo'";

/* Use template string if the quoted string contains double and single quotes. */
const foo = `They know when to use 'single quotes' and "double quotes"`;
### String concatenation
When possible use template literals, this makes the code more readable in most cases.
Feel free to concatenate strings with `+` in case it makes to code better readable.

❌ Examples of **incorrect** code:
```ts
/* Don't concatenate strings with `+` */
const foo = 'foo ' + bar + ' bar';

/* Gray area: If template literals become too complex, don't use them. */
const foo = `foo ${fn(`${bar}bar`)}`;
````

✅ Examples of **correct** code:

```ts
/* Concatenate strings using template literals */
const foo = `foo ${bar} bar`;

/* Gray area: If template literals become too complex, feel free to concatenate with +. */
const foo = `foo ${fn(bar + 'bar')}`;
```

## Arrays

### Use `.forEach` and other array functions rather than `for`

Use the functional language concepts of JavaScript in favor of the imperative ones, when possible.
Use the correct function for your use case (e. g. `.map`, `.reduce`, `.filter`, `.find`, `.some`, `.every`).
In some cases it makes sense to resort to the imperative `for`, for example, when performance is of the essence, if you have to iterate over every n-th element or if you want to execute asynchronous actions sequentially.
Be aware of the effects of asynchronicity.
The callback passed to `.forEach` is invoked for every item of a list sequentially.
If the callback is asynchronous it will still be invoked sequentially, but its asynchronous action will not be awaited before the next invokation, which can lead to unexpected results.
Do not use `.forEach` if you need sequential invocation or move the parts that have to be executed sequentially up before any asynchronous actions are executed.

❌ Examples of **incorrect** code:

```ts
/* Don't use for ... of if you can use .forEach */
for (const item of array) {
  ...
}

/* Don't use .forEach if you can use .map */
const result = [];
array.forEach(item => {
  result.push(item.property);
});
```

✅ Examples of **correct** code:

```ts
/* Use .forEach if possible */
array.forEach(item => {
  ...
});

/* Use .map, if appropriate */
const result = array.map(item => item.property);
```

## `null` and `undefined`

### Use optional parameters for optional values

Use optional parameters, if there is a default value or if it semantically makes sense to omit the parameters when consuming the API.

❌ Examples of **incorrect** code:

```ts
/* Don't use explicit `undefined` if the parameter is semantically optional */
function foo(options: Options | undefined) {
  ...
}
```

✅ Examples of **correct** code:

```ts
/* Use optional parameter if the parameter is semantically optional */
function foo(options?: Options) {
  ...
}

/* Use default parameter if there is a default (making the parameter inherently optional for the consumer) */
function foo(options: Options = {}) {
  ...
}
```

### Use `undefined` for explicit absence of values

If a value semantically is not optional prefer using `undefined` for values that do not exist or are not defined instead of `null`.
Do not use optional parameters in those cases either, because the function should not be callable without this parameter.

❌ Examples of **incorrect** code:

```ts
/* Don't use `null` for non-existent values */
function foo(obj: SomeType | null) {
  ...
}

/* Don't use optional parameters for non-existent, but not optional values */
function foo(obj?: SomeType) {
  ...
}
```

✅ Examples of **correct** code:

```ts
/* Use `undefined` for non-existent values */
function foo(obj: SomeType | undefined) {
  ...
}
```

### Use `null` for intentional explicit absence of values or if it is part of an external API

If a value can both be non-existent and intentionally absent and those states are semantically different it may make sense to allow the usage of `null`.
Those cases should however be rather rare and are more common when calling external APIs, e. g. through HTTP requests.
Consider whether there is a better API design that might avoid this.

❌ Examples of **incorrect** code:

```ts
/* Don't use `null` for absence in general */
function foo(obj?: SomeType | null) {
  if (obj === null || obj === undefined) {
    ...
  }
}
```

✅ Examples of **correct** code:

```ts
/* Use `null` if it semantically makes sense and is different from `undefined` */
function foo(obj: SomeType | null | undefined) {
  if (obj === null) {
    ...
  } else if (obj === undefined) {
    ...
  }
}
```

### Use truthy/falsy checks where possible

In most cases it is possible to check for truthiness/falsiness instead of explicitly comparing values.
This should be used when possible, but carefully considered in cases where falsy values are valid and therefore semantically truthy values, e. g. 0, ''.
Therefore, when checking for existence of primitives, don't use truthy/falsy checks.
Of course, more fine granular checks should be applied if semantically needed.

❌ Examples of **incorrect** code:

```ts
/* Don't use explicit comparison with `undefined` for objects */
if(obj !== undefined) { ... }

/* Don't use truthy/falsy checks for existence of primitives */
function checkIfExist(obj: string | number) {
  if(obj) { ... }
}

/* Don't use explicit comparison for array length (or other numbers)*/
if(arr.length !== 0) { ... }

/* Don't use explicit comparison for booleans */
if(isFoo !== false) { ... }

/* Don't use explicit comparison when checking for empty string */
if(someString !== '') { ... }
```

✅ Examples of **correct** code:

```ts
/* Use truthy/falsy check for objects */
if(obj) { ... }

/* Use truthy/falsy check for array length (or other numbers)*/
if(arr.length) { ... }

/* Use truthy/falsy for booleans */
if(!isFoo) { ... }

/* Use truthy/falsy check when checking for empty string */
if(someString) { ... }
```

## White space

### Indentation: Use 2 spaces, not tabs ✓

Use 2 spaces for indentation in all code files, unless not possible for some reason.
Don't use tabs.

❌ Examples of **incorrect** code:

```ts
/* Don't use 4 spaces */
arr.forEach(item => {
····const property = item.property;
});

/* Don't use tabs */
arr.forEach(item => {
⇥const property = item.property;
});
```

✅ Examples of **correct** code:

```ts
/* Use 2 spaces */
arr.forEach(item => {
··const property = item.property;
});
```

### Add one empty line before and after function definitions

Add exactly one empty line before and after every function definition.

❌ Examples of **incorrect** code:

```ts
/* Don't add no lines */
function foo() {
  ...
}
function bar() {
  ...
}

/* Don't add more than one line */
function foo() {
  ...
}


function bar() {
  ...
}
```

✅ Examples of **correct** code:

```ts
/* Add one line */
function foo() {
  ...
}

function bar() {
  ...
}
```

## Comments

### Document public API with TypeDoc comments

API that is exposed publicly, should be fully documented.
TypeDoc comments should start with `/**`.
Functions that return something should specify the return value with `@returns`.
Parameters should not have type annotations as those can be inherently retrieved from the TypeScript code.
Documentation comments should have the following structure:

1. If necessary, one line for deprecation.
2. Description, that can extend over multiple lines.
3. If necessary, one line per type parameter.
4. One line per parameter.
5. If necessary, one line for the description of the return value.

There should be no empty lines in between, except if it is part of the description.

### Use `@deprecated` tag for deprecation

When deprecating public API, this is done through the TypeDoc comments.
The first line of the comment should start with `@deprecated` followed by a note mentioning since which version this is deprecated (e. g. `Since v1.0.0.`) and a note of what to use instead (or alternatively that it won't be replaced).

❌ Examples of **incorrect** code:

```ts
/* Don't leave out from which version on this is deprecated */
/**
 * @deprecated Use [[foo]] instead.
 */

/* Don't leave out what to use instead */
/**
 * @deprecated Since v1.2.3.
 */
```

✅ Examples of **correct** code:

```ts
/* Add all deprecation information */
/**
 * @deprecated Since v1.2.3. Use [[foo]] instead.
 */
```

### Don't reference types in parameters and type parameters

In JSDoc it is common to specify the types of parameters and type parameters as JavaScript has no types.
In TypeDoc this is not necessary, because TypeScript inherently has types and those should not differ between the implementation and documentation.
A parameter or type parameter line should start with `@param` or `@typeparam`, followed by the (type) parameter name, a dash, and the description.
The description should end with a full stop.

❌ Examples of **incorrect** code:

```ts
/* Don't use types for the parameters */
/**
 * @param param {string} - The description.
 */

/* Don't skip the dash */
/**
 * @param param The description.
 */

/* Don't leave out the fullstop */
/**
 * @param param - The description
 */
```

✅ Examples of **correct** code:

```ts
/* Apply all rules from above */
/**
 * @param param - The description.
 */
```

### Use @returns if a function has a return value ✓

Functions that return something should have an `@returns` statement in the documentation, followed by a description of the return value.
The description should end with a full stop.
Similar to parameters, return types should not be referenced in the documentation.
For consistency, `@return` should not be used.
The only exceptions are asynchronous functions that return `Promise<void>`.
They technically return a promise, which does not need an extra description.

❌ Examples of **incorrect** code:

```ts
/* Don't use types in the documentation */
/**
 * @returns {string} The description of the return value.
 */

/* Don't use @return */
/**
 * @return The description of the return value.
 */

/* Don't leave out the fullstop */
/**
 * @returns The description of the return value
 */
```

✅ Examples of **correct** code:

```ts
/* Apply all rules from above */
/**
 * @returns The description of the return value.
 */
```

## Tests

### Use .spec in test file names

Use `.spec` not `.test` to differentiate test files.

❌ Examples of **incorrect** code:

```ts
/* Don't use .test.ts */
test - file.test.ts;
```

✅ Examples of **correct** code:

```ts
/* Use .spec.ts */
test - file.spec.ts;
```

### Use it and describe notation

Use `describe` and `it`, not `test`.

❌ Examples of **incorrect** code:

```ts
/* Don't use test */
test('Test Suite', () => {
  test('Test Case', () => {
    ...
  });
});
```

✅ Examples of **correct** code:

```ts
/* Use describe and it */
describe('Test Suite', () => {
  it('Test Case', () => {
    ...
  });
});
```

### Put unit test files next to source files

Create test files next to productive code, instead of a separate test directory.
This makes it easier to keep the file structures in sync and find tests for a unit of code.

❌ Examples of **incorrect** code:

```ts
/* Don't create a separate test directory */
src / some - unit.ts;
test / some - unit.spec.ts;
```

✅ Examples of **correct** code:

```ts
/* Create test files next to productive files */
src / some - unit.ts;
some - unit.spec.ts;
```

## Promises

### Use `async`/`await` rather than `.then`

In most cases the more modern `async`/`await` notation, makes code a bit easier to read, therefore this is the preferred way.
However, there are some cases where `.then` is equally as good and potentially even less error-prone - in those cases both options are fine.
This is especially the case if you have multiple asynchronous calls, that have common error handling (check the correct code examples).

❌ Examples of **incorrect** code:

```ts
/* Don't use .then by default */
function getBar() {
  return asyncWait().then(foo => foo.bar);
}
```

✅ Examples of **correct** code:

```ts
/* Use async/await as a default */
async function getBar() {
  return (await asyncWait()).bar;
}

/* Gray area: Use async/await when you have common error handling for multiple asynchronous calls */
async function foo() {
  try {
    await asyncWait1();
    return await asyncWait2(); // If you want to handle the error in foo, this await is necessary!
  } catch (err) {
    handleError(err);
  }
}

/* Gray area: Use .then when you have common error handling for multiple asynchronous calls */
async function foo() {
  return asyncWait1()
    .then(() => asyncWait2())
    .catch(err => handleError(err));
}
```

### Use `try ... catch` and `.catch` with `async`/`await`

When handling errors using `async`/`await`, be aware of the context of your `catch` block/invocation.
Invoke `.catch` when handling an error of one asynchronous call, use `try ... catch` for multiple asynchronous calls.

❌ Examples of **incorrect** code:

```ts
/* Avoid try ... catch for one asynchrounous call */
function foo() {
  try {
    return await asyncWait();
  } catch (err) {
    handleError(err);
  }
}
```

✅ Examples of **correct** code:

```ts
/* Use .catch for one asynchrounous call */
function foo() {
  return asyncWait().catch(err => handleError(err));
}

/* Use try ... catch for multiple asynchrounous calls */
async function foo() {
  try {
    await asyncWait1();
    return await asyncWait2(); // If you want to handle the error in foo, this await is necessary!
  } catch (err) {
    handleError(err);
  }
}
```

## Functions

### Use arrow functions for callbacks

Use arrow functions for callbacks, unless the callbacks rely on `this`.
In those cases feel free to use a function.

❌ Examples of **incorrect** code:

```ts
/* Don't use functions in callbacks */
arr.forEach(function(item) {
  ...
});
```

✅ Examples of **correct** code:

```ts
/* Use arrow functions in callbacks */
arr.forEach(item => {
  ...
});
```

### Use function declarations to reference functions by name

Arrow functions require less boilerplate code than function declarations, especially if the function returns something directly, e. g. in one-liners.
For more complex functions, there is no significant difference.
Arrow functions cannot be named and therefore have to be assigned to variables - much like function expressions.
Function declarations are visually easier to differentiate from other variables than functions assigned to variables.
This becomes especially relevant when exposing an API, as many IDEs visualize variables differently than functions, which in turn can improve the quality of autocompletion when used correctly.

An exception to this rule might be simple arrow functions that are only defined within the scope of another function.

❌ Examples of **incorrect** code:

```ts
/* Don't assign arrow functions to variables */
const fn = foo => foo.bar;

/* Don't assign unnamed functions to variables */
const fn = function (foo) {
  return foo.bar;
};
```

✅ Examples of **correct** code:

```ts
/* Use function declarations to reference functions by name */
function fn(foo) {
  return foo.bar;
}

/* Exception: It is ok to assign arrow functions within the scope of another functions */
function fn(arr) {
  const accessorFn = foo => foo.bar;
  return arr.map(item => accessorFn(item));
}
```
