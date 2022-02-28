import { Given } from 'cypress-cucumber-preprocessor/steps'

Given('Admin is logged in', () => {
    cy.visit('/admin/')
    cy.logAsAdmin()
    cy.urlShouldContain('dashboard')
})

Given('Admin is on {string} page', urlSnippet => {
    cy.urlShouldContain(urlSnippet)
})