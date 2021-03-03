describe('Visualization Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('.search-bar').type('kellydinneen');
    cy.get('.search-wrapper').find('.search-btn').click().wait(4000)
  });

  it('Should have home button that takes user home', () => {
      cy.url()
        .should('include','visualizations/kellydinneen')
      cy.get('.home-button')
        .click()
        .url().should('not.include','visualizations/kellydinneen')
      cy.contains('GitHub Garden')
  });

  it('Should show user name and GitHub profile image', () => {
      cy.get('.garden-title')
        .contains('Garden of @kellydinneen')
      cy.get('.gardener-info')
        .find('a>img')
        .should('have.class','user-profile-pic')
  });
});

describe('Garden', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('.search-bar')
      .type('kellydinneen');
    cy.get('.search-wrapper')
      .find('.search-btn')
      .click()
      .wait(7000)
    cy.get('.user-visualizations-box')
      .find('.flowerbed').as('flowerbed')
  });

  it('Should have flowerbed with soil line', () => {
      cy.get('@flowerbed')
        .children().first()
        .should('have.class', 'soil-line')
  });

  it('Should have green stems of different lengths spread out across flowerbed', () => {
      cy.get('@flowerbed').find('.stem')
        .each((stemElement) => {
              cy.log("Path : "+stemElement.attr("d"));
              cy.log("Translation : "+stemElement.attr("transform"));
        })
  });

  it('Should have flower heads of different scales with layers of three petals', () => {
      cy.get('@flowerbed').find('.flower-box')
        .each((flowerBox) => {
          cy.get(flowerBox).find('.petal-layer')
          .each((layer) => {
            cy.get(layer).find('.petal')
            .each((petal) => {
                  cy.log("Fill Color : "+petal.attr("fill"));
                  cy.log("Transform : "+petal.attr("transform"));
            })
          })
      })
  });

  it('Should have roots with randomized paths', () => {
      cy.get('@flowerbed').find('.root-box')
        .each((rootBox) => {
          cy.get(rootBox).find('.root')
          .each((root) => {
            cy.log("Path : "+root.attr("d"));
            cy.log("Rotation : "+root.attr("transform"));
          })
      })
  });
});

describe('Key', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.get('.search-bar').type('kellydinneen');
    cy.get('.search-wrapper').find('.search-btn')
      .click()
      .wait(7000)
    cy.get('.slideout-color-key_inner').as('keyBox')
  });

  it('Should have list of color-language pairs', () => {
      cy.get('@keyBox').invoke('show')
      .get('.color-pairs').find('section')
      .each((section) => {
        cy.get(section)
          .children().first()
          .should('have.class','color-key-seed')
          .next()
          .should('have.class','color-key-language');
      })
  })

  it.only('Should toggle annotations on click', () => {
      cy.get('@keyBox').invoke('show')
        .find('.flower-key-box').as('flowerKeyBox')
        .children().first().as('annotations')
      cy.get('@annotations')
      .contains('We grew a flower for every GitHub repository that @kellydinneen owns and contributed to. Note that this does not include repositories this user forked but never edited.')
      cy.get('@flowerKeyBox')
        .children().last().as('flowerKey')
        .children().first().find('rect').as('flowerHeadClicker')
        .click({force: true})
      cy.get('@annotations')
        .contains("The head of a flower is scaled according to the total lines of code in the repository, and there is a layer of petals for each of the repository's top three programming languages. The first layer is the most used language, and the second and third layers represent the second and third most used languages respectively.")
      cy.get('@flowerHeadClicker')
        .click({force: true})
      cy.get('@annotations')
        .contains('We grew a flower for every GitHub repository that @kellydinneen owns and contributed to. Note that this does not include repositories this user forked but never edited.')
      cy.get('@flowerKey')
        .find('.stem-key-box')
        .children().first().click({force: true})
      cy.get('@annotations')
        .contains("The stem of a flower has a height representing the total active life of the repository, where active life is the time between the repository's creation date and its most recent update.")
      cy.get('@flowerKey')
        .find('.root-key-box')
        .children().first().click({force: true})
      cy.get('@annotations')
        .contains('The roots of a flower represent the remote branches of a repository. E.g. a repository with 12 branches will produce a flower with 12 roots.')
  })
});
