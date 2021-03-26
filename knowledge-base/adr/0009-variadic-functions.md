## Motivation

Typescript allows for variadic functions e.g.:

```
function doSomething(...strings:string[]){
}
```

You can call the method with no, one, two, ... arguments.
We used this feature quite regularly for example for the `and` and `or` filter functions.
In the TypeScript universe there is also nothing wrong wit it, because you will get a type error if you call the function with an array.

```
function doSomething(['a','b','c']) //type error
```

However, in the JavaScript use case you do not get a type error if you call it with an array only a strange error at runtime.
From the method signature it also looks like an array is a valid input.
Hence, we decided to be lenient to the users and allow also for:

```
doSomething([])
doSomething([a])
doSomething([a,b])
```

in addition to the already possible:

```
doSomething()
doSomething('a')
doSomething('a','b')
```

## Solution

We use method overloading:

```
function functionWithVariableArguments(...varargs: string[]);
function functionWithVariableArguments(array: string[]);
function functionWithVariableArguments(
    firstOrArray: undefined | string | string[],
    ...rest: string[]
  ): string[] {

  }
```

and created a little helper method `variableArgumentToArray()` to merge the two argument `first` and `rest` to an array.
