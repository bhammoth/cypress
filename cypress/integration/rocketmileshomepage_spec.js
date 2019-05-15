//cy.get('ul#todos').as('todos')


beforeEach(function () {
  ///Relading the page is the only way to ensure the email sign up isnt in the way of the elements.
  //Couldnt find anything different in the DOM or session to use a conditional with
  cy.visit('https://www.rocketmiles.com/')
  cy.get('body').children()

  //cy.reload()
})

//Move this to support folder, and normally data setup would be done through API if available
function populateLocation(locationSelection){
  cy.get('.tt-input').type("'"+locationSelection+"'")
  cy.get('.tt-input').type('{downarrow}').type('{enter}')
}

function populateRewardsProgram(rewardsProgram){
  cy.get('.program-autosuggest-container > .rm-input-base').type("'"+rewardsProgram+"'")
  cy.get('.program-autosuggest-container > .rm-input-base').type('{downarrow}').type('{enter}')
}

let locationSelection = "Chicago, IL"
let rewardsProgram = "United"

describe('Rocket Miles_textbox: Where do you need a hotel?', function() {
  it('Empty Location Error', function() {
    cy.get('.tt-input').clear()
    cy.get('.rm-btn-orange').click()
    cy.get('.popover-content').contains('Unknown location. Please type the city name again slowly and wait for the drop down options, or double-check the spelling.')
  })

  it('Invalid Location Error Message', function() {
    cy.get('.tt-input').type('rocketmilesAirport')
    cy.get('.popover-content').contains('No offers available in your current location')
    cy.get('.rm-btn-orange').click()
  })

  it('Invalid Location submit', function() {
    cy.get('.tt-input').type('rocketmilesAirport')
    cy.get('.popover-content').contains('No offers available in your current location')
    cy.get('.rm-btn-orange').click()
    cy.get('.popover-content').contains('Unknown location. Please type the city name again slowly and wait for the drop down options, or double-check the spelling.')
  })

  it('Vaid Location', function() {
    cy.get('.tt-input').type(locationSelection)
    cy.get('.tt-input').should('have.value','Chicago, Illinois, USA')
  })
})

describe('Rocket Miles_textbox: Select Reward Program', function() {
  it('Empty Rewards Program Error', function() {
    populateLocation(locationSelection)
    cy.get('.program-autosuggest-container > .rm-input-base').clear()
    cy.get('.rm-btn-orange').click()
    cy.get('.popover-content').contains('Reward program is required.')
  })

  it('Rocket Miles Invalid Reward Program Error', function() {
  populateLocation(locationSelection)
  cy.get('.program-autosuggest-container > .rm-input-base').type('rocketmilesRewards')
  cy.get('.popover-content').contains('Please choose a valid reward program')
  cy.get('.rm-btn-orange').click()
  })

  it('Invalid Reward Program submit Errors', function() {
    populateLocation(locationSelection)
    cy.get('.program-autosuggest-container > .rm-input-base').type('rocketmilesRewards')
    cy.get('.popover-content').contains('Please choose a valid reward program')
    cy.get('.rm-btn-orange').click()
    cy.get('.popover-content').contains('Reward program is required.')
  })

  it('Valid Rewards Program', function() {
    populateLocation(locationSelection)
    populateRewardsProgram(rewardsProgram)
    cy.get('.program-autosuggest-container > .rm-input-base').should('have.value','United MileagePlus')
  })
})

describe('Rocket Miles-Date Selector', function() {

  it.only('Seelct Daets', function() {
    cy.get('.booking-date-range').children().first().should('have.class','checkin booking-date').click()
    cy.get('.ui-datepicker-calendar').children().next().children().children()
    .children().eq(18).click()
    cy.get('.booking-date-range').children().eq(2).should('have.class','checkout booking-date').click()
    cy.get('.ui-datepicker-calendar').children().next().children().children()
    .children().eq(21).click()


    //cy.get('#dp1557884406721')//after
    //cy.get('.ui-datepicker-calendar').contains('15')
  })
})
