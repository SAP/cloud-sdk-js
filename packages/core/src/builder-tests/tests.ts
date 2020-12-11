namespace Class{

class SomeClass {
    foo(): SomeClassFooCalled
    {
        return this
    }

    bar():SomeClassBarCalled{
        return this
    }

    execute(){
        return this
    }
}

//With omit does not works
type FooCalled = Omit<SomeClass,'foo'>
type BarCalled = Omit<SomeClass,'bar'>

class SomeClassFooCalled {
    bar():SomeClassFooBarCalled{
        return this
    }

    execute(){
        return this
    }
}

class SomeClassBarCalled{
    foo():SomeClassFooBarCalled{
        return this
    }

    execute(){
        return this
    }
}

class SomeClassFooBarCalled{
    execute(){
        return this
    }
}
const someClass = new SomeClass()

someClass.foo().bar().execute()
someClass.bar().bar() //error
someClass.bar().foo().bar() //not error should call error

/*
 Three Methods A,B,C

 classNoA,classNoB,classNoC
 ClassNoAB ClassNoAC
 ClassNoABC

 N! types and also implementations...


 Generrics

 */
}
