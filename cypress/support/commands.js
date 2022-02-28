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

Cypress.Commands.add('clickAdminMenuItem', (itemID, subitemTitle) => {
    cy.get(itemID).click()
        .children('ul').find('a').contains(subitemTitle).click()
})

Cypress.Commands.add('adminCardIsVisible', title => {
    cy.get('.panel-heading').contains(title).scrollIntoView()
        .should('be.visible')
})

Cypress.Commands.add('logAsAdmin', () => {
    let user = Cypress.env('user')
    let password = Cypress.env('password')
    cy.get('#input-username').clear().type(user)
        .should('have.value', user)
    cy.get('#input-password').clear().type(password)
        .invoke('val').then(val => {
            if (val != password) throw new Error('Typed password doesn\'t match actual password.')
        })
    cy.get('button').contains('Login').click()
})