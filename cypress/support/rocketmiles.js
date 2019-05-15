function populateLocation{
  cy.get('.tt-input').type('Chicago, IL')
  cy.get('.tt-input').type('{downarrow}').type('{enter}')
};
