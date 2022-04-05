export class TestProp {
  private readonly _prop = {
      k0: new Set(),
      k1: new Set(),
      k2: new Set(),
      k3: new Set(),
      k4: new Set(),
      k5: new Set(),
      k6: new Set(),
      k7: new Set(),
      k8: new Set(),
      k9: new Set()
  }

  get schema(){
    return this._prop;
  }
}
