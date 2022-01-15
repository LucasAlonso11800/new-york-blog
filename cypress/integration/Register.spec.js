/// <reference types="cypress" />

beforeEach(() => {
    cy.visit(`${Cypress.env('URL')}/admin/register`);
    localStorage.clear();
});

describe('Users creates an account', () => {
    const REGISTER_FORM = '[data-testid="registerForm"]';

    it('Should fail due to empty fields', () => {
        cy.get(`${REGISTER_FORM} > button[type="submit"]`).click();
        cy.get(`${REGISTER_FORM} > p`).eq(0).should('exist').should('have.text', 'Please provide an username');
        cy.get(`${REGISTER_FORM} > p`).eq(1).should('exist').should('have.text', 'Please provide an email');
        cy.get(`${REGISTER_FORM} > p`).eq(2).should('exist').should('have.text', 'Please provide a password');
    });

    it('Should fail due to fields being to short or long', () => {
        // Too Short
        cy.get(`${REGISTER_FORM} > div > input`).eq(0).type('some valid username');
        cy.get(`${REGISTER_FORM} > div > input`).eq(1).type('somevalidemail@gmail.com');
        cy.get(`${REGISTER_FORM} > div > input`).eq(2).type('abcde');

        cy.get(`${REGISTER_FORM} > button[type="submit"]`).click();

        cy.get(`${REGISTER_FORM} > p`).eq(0).should('exist').should('have.text', 'Password lenght must be at least 6 characters');

        // Too long
        cy.get(`${REGISTER_FORM} > div > input`).eq(0).clear().type('someusernameotoolongtobevalidbeingthatover40characters')
        cy.get(`${REGISTER_FORM} > div > input`).eq(1).clear().type('sdjqoidjqowidowodjiqwdjqjdoqiwdjqdjoqwjdoqidjoqwjoqwjoqwdjoqwjoqiwdjqwdjoqjdoqiwdjqwjdoqwiodwu23u032u0912@gmail.com')
        cy.get(`${REGISTER_FORM} > div > input`).eq(2).clear().type('abcdewdoqidjoqihoqwhdqwhoqwihqi')

        cy.get(`${REGISTER_FORM} > button[type="submit"]`).click();

        cy.get(`${REGISTER_FORM} > p`).eq(0).should('exist').should('have.text', 'Maximum length 40 characters');
        cy.get(`${REGISTER_FORM} > p`).eq(1).should('exist').should('have.text', 'Maximum length 100 characters');
        cy.get(`${REGISTER_FORM} > p`).eq(2).should('exist').should('have.text', 'Maximum length 20 characters');
    });

    it('Should fail due to email validation', () => {
        cy.get(`${REGISTER_FORM} > div > input`).eq(0).type('some valid username');
        cy.get(`${REGISTER_FORM} > div > input`).eq(1).type('somenotvalidemail');
        cy.get(`${REGISTER_FORM} > div > input`).eq(2).type('abcdef');

        cy.get(`${REGISTER_FORM} > button[type="submit"]`).click();

        cy.get(`${REGISTER_FORM} > p`).eq(0).should('exist').should('have.text', 'Please provide a valid email');
    });

    it('Should successfully create an account', () => {
        const random = Math.floor(Math.random() * 1000000);
        cy.get(`${REGISTER_FORM} > div > input`).eq(0).type(`some valid username ${random}`);
        cy.get(`${REGISTER_FORM} > div > input`).eq(1).type(`somevalidemail${random}@gmail.com`);
        cy.get(`${REGISTER_FORM} > div > input`).eq(2).type('abcdef');

        cy.get(`${REGISTER_FORM} > button[type="submit"]`).click();
        cy.get('h1').should('have.text', 'Admin page').then(() => {
            expect(localStorage.getItem('token')).to.not.be.undefined;
        });
    });
});

;