/**
 * Implementation for CatalogService defined in /srv/cat-service.cds
 */
import cds = require('@sap/cds');

// Custom service handler
export const serviceHandler = srv => {
  // After READ Hook for GET requests
  srv.after('READ', 'Books', books => {
    books
      .filter(book => book.stock > 111)
      .forEach(book => {
        book.title += ' -- 11% discount!';
      });
  });
};
