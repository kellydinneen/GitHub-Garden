describe('Garden Visualization', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('.search-bar').type('kellydinneen');
    cy.get('.search-button').click().wait(2000)
  });

  it('Should have home button that takes user home', () => {
      cy.url().should('include','visualizations/kellydinneen')
      cy.get('.home-button').click()
        .url().should('not.include','visualizations/kellydinneen')
      cy.contains('GitHub Garden')
  });

  it('Should show user name and GitHub profile image', () => {
      cy.get('.gh-user-name').contains('Garden of @kellydinneen')
      cy.get('.gardener-info').contains('a')
  });

  it('Should have flowerbed representing the repos on a github account', () => {
      cy.get('.flowerbed').children().first().should('have.class', 'soil-line')
      cy.get('.flowerbed').children().last().should('have.class', 'root-box')
  });

  it('Should be able to scroll through flowers', () => {
      cy.get('.user-visualizations-box').children().first().should('have.class', 'flowerbed')
  });

  it('Should have color key', () => {
      cy.get('.slideout-color-key_inner').children().first().contains('Javascript')
  });
});
