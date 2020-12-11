namespace Generic {
    class SomeClassParent<PossibleMethods> {
        private possibleMethodsParent: PossibleMethods

        //If you have N children you have a conditional chain
        foo():PossibleMethods extends ClassFoo ? this extends SomeClass<PossibleMethods> ? SomeClass<Omit<PossibleMethods,'foo'>>: never:never{
            // foo():Omit<SomeClass<Omit<PossibleMethods,'foo'>>,'foo'>{
            // return new SomeClass<Exclude<PossibleMethods,'foo'>>()
            return this as any
        }
    }

    class SomeClass<PossibleMethods> extends SomeClassParent<PossibleMethods>{
        private possibleMethods: PossibleMethods


        bar():PossibleMethods extends ClassBar ? SomeClass<Omit<PossibleMethods,'bar'>>:never{
        // bar():Omit<SomeClass<Omit<PossibleMethods,'bar'>>,'bar'>{
            return this as any
        }

        execute():this {
        return this;
        }
    }

    class ClassAll {
        foo:string
        bar:string
        execute:string
    }
    class ClassFoo {
        foo:string
    }
    class ClassBar {
        bar:string
    }

    type excludeClassTest = Omit<ClassAll,keyof ClassFoo>


    const someClass = new SomeClass<ClassAll>()
    someClass.bar().foo().execute()
    someClass.foo().foo().execute()
    someClass.bar().bar().execute()
    someClass.foo().bar().foo().execute()
    someClass.bar().foo().bar().execute()
    someClass.execute()

}
