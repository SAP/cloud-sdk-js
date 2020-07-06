/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

describe('Test request builder', () => {
  it('should return 4 items from the get all request', () => {
    cy.request('http://localhost:4004/admin/TestEntity')
      .should(response => {
        expect(response.status).to.eq(200);
      })
      .its('body')
      .its('value')
      .should('be.an', 'array')
      .and('have.length', 4);
  });

  it('should return proper item from the get by key request', () => {
    cy.request('http://localhost:4004/admin/TestEntity(KeyPropertyInt=101,KeyPropertyString=\'abc\')')
      .should(response => {
        expect(response.status).to.eq(200);
      })
      .its('body')
      .its('KeyPropertyString').should('eq','abc');
  });
});
