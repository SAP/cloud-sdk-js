import { MyClass } from './circular-1';

export class OtherClass<T> {
  constructor(public myClass: MyClass<T>) {}
}
