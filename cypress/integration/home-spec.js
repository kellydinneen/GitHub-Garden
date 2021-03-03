describe('Homepage and Map', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  });

  it.only('Should have site title', () => {
      cy.contains('GitHub Garden')
  });
  it('Should have button that activates map', () => {
      cy.get('.map-btn').click()
      cy.get('.github-activity-map-container')
        .children().first()
        .should('have.class', 'leaflet-container')
  });

  it('Should able to search for GH user', () => {
    cy.get('.search-bar')
      .type('kellydinneen');
    cy.get('.search-wrapper')
      .find('.search-btn')
      .click().wait(2000)
    cy.url()
      .should('include','visualizations/kellydinneen')
  });
});
