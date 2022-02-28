import { Given } from 'cypress-cucumber-preprocessor/steps'

Given('Admin is logged in', () => {
    cy.visit('/admin/')
    cy.logAsAdmin()
    cy.url().should('contain', 'dashboard')
})