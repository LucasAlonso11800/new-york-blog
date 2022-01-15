/// <reference types="cypress" />

beforeEach(() => {
    cy.login();
    cy.visit(`${Cypress.env('URL')}/admin`);
});

describe('Editing metadata', () => {
    const METADATA_TABLE = '[data-testid="admin-page__metadataTable"]';
    const METADATA_BUTTONS = '[data-testid="admin-page__metadataButtons"]';
    const METADATA_FORM = '[data-testid="modal"] > form';

    it('Should fail to edit metadata due to empty fields', () => {
        cy.get(`${METADATA_TABLE} > div`).first().click();
        cy.get(`${METADATA_BUTTONS} > svg`).click();
        cy.get(METADATA_FORM).should('be.visible');
        cy.get('[data-testid="modal"] > h2').should('have.text', 'Edit metadata');

        cy.get(`${METADATA_FORM} > div > input`).eq(1).clear();
        cy.get(`${METADATA_FORM} > div > button[type="submit"]`).click();
        
        cy.get(`${METADATA_FORM} > p`).eq(0).should('have.text', "Please add a value");
    });

    it('Should edit text metadata', () => {
        cy.get(`${METADATA_TABLE} > div`).eq(1).click();
        cy.get(`${METADATA_BUTTONS} > svg`).first().click();
        cy.get(METADATA_FORM).should('be.visible');
        cy.get('[data-testid="modal"] > h2').should('have.text', 'Edit metadata');
        
        cy.get(`${METADATA_FORM} > div > input`).eq(1).clear().type('Trial metadata');
        cy.get(`${METADATA_FORM} > div > button[type="submit"]`).click();

        cy.get(`${METADATA_FORM}`).should('not.be.visible');

        cy.get(`${METADATA_TABLE} > div`).eq(1).click();
        cy.get(`${METADATA_BUTTONS} > svg`).first().click();
        cy.get(METADATA_FORM).should('be.visible');
        cy.get('[data-testid="modal"] > h2').should('have.text', 'Edit metadata');
        
        cy.get(`${METADATA_FORM} > div > input`).eq(1).should('have.value', 'Trial metadata').clear().type('About the blog');
        cy.get(`${METADATA_FORM} > div > button[type="submit"]`).click();

        cy.get(`${METADATA_FORM}`).should('not.be.visible');
    });
});