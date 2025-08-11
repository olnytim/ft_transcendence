describe('Main Page', () => {
  it('successfully loads', () => {
    cy.visit('/')
    cy.get('.navbar-brand').should('contain', 'ft_transcendence')
  })
})
