/// <reference types="cypress" />

beforeEach(() => {
    cy.login();
    cy.visit(`${Cypress.env('URL')}/admin`);
});

describe('Categories CRUD', () => {
    const CATEGORIES_TABLE = '[data-testid="admin-page__categoriesTable"]';
    const CATEGORIES_BUTTONS = '[data-testid="admin-page__categoriesButtons"]';
    const CATEGORIES_FORM = '[data-testid="modal"] > form';

    it('Should fail to create a category due to empty fields', () => {
        cy.get(`${CATEGORIES_BUTTONS} > svg`).click();
        cy.get(CATEGORIES_FORM).should('be.visible');
        cy.get('[data-testid="modal"] > h2').should('have.text', 'Add a category');
        cy.get(`${CATEGORIES_FORM} > div > button[type="submit"]`).click();
        
        cy.get(`${CATEGORIES_FORM} > p`).eq(0).should('have.text', "Please add the category's name");
        cy.get(`${CATEGORIES_FORM} > p`).eq(1).should('have.text', "Please add the category's path");
    });

    it('Should create a category', () => {
        cy.get(`${CATEGORIES_BUTTONS} > svg`).click();
        cy.get(CATEGORIES_FORM).should('be.visible');
        cy.get('[data-testid="modal"] > h2').should('have.text', 'Add a category');
        
        cy.get(`${CATEGORIES_FORM} > div > input`).eq(0).clear().type('Trial category');
        cy.get(`${CATEGORIES_FORM} > div > input`).eq(1).clear().type('some-path');
        cy.get(`${CATEGORIES_FORM} > div > button[type="submit"]`).click();

        cy.get(`${CATEGORIES_FORM}`).should('not.be.visible');
        cy.get(`${CATEGORIES_TABLE} > div`).last().should('have.text', 'Trial category');
    });

    it('Should edit a category', () => {
        cy.get(`${CATEGORIES_TABLE} > div`).last().click();
        cy.get(`${CATEGORIES_BUTTONS} > svg`).first().click();
        cy.get(CATEGORIES_FORM).should('be.visible');
        cy.get('[data-testid="modal"] > h2').should('have.text', 'Edit a category');
        
        cy.get(`${CATEGORIES_FORM} > div > input`).eq(0).clear().type('Trial category edited');
        cy.get(`${CATEGORIES_FORM} > div > input`).eq(1).clear().type('some-path');
        cy.get(`${CATEGORIES_FORM} > div > button[type="submit"]`).click();

        cy.get(`${CATEGORIES_FORM}`).should('not.be.visible');
        cy.get(`${CATEGORIES_TABLE} > div`).last().should('have.text', 'Trial category edited');
    });

    it('Should delete a category', () => {
        cy.get(`${CATEGORIES_TABLE} > div`).last().click();
        cy.get(`${CATEGORIES_BUTTONS} > svg`).last().click();
        cy.get(CATEGORIES_FORM).should('be.visible');
        cy.get('[data-testid="modal"] > h2').should('have.text', 'Delete a category');
        
        cy.get(`${CATEGORIES_FORM} > div > input`).eq(0).should('have.value', 'Trial category edited');
        cy.get(`${CATEGORIES_FORM} > div > input`).eq(1).should('have.value', 'some-path');
        cy.get(`${CATEGORIES_FORM} > div > button[type="submit"]`).click();

        cy.get(`${CATEGORIES_FORM}`).should('not.be.visible');
        cy.get(`${CATEGORIES_TABLE} > div`).last().should('not.have.text', 'Trial category edited');
    });
});