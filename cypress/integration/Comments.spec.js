/// <reference types="cypress" />

beforeEach(() => {
    cy.visit(Cypress.env('URL'));
    cy.get('[data-testid="articlePreview"] > div > h2').first().should('exist').click();
    cy.url().should('contain', '/articles');
});

describe('Comments', () => {
    const CONTAINER = '[data-testid="commentForm"]';
    const COMMENT_FORM = '[data-testid="commentForm"] > form';
    const COMMENT = '[data-testid="comment"]';
    const REPLY = `[data-testid="replies"] > ${COMMENT}`;

    it('Should display comment form', () => {
        cy.get(CONTAINER).should('exist');
        cy.get(`${CONTAINER} > h3`).should('have.text', 'Leave a comment');
        cy.get(`${COMMENT_FORM} > textarea[name="body"]`).should('exist');
        cy.get(`${COMMENT_FORM} > input[name="commenter"]`).should('exist');
        cy.get(`${COMMENT_FORM} > input[name="email"]`).should('exist');
        cy.get(`${COMMENT_FORM} > input[name="website"]`).should('exist');
        cy.get(`${COMMENT_FORM} > button[type="submit"]`).should('exist');
    });
    
    it('Should fail posting a comment due to empty fields', () => {
        cy.get(`${COMMENT_FORM} > button[type="submit"]`).click();
        cy.get(`${COMMENT_FORM} > p`).first().should('have.text', "The comment can't be empty");
        cy.get(`${COMMENT_FORM} > p`).eq(1).should('have.text', "Please provide a name");
        cy.get(`${COMMENT_FORM} > p`).eq(2).should('have.text', "Please provide an email");
    });

    it('Should fail posting a comment due to fields too long', () => {
        cy.get(`${COMMENT_FORM} > input[name="commenter"]`).type('ababababababababababababababababababbababababaababaababababababa')
        cy.get(`${COMMENT_FORM} > input[name="email"]`).type('ababababababababababababababababababbababababaababaababababababaababababababababababababababababababbababababaababaababababababa@gmail.com')
        cy.get(`${COMMENT_FORM} > input[name="website"]`).type('ababababababababababababababababababbababababaababaababababababaababababababababababababababababababbababababaababaababababababa')
        cy.get(`${COMMENT_FORM} > button[type="submit"]`).click();
        cy.get(`${COMMENT_FORM} > p`).eq(1).should('have.text', "Maximum length 40 characters");
        cy.get(`${COMMENT_FORM} > p`).eq(2).should('have.text', "Maximum length 100 characters");
        cy.get(`${COMMENT_FORM} > p`).eq(3).should('have.text', "Maximum length 100 characters");
    });

    it('Should fail posting a comment due to invalid email and website', () => {
        cy.get(`${COMMENT_FORM} > input[name="email"]`).type('abc123')
        cy.get(`${COMMENT_FORM} > input[name="website"]`).type('abc123')
        cy.get(`${COMMENT_FORM} > button[type="submit"]`).click();
        cy.get(`${COMMENT_FORM} > p`).eq(2).should('have.text', "Provide a valid email");
        cy.get(`${COMMENT_FORM} > p`).eq(3).should('have.text', "Provide a valid url");
    });

    it('Should post a comment and display it', () => {
        cy.get(`${COMMENT_FORM} > textarea[name="body"]`).type('Testing comments!!!');
        cy.get(`${COMMENT_FORM} > input[name="commenter"]`).type('Tester of comments');
        cy.get(`${COMMENT_FORM} > input[name="email"]`).type('tester@gmail.com');
        cy.get(`${COMMENT_FORM} > button[type="submit"]`).click();

        cy.get(`${COMMENT} > div > p`).first().should('have.text', 'Tester of comments SAYS:');
        cy.get(`${COMMENT} > div > p`).eq(2).should('have.text', 'Testing comments!!!');
    });

    it('Should reply to a comment', () => {
        cy.get(`${COMMENT} > div > p`).eq(3).should('have.text', 'Reply').click();

        cy.get(`${CONTAINER} > h3`).should('contain', 'Reply to');
        cy.get(`${COMMENT_FORM} > textarea[name="body"]`).first().type('Testing replies!!!');
        cy.get(`${COMMENT_FORM} > input[name="commenter"]`).first().type('Tester of replies');
        cy.get(`${COMMENT_FORM} > input[name="email"]`).first().type('replytester@gmail.com');
        cy.get(`${COMMENT_FORM} > button[type="submit"]`).first().click();

        cy.get(`${REPLY} > div > p`).first().should('have.text', 'Tester of replies SAYS:');
        cy.get(`${REPLY} > div > p`).eq(2).should('have.text', 'Testing replies!!!');
    });
});

;