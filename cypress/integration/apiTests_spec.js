describe('API tests', function() {
  //Can optimize to take a loop to test all pages
  it('Test query param page number 1', function() {
    cy.request('GET', 'https://reqres.in/api/users?page=1').then((response) => {
    expect(response.body).to.have.property('page', 1)
    })
  })
  it('Test query param page number 2', function() {
    cy.request('GET', 'https://reqres.in/api/users?page=2').then((response) => {
    expect(response.body).to.have.property('page', 2)
    })
  })
  it('Test total number of users', function() {
    cy.request('GET', 'https://reqres.in/api/users?page=1').then((response) => {
    expect(response.body).to.have.property('total', 12)
    })
  })
  it('Test status code', function() {
    cy.request('GET', 'https://reqres.in/api/users?page=2').then((response) => {
      expect(response.status).to.eq(200)
      })
    })

    it('Create User', function() {
      cy.request('POST', 'https://reqres.in/api/users',{ name: 'morpheus', job: 'leader' }).then((response) => {
        expect(response.status).to.eq(201)
        })
      })

      it('Test user not found ', function() {
        cy.request({url: 'https://reqres.in/api/users/23', failOnStatusCode: false}).then((response) => {
          expect(response.status).to.eq(404)
          })
        })
  })
