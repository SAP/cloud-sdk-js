### oData-Common Package Public API

Public API is empty => this should get reimported on odata-v2 and odata-v4

- function and(),or(),not()
  - Filterable
  - FilterList
  - UnaryFilter
- all filterfunctions e.g. startsWith
  - Class Field
  - Class BooleanFilterFunction
  - Class NumberFilterFunction
  - Class StringFilterFunction
- function asc()
  - Class Order
- function desc()
  - Class Order
- Class CountRequestBuilder
- Request Builder related
- execute()
  - Destination
- executeRaw()
  - HttpResponse
- build()
  - ODataRequest
    - ODataBatchRequestConfig
    - ODataCountRequestConfig
    - ODataDeleteRequestConfig
    - ODataFunctionImportRequestConfig
    - ODataGetAllRequestConfig
    - ODataGetByKeyRequestConfig
    - ODataUpdateRequestConfig


