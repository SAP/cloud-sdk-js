/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

describe('My Test', () => {
  it('ping index', () => {
    cy.request('http://localhost:4004').should(response => {
      expect(response.status).to.eq(200);
    });
  });

  it('ping test entity', () => {
    cy.request('http://localhost:4004/admin/TestEntity')
      .should(response => {
        expect(response.status).to.eq(200);
      })
      .its('body')
      .its('value')
      .should('be.an', 'array')
      .and('have.length', 4);
  });
});
