// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {
    const query = `
        mutation loginUser {
            loginUser(email:"lucasalonso11800@gmail.com", password:"pulqui123"){
                id
                username
                roleId
                roleName
                token
            }
        }`;

    cy.request({
        url: `${Cypress.env('URL')}/api/graphql`,
        body: { query },
        method: 'POST',
        failOnStatusCode: false
    }).then(response => window.localStorage.setItem('token', response.body.data.loginUser.token));
})

import 'cypress-file-upload';