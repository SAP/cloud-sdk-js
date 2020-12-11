namespace Simple {
    class SomeClass  {
        foo():Omit<this,'foo'>{
            return this as any
         }

        bar():Omit<this,'bar'>{
            return this as any
        }

        execute():this {
        return this;
        }
    }



    const someClass = new SomeClass()
    someClass.bar().foo().execute()
    someClass.foo().foo().execute()
    someClass.bar().bar().execute()
    someClass.foo().bar().foo().execute()
    someClass.bar().foo().bar().execute()
    someClass.execute()

}
