namespace Wrapper {
    class SomeClass{
        foo():this{
            return this
        }

        bar():this{
            return this
        }

        execute(){

    }
    }

    class Wrapper<T>{

    }

    const someClass = new SomeClass<ClassAll>()
    someClass.bar().foo().execute()
    someClass.foo().foo().execute()
    someClass.bar().bar().execute()
    someClass.foo().bar().foo().execute()
    someClass.bar().foo().bar().execute()
    someClass.execute()

}
