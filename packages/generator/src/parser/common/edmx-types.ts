export interface EdmxNamed {
  Name: string;
}
//
export interface EdmxProperty extends EdmxDocumented, EdmxNamed {
  MaxLength: string;
  Nullable: string;
  'sap:creatable': string;
  'sap:filterable': string;
  'sap:label': string;
  'sap:sortable': string;
  'sap:unicode': string;
  'sap:updatable': string;
  'sap:quickinfo'?: string;
  Type: string;
}

export interface EdmxDocumented {
  Documentation?: {
    Summary: string;
    LongDescription: string;
  };
}
//


export interface EdmxParameter extends EdmxDocumented, EdmxNamed {
  Type: string;
  Nullable: string;
}
