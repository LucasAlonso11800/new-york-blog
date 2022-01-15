/// <reference types="cypress" />

beforeEach(() => {
    cy.visit(Cypress.env('URL'));
    cy.get('[data-testid="searchForm"] > input[type="search"]').type('Manhattan');
    cy.get('[data-testid="searchForm"]').submit();
    cy.url().should('contain', `${Cypress.env('URL')}/search/Manhattan`);
});

describe('Search for articles', () => {
    it('Should display info about the search', () => {
        cy.get('[data-testid="searchPageTitle"]').should('exist').should('have.text', 'Search results for: Manhattan');
        cy.title().should('contain', 'You searched for Manhattan');
    });

    it('Should display articles with the search word on the title', () => {
        cy.get('[data-testid="articlePreview"] > div > h2').first().should('exist').should('contain', 'Manhattan');
    });
});

;