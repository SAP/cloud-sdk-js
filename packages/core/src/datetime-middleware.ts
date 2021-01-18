export interface DTMiddlewareInterface<T1 = string, T2 = number> {
  deserializers?: {
    'Edm.String'?: (ori: string) => T1;
    'Edm.Int32'?: (ori: string) => T2;
  };
  serializers?: {
    'Edm.String'?: (val: T1) => string;
    'Edm.Int32'?: (val: T2) => string;
  };
}

export const defaultDTMiddleware: DTMiddlewareInterface = {
  deserializers: {
    'Edm.String': (ori: string) => ori,
    'Edm.Int32': (ori: string) => parseInt(ori)
  },
  serializers: {
    'Edm.String': (val: string) => val,
    'Edm.Int32': (val: number) => val.toString()
  }
};

export const customDTMiddleware: DTMiddlewareInterface<string, string> = {
  deserializers: {
    'Edm.String': (ori: string) => ori,
    'Edm.Int32': (ori: string) => ori
  },
  serializers: {
    'Edm.String': (val: string) => val,
    'Edm.Int32': (val: string) => val
  }
};

export const customDTMiddleware2: DTMiddlewareInterface<string, string> = {
  deserializers: {
    'Edm.Int32': (ori: string) => ori
  }
};
