/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

export const personGetAllResponse = () => ({
  "@odata.context": "https://services.odata.org/TripPinRESTierService/(S(miemz3v3blexv3n23th5mzju))/$metadata#People",
  "value": [
    {
      "UserName": "russellwhyte",
      "FirstName": "Russell",
      "LastName": "Whyte",
      "MiddleName": null,
      "Gender": "Male",
      "Age": null,
      "Emails": [
        "Russell@example.com",
        "Russell@contoso.com"
      ],
      "FavoriteFeature": "Feature1",
      "Features": [
        "Feature1",
        "Feature2"
      ],
      "AddressInfo": [
        {
          "Address": "187 Suffolk Ln.",
          "City": {
            "Name": "Boise",
            "CountryRegion": "United States",
            "Region": "ID"
          }
        }
      ],
      "HomeAddress": null
    },
    {
      "UserName": "scottketchum",
      "FirstName": "Scott",
      "LastName": "Ketchum",
      "MiddleName": null,
      "Gender": "Male",
      "Age": null,
      "Emails": [
        "Scott@example.com"
      ],
      "FavoriteFeature": "Feature1",
      "Features": [],
      "AddressInfo": [
        {
          "Address": "2817 Milton Dr.",
          "City": {
            "Name": "Albuquerque",
            "CountryRegion": "United States",
            "Region": "NM"
          }
        }
      ],
      "HomeAddress": null
    }]
});
