describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should open login modal and fail with wrong credentials', () => {
    // Открываем модальное окно входа
    cy.get('[data-auth="login"]').click();
    cy.get('#loginModal').should('be.visible');

    // Вводим неверные данные
    cy.get('#loginUsername').type('wronguser');
    cy.get('#loginPassword').type('wrongpassword');

    // Нажимаем кнопку входа
    cy.get('#loginModal .btn-primary').click();

    // Проверяем, что модальное окно все еще отображается (или появилась ошибка)
    // Здесь может потребоваться более конкретная проверка на сообщение об ошибке
    cy.get('#loginModal').should('be.visible');
  });

  // it('should allow a user to register, log in, and log out', () => {
  //   const username = `testuser_${Date.now()}`;
  //   const password = 'password123';
  //
  //   // Intercept the registration request
  //   cy.intercept('POST', '/auth/register/').as('registerRequest');
  //
  //   // Регистрация
  //   cy.get('[data-auth="register"]').click();
  //   cy.get('#registerModal').should('be.visible');
  //   cy.get('#registerUsername').type(username);
  //   cy.get('#registerPassword').type(password);
  //   cy.get('#registerModal .btn-success').click();
  //
  //   // Wait for the request and log the response
  //   cy.wait('@registerRequest').then((interception) => {
  //     console.log('Interception:', interception);
  //     // Добавим проверку на существование response
  //     if (interception && interception.response) {
  //       console.log('Response:', interception.response);
  //       expect(interception.response.statusCode).to.equal(201);
  //     } else {
  //       // Если response не существует, провалим тест с сообщением
  //       throw new Error('Request was intercepted, but no response was received.');
  //     }
  //   });
  //
  //   cy.get('#registerModal').should('not.be.visible');
  //
  //   // Intercept the login request
  //   cy.intercept('POST', '/auth/login/').as('loginRequest');
  //
  //   // Вход
  //   cy.get('[data-auth="login"]').click();
  //   cy.get('#loginModal').should('be.visible');
  //   cy.get('#loginUsername').type(username);
  //   cy.get('#loginPassword').type(password);
  //   cy.get('#loginModal .btn-primary').click();
  //
  //   // Wait for the login request to complete
  //   cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
  //
  //   cy.get('#loginModal').should('not.be.visible');
  //
  //   // Проверяем, что кнопка выхода появилась
  //   cy.get('[data-auth="logout"]').should('be.visible');
  //
});
