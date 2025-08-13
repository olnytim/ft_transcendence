// cypress/e2e/auth.cy.js
describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/'); // убедитесь, что baseUrl задан в cypress.config.{js,ts}
  });

  it('opens login modal and shows error on wrong credentials', () => {
    cy.intercept('POST', '/auth/login/').as('loginBad');

    cy.get('[data-auth="login"]').click();
    cy.get('#loginModal').should('be.visible');

    cy.get('#loginUsername').type('wronguser');
    cy.get('#loginPassword').type('wrongpassword');
    cy.get('#loginModal .btn-primary').click();

    cy.wait('@loginBad').its('response.statusCode').should('be.oneOf', [400, 401]);
    cy.get('#loginModal').should('be.visible');
    // пример проверки текста ошибки
    cy.get('#loginModal').contains(/неверн|invalid|wrong/i);
  });

  /* Пример e2e регистрации+логина. Раскомментируйте, когда готовы.
  it('registers, logs in, and logs out', () => {
    const username = `testuser_${Date.now()}`;
    const password = 'password123';

    cy.intercept('POST', '/auth/register/').as('register');
    cy.get('[data-auth="register"]').click();
    cy.get('#registerModal').should('be.visible');
    cy.get('#registerUsername').type(username);
    cy.get('#registerPassword').type(password);
    cy.get('#registerModal .btn-success').click();

    cy.wait('@register').its('response.statusCode').should('be.oneOf', [200, 201]);
    cy.get('#registerModal').should('not.be.visible');

    cy.intercept('POST', '/auth/login/').as('loginOk');
    cy.get('[data-auth="login"]').click();
    cy.get('#loginModal').should('be.visible');
    cy.get('#loginUsername').type(username);
    cy.get('#loginPassword').type(password);
    cy.get('#loginModal .btn-primary').click();

    cy.wait('@loginOk').its('response.statusCode').should('eq', 200);
    cy.get('#loginModal').should('not.be.visible');

    cy.get('[data-auth="logout"]').should('be.visible').click();
    cy.get('[data-auth="login"]').should('be.visible');
  });
  */
});