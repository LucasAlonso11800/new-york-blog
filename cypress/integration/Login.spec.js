/// <reference types="cypress" />

beforeEach(() => {
    cy.visit(`${Cypress.env('URL')}/admin/login`);
    localStorage.clear();
});

describe('Users logs in', () => {
    const LOGIN_FORM = '[data-testid="loginForm"]';

    it('Should fail due to empty fields', () => {
        cy.get(`${LOGIN_FORM} > button[type="submit"]`).click();
        cy.get(`${LOGIN_FORM} > p`).eq(0).should('exist').should('have.text', 'Please provide an email');
        cy.get(`${LOGIN_FORM} > p`).eq(1).should('exist').should('have.text', 'Please provide the password');
    });

    it('Should fail due to fields being too long', () => {
        // Too long
        cy.get(`${LOGIN_FORM} > div > input`).eq(0).clear().type('sdjqoidjqowidowodjiqwdjqjdoqiwdjqdjoqwjdoqidjoqwjoqwjoqwdjoqwjoqiwdjqwdjoqjdoqiwdjqwjdoqwiodwu23u032u0912@gmail.com')
        cy.get(`${LOGIN_FORM} > div > input`).eq(1).clear().type('abcdewdoqidjoqihoqwhdqwhoqwihqi')

        cy.get(`${LOGIN_FORM} > button[type="submit"]`).click();

        cy.get(`${LOGIN_FORM} > p`).eq(0).should('exist').should('have.text', 'Maximum length 100 characters');
        cy.get(`${LOGIN_FORM} > p`).eq(1).should('exist').should('have.text', 'Maximum length 20 characters');
    });

    it('Should fail due to email validation', () => {
        cy.get(`${LOGIN_FORM} > div > input`).eq(0).type('somenotvalidemail');

        cy.get(`${LOGIN_FORM} > button[type="submit"]`).click();

        cy.get(`${LOGIN_FORM} > p`).eq(0).should('exist').should('have.text', 'Please provide a valid email');
    });

    it('Should successfully login', () => {
        cy.get(`${LOGIN_FORM} > div > input`).eq(0).type(`lucasalonso11800@gmail.com`);
        cy.get(`${LOGIN_FORM} > div > input`).eq(1).type('pulqui123');

        cy.get(`${LOGIN_FORM} > button[type="submit"]`).click();
        cy.get('h1').should('have.text', 'Admin page').then(() => {
            expect(localStorage.getItem('token')).to.not.be.undefined;
        });
    });
});

;