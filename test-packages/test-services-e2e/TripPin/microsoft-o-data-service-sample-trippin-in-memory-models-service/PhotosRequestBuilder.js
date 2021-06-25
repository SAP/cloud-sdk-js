'use strict';
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      if (typeof b !== 'function' && b !== null)
        throw new TypeError(
          'Class extends value ' + String(b) + ' is not a constructor or null'
        );
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
Object.defineProperty(exports, '__esModule', { value: true });
exports.PhotosRequestBuilder = void 0;
var core_1 = require('@sap-cloud-sdk/core');
var Photos_1 = require('./Photos');
/**
 * Request builder class for operations supported on the [[Photos]] entity.
 */
var PhotosRequestBuilder = /** @class */ (function (_super) {
  __extends(PhotosRequestBuilder, _super);
  function PhotosRequestBuilder() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns a request builder for retrieving one `Photos` entity based on its keys.
   * @param id Key property. See [[Photos.id]].
   * @returns A request builder for creating requests to retrieve one `Photos` entity based on its keys.
   */
  PhotosRequestBuilder.prototype.getByKey = function (id) {
    return new core_1.GetByKeyRequestBuilderV4(Photos_1.Photos, { Id: id });
  };
  /**
   * Returns a request builder for querying all `Photos` entities.
   * @returns A request builder for creating requests to retrieve all `Photos` entities.
   */
  PhotosRequestBuilder.prototype.getAll = function () {
    return new core_1.GetAllRequestBuilderV4(Photos_1.Photos);
  };
  /**
   * Returns a request builder for creating a `Photos` entity.
   * @param entity The entity to be created
   * @returns A request builder for creating requests that create an entity of type `Photos`.
   */
  PhotosRequestBuilder.prototype.create = function (entity) {
    return new core_1.CreateRequestBuilderV4(Photos_1.Photos, entity);
  };
  /**
   * Returns a request builder for updating an entity of type `Photos`.
   * @param entity The entity to be updated
   * @returns A request builder for creating requests that update an entity of type `Photos`.
   */
  PhotosRequestBuilder.prototype.update = function (entity) {
    return new core_1.UpdateRequestBuilderV4(Photos_1.Photos, entity);
  };
  PhotosRequestBuilder.prototype.delete = function (idOrEntity) {
    return new core_1.DeleteRequestBuilderV4(
      Photos_1.Photos,
      idOrEntity instanceof Photos_1.Photos ? idOrEntity : { Id: idOrEntity }
    );
  };
  return PhotosRequestBuilder;
})(core_1.RequestBuilder);
exports.PhotosRequestBuilder = PhotosRequestBuilder;
//# sourceMappingURL=PhotosRequestBuilder.js.map
