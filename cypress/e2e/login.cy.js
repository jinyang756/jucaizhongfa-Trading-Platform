describe('Login Page', () => {
  it('should display the login form', () => {
    cy.visit('/login');
    cy.contains('登录');
    cy.get('input[name="username"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });
});
