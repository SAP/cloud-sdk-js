```ts
namespace Classes {
  class SomeClass {
    foo(): SomeClassFooCalled {
      return this;
    }

    bar(): SomeClassBarCalled {
      return this;
    }

    execute() {
      return this;
    }
  }

  class SomeClassFooCalled {
    bar(): SomeClassFooBarCalled {
      return this;
    }

    execute() {
      return this;
    }
  }

  class SomeClassBarCalled {
    foo(): SomeClassFooBarCalled {
      return this;
    }

    execute() {
      return this;
    }
  }

  class SomeClassFooBarCalled {
    execute() {
      return this;
    }
  }
  const someClass = new SomeClass();

  someClass.bar().foo().execute(); //OK
  someClass.foo().foo().execute(); //ERROR
  someClass.bar().bar().execute(); //ERROR
  someClass.foo().bar().foo().execute(); //ERROR
  someClass.bar().foo().bar().execute(); //ERROR
  someClass.execute(); //OK
}

namespace Generic {
  class SomeClassParent<PossibleMethods> {
    private possibleMethodsParent: PossibleMethods;

    //If you have N children you have a conditional chain
    foo(): PossibleMethods extends ClassFoo
      ? this extends SomeClass<PossibleMethods>
        ? SomeClass<Omit<PossibleMethods, 'foo'>>
        : never
      : never {
      // foo():Omit<SomeClass<Omit<PossibleMethods,'foo'>>,'foo'>{
      return this as any;
    }
  }

  class SomeClass<PossibleMethods> extends SomeClassParent<PossibleMethods> {
    private possibleMethods: PossibleMethods;

    bar(): PossibleMethods extends ClassBar
      ? SomeClass<Omit<PossibleMethods, 'bar'>>
      : never {
      // bar():Omit<SomeClass<Omit<PossibleMethods,'bar'>>,'bar'>{
      return this as any;
    }

    execute(): this {
      return this;
    }
  }

  class ClassAll {
    foo: string;
    bar: string;
    execute: string;
  }
  class ClassFoo {
    foo: string;
  }
  class ClassBar {
    bar: string;
  }

  type excludeClassTest = Omit<ClassAll, keyof ClassFoo>;

  const someClass = new SomeClass<ClassAll>();
  someClass.bar().foo().execute(); //OK
  someClass.foo().foo().execute(); //ERROR
  someClass.bar().bar().execute(); //ERROR
  someClass.foo().bar().foo().execute(); //ERROR
  someClass.bar().foo().bar().execute(); //ERROR
  someClass.execute(); //OK
}

namespace Omit {
  class SomeClass {
    foo(): Omit<this, 'foo'> {
      return this as any;
    }

    bar(): Omit<this, 'bar'> {
      return this as any;
    }

    execute(): this {
      return this;
    }
  }

  const someClass = new SomeClass();
  someClass.bar().foo().execute(); //OK
  someClass.foo().foo().execute(); //ERROR
  someClass.bar().bar().execute(); //ERROR
  someClass.foo().bar().foo().execute(); //ERROR
  someClass.bar().foo().bar().execute(); //ERROR
  someClass.execute();
}
```
