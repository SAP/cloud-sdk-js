import { MyClass } from './circular-1';
import { OtherClass } from './circular-2';

class SuperClass<T> extends MyClass<T> {
  public test: string = 'test';
  public other: OtherClass<T>;
  constructor() {
    super();
    this.other = new OtherClass(this);
  }
}
